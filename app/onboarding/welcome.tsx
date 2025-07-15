import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding/personalization-1" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/login screen.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.headline}>
              Hello! Ready to start your journey?
            </Text>
            <Text style={styles.description}>
              Welcome to Melo, your personal companion for growth and
              self-discovery. Let&apos;s create a journey that&apos;s uniquely
              yours, filled with meaningful conversations and insights that help
              you become the best version of yourself.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryButtonText}>Let&apos;s go</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  textContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "libre-extrabold",
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "satoshi",
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: "#000",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "libre-extrabold",
  },
});
