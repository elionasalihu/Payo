import { motion } from "motion/react";
import {
  Activity,
  CreditCard,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from "lucide-react";

import "../styles/global/DashboardSidebar.css";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Expenses",
    icon: CreditCard,
  },
  {
    label: "Groups",
    icon: Users,
  },
  {
    label: "Activity",
    icon: Activity,
  },
];

function DashboardSidebar() {
  return (
    <>
      {/* DESKTOP / TABLET SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <a
            href="/client"
            className="dashboard-sidebar-logo"
            aria-label="Payo dashboard"
          >
            <span>
            <span>pay</span>
            <span className="payo-logo-o">o</span>
            <span className="payo-logo-text">.</span>
          </span>   
          </a>
        </div>

        <div className="dashboard-sidebar-content">
          <div className="dashboard-sidebar-section">
            <span className="dashboard-sidebar-label">Workspace</span>

            <nav className="dashboard-sidebar-nav">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href="#"
                    className={`dashboard-sidebar-link ${
                      item.active ? "active" : ""
                    }`}
                  >
                    {item.active && (
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

          <a href="#" className="dashboard-sidebar-create">
            <span className="dashboard-sidebar-create-icon">
              <Plus size={16} strokeWidth={2.2} />
            </span>

            <span>Add expense</span>
          </a>

          <div className="dashboard-sidebar-section dashboard-sidebar-groups">
            <span className="dashboard-sidebar-label">Your groups</span>

            <div className="dashboard-sidebar-group-list">
              <a href="#" className="dashboard-sidebar-group">
                <span className="dashboard-group-avatar">T</span>

                <span className="dashboard-group-info">
                  <strong>Trip to Tirana</strong>
                  <small>4 members</small>
                </span>
              </a>

              <a href="#" className="dashboard-sidebar-group">
                <span className="dashboard-group-avatar">H</span>

                <span className="dashboard-group-info">
                  <strong>House expenses</strong>
                  <small>3 members</small>
                </span>
              </a>

              <a href="#" className="dashboard-sidebar-group">
                <span className="dashboard-group-avatar">F</span>

                <span className="dashboard-group-info">
                  <strong>Friday night</strong>
                  <small>5 members</small>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar-bottom">
          <a href="#" className="dashboard-sidebar-settings">
            <Settings size={17} strokeWidth={1.8} />
            <span>Settings</span>
          </a>

          <div className="dashboard-sidebar-profile">
            <div className="dashboard-profile-avatar">AD</div>

            <div className="dashboard-profile-info">
              <strong>Amar Dobreva</strong>
              <span>amar@example.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}
      <nav className="dashboard-mobile-nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href="#"
              className={`dashboard-mobile-nav-item ${
                item.active ? "active" : ""
              }`}
            >
              <Icon size={20} strokeWidth={item.active ? 2 : 1.7} />

              <span>{item.label}</span>
            </a>
          );
        })}

        <a href="#" className="dashboard-mobile-nav-add">
          <Plus size={20} strokeWidth={2.2} />
        </a>
      </nav>
    </>
  );
}

export default DashboardSidebar;