import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AnalysisScreen() {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    // Start fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Show confirmation after 3 seconds
    const timer = setTimeout(() => {
      setShowConfirmation(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  const handleViewPlan = () => {
    router.push("/onboarding/paywall" as any);
  };

  if (!showConfirmation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.loadingContent,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.spinner}>
              <View style={styles.spinnerDot} />
              <View style={[styles.spinnerDot, styles.spinnerDot2]} />
              <View style={[styles.spinnerDot, styles.spinnerDot3]} />
            </View>
            <Text style={styles.loadingTitle}>
              We are creating your personal plan...
            </Text>
            <Text style={styles.loadingSubtitle}>
              Analyzing your responses and crafting a journey tailored just for
              you.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.confirmationContainer}>
        <Animated.View
          style={[
            styles.confirmationContent,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.checkIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          <Text style={styles.confirmationTitle}>
            Okay, we have a plan for you!
          </Text>

          <Text style={styles.confirmationSubtitle}>
            Your personalized journey is ready. We&apos;ve created a unique path
            based on your goals and preferences to help you achieve meaningful
            growth.
          </Text>

          <TouchableOpacity
            style={styles.viewPlanButton}
            onPress={handleViewPlan}
          >
            <Text style={styles.viewPlanButtonText}>View my plan</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingContent: {
    alignItems: "center",
  },
  spinner: {
    flexDirection: "row",
    marginBottom: 40,
  },
  spinnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#DF97ED",
    marginHorizontal: 4,
    opacity: 0.3,
  },
  spinnerDot2: {
    opacity: 0.6,
  },
  spinnerDot3: {
    opacity: 1,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "libre-bold",
    lineHeight: 30,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "satoshi",
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  confirmationContent: {
    alignItems: "center",
  },
  checkIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DF97ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  checkmark: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  confirmationTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "libre-bold",
    lineHeight: 34,
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "satoshi",
    marginBottom: 50,
  },
  viewPlanButton: {
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
  viewPlanButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "libre-extrabold",
  },
});
