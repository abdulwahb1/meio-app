import { AuthHeader } from "@/components/AuthHeader";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const journey = () => {
  // Sample weekly data - this will come from API later
  const weeklyData = [
    { day: "Mo", date: "", icon: "completed", isActive: false },
    { day: "Tu", date: "", icon: "completed", isActive: false },
    { day: "We", date: "", icon: "pending", isActive: true },
    { day: "Th", date: "", icon: "completed", isActive: false },
    { day: "Fr", date: "", icon: "empty", isActive: false },
    { day: "Sa", date: "", icon: "empty", isActive: false },
    { day: "Su", date: "", icon: "empty", isActive: false },
  ];

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
        <Image
          source={iconSource}
          style={styles.dayIcon}
          resizeMode="contain"
        />
      </View>
    );
  };

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

      {/* Journey Image Section */}
      <View style={styles.imageSection}>
        <Image
          source={require("@/assets/images/journey.png")}
          style={styles.journeyImage}
          resizeMode="cover"
        />
      </View>
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
    paddingVertical: 20,
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
  imageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 100, // Account for curved bottom bar
  },
  journeyImage: {
    width: "100%",
    height: "100%",
  },
});

export default journey;
