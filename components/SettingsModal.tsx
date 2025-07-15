import { useSignOut } from "@/hooks/useAuth";
import { Bell, CreditCard, LogOut, Shield, User, X } from "lucide-react-native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const signOutMutation = useSignOut();

  const handleLogout = async () => {
    try {
      await signOutMutation.mutateAsync();
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const settingsOptions = [
    {
      id: "profile",
      title: "Edit Profile",
      icon: User,
      onPress: () => {
        console.log("Edit Profile pressed");
        onClose();
      },
    },
    {
      id: "subscription",
      title: "Manage Subscription",
      icon: CreditCard,
      onPress: () => {
        console.log("Manage Subscription pressed");
        onClose();
      },
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      onPress: () => {
        console.log("Notifications pressed");
        onClose();
      },
    },
    {
      id: "privacy",
      title: "Privacy",
      icon: Shield,
      onPress: () => {
        console.log("Privacy pressed");
        onClose();
      },
    },
    {
      id: "logout",
      title: signOutMutation.isPending ? "Logging out..." : "Logout",
      icon: LogOut,
      onPress: handleLogout,
      isDestructive: true,
      disabled: signOutMutation.isPending,
    },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color="rgba(0, 0, 0, 0.6)" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsList}>
            {settingsOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionItem,
                  option.disabled && styles.optionItemDisabled,
                ]}
                onPress={option.onPress}
                disabled={option.disabled}
              >
                <View style={styles.optionContent}>
                  <option.icon
                    size={20}
                    color={
                      option.disabled
                        ? "#999"
                        : option.isDestructive
                        ? "#FF4B4B"
                        : "#333"
                    }
                  />
                  <Text
                    style={[
                      styles.optionText,
                      option.isDestructive && styles.destructiveText,
                      option.disabled && styles.disabledText,
                    ]}
                  >
                    {option.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "libre-bold",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsList: {
    gap: 4,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  optionItemDisabled: {
    opacity: 0.6,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "satoshi",
    fontWeight: "500",
  },
  destructiveText: {
    color: "#FF4B4B",
  },
  disabledText: {
    color: "#999",
  },
});
