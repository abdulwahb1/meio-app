import { AuthHeader } from "@/components/AuthHeader";
import ConvAiDOMComponent from "@/components/ConvAI";
import InputBoxWithMic from "@/components/InputBoxWithMic";
import { PrivacyText } from "@/components/PrivacyText";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SpeakWithMeio3 = () => {
  const [inputText, setInputText] = useState("");
  const [conversationStatus, setConversationStatus] = useState("disconnected");
  const router = useRouter();
  const mascotScaleAnim = useRef(new Animated.Value(1)).current;

  const handleBackPress = () => {
    router.back();
  };

  const handleConversationStatusChange = (status: string) => {
    setConversationStatus(status);
  };

  // Show humming animation when connected or connecting
  const showHummingAnimation =
    conversationStatus === "connected" || conversationStatus === "connecting";

  // Subtle mascot animation when connected
  useEffect(() => {
    if (conversationStatus === "connected") {
      const subtleHum = Animated.loop(
        Animated.sequence([
          Animated.timing(mascotScaleAnim, {
            toValue: 1.09, // Very subtle scale increase
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(mascotScaleAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );
      subtleHum.start();
      return () => subtleHum.stop();
    } else {
      Animated.timing(mascotScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [conversationStatus, mascotScaleAnim]);

  return (
    <ImageBackground
      source={require("@/assets/images/Group 8 (1).png")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header with back button */}
        <AuthHeader
          title="Talking"
          showBackButton={true}
          onClick={handleBackPress}
        />

        {/* Spacer to push content to bottom */}
        <View style={styles.spacer} />

        {/* Bottom content */}
        <View style={styles.bottomContent}>
          {/* Mascot image */}
          <View style={styles.mascotContainer}>
            <Animated.View style={{ transform: [{ scale: mascotScaleAnim }] }}>
              <Image
                source={require("@/assets/images/Group 8 (2).png")}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Title and subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>What happened?</Text>
            <Text style={styles.subtitle}>
              {conversationStatus === "connecting"
                ? "Connecting to AI agent..."
                : conversationStatus === "connected"
                ? "Connected! Start speaking..."
                : "Describe the situation as objectively as possible and how it made you feel, Tap the microphone to start"}
            </Text>
          </View>

          {/* Input box for reference */}
          <InputBoxWithMic
            placeholder="Voice conversation..."
            inputValue={inputText}
            onInputChange={setInputText}
            onMicPress={() => {}}
            showMic={false}
            marginTop={0}
            showPrivateText={false}
          />

          {/* ElevenLabs DOM Component */}
          <View style={styles.micContainer}>
            <ConvAiDOMComponent
              dom={{ style: styles.domComponent }}
              platform={Platform.OS}
              onStatusChange={handleConversationStatusChange}
            />
          </View>

          {/* Privacy text */}
          <View style={styles.privacyContainer}>
            <PrivacyText />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  bottomContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 40,
    position: "relative",
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "libre-bold",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "satoshi",
  },
  micContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    height: 120,
  },
  domComponent: {
    width: 132,
    height: 120,
  },
  privacyContainer: {
    marginTop: 0,
  },
  mascotContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  mascotImage: {
    width: 300,
    height: 300,
  },
  instructionText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "satoshi",
  },
});

export default SpeakWithMeio3;
