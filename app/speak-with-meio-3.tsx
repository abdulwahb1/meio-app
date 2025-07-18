import { AuthHeader } from "@/components/AuthHeader";
import ConvAiDOMComponent from "@/components/ConvAI";
import { HummingAnimation } from "@/components/HummingAnimation";
import InputBoxWithMic from "@/components/InputBoxWithMic";
import { PrivacyText } from "@/components/PrivacyText";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

  const handleBackPress = () => {
    router.back();
  };

  const handleConversationStatusChange = (status: string) => {
    setConversationStatus(status);
  };

  // Show humming animation when connected or connecting
  const showHummingAnimation =
    conversationStatus === "connected" || conversationStatus === "connecting";
  // Determine background image - you can add state for this if needed
  const backgroundSource = showHummingAnimation
    ? require("@/assets/images/speak-with-melo-no-mascot.png")
    : require("@/assets/images/journey-bg.png");
  return (
    <ImageBackground
      source={backgroundSource}
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

        {/* Humming animation - controlled by conversation state */}
        <HummingAnimation isVisible={showHummingAnimation} />

        {/* Spacer to push content to bottom */}
        <View style={styles.spacer} />

        {/* Bottom content */}
        <View style={styles.bottomContent}>
          {/* Title and subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>What happened?</Text>
            <Text style={styles.subtitle}>
              {conversationStatus === "connecting"
                ? "Connecting to AI agent..."
                : conversationStatus === "connected"
                ? "Connected! Start speaking..."
                : "Tap the microphone to start a voice conversation with our AI agent"}
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
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
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
    marginVertical: 10,
    height: 120,
  },
  domComponent: {
    width: 132,
    height: 120,
  },
  privacyContainer: {
    marginTop: 0,
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
