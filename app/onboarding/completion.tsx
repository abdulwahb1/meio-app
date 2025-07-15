import { useAuth } from "@/contexts/AuthContext";
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

export default function CompletionScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const handleGetStarted = () => {
    login(); // This will trigger navigation to the main app
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/login screen.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.successEmoji}>🎉</Text>
            </View>

            <Text style={styles.headline}>Welcome to Melo!</Text>

            <Text style={styles.subtitle}>
              Your journey begins now. We&apos;re excited to be part of your
              growth story. Let&apos;s start with your first conversation.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.getStartedButtonText}>Enter the app</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Remember, every great journey starts with a single step. You&apos;ve
            just taken yours.
          </Text>
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
  successContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(223, 151, 237, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  successEmoji: {
    fontSize: 48,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "libre-extrabold",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "satoshi",
    paddingHorizontal: 10,
  },
  getStartedButton: {
    backgroundColor: "#000",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "libre-extrabold",
  },
  footerText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "satoshi",
    fontStyle: "italic",
  },
});
