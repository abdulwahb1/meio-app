import { AuthHeader } from "@/components/AuthHeader";
import { LearningPathCard } from "@/components/LearningPathCard";
import { learningPaths, weeklyData } from "@/lib/const";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const renderDayIcon = (iconType: string, isActive: boolean) => {
  let iconSource;

  switch (iconType) {
    case "completed":
      iconSource = require("@/assets/icons/Check circle.png");
      break;
    case "pending":
      iconSource = require("@/assets/icons/Alert circle.png");
      break;
    case "empty":
    default:
      iconSource = require("@/assets/icons/Circle.png");
      break;
  }

  return (
    <View style={styles.iconContainer}>
      <Image source={iconSource} style={styles.dayIcon} resizeMode="contain" />
    </View>
  );
};

const Journey = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with user icon */}
      <AuthHeader title="Journey" showBackButton={false} />

      {/* Weekly Calendar Section */}
      <View style={styles.weeklySection}>
        <View style={styles.weeklyContainer}>
          {weeklyData.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              {renderDayIcon(day.icon, day.isActive)}
              <Text
                style={[
                  styles.dayLabel,
                  { color: day.isActive ? "#DF97ED" : "#333" },
                ]}
              >
                {day.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Learning Paths Section */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.pathsContainer}>
          <Text style={styles.sectionTitle}>Your Learning Paths</Text>
          <Text style={styles.sectionSubtitle}>
            Continue your journey of personal growth
          </Text>

          <View style={styles.pathsList}>
            {learningPaths.map((path) => (
              <LearningPathCard key={path.id} path={path} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Journey Image Section - COMMENTED OUT FOR NOW */}
      {/* 
      <View style={styles.imageSection}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          <Image
            source={require("@/assets/images/journey.png")}
            style={styles.journeyImage}
            resizeMode="cover"
          />
        </ScrollView>
      </View>
      */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  weeklySection: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  weeklyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayIcon: {
    width: 24,
    height: 24,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "satoshi",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pathsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-bold",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
    marginBottom: 30,
  },
  pathsList: {
    gap: 16,
  },
  // Commented out image section styles - keeping for potential future use
  /*
  imageSection: {
    flex: 1,
    paddingLeft: 20,
  },
  journeyImage: {
    width: "100%",
    height: 800,
  },
  scrollView: {
    flex: 1,
  },
  */
});

export default Journey;
