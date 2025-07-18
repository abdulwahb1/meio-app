import * as FileSystem from "expo-file-system";

/**
 * Creates a proper WAV file header for PCM audio data
 * @param pcmDataSize Size of the PCM data in bytes
 * @param sampleRate Sample rate (default: 16000 Hz for ElevenLabs)
 * @param channels Number of channels (default: 1 for mono)
 * @param bitsPerSample Bits per sample (default: 16-bit)
 * @returns ArrayBuffer containing the WAV header
 */
export const createWavHeader = (
  pcmDataSize: number,
  sampleRate: number = 16000,
  channels: number = 1,
  bitsPerSample: number = 16
): ArrayBuffer => {
  const buffer = new ArrayBuffer(44);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  view.setUint8(0, 0x52); // R
  view.setUint8(1, 0x49); // I
  view.setUint8(2, 0x46); // F
  view.setUint8(3, 0x46); // F

  // File size - 8 bytes
  view.setUint32(4, 36 + pcmDataSize, true); // Little endian

  // WAVE format
  view.setUint8(8, 0x57); // W
  view.setUint8(9, 0x41); // A
  view.setUint8(10, 0x56); // V
  view.setUint8(11, 0x45); // E

  // fmt sub-chunk
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

  // data sub-chunk
  view.setUint8(36, 0x64); // d
  view.setUint8(37, 0x61); // a
  view.setUint8(38, 0x74); // t
  view.setUint8(39, 0x61); // a

  // Sub-chunk 2 size (PCM data size)
  view.setUint32(40, pcmDataSize, true);

  return buffer;
};

/**
 * Converts ArrayBuffer to base64 string
 * @param buffer The ArrayBuffer to convert
 * @returns Base64 string representation
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

/**
 * Converts base64 PCM data to a proper WAV format with headers
 * @param base64PcmData Base64 encoded PCM audio data
 * @param sampleRate Sample rate (default: 16000 Hz)
 * @param channels Number of channels (default: 1)
 * @param bitsPerSample Bits per sample (default: 16)
 * @returns Base64 encoded complete WAV file
 */
export const pcmToWav = (
  base64PcmData: string,
  sampleRate: number = 16000,
  channels: number = 1,
  bitsPerSample: number = 16
): string => {
  // Decode base64 to get actual binary size
  const pcmBinaryString = atob(base64PcmData);
  const pcmDataSize = pcmBinaryString.length;

  // Create WAV header
  const wavHeader = createWavHeader(
    pcmDataSize,
    sampleRate,
    channels,
    bitsPerSample
  );

  // Properly combine binary data
  const headerBytes = new Uint8Array(wavHeader);
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

/**
 * Converts an existing "broken" WAV file (PCM without headers) to proper WAV
 * @param inputFilePath Path to the input file containing raw PCM data
 * @param outputFilePath Path where the corrected WAV file should be saved
 * @param sampleRate Sample rate (default: 16000 Hz)
 * @param channels Number of channels (default: 1)
 * @param bitsPerSample Bits per sample (default: 16)
 */
export const fixWavFile = async (
  inputFilePath: string,
  outputFilePath: string,
  sampleRate: number = 16000,
  channels: number = 1,
  bitsPerSample: number = 16
): Promise<void> => {
  try {
    console.log("🔧 Reading PCM file:", inputFilePath);

    // Read the raw PCM data
    const pcmBase64 = await FileSystem.readAsStringAsync(inputFilePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert to proper WAV
    const wavBase64 = pcmToWav(pcmBase64, sampleRate, channels, bitsPerSample);

    // Save the corrected file
    await FileSystem.writeAsStringAsync(outputFilePath, wavBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("✅ Fixed WAV file saved to:", outputFilePath);

    // Verify the file
    const fileInfo = await FileSystem.getInfoAsync(outputFilePath);
    if (fileInfo.exists && "size" in fileInfo) {
      console.log("📊 Fixed file size:", fileInfo.size, "bytes");
    }
  } catch (error) {
    console.error("❌ Error fixing WAV file:", error);
    throw error;
  }
};

/**
 * Batch converts all broken WAV files in a directory
 * @param directoryPath Directory containing broken WAV files
 * @param outputSuffix Suffix to add to fixed files (default: "_fixed")
 */
export const fixAllWavFilesInDirectory = async (
  directoryPath: string,
  outputSuffix: string = "_fixed"
): Promise<void> => {
  try {
    const files = await FileSystem.readDirectoryAsync(directoryPath);
    const wavFiles = files.filter((file) => file.endsWith(".wav"));

    console.log(`🔧 Found ${wavFiles.length} WAV files to fix`);

    for (const file of wavFiles) {
      const inputPath = `${directoryPath}/${file}`;
      const outputPath = `${directoryPath}/${file.replace(
        ".wav",
        `${outputSuffix}.wav`
      )}`;

      console.log(`🔧 Fixing: ${file}`);
      await fixWavFile(inputPath, outputPath);
    }

    console.log("✅ All WAV files fixed!");
  } catch (error) {
    console.error("❌ Error fixing WAV files:", error);
    throw error;
  }
};
