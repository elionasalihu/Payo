
import { useEffect, useMemo, useState } from "react";
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

import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";

import AdminSidebar from "../../sections/DashboardSidebar";
import "../../styles/admin/Dashboard.css";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function timeAgo(dateString) {
  if (!dateString) return "Recently";

  const difference = Math.max(
    0,
    Date.now() - new Date(dateString).getTime()
  );

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatDate(dateString) {
  if (!dateString) return "—";

  const date = new Date(dateString);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

function getInitials(name) {
  if (!name) return "U";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getMonthlyUsers(profiles, period) {
  const now = new Date();
  const months = [];

  for (let i = period - 1; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    months.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      label: MONTHS[date.getMonth()],
      value: 0,
    });
  }

  profiles.forEach((profile) => {
    if (!profile.created_at) return;

    const created = new Date(profile.created_at);

    const month = months.find(
      (item) =>
        item.year === created.getFullYear() &&
        item.month === created.getMonth()
    );

    if (month) month.value += 1;
  });

  return months;
}

function AdminDashboard() {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    profiles: [],
    roles: [],
    groups: [],
    expenses: [],
    memberships: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("12");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const [
          profilesResult,
          rolesResult,
          groupsResult,
          expensesResult,
          membershipsResult,
        ] = await Promise.all([
          supabase
            .from("profiles")
            .select("id, full_name, username, created_at")
            .order("created_at", { ascending: false }),

          supabase
            .from("user_roles")
            .select("user_id, role"),

          supabase
            .from("groups")
            .select("id, name, created_at"),

          supabase
            .from("expenses")
            .select("id, title, amount, created_at"),

          supabase
            .from("group_members")
            .select("group_id, user_id"),
        ]);

        const results = [
          profilesResult,
          rolesResult,
          groupsResult,
          expensesResult,
          membershipsResult,
        ];

        const failed = results.find((result) => result.error);

        if (failed) {
          throw failed.error;
        }

        if (cancelled) return;

        setDashboardData({
          profiles: profilesResult.data ?? [],
          roles: rolesResult.data ?? [],
          groups: groupsResult.data ?? [],
          expenses: expensesResult.data ?? [],
          memberships: membershipsResult.data ?? [],
        });
      } catch (err) {
        console.error("Admin dashboard error:", err);

        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load dashboard data from Supabase."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const {
    profiles,
    roles,
    groups,
    expenses,
    memberships,
  } = dashboardData;

  const profileById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles]
  );

  const roleById = useMemo(
    () => new Map(roles.map((item) => [item.user_id, item.role])),
    [roles]
  );

  const currentProfile = user
    ? profileById.get(user.id)
    : null;

  const adminName =
    currentProfile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const clientCount = roles.filter(
    (item) => item.role === "user"
  ).length;

  const totalExpenseAmount = expenses.reduce(
    (total, expense) => total + (Number(expense.amount) || 0),
    0
  );

  const groupCountByUser = useMemo(() => {
    const counts = new Map();

    memberships.forEach((membership) => {
      counts.set(
        membership.user_id,
        (counts.get(membership.user_id) || 0) + 1
      );
    });

    return counts;
  }, [memberships]);

  const chartData = useMemo(
    () => getMonthlyUsers(profiles, Number(period)),
    [profiles, period]
  );

  const maxValue = Math.max(
    1,
    ...chartData.map((item) => item.value)
  );

  const recentUsers = profiles.slice(0, 5).map((profile) => ({
    id: profile.id,
    name: profile.full_name || profile.username || "Payo user",
    username: profile.username
      ? `@${profile.username}`
      : "Registered account",
    initials: getInitials(
      profile.full_name || profile.username
    ),
    groups: groupCountByUser.get(profile.id) || 0,
    joined: formatDate(profile.created_at),
    status: roleById.has(profile.id) ? "Active" : "Pending",
  }));

  const activity = useMemo(() => {
    const items = [
      ...profiles.map((profile) => ({
        id: `user-${profile.id}`,
        title: "New user registered",
        description:
          `${profile.full_name || profile.username || "A user"} joined Payo`,
        time: profile.created_at,
        icon: UserPlus,
      })),

      ...groups.map((group) => ({
        id: `group-${group.id}`,
        title: "New group created",
        description: group.name || "New group",
        time: group.created_at,
        icon: Users,
      })),

      ...expenses.map((expense) => ({
        id: `expense-${expense.id}`,
        title: "Expense added",
        description:
          `${expense.title || "Expense"} · ${formatMoney(expense.amount)}`,
        time: expense.created_at,
        icon: WalletCards,
      })),
    ];

    return items
      .filter((item) => item.time)
      .sort(
        (a, b) =>
          new Date(b.time).getTime() -
          new Date(a.time).getTime()
      )
      .slice(0, 4);
  }, [profiles, groups, expenses]);

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
              Welcome back, <strong>{adminName}.</strong>
            </h1>

            <p>Here’s what’s happening across Payo today.</p>
          </div>

          <div className="admin-header-actions">
            <button
              className="admin-search-button"
              type="button"
              onClick={() =>
                document
                  .querySelector(".admin-users-table")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Search size={16} />
              <span>Search</span>
              <kbd>⌘ K</kbd>
            </button>

            <Link to="/admin/users/new" className="users-add-button">
              <Plus size={16} />
              Add user
            </Link>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            style={{
              padding: "14px 16px",
              marginBottom: 20,
              borderRadius: 10,
              background: "#fff1f0",
              color: "#a12622",
              fontSize: 14,
            }}
          >
            <strong>Couldn't load all dashboard data.</strong>
            <p style={{ margin: "6px 0 0" }}>{error}</p>
            <p style={{ margin: "6px 0 0" }}>
              Check your Supabase SELECT permissions and RLS policies.
            </p>
          </div>
        )}

        {/* STATISTICS */}
        <section className="admin-stat-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total users</span>
              <div className="admin-stat-icon">
                <Users size={17} />
              </div>
            </div>

            <strong>{loading ? "—" : profiles.length.toLocaleString()}</strong>

            <div className="admin-stat-footer">
              <span>Registered profiles</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Client accounts</span>
              <div className="admin-stat-icon">
                <UserCheck size={17} />
              </div>
            </div>

            <strong>{loading ? "—" : clientCount.toLocaleString()}</strong>

            <div className="admin-stat-footer">
              <span>Accounts assigned the user role</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total expenses</span>
              <div className="admin-stat-icon">
                <WalletCards size={17} />
              </div>
            </div>

            <strong>
              {loading ? "—" : formatMoney(totalExpenseAmount)}
            </strong>

            <div className="admin-stat-footer">
              <span>{expenses.length.toLocaleString()} recorded expenses</span>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-top">
              <span>Total groups</span>
              <div className="admin-stat-icon">
                <Users size={17} />
              </div>
            </div>

            <strong>{loading ? "—" : groups.length.toLocaleString()}</strong>

            <div className="admin-stat-footer">
              <span>Created on Payo</span>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="admin-dashboard-grid">
          {/* CHART */}
          <div className="admin-panel admin-chart-panel">
            <div className="admin-panel-header">
              <div>
                <h2>User registrations</h2>
                <p>New profiles created over time</p>
              </div>

              <select
                className="admin-period-select"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                aria-label="Chart time period"
              >
                <option value="12">Last 12 months</option>
                <option value="6">Last 6 months</option>
                <option value="3">Last 3 months</option>
              </select>
            </div>

            <div className="admin-chart">
              <div className="admin-chart-y">
                <span>{maxValue}</span>
                <span>{Math.ceil(maxValue * 0.75)}</span>
                <span>{Math.ceil(maxValue * 0.5)}</span>
                <span>{Math.ceil(maxValue * 0.25)}</span>
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
                  {chartData.map((item, index) => (
                    <div
                      className="admin-chart-column"
                      key={`${item.year}-${item.month}`}
                      title={`${item.label} ${item.year}: ${item.value} registrations`}
                    >
                      <div
                        className="admin-chart-bar"
                        style={{
                          height: `${(item.value / maxValue) * 100}%`,
                        }}
                      />

                      <span>{item.label}</span>
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
                <p>Latest recorded registrations, groups and expenses</p>
              </div>

              <Activity size={17} />
            </div>

            <div className="admin-activity-list">
              {!loading && activity.length === 0 && (
                <p style={{ padding: 16, fontSize: 14 }}>
                  No activity to display yet.
                </p>
              )}

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

                    <time>{timeAgo(item.time)}</time>
                  </div>
                );
              })}
            </div>

            <Link
              to="/admin/activity"
              className="admin-view-activity"
            >
              View all activity
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        {/* RECENT USERS */}
        <section className="admin-panel admin-users-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Recent users</h2>
              <p>Recently registered Payo accounts</p>
            </div>

            <Link to="/admin/users" className="admin-view-all">
              View all users
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="admin-users-table">
            <div className="admin-table-head">
              <span>User</span>
              <span>Groups</span>
              <span>Joined</span>
              <span>Status</span>
              <span />
            </div>

            {loading && (
              <p style={{ padding: 20, fontSize: 14 }}>
                Loading users...
              </p>
            )}

            {!loading && recentUsers.length === 0 && (
              <p style={{ padding: 20, fontSize: 14 }}>
                No profiles found. Check whether profiles are created
                when users register.
              </p>
            )}

            {!loading &&
              recentUsers.map((profile) => (
                <div className="admin-table-row" key={profile.id}>
                  <div className="admin-user-cell">
                    <div className="admin-user-avatar">
                      {profile.initials}
                    </div>

                    <div>
                      <strong>{profile.name}</strong>
                      <span>{profile.username}</span>
                    </div>
                  </div>

                  <span className="admin-table-text">
                    {profile.groups}
                  </span>

                  <span className="admin-table-text">
                    {profile.joined}
                  </span>

                  <span
                    className={`admin-user-status ${
                      profile.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    <i />
                    {profile.status}
                  </span>

                  <button
                    className="admin-more-button"
                    type="button"
                    aria-label={`More options for ${profile.name}`}
                    onClick={() =>
                      navigator.clipboard?.writeText(profile.id)
                    }
                    title="Copy user ID"
                  >
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
