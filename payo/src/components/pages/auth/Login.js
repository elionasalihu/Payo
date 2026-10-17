
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../lib/supabaseClient";
import "../../styles/auth/Login.css";

function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // Authenticate the user through Supabase.
      const result = await signIn({
        email: email.trim(),
        password,
      });

      // Support either a raw Supabase response or a user object.
      const user =
        result?.user ??
        result?.data?.user ??
        result?.session?.user ??
        result?.data?.session?.user;

      if (!user?.id) {
        throw new Error(
          "Login succeeded, but the authenticated user could not be retrieved. Please try again."
        );
      }

      // Read the role assigned to this account.
      const { data: roleRecord, error: roleError } =
        await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .maybeSingle();

      if (roleError) {
        throw new Error(
          "We couldn't verify your account permissions. Please try again."
        );
      }

      // Default accounts without an admin role are regular users.
      if (roleRecord?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);

      setError(
        err?.message === "Invalid login credentials"
          ? "Incorrect email or password."
          : err?.message ||
              "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        {/* Brand */}
        <Link to="/" className="auth-brand">
          <span className="auth-logo">
            <span>pay</span>
            <span className="payo-logo-o">o</span>
            <span className="payo-logo-text">.</span>
          </span>
        </Link>

        {/* Login card */}
        <section className="auth-card">
          <div className="auth-heading">
            <span className="auth-eyebrow">
              WELCOME BACK
            </span>

            <h1>Sign in to Payo</h1>

            <p>
              Manage shared expenses and keep everything
              organized in one place.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="auth-field">
              <label
                className="auth-label-row"
                htmlFor="login-email"
              >
                Email address
              </label>

              <div className="auth-input-wrapper">
                <input
                  id="login-email"
                  className="auth-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="login-password">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="auth-forgot-link"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="auth-input-wrapper">
                <input
                  id="login-password"
                  className="auth-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  disabled={loading}
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="auth-error"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit"
              disabled={
                loading ||
                !email.trim() ||
                !password
              }
            >
              <span>
                {loading ? "Signing in..." : "Sign in"}
              </span>

              {!loading && (
                <ArrowRight size={17} strokeWidth={2} />
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>NEW TO PAYO?</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </section>

        <footer className="auth-footer">
          <span>
            © {new Date().getFullYear()} Payo. All rights
            reserved.
          </span>
        </footer>
      </div>
    </main>
  );
}

export default Login;
