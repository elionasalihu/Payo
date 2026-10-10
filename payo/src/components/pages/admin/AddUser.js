
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import DashboardSidebar from "../../sections/DashboardSidebar";
import "../../styles/admin/AddUser.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  role: "User",
  status: "Active",
  password: "",
  confirmPassword: "",
  sendWelcomeEmail: true,
};

function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [createdUser, setCreatedUser] = useState(null);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setCreatedUser(null);
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!form.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(form.username)) {
      nextErrors.username =
        "Use letters, numbers, periods, underscores, or hyphens.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const newUser = {
      id: `USR-${Date.now()}`,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim().toLowerCase(),
      username: form.username.trim(),
      role: form.role,
      status: form.status,
      createdAt: new Date().toLocaleDateString(),
    };

    // Demo only: connect this to your backend/API when available.
    setCreatedUser(newUser);

    // Passwords are deliberately not stored in the created user object.
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setCreatedUser(null);
  };

  return (
    <div className="add-user-app">
      <DashboardSidebar />

      <main className="add-user-main">
        <div className="add-user-content">
          <Link to="/admin/users" className="add-user-back">
            <ArrowLeft size={16} />
            <span>Back to users</span>
          </Link>

          <motion.header
            className="add-user-header"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="add-user-header-icon">
              <UserPlus size={23} strokeWidth={1.8} />
            </div>

            <div>
              <div className="add-user-eyebrow">
                <span>ADMIN</span>
                <span className="add-user-eyebrow-dot">/</span>
                <span>USERS</span>
              </div>

              <h1>Add new user</h1>
              <p>
                Create an account and configure the user's access to Payo.
              </p>
            </div>
          </motion.header>

          {createdUser ? (
            <motion.section
              className="add-user-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="add-user-success-icon">
                <CheckCircle2 size={30} />
              </div>

              <h2>User created successfully</h2>
              <p>
                The demo account details have been prepared. No account has
                been created on a server.
              </p>

              <div className="add-user-created-profile">
                <div className="add-user-avatar">
                  {createdUser.firstName.charAt(0)}
                  {createdUser.lastName.charAt(0)}
                </div>

                <div className="add-user-created-info">
                  <strong>{createdUser.name}</strong>
                  <span>{createdUser.email}</span>
                  <small>@{createdUser.username}</small>
                </div>

                <div className="add-user-created-badges">
                  <span
                    className={`add-user-role-badge ${
                      createdUser.role === "Admin" ? "admin" : ""
                    }`}
                  >
                    {createdUser.role}
                  </span>
                  <span
                    className={`add-user-status-badge ${
                      createdUser.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {createdUser.status}
                  </span>
                </div>
              </div>

              {form.sendWelcomeEmail && (
                <div className="add-user-success-note">
                  <Mail size={16} />
                  Welcome email selected. Sending it requires an email service.
                </div>
              )}

              <div className="add-user-success-actions">
                <button
                  type="button"
                  className="add-user-secondary-button"
                  onClick={handleReset}
                >
                  <UserPlus size={16} />
                  Add another user
                </button>

                <button
                  type="button"
                  className="add-user-primary-button"
                  onClick={() => navigate("/admin/users")}
                >
                  Back to users
                  <ArrowLeft size={15} className="add-user-arrow-reverse" />
                </button>
              </div>
            </motion.section>
          ) : (
            <form className="add-user-form" onSubmit={handleSubmit} noValidate>
              <div className="add-user-form-layout">
                <div className="add-user-form-main">
                  <section className="add-user-card">
                    <div className="add-user-card-heading">
                      <div className="add-user-card-icon">
                        <Users size={18} />
                      </div>
                      <div>
                        <h2>Personal information</h2>
                        <p>Enter the user's basic account details.</p>
                      </div>
                    </div>

                    <div className="add-user-fields">
                      <div className="add-user-field">
                        <label htmlFor="firstName">
                          First name <span>*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="e.g. Ardit"
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={(e) =>
                            updateField("firstName", e.target.value)
                          }
                          aria-invalid={Boolean(errors.firstName)}
                        />
                        {errors.firstName && (
                          <small className="add-user-error">
                            {errors.firstName}
                          </small>
                        )}
                      </div>

                      <div className="add-user-field">
                        <label htmlFor="lastName">
                          Last name <span>*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="e.g. Krasniqi"
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={(e) =>
                            updateField("lastName", e.target.value)
                          }
                          aria-invalid={Boolean(errors.lastName)}
                        />
                        {errors.lastName && (
                          <small className="add-user-error">
                            {errors.lastName}
                          </small>
                        )}
                      </div>

                      <div className="add-user-field add-user-field-full">
                        <label htmlFor="email">
                          Email address <span>*</span>
                        </label>
                        <div className="add-user-input-icon">
                          <Mail size={16} />
                          <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            aria-invalid={Boolean(errors.email)}
                          />
                        </div>
                        {errors.email && (
                          <small className="add-user-error">
                            {errors.email}
                          </small>
                        )}
                      </div>

                      <div className="add-user-field add-user-field-full">
                        <label htmlFor="username">
                          Username <span>*</span>
                        </label>
                        <div className="add-user-input-prefix">
                          <span>@</span>
                          <input
                            id="username"
                            type="text"
                            placeholder="username"
                            autoComplete="username"
                            value={form.username}
                            onChange={(e) =>
                              updateField(
                                "username",
                                e.target.value.replace(/\s/g, "")
                              )
                            }
                            aria-invalid={Boolean(errors.username)}
                          />
                        </div>
                        {errors.username ? (
                          <small className="add-user-error">
                            {errors.username}
                          </small>
                        ) : (
                          <small className="add-user-hint">
                            Letters, numbers, periods, underscores, and
                            hyphens.
                          </small>
                        )}
                      </div>
                    </div>
                  </section>

                  <section className="add-user-card">
                    <div className="add-user-card-heading">
                      <div className="add-user-card-icon">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <h2>Account access</h2>
                        <p>Choose the role and initial account status.</p>
                      </div>
                    </div>

                    <div className="add-user-fields">
                      <div className="add-user-field">
                        <label htmlFor="role">User role</label>
                        <select
                          id="role"
                          value={form.role}
                          onChange={(e) => updateField("role", e.target.value)}
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <small className="add-user-hint">
                          Admins can access the administration interface.
                        </small>
                      </div>

                      <div className="add-user-field">
                        <label htmlFor="status">Account status</label>
                        <select
                          id="status"
                          value={form.status}
                          onChange={(e) =>
                            updateField("status", e.target.value)
                          }
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        <small className="add-user-hint">
                          Inactive accounts should be blocked by the backend.
                        </small>
                      </div>
                    </div>
                  </section>

                  <section className="add-user-card">
                    <div className="add-user-card-heading">
                      <div className="add-user-card-icon">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <h2>Login credentials</h2>
                        <p>Set an initial password for the new account.</p>
                      </div>
                    </div>

                    <div className="add-user-fields">
                      <div className="add-user-field add-user-field-full">
                        <label htmlFor="password">
                          Password <span>*</span>
                        </label>
                        <div className="add-user-password-wrap">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="At least 8 characters"
                            value={form.password}
                            onChange={(e) =>
                              updateField("password", e.target.value)
                            }
                            aria-invalid={Boolean(errors.password)}
                          />
                          <button
                            type="button"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <small className="add-user-error">
                            {errors.password}
                          </small>
                        )}
                      </div>

                      <div className="add-user-field add-user-field-full">
                        <label htmlFor="confirmPassword">
                          Confirm password <span>*</span>
                        </label>
                        <div className="add-user-password-wrap">
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Re-enter the password"
                            value={form.confirmPassword}
                            onChange={(e) =>
                              updateField("confirmPassword", e.target.value)
                            }
                            aria-invalid={Boolean(errors.confirmPassword)}
                          />
                          <button
                            type="button"
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <small className="add-user-error">
                            {errors.confirmPassword}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="add-user-password-tip">
                      <ShieldCheck size={16} />
                      <span>
                        Use at least 8 characters. In production, hash passwords
                        securely on the server and never store plain-text
                        passwords.
                      </span>
                    </div>
                  </section>
                </div>

                <aside className="add-user-form-aside">
                  <section className="add-user-preview-card">
                    <span className="add-user-preview-label">
                      ACCOUNT PREVIEW
                    </span>

                    <div className="add-user-preview-avatar">
                      {form.firstName.charAt(0).toUpperCase() || "U"}
                      {form.lastName.charAt(0).toUpperCase()}
                    </div>

                    <h3>
                      {form.firstName || "New"} {form.lastName || "User"}
                    </h3>
                    <p>
                      {form.email || "name@example.com"}
                    </p>

                    <div className="add-user-preview-badges">
                      <span
                        className={`add-user-role-badge ${
                          form.role === "Admin" ? "admin" : ""
                        }`}
                      >
                        {form.role}
                      </span>
                      <span
                        className={`add-user-status-badge ${
                          form.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        <span />
                        {form.status}
                      </span>
                    </div>

                    <div className="add-user-preview-divider" />

                    <div className="add-user-preview-row">
                      <span>Username</span>
                      <strong>
                        {form.username ? `@${form.username}` : "Not set"}
                      </strong>
                    </div>

                    <div className="add-user-preview-row">
                      <span>Account type</span>
                      <strong>{form.role}</strong>
                    </div>

                    <div className="add-user-preview-row">
                      <span>Initial status</span>
                      <strong>{form.status}</strong>
                    </div>
                  </section>

                  <section className="add-user-welcome-card">
                    <label className="add-user-checkbox-row">
                      <input
                        type="checkbox"
                        checked={form.sendWelcomeEmail}
                        onChange={(e) =>
                          updateField("sendWelcomeEmail", e.target.checked)
                        }
                      />
                      <span className="add-user-custom-checkbox">
                        {form.sendWelcomeEmail && <Check size={12} />}
                      </span>
                      <span className="add-user-checkbox-copy">
                        <strong>Welcome email</strong>
                        <small>
                          Prepare a welcome email for the new user.
                        </small>
                      </span>
                    </label>
                  </section>

                  <div className="add-user-aside-note">
                    <ShieldCheck size={16} />
                    <p>
                      Review the selected role carefully. Administrator access
                      should only be granted to trusted accounts.
                    </p>
                  </div>
                </aside>
              </div>

              <div className="add-user-form-footer">
                <button
                  type="button"
                  className="add-user-cancel-button"
                  onClick={() => navigate("/admin/users")}
                >
                  <X size={15} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-user-primary-button"
                >
                  <UserPlus size={16} />
                  Create user
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default AddUser;
