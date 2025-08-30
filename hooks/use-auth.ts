import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useAuthContext } from "@/components/auth-provider";

export function useAuth() {
  const { user, loading, error } = useAuthContext();
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const signupWithEmail = async (email: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    loading: loading || authLoading,
    error: error || authError,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
  };
}
