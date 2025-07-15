import { AuthHeader } from "@/components/AuthHeader";
import InputBoxWithMic from "@/components/InputBoxWithMic";
import { useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SpeakWithMeio2 = () => {
  const [inputText, setInputText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Dropdown options array
  const dropdownOptions = [
    "I'm feeling overwhelmed",
    "Something happened at work",
    "Relationship issues",
    "Family problems",
  ];

  const handleMicPress = () => {
    console.log("Mic pressed in speak-with-meio-2 screen");
    router.push("/speak-with-meio-3");
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleOptionSelect = (option: string) => {
    setInputText(option);
    setIsDropdownOpen(false);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/speak-with-meo2-bg.png")}
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

        {/* Conversation interface with dropdown */}
        <View style={styles.conversationContainer}>
          {/* Title and subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>What happened?</Text>
            <Text style={styles.subtitle}>
              Describe the situation as objectively as possible and how it made
              you feel
            </Text>
          </View>

          {/* Dropdown trigger only */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            activeOpacity={1}
          >
            <Text style={styles.dropdownText}>Need help to get started?</Text>
            <ChevronDown size={20} color="rgba(0, 0, 0, 0.6)" />
          </TouchableOpacity>

          {/* Input container */}
          <InputBoxWithMic
            placeholder="Write here . . ."
            inputValue={inputText}
            onInputChange={setInputText}
            onMicPress={handleMicPress}
            marginTop={0}
          />
        </View>

        {/* Dropdown content positioned absolutely on the screen */}
        {isDropdownOpen && (
          <View style={styles.dropdownOverlay}>
            {dropdownOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownOption}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    justifyContent: "flex-end",
  },
  conversationContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "libre-bold",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "satoshi",
  },
  dropdownContainer: {
    position: "relative",
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 10,
    zIndex: 1000,
    elevation: 10,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.8)",
    fontFamily: "satoshi",
  },
  inputOnly: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  dropdownOverlay: {
    position: "absolute",
    bottom: 170,
    left: 15,
    right: 15,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 10,
    zIndex: 999,
    elevation: 10,
  },
});
