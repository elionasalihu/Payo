import {
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/admin/Users.css";

const users = [
  {
    id: 1,
    initials: "AK",
    name: "Ardit Krasniqi",
    email: "ardit@example.com",
    groups: 3,
    expenses: 28,
    joined: "Today",
    status: "Active",
    role: "User",
  },
  {
    id: 2,
    initials: "LB",
    name: "Leon Berisha",
    email: "leon@example.com",
    groups: 2,
    expenses: 19,
    joined: "Yesterday",
    status: "Active",
    role: "User",
  },
  {
    id: 3,
    initials: "EA",
    name: "Era Ahmeti",
    email: "era@example.com",
    groups: 5,
    expenses: 41,
    joined: "Sep 29",
    status: "Active",
    role: "User",
  },
  {
    id: 4,
    initials: "DM",
    name: "Dren Morina",
    email: "dren@example.com",
    groups: 1,
    expenses: 7,
    joined: "Sep 28",
    status: "Inactive",
    role: "User",
  },
  {
    id: 5,
    initials: "AB",
    name: "Alba Berisha",
    email: "alba@example.com",
    groups: 4,
    expenses: 32,
    joined: "Sep 27",
    status: "Active",
    role: "User",
  },
  {
    id: 6,
    initials: "GN",
    name: "Genti Neziri",
    email: "genti@example.com",
    groups: 2,
    expenses: 15,
    joined: "Sep 26",
    status: "Active",
    role: "User",
  },
  {
    id: 7,
    initials: "AR",
    name: "Arta Rexhepi",
    email: "arta@example.com",
    groups: 6,
    expenses: 53,
    joined: "Sep 25",
    status: "Active",
    role: "User",
  },
  {
    id: 8,
    initials: "BM",
    name: "Besim Mustafa",
    email: "besim@example.com",
    groups: 0,
    expenses: 0,
    joined: "Sep 24",
    status: "Inactive",
    role: "User",
  },
];

function UsersPage() {
  return (
    <div className="users-page">
      <DashboardSidebar />

      <main className="users-main">
        <header className="users-header">
          <div>
            <span className="users-eyebrow">
              ADMIN / USERS
            </span>

            <h1>Users</h1>

            <p>
              Manage accounts and monitor user activity across
              Payo.
            </p>
          </div>

          <a href="/admin/users/new">
          <button className="users-add-button">
            <Plus size={16} />
            Add user
          </button>
          </a>
        </header>

        <section className="users-stats">
          <div className="users-stat-card">
            <div className="users-stat-icon">
              <Users size={17} />
            </div>

            <div>
              <span>Total users</span>
              <strong>2,481</strong>
            </div>
          </div>

          <div className="users-stat-card">
            <div className="users-stat-icon users-stat-icon-green">
              <UserCheck size={17} />
            </div>

            <div>
              <span>Active users</span>
              <strong>1,892</strong>
            </div>
          </div>

          <div className="users-stat-card">
            <div className="users-stat-icon users-stat-icon-red">
              <UserX size={17} />
            </div>

            <div>
              <span>Inactive</span>
              <strong>589</strong>
            </div>
          </div>

          <div className="users-stat-card">
            <div className="users-stat-icon">
              <ShieldCheck size={17} />
            </div>

            <div>
              <span>Admins</span>
              <strong>8</strong>
            </div>
          </div>
        </section>

        <section className="users-panel">
          <div className="users-panel-header">
            <div>
              <h2>All users</h2>
              <p>
                Recently registered and existing Payo accounts.
              </p>
            </div>

            <span className="users-count">
              2,481 total
            </span>
          </div>

          <div className="users-toolbar">
            <div className="users-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search by name or email..."
              />
            </div>

            <div className="users-filters">
              <button className="users-filter">
                Status
                <ChevronDown size={14} />
              </button>

              <button className="users-filter">
                Role
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="users-table">
            <div className="users-table-head">
              <span>User</span>
              <span>Groups</span>
              <span>Expenses</span>
              <span>Joined</span>
              <span>Status</span>
              <span>Role</span>
              <span />
            </div>

            {users.map((user) => (
              <div className="users-table-row" key={user.id}>
                <div className="users-user-cell">
                  <div className="users-avatar">
                    {user.initials}
                  </div>

                  <div className="users-user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                <span className="users-table-value">
                  {user.groups}
                </span>

                <span className="users-table-value">
                  {user.expenses}
                </span>

                <span className="users-table-value">
                  {user.joined}
                </span>

                <span
                  className={`users-status ${
                    user.status === "Active"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <i />
                  {user.status}
                </span>

                <span className="users-role">
                  {user.role}
                </span>

                <button className="users-more">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="users-footer">
            <span>Showing 8 of 2,481 users</span>

            <div className="users-pagination">
              <button disabled>Previous</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>311</button>
              <button>Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UsersPage;