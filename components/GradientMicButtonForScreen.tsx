import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface GradientMicButtonNewProps {
  onPress: () => void;
  size?: number;
  image?: ImageSourcePropType;
}

// NEW Gradient Mic Button component from scratch
export function GradientMicButtonNew({
  onPress,
  size = 55,
  image = require("@/assets/icons/Frame 3.png"),
}: GradientMicButtonNewProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[micButtonStyles.button, { width: size, height: size }]}
    >
      <Image
        source={image}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const micButtonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
