import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";

import "../../styles/auth/Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <main className="register-page">
      <div className="register-shell">
        <div className="register-brand">
          <a href="/" className="register-logo">
<span>pay</span>

<span className="payo-logo-o">o</span>

<span className="payo-logo-text">.</span>          </a>
        </div>

        <section className="register-card">
          <div className="register-heading">
            <span className="register-eyebrow">
              GET STARTED
            </span>

            <h1>Create your Payo account.</h1>

            <p>
              Start managing shared expenses with your friends,
              family, or team.
            </p>
          </div>

          <form className="register-form">
            <div className="register-field">
              <label htmlFor="name">Full name</label>

              <div className="register-input-wrapper">
                <User size={17} />

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-email">
                Email address
              </label>

              <div className="register-input-wrapper">
                <Mail size={17} />

                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-password">
                Password
              </label>

              <div className="register-input-wrapper">
                <Lock size={17} />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
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

              <div className="register-password-hint">
                <Check size={12} />
                <span>Use at least 8 characters</span>
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <div className="register-input-wrapper">
                <Lock size={17} />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <label className="register-terms">
              <input type="checkbox" />

              <span>
                I agree to the{" "}
                <a href="/terms">Terms of Service</a>{" "}
                and <a href="/privacy">Privacy Policy</a>.
              </span>
            </label>

            <button
              type="submit"
              className="register-submit"
            >
              Create account
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="register-divider">
            <span>or</span>
          </div>

          <p className="register-switch">
            Already have an account?{" "}
            <a href="/login">Sign in</a>
          </p>
        </section>

        <p className="register-footer">
          © 2026 Payo. All rights reserved.
        </p>
      </div>
    </main>
  );
}

export default Register;