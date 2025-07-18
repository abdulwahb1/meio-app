import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface GradientMicButtonNewProps {
  onPressIn: () => void;
  size?: number;
  image?: ImageSourcePropType;
  onPressOut: () => void;
  disabled: boolean;
}

// NEW Gradient Mic Button component from scratch
export function GradientMicButtonNew({
  onPressIn,
  onPressOut,
  size = 55,
  disabled,
  image = require("@/assets/icons/Frame 3.png"),
}: GradientMicButtonNewProps) {
  return (
    <TouchableOpacity
      onPress={onPressIn}
      onPressOut={onPressOut}
      style={[micButtonStyles.button, { width: size, height: size }]}
      disabled={disabled}
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
