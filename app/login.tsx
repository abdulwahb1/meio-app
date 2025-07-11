import { AuthHeader } from "@/components/AuthHeader";
import { PrivacyText } from "@/components/PrivacyText";
import { useAuth } from "@/contexts/AuthContext";
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
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require("@/assets/images/login screen.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <AuthHeader title="login" />

        <View style={styles.content}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={handleLogin}
            >
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <PrivacyText />
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
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  buttonsContainer: {
    gap: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
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
    fontFamily: "libre-extrabold",
  },
  loginButtonText: {
    color: "#fff",
  },
});
