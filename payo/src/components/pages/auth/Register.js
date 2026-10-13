
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
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import "../../styles/auth/Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setSubmitting(true);

      const data = await signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (data.session) {
        navigate("/dashboard", { replace: true });
      } else {
        setMessage(
          "Your account has been created. Check your email for a confirmation link before signing in."
        );
      }
    } catch (err) {
      setError(
        err.message || "Unable to create your account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-shell">
        <div className="register-brand">
          <Link to="/" className="register-logo">
            <span>pay</span>
            <span className="payo-logo-o">o</span>
            <span className="payo-logo-text">.</span>
          </Link>
        </div>

        <section className="register-card">
          <div className="register-heading">
            <span className="register-eyebrow">GET STARTED</span>

            <h1>Create your Payo account.</h1>

            <p>
              Start managing shared expenses with your friends,
              family, or team.
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="name">Full name</label>

              <div className="register-input-wrapper">
                <User size={17} />

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-email">Email address</label>

              <div className="register-input-wrapper">
                <Mail size={17} />

                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-password">Password</label>

              <div className="register-input-wrapper">
                <Lock size={17} />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
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

              <div className="register-password-hint">
                <Check size={12} />
                <span>Use at least 8 characters</span>
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="confirm-password">Confirm password</label>

              <div className="register-input-wrapper">
                <Lock size={17} />

                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  minLength={8}
                  required
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
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) =>
                  setAcceptedTerms(event.target.checked)
                }
              />

              <span>
                I agree to the{" "}
                <Link to="/terms">Terms of Service</Link>{" "}
                and <Link to="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            {error && (
              <p className="register-error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="register-success" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="register-submit"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Create account"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>

          <div className="register-divider">
            <span>or</span>
          </div>

          <p className="register-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
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