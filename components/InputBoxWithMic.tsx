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
  marginTop?: number;
  showMic?: boolean;
  showPrivateText?: boolean;
}

const InputBoxWithMic = ({
  placeholder,
  inputValue,
  onInputChange,
  onMicPress,
  style,
  marginTop = 60,
  showMic = true,
  showPrivateText = true,
}: InputBoxWithMicProps) => {
  return (
    <>
      {/* Input container */}
      <View style={[styles.inputContainer, style, { marginTop }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.textInput, { outline: "none" }]}
            placeholder={placeholder}
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={inputValue}
            onChangeText={onInputChange}
          />
        </View>
        {showMic && <GradientMicButtonNew onPress={onMicPress} />}
      </View>

      {/* Privacy text */}
      {showPrivateText && <PrivacyText />}
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
    gap: 6,
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 6,
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
