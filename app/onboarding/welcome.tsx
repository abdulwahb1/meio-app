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
        {/* Top: Welcome to Melo */}
        <View style={styles.topSection}>
          <Text style={styles.welcomeTitle}>Welcome to Melo</Text>
        </View>

        {/* Center: Your journey begins */}
        <View style={styles.centerSection}>
          <Text style={styles.headline}>Your journey begins</Text>
          <Text style={styles.description}>
            Your personal companion for growth and self-discovery. Let&apos;s
            create a journey that&apos;s uniquely yours, filled with meaningful
            conversations and insights that help you become the best version of
            yourself.
          </Text>
        </View>

        {/* Bottom: Enter App Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryButtonText}>Enter App</Text>
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
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
    marginTop: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-extrabold",
    letterSpacing: 0.5,
  },
  centerSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  headline: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 18,
    fontFamily: "libre-extrabold",
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "satoshi",
    paddingHorizontal: 10,
  },
  bottomSection: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 0,
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
