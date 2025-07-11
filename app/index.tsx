import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
