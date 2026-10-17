import { useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  Users,
  WalletCards,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "../styles/global/DashboardSidebar.css";

const clientNavigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Expenses",
    icon: CreditCard,
    href: "/dashboard/expenses",
  },
  {
    label: "Groups",
    icon: Users,
    href: "/dashboard/groups",
  },
  {
    label: "Activity",
    icon: Activity,
    href: "/dashboard/activity",
  },
];

const adminNavigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    label: "Expenses",
    icon: WalletCards,
    href: "/admin/expenses",
  },
  {
    label: "Activity",
    icon: Activity,
    href: "/admin/activity",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
  },
];

function DashboardSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const isAdmin = pathname.startsWith("/admin");
  const navigation = isAdmin ? adminNavigation : clientNavigation;

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Payo User";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const isActiveRoute = (item) => {
    if (item.label === "Overview") {
      return pathname === item.href;
    }

    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );
  };

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      const result = await signOut();

      // Supabase signOut can return an error instead of throwing.
      if (result?.error) {
        throw result.error;
      }

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Failed to sign out:", error);
      setLogoutError("Couldn't sign out. Please try again.");
      setLoggingOut(false);
    }
  }

  function LogoutButton({ mobile = false }) {
    return (
      <button
        type="button"
        className={
          mobile
            ? "dashboard-mobile-nav-item dashboard-mobile-logout"
            : "dashboard-sidebar-logout"
        }
        onClick={handleLogout}
        disabled={loggingOut}
        aria-label={loggingOut ? "Signing out" : "Sign out"}
      >
        <LogOut
          size={mobile ? 20 : 17}
          strokeWidth={1.8}
        />
        <span>{loggingOut ? "Signing out..." : "Sign out"}</span>
      </button>
    );
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <Link
            to={isAdmin ? "/admin" : "/dashboard"}
            className="dashboard-sidebar-logo"
            aria-label="Payo dashboard"
          >
            <span>pay</span>
            <span className="payo-logo-o">o</span>
            <span className="payo-logo-text">.</span>
          </Link>

          {isAdmin && (
            <span className="dashboard-sidebar-badge">
              Admin
            </span>
          )}
        </div>

        <div className="dashboard-sidebar-content">
          <div className="dashboard-sidebar-section">
            <span className="dashboard-sidebar-label">
              {isAdmin ? "Management" : "Workspace"}
            </span>

            <nav className="dashboard-sidebar-nav">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item);

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`dashboard-sidebar-link ${
                      isActive ? "active" : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dashboard-active-indicator"
                        className="dashboard-sidebar-active"
                      />
                    )}

                    <Icon size={17} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {!isAdmin && (
            <>
              <Link
                to="/dashboard/expenses/new"
                className="dashboard-sidebar-create"
              >
                <span className="dashboard-sidebar-create-icon">
                  <Plus size={16} strokeWidth={2.2} />
                </span>
                <span>Add expense</span>
              </Link>

              <div className="dashboard-sidebar-section dashboard-sidebar-groups">
                <span className="dashboard-sidebar-label">
                  Your groups
                </span>

                <div className="dashboard-sidebar-group-list">
                  <Link
                    to="/dashboard/groups"
                    className="dashboard-sidebar-group"
                  >
                    <span className="dashboard-group-avatar">T</span>
                    <span className="dashboard-group-info">
                      <strong>Trip to Tirana</strong>
                      <small>View your groups</small>
                    </span>
                  </Link>

                  <Link
                    to="/dashboard/groups"
                    className="dashboard-sidebar-group"
                  >
                    <span className="dashboard-group-avatar">H</span>
                    <span className="dashboard-group-info">
                      <strong>House expenses</strong>
                      <small>View your groups</small>
                    </span>
                  </Link>

                  <Link
                    to="/dashboard/groups"
                    className="dashboard-sidebar-group"
                  >
                    <span className="dashboard-group-avatar">F</span>
                    <span className="dashboard-group-info">
                      <strong>Friday night</strong>
                      <small>View your groups</small>
                    </span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {isAdmin && (
            <div className="dashboard-sidebar-section">
              <span className="dashboard-sidebar-label">
                System
              </span>

              <Link
                to="/admin/settings"
                className={`dashboard-sidebar-link ${
                  pathname.startsWith("/admin/settings")
                    ? "active"
                    : ""
                }`}
                aria-current={
                  pathname.startsWith("/admin/settings")
                    ? "page"
                    : undefined
                }
              >
                <Settings size={17} strokeWidth={1.8} />
                <span>Settings</span>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar footer */}
        <div className="dashboard-sidebar-bottom">
          {!isAdmin && (
            <Link
              to="/dashboard/settings"
              className={`dashboard-sidebar-settings ${
                pathname.startsWith("/dashboard/settings")
                  ? "active"
                  : ""
              }`}
            >
              <Settings size={17} strokeWidth={1.8} />
              <span>Settings</span>
            </Link>
          )}

          <div className="dashboard-sidebar-profile">
            <div className="dashboard-profile-avatar">
              {initials || "U"}
            </div>

            <div className="dashboard-profile-info">
              <strong>{fullName}</strong>
              <span>
                {isAdmin
                  ? "Administrator"
                  : user?.email || "Signed in"}
              </span>
            </div>
          </div>

          {logoutError && (
            <p
              className="dashboard-sidebar-logout-error"
              role="alert"
            >
              {logoutError}
            </p>
          )}

          <LogoutButton />
        </div>
      </aside>

      {/* Mobile / tablet bottom navigation */}
      <nav
        className="dashboard-mobile-nav"
        aria-label="Mobile navigation"
      >
        {navigation.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item);

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`dashboard-mobile-nav-item ${
                isActive ? "active" : ""
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.7}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {!isAdmin && (
          <Link
            to="/dashboard/expenses/new"
            className="dashboard-mobile-nav-add"
            aria-label="Add expense"
          >
            <Plus size={20} strokeWidth={2.2} />
          </Link>
        )}

        <LogoutButton mobile />
      </nav>

      {/* Mobile logout error */}
      {logoutError && (
        <div
          className="dashboard-mobile-logout-error"
          role="alert"
        >
          {logoutError}
        </div>
      )}
    </>
  );
}

export default DashboardSidebar;