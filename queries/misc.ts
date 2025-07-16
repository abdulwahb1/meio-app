import { supabase } from "@/lib/supabase";
import { SignInCredentials, SignUpCredentials } from "@/lib/types";
import {
  PostgrestError,
  Session,
  User,
  WeakPassword,
} from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const useSignIn = () => {
  const router = useRouter();

  const signIn = async (data: SignInCredentials) => {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw error;
    }

    return authData;
  };

  return useMutation<
    { user: User; session: Session; weakPassword?: WeakPassword },
    PostgrestError,
    SignInCredentials
  >({
    mutationKey: ["sign-in"],
    mutationFn: signIn,
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error) => {
      console.error(error?.message || "An error occurred while signing in");
    },
  });
};

const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: SignUpCredentials) => {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Signup error details:", error);
        throw error;
      }

      return authData;
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      router.push("/auth-login");
    },
    onError: (error: any) => {
      console.error("Signup error:", error);
      console.error(error.message || "Failed to sign up. Please try again.");
    },
  });
};

const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  };

  return useMutation<void, PostgrestError>({
    mutationKey: ["sign-out"],
    mutationFn: signOut,
    onSuccess: () => {
      router.push("/auth-login");

      queryClient.clear();
    },
    onError: (error) => {
      console.error(error?.message || "An error occurred while signing out");
    },
  });
};

// const useForgotPassword = () => {
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (email: string) => {
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/reset-password`,
//       });

//       if (error) throw error;
//     },
//     onSuccess: () => {
//       toast.success("Password reset link sent to your email!");
//       router.push("/sign-in");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.message || "Failed to send reset link. Please try again."
//       );
//     },
//   });
// };

// const useResetPassword = () => {
//   const supabase = createClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: async (newPassword: string) => {
//       const { error } = await supabase.auth.updateUser({
//         password: newPassword,
//       });

//       if (error) throw error;
//     },
//     onSuccess: () => {
//       toast.success("Password updated successfully!");
//       router.push("/sign-in");
//     },
//     onError: (error: any) => {
//       toast.error(
//         error.message || "Failed to update password. Please try again."
//       );
//     },
//   });
// };

export { useSignIn, useSignOut, useSignUp };
