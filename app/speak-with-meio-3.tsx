import { AuthHeader } from "@/components/AuthHeader";
import { GradientMicButtonNew } from "@/components/GradientMicButtonForScreen";
import InputBoxWithMic from "@/components/InputBoxWithMic";
import { PrivacyText } from "@/components/PrivacyText";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SpeakWithMeio3 = () => {
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const handleMicPress = () => {
    console.log("Mic pressed in speak-with-meio-3 screen");
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require("@/assets/images/journey-bg.png")}
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
          {/* Title and subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>What happened?</Text>
            <Text style={styles.subtitle}>
              Describe the situation as objectively as possible and how it made
              you feel
            </Text>
          </View>

          {/* Input box without mic */}
          <InputBoxWithMic
            placeholder="Write here . . ."
            inputValue={inputText}
            onInputChange={setInputText}
            onMicPress={handleMicPress}
            showMic={false}
            marginTop={0}
            showPrivateText={false}
          />

          {/* Mic button container - comes after input */}
          <View style={styles.micContainer}>
            <GradientMicButtonNew
              onPress={handleMicPress}
              size={120}
              image={require("@/assets/icons/diff-mic.png")}
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
  },
  privacyContainer: {
    marginTop: 0,
  },
});

export default SpeakWithMeio3;
