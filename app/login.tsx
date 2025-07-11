import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require("@/assets/images/login screen.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.heading}>login</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.loginButton]}>
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacyContainer}>
            <Text style={styles.privacyText}>
              🔒 Your data stays 100% private
            </Text>
          </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 24,
    color: "#333",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "AbhayaLibre-Bold",
    flex: 1,
    textAlign: "center",
    marginRight: 50, // Balance the back button
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  buttonsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: "#000",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "AbhayaLibre-Medium",
  },
  loginButtonText: {
    color: "#fff",
  },
  privacyContainer: {
    alignItems: "center",
  },
  privacyText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "AbhayaLibre-Regular",
  },
});

