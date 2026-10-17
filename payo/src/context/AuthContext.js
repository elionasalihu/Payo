
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const [sessionLoading, setSessionLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // Load the initial session and subscribe to authentication changes.
  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        if (!mounted) return;

        const currentSession = data?.session ?? null;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      } catch (error) {
        console.error("Unable to load session:", error.message);

        if (mounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setSessionLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return;

      const newUser = newSession?.user ?? null;

      setSession(newSession);
      setUser(newUser);

      // Only clear the role when the authenticated identity changes
      // or the user signs out. Token refreshes shouldn't clear it.
      if (
        event === "SIGNED_OUT" ||
        event === "USER_DELETED" ||
        !newUser
      ) {
        setRole(null);
        setRoleLoading(false);
      }

      setSessionLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the role when the authenticated user changes.
  useEffect(() => {
    let cancelled = false;

    async function fetchRole() {
      if (!user?.id) {
        setRole(null);
        setRoleLoading(false);
        return;
      }

      setRoleLoading(true);

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!cancelled) {
          setRole(data?.role ?? null);
        }
      } catch (error) {
        console.error("Unable to fetch user role:", error.message);

        if (!cancelled) {
          setRole(null);
        }
      } finally {
        if (!cancelled) {
          setRoleLoading(false);
        }
      }
    }

    if (!sessionLoading) {
      fetchRole();
    }

    return () => {
      cancelled = true;
    };
  }, [user?.id, sessionLoading]);

  // Register a new user.
  async function signUp({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    if (error) throw error;

    return data;
  }

  // Sign in an existing user.
  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw error;

    return data;
  }

  // Sign out the current user.
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    setSession(null);
    setUser(null);
    setRole(null);
    setRoleLoading(false);
  }

  // Keep this for protected routes that need the role.
  const loading = sessionLoading || roleLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        loading,
        sessionLoading,
        roleLoading,
        signUp,
        signIn,
        signOut,
        isAuthenticated: Boolean(session && user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
