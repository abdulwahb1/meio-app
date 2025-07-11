import { AuthHeader } from "@/components/AuthHeader";
import { ConversationInterface } from "@/components/ConversationInterface";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JourneyScreen() {
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const handleMicPress = () => {
    console.log("Mic pressed in journey screen");
    router.push("/speak-with-meio-2");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/journey-bg-1.png")}
      style={styles.container}
      resizeMode="none"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <AuthHeader title="Talking" showBackButton={false} />

        {/* Spacer to push content to bottom */}
        <View style={styles.spacer} />

        {/* Bottom conversation interface */}
        <ConversationInterface
          title="What happened?"
          subtitle="Describe the situation as objectively as possible and how it made you feel"
          placeholder="Write here . . ."
          inputValue={inputText}
          onInputChange={setInputText}
          onMicPress={handleMicPress}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  spacer: {
    marginTop: 350,
  },
});
