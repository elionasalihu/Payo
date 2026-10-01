import { motion } from "motion/react";
import {
  Activity,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
  WalletCards,
} from "lucide-react";

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
  const isAdmin = window.location.pathname.startsWith("/admin");

  const navigation = isAdmin ? adminNavigation : clientNavigation;

  return (
    <>
      {/* DESKTOP / TABLET SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <a
            href={isAdmin ? "/admin" : "/dashboard"}
            className="dashboard-sidebar-logo"
            aria-label="Payo dashboard"
          >
            <span>pay</span>

            <span className="payo-logo-o">o</span>

            <span className="payo-logo-text">.</span>
          </a>

          {isAdmin && <span className="dashboard-sidebar-badge">John</span>}
        </div>

        <div className="dashboard-sidebar-content">
          <div className="dashboard-sidebar-section">
            <span className="dashboard-sidebar-label">
              {isAdmin ? "Management" : "Workspace"}
            </span>

            <nav className="dashboard-sidebar-nav">
              {navigation.map((item) => {
                const Icon = item.icon;

                const isActive =
                  window.location.pathname === item.href ||
                  (item.label === "Overview" &&
                    window.location.pathname ===
                      (isAdmin ? "/admin/" : "/dashboard/"));

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`dashboard-sidebar-link ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="dashboard-active-indicator"
                        className="dashboard-sidebar-active"
                      />
                    )}

                    <Icon size={17} strokeWidth={1.8} />

                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {!isAdmin && (
            <>
              <a
                href="/dashboard/expenses/new"
                className="dashboard-sidebar-create"
              >
                <span className="dashboard-sidebar-create-icon">
                  <Plus size={16} strokeWidth={2.2} />
                </span>

                <span>Add expense</span>
              </a>

              <div className="dashboard-sidebar-section dashboard-sidebar-groups">
                <span className="dashboard-sidebar-label">Your groups</span>

                <div className="dashboard-sidebar-group-list">
                  <a
                    href="/dashboard/groups/trip-to-tirana"
                    className="dashboard-sidebar-group"
                  >
                    <span className="dashboard-group-avatar">T</span>

                    <span className="dashboard-group-info">
                      <strong>Trip to Tirana</strong>
                      <small>4 members</small>
                    </span>
                  </a>

                  <a
                    href="/dashboard/groups/house-expenses"
                    className="dashboard-sidebar-group"
                  >
                    <span className="dashboard-group-avatar">H</span>

                    <span className="dashboard-group-info">
                      <strong>House expenses</strong>
                      <small>3 members</small>
                    </span>
                  </a>

                  <a
                    href="/dashboard/groups/friday-night"
                    className="dashboard-sidebar-group"
                  >
                    <span className="dashboard-group-avatar">F</span>

                    <span className="dashboard-group-info">
                      <strong>Friday night</strong>
                      <small>5 members</small>
                    </span>
                  </a>
                </div>
              </div>
            </>
          )}

          {isAdmin && (
            <>
              <div className="dashboard-sidebar-divider" />

              <div className="dashboard-sidebar-section">
                <span className="dashboard-sidebar-label">System</span>

                <a href="/admin/settings" className="dashboard-sidebar-link">
                  <Settings size={17} strokeWidth={1.8} />

                  <span>Settings</span>
                </a>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-sidebar-bottom">
          {!isAdmin && (
            <a
              href="/dashboard/settings"
              className="dashboard-sidebar-settings"
            >
              <Settings size={17} strokeWidth={1.8} />
              <span>Settings</span>
            </a>
          )}

          <div className="dashboard-sidebar-profile">
            <div className="dashboard-profile-avatar">AD</div>

            <div className="dashboard-profile-info">
              <strong>John Doe</strong>

              <span>{isAdmin ? "Administrator" : "john@example.com"}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="dashboard-mobile-nav">
        {navigation.slice(0, 4).map((item) => {
          const Icon = item.icon;

          const isActive = window.location.pathname === item.href;

          return (
            <a
              key={item.label}
              href={item.href}
              className={`dashboard-mobile-nav-item ${
                isActive ? "active" : ""
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.7} />

              <span>{item.label}</span>
            </a>
          );
        })}

        {!isAdmin && (
          <a
            href="/dashboard/expenses/new"
            className="dashboard-mobile-nav-add"
          >
            <Plus size={20} strokeWidth={2.2} />
          </a>
        )}
      </nav>
    </>
  );
}

export default DashboardSidebar;
