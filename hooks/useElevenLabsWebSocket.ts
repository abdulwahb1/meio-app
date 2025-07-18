import {
  AudioModule,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useRef, useState } from "react";

interface ConversationState {
  isConnected: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  isLoading: boolean;
  isWaitingForResponse: boolean; // New state for after sending audio
  error: string | null;
  responseTimeoutId?: number; // For managing response timeouts
}

export const useElevenLabsWebSocket = () => {
  const [state, setState] = useState<ConversationState>({
    isConnected: false,
    isSpeaking: false,
    isListening: false,
    isLoading: false,
    isWaitingForResponse: false,
    error: null,
  });

  const webSocketRef = useRef<WebSocket | null>(null);

  // Create custom recording options for PCM 16kHz as expected by ElevenLabs
  const pcmRecordingOptions = {
    extension: ".wav",
    sampleRate: 16000,
    numberOfChannels: 1,
    bitRate: 256000,
    android: {
      extension: ".wav",
      outputFormat: "default" as const,
      audioEncoder: "default" as const,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 256000,
    },
    ios: {
      extension: ".wav",
      outputFormat: "linearpcm" as const,
      audioQuality: 96,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 256000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: "audio/wav",
      bitsPerSecond: 256000,
    },
  };

  const audioRecorder = useAudioRecorder(pcmRecordingOptions);
  const recorderState = useAudioRecorderState(audioRecorder);

  // Create a player for response audio - we'll update its source when needed
  const responsePlayer = useAudioPlayer();
  const playerStatus = useAudioPlayerStatus(responsePlayer);

  // Track when audio finishes playing
  useEffect(() => {
    console.log("🎵 Player status update:", {
      isLoaded: playerStatus.isLoaded,
      didJustFinish: playerStatus.didJustFinish,
      playing: playerStatus.playing,
      duration: playerStatus.duration,
      currentTime: playerStatus.currentTime,
    });

    if (playerStatus.isLoaded && playerStatus.didJustFinish) {
      console.log("🎵 Audio playback finished - resetting to listening state");
      setState((prev) => ({
        ...prev,
        isSpeaking: false,
        isListening: true,
      }));
    }

    // Fallback: If audio is loaded but not playing for too long, reset state
    if (playerStatus.isLoaded && !playerStatus.playing && state.isSpeaking) {
      console.log(
        "🎵 Audio loaded but not playing - checking if we need to reset state"
      );
      // Add a small delay to allow for natural audio finishing
      const timeoutId = setTimeout(() => {
        console.log("🎵 Fallback: Resetting speaking state to listening");
        setState((prev) => ({
          ...prev,
          isSpeaking: false,
          isListening: true,
        }));
      }, 2000); // 2 second delay

      return () => clearTimeout(timeoutId);
    }
  }, [
    playerStatus.didJustFinish,
    playerStatus.isLoaded,
    playerStatus.playing,
    state.isSpeaking,
  ]);

  // Initialize audio permissions
  const initializeAudio = useCallback(async () => {
    try {
      console.log("🎤 Initializing audio...");

      // Request audio recording permissions
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        console.log("❌ Audio permission denied");
        setState((prev) => ({
          ...prev,
          error: "Audio recording permission denied",
        }));
        return false;
      }

      // Set audio mode for both recording and playback with proper configuration
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });

      console.log("✅ Audio initialized successfully");
      console.log("📁 Files will be saved to:", FileSystem.documentDirectory);
      return true;
    } catch (error) {
      console.error("❌ Audio initialization error:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to initialize audio",
      }));
      return false;
    }
  }, []);

  // Start WebSocket connection
  const startConversation = useCallback(async () => {
    try {
      console.log("🚀 Starting conversation...");
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Initialize audio first
      const audioReady = await initializeAudio();
      if (!audioReady) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      // Get agent ID from environment
      const agentId = process.env.EXPO_PUBLIC_ELEVEN_LABS_AGENT_ID;
      if (!agentId) {
        throw new Error("ElevenLabs Agent ID not configured");
      }

      console.log("🔌 Connecting to WebSocket with agent:", agentId);

      // Create WebSocket connection to ElevenLabs
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;
      webSocketRef.current = new WebSocket(wsUrl);

      webSocketRef.current.onopen = () => {
        console.log("✅ Connected to ElevenLabs WebSocket");
        setState((prev) => ({
          ...prev,
          isConnected: true,
          isLoading: false,
          isListening: true,
        }));
      };

      webSocketRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📨 WebSocket message received:", data.type);
          // console.log("📋 Full message data:", data); // Debug: log full message

          if (data.type === "audio") {
            console.log("🎵 Received audio from agent, playing...");
            // Clear waiting state since we got the response
            setState((prev) => {
              // Clear any pending timeout
              if ("responseTimeoutId" in prev && prev.responseTimeoutId) {
                clearTimeout(prev.responseTimeoutId);
              }
              return {
                ...prev,
                isWaitingForResponse: false,
                isSpeaking: true,
                responseTimeoutId: undefined,
              };
            });
            // Play received audio
            await playAudio(data.audio_event.audio_base_64);
          } else if (data.type === "user_transcript") {
            // Correct property structure from API docs
            const userText = data.user_transcription_event?.user_transcript;
            console.log("👤 User said:", userText);
            // Clear timeout since we got a transcription response
            setState((prev) => {
              if ("responseTimeoutId" in prev && prev.responseTimeoutId) {
                clearTimeout(prev.responseTimeoutId);
              }
              return { ...prev, responseTimeoutId: undefined };
            });
            // Log if transcription is empty or missing
            if (!userText || userText.trim() === "") {
              console.warn("⚠️ WARNING: User transcript is empty or missing!");
              console.log(
                "📋 Full transcript event:",
                data.user_transcription_event
              );
            }
          } else if (data.type === "agent_response") {
            // Correct property structure from API docs
            const agentText = data.agent_response_event?.agent_response;
            console.log("🤖 Agent response:", agentText);
            // Clear timeout since we got an agent response
            setState((prev) => {
              if ("responseTimeoutId" in prev && prev.responseTimeoutId) {
                clearTimeout(prev.responseTimeoutId);
              }
              return { ...prev, responseTimeoutId: undefined };
            });
            // Log if agent response seems generic
            if (
              agentText &&
              agentText.toLowerCase().includes("how are you feeling")
            ) {
              console.warn(
                "⚠️ WARNING: Agent giving generic response - possible transcription issue"
              );
            }
          } else if (data.type === "conversation_initiation_metadata") {
            console.log("📋 Conversation metadata:", {
              userFormat:
                data.conversation_initiation_metadata_event
                  .user_input_audio_format,
              agentFormat:
                data.conversation_initiation_metadata_event
                  .agent_output_audio_format,
              conversationId:
                data.conversation_initiation_metadata_event.conversation_id,
            });
            // Verify audio formats match our expectations
            const userFormat =
              data.conversation_initiation_metadata_event
                ?.user_input_audio_format;
            const agentFormat =
              data.conversation_initiation_metadata_event
                ?.agent_output_audio_format;
            if (userFormat !== "pcm_16000") {
              console.warn(
                "⚠️ WARNING: Unexpected user input format:",
                userFormat
              );
            }
            if (agentFormat !== "pcm_16000") {
              console.warn(
                "⚠️ WARNING: Unexpected agent output format:",
                agentFormat
              );
            }
          } else if (data.type === "ping") {
            console.log("🏓 Received ping, sending pong...");
            const pongMessage = {
              type: "pong",
              event_id: data.ping_event.event_id,
            };
            webSocketRef.current?.send(JSON.stringify(pongMessage));
          } else if (data.type === "vad_score") {
            // Voice Activity Detection score - helps debug audio quality
            const vadScore = data.vad_score_event?.vad_score;
            console.log("🎤 Voice Activity Detection score:", vadScore);
            if (vadScore < 0.3) {
              console.warn(
                "⚠️ WARNING: Low VAD score - audio might be too quiet or noisy"
              );
            }
          } else if (data.type === "internal_tentative_agent_response") {
            // This shows the agent is processing/thinking
            const tentativeResponse =
              data.tentative_agent_response_internal_event
                ?.tentative_agent_response;
            console.log("🤔 Agent thinking:", tentativeResponse);
          } else {
            console.log("📝 Other message type:", data.type, data);
          }
        } catch (error) {
          console.error("❌ Error processing WebSocket message:", error);
          console.error("❌ Raw message data:", event.data);
        }
      };

      webSocketRef.current.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        setState((prev) => ({
          ...prev,
          error: "Connection error",
          isLoading: false,
        }));
      };

      webSocketRef.current.onclose = (event) => {
        console.log(
          "🔌 WebSocket connection closed:",
          event.code,
          event.reason
        );
        console.log("🔍 Close event details:", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          timestamp: new Date().toISOString(),
        });

        // Common close codes:
        // 1000 = Normal closure
        // 1001 = Going away
        // 1006 = Abnormal closure
        // 1011 = Server error

        setState((prev) => ({
          ...prev,
          isConnected: false,
          isSpeaking: false,
          isListening: false,
          isWaitingForResponse: false,
        }));
      };
    } catch (error) {
      console.error("❌ Failed to start conversation:", error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      }));
    }
  }, [initializeAudio]);

  // Start recording audio
  const startRecording = useCallback(async () => {
    try {
      console.log("🎤 Starting PCM recording at 16kHz...");
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();

      setState((prev) => ({ ...prev, isListening: true }));
    } catch (error) {
      console.error("❌ Failed to start recording:", error);
      setState((prev) => ({ ...prev, error: "Failed to start recording" }));
    }
  }, [audioRecorder]);

  // Stop recording and send audio
  const stopRecording = useCallback(async () => {
    if (!recorderState.isRecording) return;

    try {
      console.log("🎤 Stopping recording and sending to agent...");

      // Stop recording
      await audioRecorder.stop();
      const uri = audioRecorder.uri;

      // Set state to waiting for response (keep connected and listening)
      setState((prev) => ({
        ...prev,
        isListening: false,
        isWaitingForResponse: true,
        // DON'T close connection - wait for agent response
      }));

      if (uri && webSocketRef.current) {
        console.log("📁 Audio file path:", uri);

        // Verify the recorded file exists and has content
        const fileInfo = await FileSystem.getInfoAsync(uri);
        console.log("🎤 Recorded file info:", fileInfo);

        if (!fileInfo.exists) {
          throw new Error("Recorded audio file does not exist");
        }

        if (fileInfo.exists && "size" in fileInfo && fileInfo.size === 0) {
          console.warn("⚠️ WARNING: Recorded audio file is empty!");
          setState((prev) => ({
            ...prev,
            isListening: true,
            isWaitingForResponse: false,
            error:
              "No audio recorded - try speaking louder or closer to microphone",
          }));
          return;
        }

        // Check if recording is too short (less than 0.5 seconds at 16kHz 16-bit mono = ~16000 bytes)
        if (fileInfo.exists && "size" in fileInfo && fileInfo.size < 8000) {
          console.warn(
            "⚠️ WARNING: Recording too short - try speaking for at least 1-2 seconds"
          );
          setState((prev) => ({
            ...prev,
            isListening: true,
            isWaitingForResponse: false,
            error:
              "Recording too short - please speak for at least 1-2 seconds",
          }));
          return;
        }

        // Read the WAV file as base64
        const base64Audio = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        console.log(
          "🎤 Recorded audio size:",
          base64Audio.length,
          "characters"
        );

        // Convert base64 to binary for analysis
        const binaryData = atob(base64Audio);
        console.log("🎤 Binary audio size:", binaryData.length, "bytes");

        // Check if this is a valid WAV file or raw PCM data
        const riffHeader = binaryData.substring(0, 4);
        const isValidWav = riffHeader === "RIFF";

        console.log(
          "🔍 Audio format detection:",
          isValidWav ? "WAV file" : "Raw PCM data"
        );

        let pcmData: string;

        if (isValidWav) {
          console.log("✅ Processing as WAV file");

          // Validate WAV file format
          if (binaryData.length < 44) {
            throw new Error("Audio file too small to contain valid WAV header");
          }

          // Check for WAVE format
          const waveFormat = binaryData.substring(8, 12);
          if (waveFormat !== "WAVE") {
            console.error("❌ Invalid WAV file - missing WAVE format");
            throw new Error("Invalid audio format - not a valid WAVE file");
          }

          // Find the "data" chunk precisely
          let dataOffset = 44; // Default WAV header size
          let foundDataChunk = false;

          for (let i = 12; i < Math.min(200, binaryData.length - 4); i++) {
            if (binaryData.substring(i, i + 4) === "data") {
              dataOffset = i + 8; // Skip "data" + 4-byte size field
              foundDataChunk = true;
              console.log("✅ Found 'data' chunk at offset:", i);
              break;
            }
          }

          if (!foundDataChunk) {
            console.warn(
              "⚠️ WARNING: Could not find 'data' chunk, using default offset"
            );
          }

          console.log("🔍 WAV header size detected:", dataOffset, "bytes");

          // Extract only the PCM data (skip headers)
          pcmData = binaryData.substring(dataOffset);
        } else {
          console.log(
            "✅ Processing as raw PCM data (no WAV headers to strip)"
          );
          // File is already raw PCM data, use it directly
          pcmData = binaryData;
        }

        // Validate PCM data size
        if (pcmData.length < 1000) {
          console.warn(
            "⚠️ WARNING: Very little PCM data extracted:",
            pcmData.length,
            "bytes"
          );
        }

        // Check for silence (all zeros or very low amplitude)
        let hasSignificantAudio = false;
        for (let i = 0; i < Math.min(1000, pcmData.length); i += 2) {
          const sample =
            (pcmData.charCodeAt(i + 1) << 8) | pcmData.charCodeAt(i);
          if (Math.abs(sample) > 100) {
            // Check for amplitude above noise floor
            hasSignificantAudio = true;
            break;
          }
        }

        if (!hasSignificantAudio) {
          console.warn("⚠️ WARNING: Audio appears to be silent or very quiet");
          setState((prev) => ({
            ...prev,
            isListening: true,
            isWaitingForResponse: false,
            error: "Audio too quiet - please speak louder",
          }));
          return;
        }

        console.log("✅ Audio contains speech-level signals");

        // ElevenLabs expects raw 16-bit signed PCM data at 16kHz, little-endian
        // Let's extract and convert the PCM data properly
        console.log(
          "🔧 Converting to proper 16-bit signed PCM format for ElevenLabs..."
        );

        let finalPcmData = "";

        if (isValidWav) {
          console.log("📋 Processing WAV file - extracting PCM data");
          // WAV file - extract PCM from data chunk
          finalPcmData = pcmData;
        } else {
          console.log("📋 Processing raw audio data - converting to PCM");
          // Raw audio data - treat as PCM but ensure proper format
          finalPcmData = binaryData;
        }

        // Ensure we have even number of bytes (16-bit samples)
        if (finalPcmData.length % 2 !== 0) {
          console.warn("⚠️ Odd number of bytes - truncating last byte");
          finalPcmData = finalPcmData.substring(0, finalPcmData.length - 1);
        }

        // Convert to properly formatted 16-bit signed PCM
        console.log("🔄 Converting to signed 16-bit little-endian PCM...");
        let convertedPcm = "";

        for (let i = 0; i < finalPcmData.length; i += 2) {
          // Read 16-bit sample (little-endian)
          const lowByte = finalPcmData.charCodeAt(i);
          const highByte = finalPcmData.charCodeAt(i + 1);

          // Combine to 16-bit unsigned value
          let sample = (highByte << 8) | lowByte;

          // Convert to signed 16-bit (-32768 to 32767)
          if (sample > 32767) {
            sample = sample - 65536;
          }

          // Convert back to unsigned for storage
          const unsignedSample = sample < 0 ? sample + 65536 : sample;

          // Store as little-endian bytes
          convertedPcm += String.fromCharCode(unsignedSample & 0xff); // Low byte
          convertedPcm += String.fromCharCode((unsignedSample >> 8) & 0xff); // High byte
        }

        console.log("✅ PCM conversion completed");
        console.log("🔍 Original data size:", finalPcmData.length, "bytes");
        console.log("🔍 Converted PCM size:", convertedPcm.length, "bytes");

        // Calculate duration
        const sampleRate = 16000;
        const bytesPerSample = 2;
        const durationSeconds =
          convertedPcm.length / (sampleRate * bytesPerSample);
        console.log(
          "🕐 Audio duration:",
          durationSeconds.toFixed(2),
          "seconds"
        );

        // Check minimum duration
        if (durationSeconds < 1.0) {
          console.warn(
            "⚠️ Audio too short for transcription:",
            durationSeconds.toFixed(2),
            "seconds"
          );
          if (durationSeconds < 0.8) {
            setState((prev) => ({
              ...prev,
              isListening: true,
              isWaitingForResponse: false,
              error: `Recording too short (${durationSeconds.toFixed(
                1
              )}s). Please record for at least 2-3 seconds.`,
            }));
            return;
          }
        }

        // Convert to base64 for transmission
        const pcmBase64 = btoa(convertedPcm);

        console.log("📤 Sending properly formatted PCM audio to ElevenLabs");
        console.log("📊 Final audio stats:", {
          originalSize: base64Audio.length,
          pcmBytes: convertedPcm.length,
          pcmBase64Length: pcmBase64.length,
          durationSeconds: durationSeconds.toFixed(2),
        });

        // Send the properly formatted PCM audio
        const audioMessage = {
          user_audio_chunk: pcmBase64,
        };

        console.log("📤 Sending audio message to WebSocket...");
        webSocketRef.current.send(JSON.stringify(audioMessage));

        console.log("✅ Properly formatted PCM audio sent successfully");
        console.log(
          "⏳ Waiting for agent response... (should see user_transcript soon)"
        );

        // Clean up the temporary file
        await FileSystem.deleteAsync(uri, { idempotent: true });

        // Set a timeout to reset state if no response is received
        const responseTimeout = setTimeout(() => {
          console.warn(
            "⏰ TIMEOUT: No response received within 15 seconds - resetting state"
          );
          setState((prev) => ({
            ...prev,
            isListening: true,
            isWaitingForResponse: false,
            error: "No response from AI - please try again",
          }));
        }, 15000); // 15 second timeout

        // Store timeout ID for cleanup
        setState((prev) => ({
          ...prev,
          isListening: false,
          responseTimeoutId: responseTimeout,
        }));

        // Set state to waiting for response
        setState((prev) => ({
          ...prev,
          isListening: false,
          // Keep connection alive to receive response
        }));
      }
    } catch (error) {
      console.error("❌ Failed to stop recording:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to process audio",
        isListening: true,
        isWaitingForResponse: false,
      }));
    }
  }, [recorderState.isRecording, audioRecorder]);

  // Stop conversation
  const stopConversation = useCallback(async () => {
    console.log("🛑 Stopping conversation...");
    setState((prev) => ({ ...prev, isLoading: true }));

    // Stop recording if active
    if (recorderState.isRecording) {
      try {
        await audioRecorder.stop();
        console.log("🎤 Recording stopped");
      } catch (error) {
        console.error("❌ Error stopping recording:", error);
      }
    }

    // Stop audio playback
    if (playerStatus.isLoaded) {
      try {
        responsePlayer.pause();
        console.log("🎵 Audio playback stopped");
      } catch (error) {
        console.error("❌ Error stopping playback:", error);
      }
    }

    // Close WebSocket
    if (webSocketRef.current) {
      webSocketRef.current.close();
      webSocketRef.current = null;
      console.log("🔌 WebSocket closed");
    }

    setState({
      isConnected: false,
      isSpeaking: false,
      isListening: false,
      isLoading: false,
      isWaitingForResponse: false,
      error: null,
    });
  }, [
    recorderState.isRecording,
    audioRecorder,
    playerStatus.isLoaded,
    responsePlayer,
  ]);

  // Helper function to create WAV file headers for PCM data
  const createWavHeader = (
    pcmDataSize: number,
    sampleRate: number = 16000,
    channels: number = 1,
    bitsPerSample: number = 16
  ) => {
    const buffer = new ArrayBuffer(44);
    const view = new DataView(buffer);

    // WAV file header
    // "RIFF" chunk descriptor
    view.setUint8(0, 0x52); // R
    view.setUint8(1, 0x49); // I
    view.setUint8(2, 0x46); // F
    view.setUint8(3, 0x46); // F

    // File size - 8 bytes (will be filled in later)
    view.setUint32(4, 36 + pcmDataSize, true); // Little endian

    // "WAVE" format
    view.setUint8(8, 0x57); // W
    view.setUint8(9, 0x41); // A
    view.setUint8(10, 0x56); // V
    view.setUint8(11, 0x45); // E

    // "fmt " sub-chunk
    view.setUint8(12, 0x66); // f
    view.setUint8(13, 0x6d); // m
    view.setUint8(14, 0x74); // t
    view.setUint8(15, 0x20); // (space)

    // Sub-chunk 1 size (PCM = 16)
    view.setUint32(16, 16, true);

    // Audio format (PCM = 1)
    view.setUint16(20, 1, true);

    // Number of channels
    view.setUint16(22, channels, true);

    // Sample rate
    view.setUint32(24, sampleRate, true);

    // Byte rate (sample rate * channels * bits per sample / 8)
    view.setUint32(28, (sampleRate * channels * bitsPerSample) / 8, true);

    // Block align (channels * bits per sample / 8)
    view.setUint16(32, (channels * bitsPerSample) / 8, true);

    // Bits per sample
    view.setUint16(34, bitsPerSample, true);

    // "data" sub-chunk
    view.setUint8(36, 0x64); // d
    view.setUint8(37, 0x61); // a
    view.setUint8(38, 0x74); // t
    view.setUint8(39, 0x61); // a

    // Sub-chunk 2 size (PCM data size)
    view.setUint32(40, pcmDataSize, true);

    return buffer;
  };

  // Helper function to convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Helper function to combine binary data and convert to base64
  const combineBinaryToBase64 = (wavHeader: ArrayBuffer, pcmBase64: string) => {
    // Convert header ArrayBuffer to Uint8Array
    const headerBytes = new Uint8Array(wavHeader);

    // Convert base64 PCM data to binary string, then to Uint8Array
    const pcmBinaryString = atob(pcmBase64);
    const pcmBytes = new Uint8Array(pcmBinaryString.length);
    for (let i = 0; i < pcmBinaryString.length; i++) {
      pcmBytes[i] = pcmBinaryString.charCodeAt(i);
    }

    // Combine header and PCM data
    const totalLength = headerBytes.length + pcmBytes.length;
    const combinedBytes = new Uint8Array(totalLength);
    combinedBytes.set(headerBytes, 0);
    combinedBytes.set(pcmBytes, headerBytes.length);

    // Convert combined data to base64
    let binaryString = "";
    for (let i = 0; i < combinedBytes.length; i++) {
      binaryString += String.fromCharCode(combinedBytes[i]);
    }

    return btoa(binaryString);
  };

  // Play received audio
  const playAudio = useCallback(
    async (base64Audio: string) => {
      try {
        console.log("🎵 Setting up audio playback...");
        console.log(
          "🎵 Received audio length:",
          base64Audio.length,
          "characters"
        );

        // Ensure audio mode is set for playback through speakers
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: false,
          shouldRouteThroughEarpiece: false, // Force speaker output on Android
        });

        setState((prev) => ({ ...prev, isSpeaking: true }));

        // Create timestamp for unique filenames
        const timestamp = Date.now();

        // Try to save to Downloads directory (more accessible)
        const downloadsDir = `${FileSystem.documentDirectory}Downloads/`;
        const audioFilePath = `${downloadsDir}meio_agent_${timestamp}.wav`;

        console.log("📁 Creating Downloads directory...");
        await FileSystem.makeDirectoryAsync(downloadsDir, {
          intermediates: true,
        });

        console.log("🎵 Converting PCM data to WAV format...");

        // Decode the base64 PCM data to get the actual data size
        const pcmBinaryString = atob(base64Audio);
        const pcmDataSize = pcmBinaryString.length;
        console.log("🎵 PCM data size:", pcmDataSize, "bytes");

        // Create WAV header for 16kHz, mono, 16-bit PCM
        const wavHeader = createWavHeader(pcmDataSize, 16000, 1, 16);

        // Properly combine binary data and convert to base64
        const completeWavBase64 = combineBinaryToBase64(wavHeader, base64Audio);

        console.log("🎵 Created complete WAV file with headers");
        console.log("🎵 Header size:", 44, "bytes");
        console.log("🎵 Total WAV size:", pcmDataSize + 44, "bytes");
        console.log(
          "🎵 Base64 string length:",
          completeWavBase64.length,
          "chars"
        );

        console.log("💾 Saving audio file to:", audioFilePath);
        await FileSystem.writeAsStringAsync(audioFilePath, completeWavBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // ✅ IMPORTANT: Log the exact file path for user
        console.log("🎵 ✅ AUDIO FILE SUCCESSFULLY SAVED TO:");
        console.log("📁 PATH:", audioFilePath);
        console.log("📱 You can find this file in your app's Downloads folder");

        // Verify file was created
        const fileInfo = await FileSystem.getInfoAsync(audioFilePath);
        console.log("🎵 File verification:", fileInfo);

        if (!fileInfo.exists) {
          throw new Error("Audio file was not created properly");
        }

        console.log("🎵 File size:", fileInfo.size, "bytes");

        // Try to play audio - using alternative method for Expo Go compatibility
        console.log("🎵 Attempting audio playback...");

        try {
          // Method 1: Standard expo-audio approach
          const result = await responsePlayer.replace({ uri: audioFilePath });
          console.log("🎵 replace() result:", result);
          await responsePlayer.play();
          console.log("🎵 ✅ Audio playback started with expo-audio!");
        } catch (playError) {
          console.error("❌ expo-audio playback failed:", playError);

          // Method 2: Try with different source format
          try {
            console.log("🔄 Trying alternative playback with direct URI...");
            responsePlayer.replace(audioFilePath);
            await responsePlayer.play();
            console.log("🎵 ✅ Audio playback started with direct URI!");
          } catch (altError) {
            console.error("❌ Alternative playback also failed:", altError);

            // Method 3: Log instructions for manual playback
            console.log("📢 AUDIO PLAYBACK FAILED - Manual access required:");
            console.log("📱 File saved to:", audioFilePath);
            console.log("🔍 You can access this file using a file manager app");
            console.log(
              "🎵 Or use adb to pull the file (Android) / iTunes File Sharing (iOS)"
            );

            // For now, just set speaking to false after a delay to simulate playback
            setTimeout(() => {
              setState((prev) => ({
                ...prev,
                isSpeaking: false,
                isListening: true,
              }));
            }, 3000); // 3 seconds fake playback
          }
        }
      } catch (error) {
        console.error("❌ Failed to save/play audio:", error);
        setState((prev) => ({
          ...prev,
          isSpeaking: false,
          error: "Audio playback failed",
        }));
      }
    },
    [responsePlayer]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 Component unmounting, cleaning up WebSocket...");
      // Call stopConversation directly instead of through the callback
      // to avoid dependency issues
      if (webSocketRef.current) {
        webSocketRef.current.close();
        webSocketRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run on mount/unmount

  // Manual function to reset conversation state if it gets stuck
  const resetConversationState = useCallback(() => {
    console.log("🔄 Manually resetting conversation state...");
    setState((prev) => ({
      ...prev,
      isSpeaking: false,
      isWaitingForResponse: false,
      isListening: prev.isConnected, // Only set to listening if connected
      error: null,
    }));
  }, []);

  return {
    ...state,
    startConversation,
    stopConversation,
    startRecording,
    stopRecording,
    resetConversationState, // Export the reset function
  };
};
