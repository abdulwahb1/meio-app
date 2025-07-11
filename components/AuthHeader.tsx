import { useRouter } from "expo-router";
import { MoveLeft } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function AuthHeader({
  title,
  onBack,
  showBackButton = true,
}: AuthHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MoveLeft size={25} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContent: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "libre-bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    right: 10,
    top: 0,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});
