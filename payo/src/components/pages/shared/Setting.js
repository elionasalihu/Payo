
import { useState } from "react";
import { motion } from "motion/react";
import {
  Bell,
  Check,
  ChevronRight,
  Globe,
  LockKeyhole,
  Monitor,
  Moon,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";
import "../../styles/global/Settings.css";

const clientTabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const adminTabs = [
  { id: "profile", label: "Admin profile", icon: UserRound },
  { id: "platform", label: "Platform", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const initialProfile = {
  firstName: "Amar",
  lastName: "Dobreva",
  email: "amar@example.com",
  username: "amardobreva",
  bio: "Managing shared expenses with Payo.",
};

const initialPreferences = {
  currency: "EUR",
  language: "English",
  dateFormat: "DD/MM/YYYY",
  theme: "Light",
};

const initialNotifications = {
  expenseAdded: true,
  payments: true,
  groupUpdates: true,
  weeklySummary: false,
  productUpdates: false,
  adminAlerts: true,
  securityAlerts: true,
};

const initialPlatform = {
  registrations: true,
  groupCreation: true,
  expenseLimit: "5000",
  maintenanceMode: false,
  emailNotifications: true,
};

function Toggle({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      className={`settings-toggle ${checked ? "is-on" : ""}`}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

function Settings() {
  const isAdmin = window.location.pathname.startsWith("/admin");
  const tabs = isAdmin ? adminTabs : clientTabs;

  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [preferences, setPreferences] = useState(initialPreferences);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [platform, setPlatform] = useState(initialPlatform);
  const [saved, setSaved] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updatePreference = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateNotification = (field, value) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updatePlatform = (field, value) => {
    setPlatform((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);

    // UI only: connect this handler to your backend when available.
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSaved(false);
  };

  const renderProfile = () => (
    <>
      <div className="settings-section-heading">
        <div>
          <h2>{isAdmin ? "Admin profile" : "Personal information"}</h2>
          <p>
            {isAdmin
              ? "Manage your administrator account details."
              : "Update the information associated with your Payo account."}
          </p>
        </div>
      </div>

      <div className="settings-avatar-section">
        <div className="settings-large-avatar">
          {profile.firstName.charAt(0)}
          {profile.lastName.charAt(0)}
        </div>

        <div className="settings-avatar-copy">
          <strong>
            {profile.firstName} {profile.lastName}
          </strong>
          <span>{isAdmin ? "Administrator" : "Payo member"}</span>
          <small>JPG or PNG · Avatar upload can be added later</small>
        </div>

        <span className={`settings-role ${isAdmin ? "admin" : ""}`}>
          {isAdmin ? "ADMIN" : "MEMBER"}
        </span>
      </div>

      <div className="settings-form-grid">
        <div className="settings-field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            value={profile.firstName}
            onChange={(e) => updateProfile("firstName", e.target.value)}
            required
          />
        </div>

        <div className="settings-field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            value={profile.lastName}
            onChange={(e) => updateProfile("lastName", e.target.value)}
            required
          />
        </div>

        <div className="settings-field settings-field-full">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile("email", e.target.value)}
            required
          />
          <span className="settings-field-hint">
            Used for account communication and notifications.
          </span>
        </div>

        <div className="settings-field settings-field-full">
          <label htmlFor="username">Username</label>
          <div className="settings-input-prefix">
            <span>@</span>
            <input
              id="username"
              value={profile.username}
              onChange={(e) => updateProfile("username", e.target.value)}
            />
          </div>
        </div>

        <div className="settings-field settings-field-full">
          <label htmlFor="bio">About</label>
          <textarea
            id="bio"
            rows={3}
            value={profile.bio}
            onChange={(e) => updateProfile("bio", e.target.value)}
            placeholder="A little about you..."
          />
        </div>
      </div>
    </>
  );

  const renderPreferences = () => (
    <>
      <div className="settings-section-heading">
        <div>
          <h2>Preferences</h2>
          <p>Customize how Payo looks and displays your information.</p>
        </div>
      </div>

      <div className="settings-preference-list">
        <div className="settings-preference-row">
          <div className="settings-preference-icon">
            <Wallet size={19} />
          </div>
          <div className="settings-preference-copy">
            <strong>Default currency</strong>
            <span>Currency used when displaying expenses.</span>
          </div>
          <select
            value={preferences.currency}
            onChange={(e) => updatePreference("currency", e.target.value)}
          >
            <option value="EUR">EUR — Euro</option>
            <option value="USD">USD — US Dollar</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="CHF">CHF — Swiss Franc</option>
            <option value="ALL">ALL — Albanian Lek</option>
          </select>
        </div>

        <div className="settings-preference-row">
          <div className="settings-preference-icon">
            <Globe size={19} />
          </div>
          <div className="settings-preference-copy">
            <strong>Language</strong>
            <span>Choose your preferred interface language.</span>
          </div>
          <select
            value={preferences.language}
            onChange={(e) => updatePreference("language", e.target.value)}
          >
            <option>English</option>
            <option>Albanian</option>
          </select>
        </div>

        <div className="settings-preference-row">
          <div className="settings-preference-icon">
            <Monitor size={19} />
          </div>
          <div className="settings-preference-copy">
            <strong>Date format</strong>
            <span>How dates appear throughout your workspace.</span>
          </div>
          <select
            value={preferences.dateFormat}
            onChange={(e) =>
              updatePreference("dateFormat", e.target.value)
            }
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div className="settings-preference-row">
          <div className="settings-preference-icon">
            <Moon size={19} />
          </div>
          <div className="settings-preference-copy">
            <strong>Appearance</strong>
            <span>Choose how the Payo interface looks.</span>
          </div>
          <select
            value={preferences.theme}
            onChange={(e) => updatePreference("theme", e.target.value)}
          >
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
      </div>

      <div className="settings-note">
        <Monitor size={16} />
        <p>
          These options currently update the interface state only.
          Persistent preferences and full theme switching require additional
          implementation.
        </p>
      </div>
    </>
  );

  const notificationItems = isAdmin
    ? [
        {
          key: "adminAlerts",
          title: "Platform alerts",
          description: "Important changes and platform-wide alerts.",
        },
        {
          key: "securityAlerts",
          title: "Security notifications",
          description: "Suspicious activity and security-related events.",
        },
        {
          key: "emailNotifications",
          title: "Email notifications",
          description: "Receive administrative updates by email.",
          platformSetting: true,
        },
        {
          key: "productUpdates",
          title: "Product updates",
          description: "Updates about new Payo features and releases.",
        },
      ]
    : [
        {
          key: "expenseAdded",
          title: "Expense updates",
          description: "When expenses are added or changed in your groups.",
        },
        {
          key: "payments",
          title: "Payments and settlements",
          description: "When someone pays you back or records a settlement.",
        },
        {
          key: "groupUpdates",
          title: "Group activity",
          description: "When members join or group details change.",
        },
        {
          key: "weeklySummary",
          title: "Weekly summary",
          description: "A weekly overview of your shared expenses.",
        },
        {
          key: "productUpdates",
          title: "Product updates",
          description: "New features, improvements, and announcements.",
        },
      ];

  const renderNotifications = () => (
    <>
      <div className="settings-section-heading">
        <div>
          <h2>Notifications</h2>
          <p>
            {isAdmin
              ? "Control which platform updates you receive."
              : "Choose what you want to hear about from Payo."}
          </p>
        </div>
      </div>

      <div className="settings-notification-list">
        {notificationItems.map((item) => (
          <div className="settings-notification-row" key={item.key}>
            <div className="settings-notification-copy">
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
            <Toggle
              checked={
                item.platformSetting
                  ? platform.emailNotifications
                  : notifications[item.key]
              }
              onChange={(value) =>
                item.platformSetting
                  ? updatePlatform("emailNotifications", value)
                  : updateNotification(item.key, value)
              }
            />
          </div>
        ))}
      </div>
    </>
  );

  const renderSecurity = () => (
    <>
      <div className="settings-section-heading">
        <div>
          <h2>Security</h2>
          <p>Keep your account and information protected.</p>
        </div>
      </div>

      <div className="settings-security-card">
        <div className="settings-security-icon">
          <LockKeyhole size={20} />
        </div>
        <div className="settings-security-copy">
          <strong>Password</strong>
          <span>
            Choose a strong password you do not use on other websites.
          </span>
        </div>
        <span className="settings-security-status">Password settings</span>
      </div>

      <div className="settings-form-grid settings-password-grid">
        <div className="settings-field settings-field-full">
          <label htmlFor="currentPassword">Current password</label>
          <input
            id="currentPassword"
            type="password"
            autoComplete="current-password"
            value={passwords.current}
            onChange={(e) => {
              setPasswords((prev) => ({ ...prev, current: e.target.value }));
              setSaved(false);
            }}
            placeholder="Enter current password"
          />
        </div>

        <div className="settings-field">
          <label htmlFor="newPassword">New password</label>
          <input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            value={passwords.newPassword}
            onChange={(e) => {
              setPasswords((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }));
              setSaved(false);
            }}
            placeholder="Enter new password"
          />
        </div>

        <div className="settings-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={passwords.confirm}
            onChange={(e) => {
              setPasswords((prev) => ({
                ...prev,
                confirm: e.target.value,
              }));
              setSaved(false);
            }}
            placeholder="Repeat new password"
          />
        </div>
      </div>

      <div className="settings-note">
        <ShieldCheck size={16} />
        <p>
          Password changes are not connected to authentication yet. Add
          server-side validation before enabling real password updates.
        </p>
      </div>

      {isAdmin && (
        <div className="settings-admin-security">
          <div className="settings-security-card">
            <div className="settings-security-icon">
              <Users size={20} />
            </div>
            <div className="settings-security-copy">
              <strong>Administrator access</strong>
              <span>
                This account is using the administrator interface.
              </span>
            </div>
            <span className="settings-role admin">ADMIN</span>
          </div>
        </div>
      )}
    </>
  );

  const renderPlatform = () => (
    <>
      <div className="settings-section-heading">
        <div>
          <h2>Platform configuration</h2>
          <p>Manage general settings that affect the Payo platform.</p>
        </div>
      </div>

      <div className="settings-notification-list">
        <div className="settings-notification-row">
          <div className="settings-notification-copy">
            <strong>Allow new registrations</strong>
            <span>Allow new users to create a Payo account.</span>
          </div>
          <Toggle
            checked={platform.registrations}
            onChange={(value) => updatePlatform("registrations", value)}
          />
        </div>

        <div className="settings-notification-row">
          <div className="settings-notification-copy">
            <strong>Allow group creation</strong>
            <span>Let users create new expense-sharing groups.</span>
          </div>
          <Toggle
            checked={platform.groupCreation}
            onChange={(value) => updatePlatform("groupCreation", value)}
          />
        </div>

        <div className="settings-notification-row">
          <div className="settings-notification-copy">
            <strong>Maintenance mode</strong>
            <span>
              Mark the platform as under maintenance. This switch does not
              affect public access until backend logic is connected.
            </span>
          </div>
          <Toggle
            checked={platform.maintenanceMode}
            onChange={(value) => updatePlatform("maintenanceMode", value)}
          />
        </div>
      </div>

      <div className="settings-field settings-platform-limit">
        <label htmlFor="expenseLimit">Maximum expense amount (€)</label>
        <input
          id="expenseLimit"
          type="number"
          min="1"
          value={platform.expenseLimit}
          onChange={(e) => updatePlatform("expenseLimit", e.target.value)}
        />
        <span className="settings-field-hint">
          A configuration value for future expense validation.
        </span>
      </div>

      <div className="settings-note">
        <ShieldCheck size={16} />
        <p>
          Platform controls are currently demonstration settings. Enforce
          registration, group, and expense limits on the server before
          treating them as active restrictions.
        </p>
      </div>
    </>
  );

  const pageTitle = isAdmin ? "Admin settings" : "Settings";

  return (
    <div className="settings-app">
      <DashboardSidebar />

      <main className="settings-main">
        <div className="settings-content">
          <div className="settings-breadcrumb">
            <span>{isAdmin ? "ADMIN" : "WORKSPACE"}</span>
            <ChevronRight size={13} />
            <span className="current">SETTINGS</span>
          </div>

          <motion.div
            className="settings-page-header"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h1>{pageTitle}</h1>
              <p>
                {isAdmin
                  ? "Manage your administrator account and platform configuration."
                  : "Manage your account, preferences, and notifications."}
              </p>
            </div>
          </motion.div>

          <div className="settings-layout">
            <aside className="settings-navigation">
              <span className="settings-nav-label">ACCOUNT SETTINGS</span>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`settings-nav-item ${active ? "active" : ""}`}
                    onClick={() => changeTab(tab.id)}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                    <span>{tab.label}</span>
                    {active && (
                      <motion.span
                        layoutId="settings-active-indicator"
                        className="settings-nav-indicator"
                      />
                    )}
                  </button>
                );
              })}

              <div className="settings-sidebar-help">
                <div className="settings-help-icon">
                  <ShieldCheck size={17} />
                </div>
                <strong>Your account, your control.</strong>
                <span>
                  {isAdmin
                    ? "Keep your administrator details up to date."
                    : "Keep your profile and preferences up to date."}
                </span>
              </div>
            </aside>

            <form className="settings-panel" onSubmit={handleSave}>
              <div className="settings-panel-body">
                {activeTab === "profile" && renderProfile()}
                {activeTab === "preferences" &&
                  !isAdmin &&
                  renderPreferences()}
                {activeTab === "platform" &&
                  isAdmin &&
                  renderPlatform()}
                {activeTab === "notifications" && renderNotifications()}
                {activeTab === "security" && renderSecurity()}
              </div>

              <div className="settings-panel-footer">
                <span className="settings-save-message">
                  {saved && (
                    <>
                      <Check size={15} />
                      Changes saved locally
                    </>
                  )}
                </span>

                <button className="settings-save-button" type="submit">
                  {saved ? <Check size={16} /> : <Save size={16} />}
                  {saved ? "Saved" : "Save changes"}
                </button>
              </div>
            </form>
          </div>

          <footer className="settings-page-footer">
            <span>PAYO<b>.</b></span>
            <span>Settings & account management</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Settings;
