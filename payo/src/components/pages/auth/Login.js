import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

import "../../styles/auth/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <div className="auth-brand">
          <a href="/" className="auth-logo">
            <span>pay</span>

<span className="payo-logo-o">o</span>

<span className="payo-logo-text">.</span>
          </a>
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

          <form className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <div className="auth-input-wrapper">
                <Mail size={17} />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>

                <a href="/forgot-password">
                  Forgot password?
                </a>
              </div>

              <div className="auth-input-wrapper">
                <Lock size={17} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
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

            <button type="submit" className="auth-submit">
              Sign in
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <a href="/register">Create one</a>
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