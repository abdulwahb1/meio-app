"use dom";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (error) {
    console.log(error);
    console.error("Microphone permission denied");
    return false;
  }
}

export default function ConvAiDOMComponent({
  platform,
  onStatusChange,
}: {
  dom?: import("expo/dom").DOMProps;
  platform: string;
  onStatusChange?: (status: string) => void;
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected");
      onStatusChange?.("connected");
    },
    onDisconnect: () => {
      console.log("Disconnected");
      onStatusChange?.("disconnected");
    },
    onMessage: (message) => {
      console.log(message);
    },
    onError: (error) => {
      console.error("Error:", error);
      onStatusChange?.("error");
    },
  });

  // Notify parent of status changes
  useEffect(() => {
    onStatusChange?.(conversation.status);
  }, [conversation.status, onStatusChange]);

  // Pulse animation for connecting state
  useEffect(() => {
    if (conversation.status === "connecting") {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6, // Simple opacity fade
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [conversation.status, pulseAnim]);

  const startConversation = useCallback(async () => {
    try {
      // Notify parent that we're connecting
      onStatusChange?.("connecting");

      // Request microphone permission
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        alert("No permission");
        onStatusChange?.("disconnected");
        return;
      }

      // Start the conversation with your agent
      await conversation.startSession({
        agentId: process.env.EXPO_PUBLIC_ELEVEN_LABS_AGENT_ID!, // Replace with your agent ID
        dynamicVariables: {
          platform,
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
      onStatusChange?.("error");
    }
  }, [conversation, platform, onStatusChange]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <Animated.View style={{ opacity: pulseAnim }}>
      <Pressable
        style={[
          styles.callButton,
          conversation.status === "connected" && styles.callButtonActive,
          conversation.status === "connecting" && styles.callButtonConnecting,
        ]}
        onPress={
          conversation.status === "disconnected"
            ? startConversation
            : stopConversation
        }
      >
        <View
          style={[
            conversation.status === "connected" && styles.buttonInnerActive,
            conversation.status === "connecting" &&
              styles.buttonInnerConnecting,
          ]}
        >
          <Image
            source={require("@/assets/icons/mic.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  callButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  callButtonActive: {
    backgroundColor: "rgba(239, 68, 205, 0.2)",
  },
  callButtonConnecting: {
    backgroundColor: "rgba(222, 108, 199, 0.2)",
  },
  buttonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonInnerActive: {
    shadowColor: "#EF4444",
  },
  buttonInnerConnecting: {
    shadowColor: "#3B82F6",
  },
  buttonIcon: {
    width: 120,
    transform: [{ translateY: 3 }],
  },
});
