import React from "react";

import { StyleSheet, TextInput, View } from "react-native";
import { GradientMicButtonNew } from "./GradientMicButtonForScreen";
import { PrivacyText } from "./PrivacyText";

interface InputBoxWithMicProps {
  placeholder: string;
  inputValue: string;
  onInputChange: (text: string) => void;
  onMicPress: () => void;
  style?: any;
}

const InputBoxWithMic = ({
  placeholder,
  inputValue,
  onInputChange,
  onMicPress,
}: InputBoxWithMicProps) => {
  return (
    <>
      {/* Input container */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.textInput, { outline: "none" }]}
            placeholder={placeholder}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={inputValue}
            onChangeText={onInputChange}
          />
        </View>
        <GradientMicButtonNew onPress={onMicPress} />
      </View>

      {/* Privacy text */}
      <PrivacyText />
    </>
  );
};

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

export default InputBoxWithMic;
