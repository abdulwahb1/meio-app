import {
  authService,
  SignInCredentials,
  SignUpCredentials,
} from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const AUTH_KEYS = {
  session: ["auth", "session"] as const,
  user: ["auth", "user"] as const,
};

// Get current session
export const useSession = () => {
  return useQuery({
    queryKey: AUTH_KEYS.session,
    queryFn: authService.getSession,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get current user
export const useUser = () => {
  return useQuery({
    queryKey: AUTH_KEYS.user,
    queryFn: authService.getUser,
    enabled: false, // Only fetch when explicitly called
  });
};

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: SignInCredentials) =>
      authService.signIn(credentials),
    onSuccess: (data) => {
      // Update the session cache
      queryClient.setQueryData(AUTH_KEYS.session, data.session);
      queryClient.setQueryData(AUTH_KEYS.user, data.user);

      // Navigate to main app
      router.replace("/(tabs)/journey");
    },
    onError: (error) => {
      console.error("Sign in error:", error);
    },
  });
};

// Sign up mutation
export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: SignUpCredentials) =>
      authService.signUp(credentials),
    onSuccess: (data) => {
      if (data.session) {
        // User is automatically signed in
        queryClient.setQueryData(AUTH_KEYS.session, data.session);
        queryClient.setQueryData(AUTH_KEYS.user, data.user);
        router.replace("/(tabs)/journey");
      } else {
        // User needs to verify email
        console.log("Please check your email for verification");
      }
    },
    onError: (error) => {
      console.error("Sign up error:", error);
    },
  });
};

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      // Clear all auth-related cache
      queryClient.removeQueries({ queryKey: AUTH_KEYS.session });
      queryClient.removeQueries({ queryKey: AUTH_KEYS.user });
      queryClient.clear(); // Clear all cache

      // Navigate to login
      router.replace("/login");
    },
    onError: (error) => {
      console.error("Sign out error:", error);
    },
  });
};

// Password reset mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.resetPassword(email),
    onSuccess: () => {
      console.log("Password reset email sent");
    },
    onError: (error) => {
      console.error("Password reset error:", error);
    },
  });
};

// Update password mutation
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (password: string) => authService.updatePassword(password),
    onSuccess: () => {
      console.log("Password updated successfully");
    },
    onError: (error) => {
      console.error("Password update error:", error);
    },
  });
};
