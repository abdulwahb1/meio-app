import { AuthHeader } from "@/components/AuthHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<"annual" | "monthly">(
    "annual"
  );

  const benefits = [
    "Unlimited conversations with Melo",
    "Access to all journey paths",
    "Personalized insights and recommendations",
    "Advanced progress tracking",
    "Priority customer support",
    "New features first",
    "Offline content access",
    "Community access and events",
  ];

  const handleStartTrial = () => {
    router.push("/onboarding/completion" as any);
  };

  const handleMaybeLater = () => {
    router.push("/onboarding/completion" as any);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader title="" showBackButton={true} onClick={handleBack} />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.headline}>Unlock your full potential</Text>

          <Text style={styles.subtitle}>
            Get the most out of your Melo experience with premium features
            designed to accelerate your growth journey.
          </Text>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>Premium includes:</Text>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.checkIcon}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.plansContainer}>
            <TouchableOpacity
              style={[
                styles.planOption,
                selectedPlan === "annual" && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan("annual")}
            >
              <View style={styles.planHeader}>
                <Text
                  style={[
                    styles.planTitle,
                    selectedPlan === "annual" && styles.selectedPlanText,
                  ]}
                >
                  Annual Plan
                </Text>
                <View style={styles.savingsTag}>
                  <Text style={styles.savingsText}>Save 40%</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.planPrice,
                  selectedPlan === "annual" && styles.selectedPlanText,
                ]}
              >
                $4.99/month
              </Text>
              <Text
                style={[
                  styles.planSubtext,
                  selectedPlan === "annual" && styles.selectedPlanSubtext,
                ]}
              >
                Billed annually at $59.99
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.planOption,
                selectedPlan === "monthly" && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan("monthly")}
            >
              <Text
                style={[
                  styles.planTitle,
                  selectedPlan === "monthly" && styles.selectedPlanText,
                ]}
              >
                Monthly Plan
              </Text>
              <Text
                style={[
                  styles.planPrice,
                  selectedPlan === "monthly" && styles.selectedPlanText,
                ]}
              >
                $8.99/month
              </Text>
              <Text
                style={[
                  styles.planSubtext,
                  selectedPlan === "monthly" && styles.selectedPlanSubtext,
                ]}
              >
                Billed monthly
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartTrial}
          >
            <Text style={styles.primaryButtonText}>Start 7-day free trial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleMaybeLater}
          >
            <Text style={styles.secondaryButtonText}>Maybe later</Text>
          </TouchableOpacity>

          <Text style={styles.trialText}>
            Try premium free for 7 days, then{" "}
            {selectedPlan === "annual" ? "$59.99/year" : "$8.99/month"}. Cancel
            anytime.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "libre-extrabold",
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "satoshi",
    marginBottom: 40,
  },
  benefitsContainer: {
    marginBottom: 40,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    fontFamily: "libre-bold",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DF97ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkmark: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  benefitText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    fontFamily: "satoshi",
  },
  plansContainer: {
    gap: 12,
    marginBottom: 30,
  },
  planOption: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 16,
    padding: 20,
  },
  selectedPlan: {
    borderColor: "#DF97ED",
    backgroundColor: "rgba(223, 151, 237, 0.05)",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "libre-bold",
  },
  selectedPlanText: {
    color: "#DF97ED",
  },
  savingsTag: {
    backgroundColor: "#DF97ED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "satoshi",
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-bold",
    marginBottom: 4,
  },
  planSubtext: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
  },
  selectedPlanSubtext: {
    color: "rgba(223, 151, 237, 0.8)",
  },
  primaryButton: {
    backgroundColor: "#000",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
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
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 18,
    borderRadius: 12,
    borderColor: "#E0E0E0",
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 20,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    fontFamily: "libre-extrabold",
  },
  trialText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "satoshi",
  },
});
