import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputBoxWithMic from "./InputBoxWithMic";

interface ConversationInterfaceProps {
  title: string;
  subtitle: string;
  placeholder: string;
  inputValue: string;
  onInputChange: (text: string) => void;
  onMicPress: () => void;
  style?: any;
}

export function ConversationInterface({
  title,
  subtitle,
  placeholder,
  inputValue,
  onInputChange,
  onMicPress,
  style,
}: ConversationInterfaceProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Title and subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <InputBoxWithMic
        placeholder={placeholder}
        inputValue={inputValue}
        onInputChange={onInputChange}
        onMicPress={onMicPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  textContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "libre-bold",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "satoshi",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
    marginTop: 60,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 50,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    fontFamily: "satoshi",
    minHeight: 20,
    textAlignVertical: "center",
  },
});
