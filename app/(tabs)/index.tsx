import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Welcome to Home!</ThemedText>
      <ThemedText style={styles.subtitle}>You&apos;re logged in!</ThemedText>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
