import { learningPaths } from "@/lib/const";
import { Lock, Play } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Learning Path Card Component
export function LearningPathCard({
  path,
}: {
  path: (typeof learningPaths)[0];
}) {
  const handlePress = () => {
    if (path.isLocked) {
      console.log("Premium content - show upgrade prompt");
      // TODO: Show premium upgrade modal
    } else {
      console.log(`Navigate to ${path.title} lessons`);
      // TODO: Navigate to lessons screen
    }
  };

  return (
    <TouchableOpacity
      style={[styles.pathCard, path.isLocked && styles.lockedCard]}
      onPress={handlePress}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.pathIcon, { backgroundColor: path.color }]}>
          {path.isLocked ? (
            <Lock size={20} color="#FFFFFF" />
          ) : (
            <Play size={20} color="#FFFFFF" />
          )}
        </View>
        <View style={styles.pathInfo}>
          <Text style={[styles.pathTitle, path.isLocked && styles.lockedText]}>
            {path.title}
          </Text>
          <Text
            style={[
              styles.pathDescription,
              path.isLocked && styles.lockedDescription,
            ]}
          >
            {path.description}
          </Text>
        </View>
      </View>

      <View style={styles.pathProgress}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {path.completedLessons}/{path.lessons} lessons
          </Text>
          <Text style={styles.progressPercentage}>{path.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${path.progress}%`,
                backgroundColor: path.isLocked ? "#E0E0E0" : path.color,
              },
            ]}
          />
        </View>
      </View>

      {path.isLocked && (
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>Premium</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pathsList: {
    gap: 16,
  },
  pathCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  lockedCard: {
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  pathIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  pathInfo: {
    flex: 1,
  },
  pathTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-bold",
    marginBottom: 4,
  },
  lockedText: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  pathDescription: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
  },
  lockedDescription: {
    color: "rgba(0, 0, 0, 0.4)",
  },
  pathProgress: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "satoshi",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily: "satoshi",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  premiumBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#DF97ED",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  premiumText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "satoshi",
  },
});
