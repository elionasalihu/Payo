
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { useAuth } from "../../../context/AuthContext";
import "../../styles/auth/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);

      await signIn({
        email: email.trim(),
        password,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.message === "Invalid login credentials"
          ? "Incorrect email or password. Please try again."
          : err.message || "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-brand">
          <Link to="/" className="auth-logo">
            <span>pay</span>
            <span className="payo-logo-o">o</span>
            <span className="payo-logo-text">.</span>
          </Link>
        </div>

        <section className="auth-card">
          <div className="auth-heading">
            <span className="auth-eyebrow">WELCOME BACK</span>

            <h1>Sign in to Payo.</h1>

            <p>
              Manage your shared expenses and keep everything
              in one place.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <div className="auth-input-wrapper">
                <Mail size={17} />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <div className="auth-input-wrapper">
                <Lock size={17} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign in"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </section>

        <p className="auth-footer">
          © 2026 Payo. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default Login;
