import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface GradientMicButtonProps {
  onPress?: () => void;
  size: number;
}

export function GradientMicButton({ onPress, size }: GradientMicButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { width: size, height: size }]}
      >
        <Image
          source={require("@/assets/icons/mic-with-gradient.png")}
          style={{ width: size, height: size }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
