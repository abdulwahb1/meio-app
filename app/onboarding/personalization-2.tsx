import { AuthHeader } from "@/components/AuthHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Personalization2Screen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    "Reduce stress and anxiety",
    "Build confidence",
    "Improve relationships",
    "Develop emotional intelligence",
    "Create healthy routines",
    "Find life balance",
  ];

  const handleContinue = () => {
    if (selectedOption) {
      router.push("/onboarding/personalization-3" as any);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader title="" showBackButton={true} onClick={handleBack} />

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "66%" }]} />
          </View>
          <Text style={styles.progressText}>2 of 3</Text>
        </View>

        <Text style={styles.question}>What is your goal?</Text>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedOption && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text
            style={[
              styles.continueButtonText,
              !selectedOption && styles.disabledButtonText,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#DF97ED",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    fontFamily: "satoshi",
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "libre-bold",
    lineHeight: 34,
  },
  optionsContainer: {
    flex: 1,
    gap: 12,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  selectedOption: {
    borderColor: "#DF97ED",
    backgroundColor: "rgba(223, 151, 237, 0.05)",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontFamily: "satoshi",
  },
  selectedOptionText: {
    color: "#DF97ED",
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "libre-extrabold",
  },
  disabledButtonText: {
    color: "rgba(0, 0, 0, 0.4)",
  },
});
