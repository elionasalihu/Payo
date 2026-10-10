import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";

import AdminSidebar from "../../sections/DashboardSidebar";

import "../../styles/admin/Dashboard.css";

const recentUsers = [
  {
    id: 1,
    initials: "AK",
    name: "Ardit Krasniqi",
    email: "ardit@example.com",
    groups: 3,
    joined: "Today",
    status: "Active",
  },
  {
    id: 2,
    initials: "LB",
    name: "Leon Berisha",
    email: "leon@example.com",
    groups: 2,
    joined: "Yesterday",
    status: "Active",
  },
  {
    id: 3,
    initials: "EA",
    name: "Era Ahmeti",
    email: "era@example.com",
    groups: 5,
    joined: "Sep 29",
    status: "Active",
  },
  {
    id: 4,
    initials: "DM",
    name: "Dren Morina",
    email: "dren@example.com",
    groups: 1,
    joined: "Sep 28",
    status: "Inactive",
  },
];

const activity = [
  {
    id: 1,
    title: "New user registered",
    description: "Ardit Krasniqi created an account",
    time: "8 min ago",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "New group created",
    description: "Trip to Tirana · 4 members",
    time: "24 min ago",
    icon: Users,
  },
  {
    id: 3,
    title: "Expense added",
    description: "Dinner at Artigiano · €48.50",
    time: "42 min ago",
    icon: WalletCards,
  },
  {
    id: 4,
    title: "Account verified",
    description: "Leon Berisha verified his email",
    time: "1 hr ago",
    icon: ShieldCheck,
  },
];

const chartData = [
  32, 42, 38, 51, 47, 62, 58, 72, 68, 81, 74, 91,
];

function AdminDashboard() {
  const maxValue = Math.max(...chartData);

  return (
    <div className="admin-dashboard-page">
      <AdminSidebar />

      <main className="admin-dashboard-main">
        <header className="admin-dashboard-header">
          <div>
            <span className="admin-dashboard-eyebrow">
              ADMIN / OVERVIEW
            </span>

            <h1>
              Welcome back, <strong>John.</strong>
            </h1>

            <p>
              Here’s what’s happening across Payo today.
            </p>
          </div>

          <div className="admin-header-actions">
            <button className="admin-search-button">
              <Search size={16} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>

            <a href="/admin/users/new">
          <button className="users-add-button">
            <Plus size={16} />
            Add user
          </button>
          </a>
          </div>
        </header>

        {/* STATISTICS */}

        <section className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total users</span>

              <div className="admin-stat-icon">
                <Users size={17} />
              </div>
            </div>

            <strong>2,481</strong>

            <div className="admin-stat-footer">
              <span className="admin-stat-positive">
                <ArrowUpRight size={13} />
                12.4%
              </span>

              <span>vs last month</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Active users</span>

              <div className="admin-stat-icon">
                <UserCheck size={17} />
              </div>
            </div>

            <strong>1,892</strong>

            <div className="admin-stat-footer">
              <span className="admin-stat-positive">
                <ArrowUpRight size={13} />
                8.7%
              </span>

              <span>vs last month</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total expenses</span>

              <div className="admin-stat-icon">
                <WalletCards size={17} />
              </div>
            </div>

            <strong>€84.2K</strong>

            <div className="admin-stat-footer">
              <span className="admin-stat-positive">
                <ArrowUpRight size={13} />
                18.2%
              </span>

              <span>vs last month</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total groups</span>

              <div className="admin-stat-icon">
                <Users size={17} />
              </div>
            </div>

            <strong>624</strong>

            <div className="admin-stat-footer">
              <span className="admin-stat-negative">
                <ArrowDownRight size={13} />
                2.1%
              </span>

              <span>vs last month</span>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}

        <section className="admin-dashboard-grid">
          {/* CHART */}

          <div className="admin-panel admin-chart-panel">
            <div className="admin-panel-header">
              <div>
                <h2>User activity</h2>
                <p>Active users over the last 12 months</p>
              </div>

              <select className="admin-period-select" defaultValue="12">
                <option value="12">Last 12 months</option>
                <option value="6">Last 6 months</option>
                <option value="3">Last 3 months</option>
              </select>
            </div>

            <div className="admin-chart">
              <div className="admin-chart-y">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              <div className="admin-chart-area">
                <div className="admin-chart-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="admin-chart-bars">
                  {chartData.map((value, index) => (
                    <div className="admin-chart-column" key={index}>
                      <div
                        className="admin-chart-bar"
                        style={{
                          height: `${(value / maxValue) * 100}%`,
                        }}
                      />

                      <span>
                        {
                          [
                            "Oct",
                            "Nov",
                            "Dec",
                            "Jan",
                            "Feb",
                            "Mar",
                            "Apr",
                            "May",
                            "Jun",
                            "Jul",
                            "Aug",
                            "Sep",
                          ][index]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVITY */}

          <div className="admin-panel admin-activity-panel">
            <div className="admin-panel-header">
              <div>
                <h2>Recent activity</h2>
                <p>Latest platform events</p>
              </div>

              <Activity size={17} />
            </div>

            <div className="admin-activity-list">
              {activity.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="admin-activity-item" key={item.id}>
                    <div className="admin-activity-icon">
                      <Icon size={15} />
                    </div>

                    <div className="admin-activity-info">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>

                    <time>{item.time}</time>
                  </div>
                );
              })}
            </div>

           <a href="/admin/activity">
            <button className="admin-view-activity">
              View all activity
              <ArrowUpRight size={14} />
            </button>
            </a>
          </div>
        </section>

        {/* USERS */}

        <section className="admin-panel admin-users-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Recent users</h2>
              <p>Recently registered Payo accounts</p>
            </div>

           <a href="admin/users">
             <button className="admin-view-all">
              View all users
              <ArrowUpRight size={14} />
            </button>
           </a>
          </div>

          <div className="admin-users-table">
            <div className="admin-table-head">
              <span>User</span>
              <span>Groups</span>
              <span>Joined</span>
              <span>Status</span>
              <span />
            </div>

            {recentUsers.map((user) => (
              <div className="admin-table-row" key={user.id}>
                <div className="admin-user-cell">
                  <div className="admin-user-avatar">
                    {user.initials}
                  </div>

                  <div>
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                <span className="admin-table-text">
                  {user.groups}
                </span>

                <span className="admin-table-text">
                  {user.joined}
                </span>

                <span
                  className={`admin-user-status ${
                    user.status === "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <i />
                  {user.status}
                </span>

                <button className="admin-more-button">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;