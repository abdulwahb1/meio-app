import { samplePosts } from "@/lib/const";
import {
  Check,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Reusable Post Component
export function PostCard({ post }: { post: (typeof samplePosts)[0] }) {
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

const styles = StyleSheet.create({
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
});
