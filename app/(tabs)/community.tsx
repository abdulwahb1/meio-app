import { AuthHeader } from "@/components/AuthHeader";
import {
  Check,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample data that will later come from API
const communityStats = {
  members: "2.4k",
  online: "156",
  postsToday: "89",
};

const samplePosts = [
  {
    id: 1,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
  {
    id: 2,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
  {
    id: 3,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
  {
    id: 4,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
];

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

// Reusable Post Component
function PostCard({ post }: { post: (typeof samplePosts)[0] }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.username}>{post.user}</Text>
            <Text style={styles.timeAgo}>{post.timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="rgba(0, 0, 0, 0.5)" />
        </TouchableOpacity>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <View style={styles.postActions}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsLiked(!isLiked)}
          >
            <Heart
              size={16}
              color="#FF4B8C"
              fill={isLiked ? "#FF4B8C" : "transparent"}
            />
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsCommented(!isCommented)}
          >
            <MessageCircle
              size={16}
              color="#9B59B6"
              fill={isCommented ? "#9B59B6" : "transparent"}
            />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
        </View>
        {post.hasSuccessTag && (
          <View style={styles.successBadge}>
            <Check size={12} color="#FFFFFF" />
            <Text style={styles.successText}>Success</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default function CommunityScreen() {
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
    paddingVertical: 20,
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
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: "satoshi",
  },
  timeAgo: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.5)",
    marginTop: 2,
    fontFamily: "satoshi",
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 16,
    fontFamily: "satoshi",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "satoshi",
  },
  successBadge: {
    backgroundColor: "#DF97ED",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: -16, // Extend to touch the post border
  },
  successText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
    fontFamily: "satoshi",
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.13)", // Changed to black with 13% opacity
    marginHorizontal: 10,
  },
});
