import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

// NEW Gradient Mic Button component from scratch
export function GradientMicButtonNew({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={micButtonStyles.button}>
      <Image
        source={require("@/assets/icons/Frame 3.png")}
        style={{ width: 55, height: 55 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const micButtonStyles = StyleSheet.create({
  button: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
