import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LockIcon } from "./LockIcon";

interface PrivacyTextProps {
  text?: string;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  gap?: number;
}

export function PrivacyText({
  text = "Your data stays 100% private",
  iconSize = 18,
  iconColor = "rgba(0, 0, 0, 0.58)",
  textColor = "rgba(0, 0, 0, 0.58)",
  fontSize = 14,
  fontFamily = "satoshi",
  gap = 8,
}: PrivacyTextProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.textContainer, { gap }]}>
        <LockIcon width={iconSize} height={iconSize + 1} color={iconColor} />
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontSize,
              fontFamily,
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    // Base text styles - will be overridden by props
  },
});
