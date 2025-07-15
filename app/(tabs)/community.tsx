import { AuthHeader } from "@/components/AuthHeader";
import { PostCard } from "@/components/PostCard";
import { communityStats, samplePosts } from "@/lib/const";
import { Plus } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Reusable Stats Component
function StatsCard({ stats }: { stats: typeof communityStats }) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.members}</Text>
        <Text style={styles.statLabel}>Members</Text>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.online}</Text>
        <Text style={styles.statLabel}>Online</Text>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{stats.postsToday}</Text>
        <Text style={styles.statLabel}>Posts Today</Text>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  const handleCreatePost = () => {
    console.log("Create new post pressed");
    // TODO: Navigate to create post screen or show modal
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AuthHeader title="Community" showBackButton={false} />

      {/* Stats Section */}
      <StatsCard stats={communityStats} />

      {/* Posts Feed */}
      <ScrollView
        style={styles.feedContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
      >
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>

      {/* Floating Action Button for Creating Posts */}
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={handleCreatePost}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#DF97ED",
    marginTop: 4,
    fontFamily: "satoshi",
  },
  feedContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  feedContent: {
    paddingBottom: 80, // Add padding to the last post
  },

  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.13)", // Changed to black with 13% opacity
    marginHorizontal: 10,
  },
  createPostButton: {
    position: "absolute",
    bottom: 100, // Position above the tab bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DF97ED",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
