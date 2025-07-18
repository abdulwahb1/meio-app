import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

function RootLayoutNav() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="onboarding/welcome"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/personalization-1"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/personalization-2"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/personalization-3"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/analysis"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/paywall"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="onboarding/completion"
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="speak-with-meio-2" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "libre-regular": require("../assets/fonts/AbhayaLibre-Regular.ttf"),
    "libre-medium": require("../assets/fonts/AbhayaLibre-Medium.ttf"),
    "libre-bold": require("../assets/fonts/AbhayaLibre-Bold.ttf"),
    "libre-extrabold": require("../assets/fonts/AbhayaLibre-ExtraBold.ttf"),
    satoshi: require("../assets/fonts/Satoshi-Variable.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
