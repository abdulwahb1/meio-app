import { AuthHeader } from "@/components/AuthHeader";
import { useResetPassword } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AuthResetScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const resetPasswordMutation = useResetPassword();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    // Reset errors
    setEmailError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    // Send reset email
    try {
      await resetPasswordMutation.mutateAsync(email.trim());
      setEmailSent(true);
      Alert.alert(
        "Reset Email Sent",
        "Please check your email for password reset instructions.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Reset Failed",
        error?.message || "Failed to send reset email. Please try again."
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isLoading = resetPasswordMutation.isPending;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <AuthHeader
        title="Reset Password"
        showBackButton={true}
        onClick={handleBack}
      />

      <View style={styles.content}>
        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Forgot your password?</Text>
          <Text style={styles.welcomeSubtitle}>
            No worries! Enter your email address and we&apos;ll send you a reset
            link.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="Enter your email"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!isLoading && !emailSent}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            style={[
              styles.resetButton,
              (isLoading || emailSent) && styles.resetButtonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={isLoading || emailSent}
          >
            <Text style={styles.resetButtonText}>
              {isLoading
                ? "Sending..."
                : emailSent
                ? "Email Sent"
                : "Send Reset Link"}
            </Text>
          </TouchableOpacity>

          {/* Success Message */}
          {emailSent && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                ✓ Reset email sent successfully!
              </Text>
              <Text style={styles.successSubtext}>
                Please check your inbox and follow the instructions to reset
                your password.
              </Text>
            </View>
          )}
        </View>

        {/* Back to Login Section */}
        <View style={styles.backToLoginSection}>
          <Text style={styles.backToLoginText}>Remember your password? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth-login" as any)}
            disabled={isLoading}
          >
            <Text style={styles.backToLoginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
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
  welcomeSection: {
    marginBottom: 40,
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-extrabold",
    marginBottom: 12,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  formSection: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: "libre-bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderColor: "#E0E0E0",
    borderWidth: 2,
    fontSize: 16,
    fontFamily: "satoshi",
    color: "#333",
  },
  inputError: {
    borderColor: "#FF4B4B",
  },
  errorText: {
    color: "#FF4B4B",
    fontSize: 14,
    marginTop: 6,
    fontFamily: "satoshi",
  },
  resetButton: {
    backgroundColor: "#000",
    paddingVertical: 18,
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
  resetButtonDisabled: {
    opacity: 0.7,
    backgroundColor: "#DF97ED",
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "libre-extrabold",
  },
  successContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "rgba(223, 151, 237, 0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DF97ED",
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DF97ED",
    fontFamily: "libre-bold",
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtext: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "satoshi",
    textAlign: "center",
    lineHeight: 20,
  },
  backToLoginSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  backToLoginText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
  },
  backToLoginLink: {
    fontSize: 16,
    color: "#DF97ED",
    fontFamily: "satoshi",
    fontWeight: "600",
  },
});
