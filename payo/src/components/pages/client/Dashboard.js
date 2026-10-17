
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Users,
} from "lucide-react";

import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";
import DashboardSidebar from "../../sections/DashboardSidebar";
import "../../styles/client/Dashboard.css";

const formatMoney = (amount, currency = "EUR") => {
  try {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency,
    }).format(Number(amount) || 0);
  } catch {
    return `${Number(amount || 0).toFixed(2)} ${currency}`;
  }
};

const formatDate = (date) => {
  if (!date) return "Recently";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Recently";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (parsedDate.toDateString() === today.toDateString()) {
    return "Today";
  }

  if (parsedDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

const getErrorMessage = (error) =>
  error?.message || "Something went wrong while loading your dashboard.";

function Dashboard() {
  const { user, loading: authLoading } = useAuth();

  const userId = user?.id;
  const email = user?.email;
  const metadataName = user?.user_metadata?.full_name;

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const loadDashboard = useCallback(
    async (signal) => {
      if (!userId) {
        setDashboardData(null);
        setLoading(false);
        return;
      }

      setError("");

      try {
        // 1. Fetch the authenticated user's profile.
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, username")
          .eq("id", userId)
          .maybeSingle();

        if (profileError) throw profileError;
        if (signal.aborted) return;

        // 2. Find the groups this user belongs to.
        const { data: memberships, error: membershipError } =
          await supabase
            .from("group_members")
            .select("group_id")
            .eq("user_id", userId);

        if (membershipError) throw membershipError;
        if (signal.aborted) return;

        const groupIds = [
          ...new Set(
            (memberships || [])
              .map((membership) => membership.group_id)
              .filter(Boolean)
          ),
        ];

        let groups = [];
        let expenses = [];
        let splits = [];
        let memberRows = [];

        // 3. Fetch groups, expenses, splits and group members.
        if (groupIds.length > 0) {
          const { data: groupData, error: groupsError } = await supabase
            .from("groups")
            .select("id, name, currency, created_at")
            .in("id", groupIds)
            .order("created_at", { ascending: false });

          if (groupsError) throw groupsError;

          groups = groupData || [];

          if (signal.aborted) return;

          const { data: expenseData, error: expensesError } =
            await supabase
              .from("expenses")
              .select(
                "id, group_id, title, amount, paid_by, expense_date, created_at"
              )
              .in("group_id", groupIds)
              .order("created_at", { ascending: false });

          if (expensesError) throw expensesError;

          expenses = expenseData || [];

          if (signal.aborted) return;

          const expenseIds = expenses.map((expense) => expense.id);

          const [splitsResult, membersResult] = await Promise.all([
            expenseIds.length > 0
              ? supabase
                  .from("expense_splits")
                  .select(
                    "id, expense_id, user_id, amount, is_settled"
                  )
                  .in("expense_id", expenseIds)
              : Promise.resolve({ data: [], error: null }),

            supabase
              .from("group_members")
              .select("group_id, user_id")
              .in("group_id", groupIds),
          ]);

          if (splitsResult.error) throw splitsResult.error;
          if (membersResult.error) throw membersResult.error;

          splits = splitsResult.data || [];
          memberRows = membersResult.data || [];
        }

        if (signal.aborted) return;

        // 4. Fetch profiles for people involved in these expenses.
        const relatedUserIds = [
          ...new Set([
            ...expenses.map((expense) => expense.paid_by),
            ...splits.map((split) => split.user_id),
          ]),
        ].filter(Boolean);

        let people = [];

        if (relatedUserIds.length > 0) {
          const { data: peopleData, error: peopleError } = await supabase
            .from("profiles")
            .select("id, full_name, username")
            .in("id", relatedUserIds);

          if (peopleError) throw peopleError;

          people = peopleData || [];
        }

        if (signal.aborted) return;

        const peopleById = Object.fromEntries(
          people.map((person) => [
            person.id,
            person.full_name?.trim() ||
              person.username?.trim() ||
              "Member",
          ])
        );

        const groupsById = Object.fromEntries(
          groups.map((group) => [group.id, group])
        );

        const expensesById = Object.fromEntries(
          expenses.map((expense) => [expense.id, expense])
        );

        // 5. Calculate balances from unsettled expense splits.
        let owedToMe = 0;
        let iOwe = 0;

        for (const split of splits) {
          if (split.is_settled) continue;

          const expense = expensesById[split.expense_id];

          if (!expense || split.user_id === expense.paid_by) {
            continue;
          }

          const amount = Number(split.amount) || 0;

          if (expense.paid_by === userId) {
            owedToMe += amount;
          }

          if (
            split.user_id === userId &&
            expense.paid_by !== userId
          ) {
            iOwe += amount;
          }
        }

        // 6. Prepare the latest expenses for the dashboard.
        const recentExpenses = expenses.slice(0, 4).map((expense) => {
          const group = groupsById[expense.group_id];

          const userSplit = splits.find(
            (split) =>
              split.expense_id === expense.id &&
              split.user_id === userId
          );

          const paidByMe = expense.paid_by === userId;

          let status = "other";

          if (paidByMe) {
            status = "paid";
          } else if (userSplit?.is_settled) {
            status = "settled";
          } else if (userSplit) {
            status = "owed";
          }

          return {
            id: expense.id,
            title: expense.title || "Untitled expense",
            groupName: group?.name || "Group",
            amount: Number(expense.amount) || 0,
            currency: group?.currency || "EUR",
            date: formatDate(
              expense.expense_date || expense.created_at
            ),
            paidBy: peopleById[expense.paid_by] || "Member",
            status,
          };
        });

        // 7. Summarize the user's groups.
        const groupSummaries = groups.slice(0, 3).map((group) => ({
          id: group.id,
          name: group.name,
          currency: group.currency || "EUR",
          members: memberRows.filter(
            (member) => member.group_id === group.id
          ).length,
        }));

        const displayName =
          profile?.full_name?.trim() ||
          profile?.username?.trim() ||
          metadataName ||
          email?.split("@")[0] ||
          "there";

        if (signal.aborted) return;

        setDashboardData({
          displayName,
          totalBalance: owedToMe - iOwe,
          owedToMe,
          iOwe,
          recentExpenses,
          groups: groupSummaries,
        });
      } catch (fetchError) {
        if (signal.aborted) return;

        console.error("Dashboard loading error:", fetchError);
        setError(getErrorMessage(fetchError));
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [userId, email, metadataName]
  );

  // Load data when authentication changes or the user retries.
  // This avoids repeatedly fetching because dashboard data changed.
  useEffect(() => {
    if (authLoading) return;

    const controller = new AbortController();

    if (!userId) {
      setDashboardData(null);
      setLoading(false);
      setError("");
      return () => controller.abort();
    }

    // Only show the full-page loader when there is no existing data.
    setLoading((currentLoading) =>
      dashboardData ? false : true
    );

    loadDashboard(controller.signal);

    return () => {
      controller.abort();
    };
  }, [
    authLoading,
    userId,
    refreshKey,
    loadDashboard,
  ]);

  if (authLoading || (loading && !dashboardData)) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-spinner" />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-loading">
        <p>Please log in to view your dashboard.</p>
        <Link to="/login">Go to login</Link>
      </div>
    );
  }

  const data = dashboardData || {
    displayName:
      metadataName || email?.split("@")[0] || "there",
    totalBalance: 0,
    owedToMe: 0,
    iOwe: 0,
    recentExpenses: [],
    groups: [],
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <header className="dashboard-header">
            <div>
              <p className="dashboard-eyebrow">YOUR OVERVIEW</p>
              <h1>
                Good to see you, {data.displayName.split(" ")[0]}.
              </h1>
              <p>
                Here's what's happening with your shared expenses.
              </p>
            </div>

            <Link
              to="/dashboard/expenses/new"
              className="dashboard-add-button"
            >
              <Plus size={18} />
              Add expense
            </Link>
          </header>

          {error && (
            <div className="dashboard-error" role="alert">
              <p>Unable to refresh your dashboard: {error}</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(!dashboardData);
                  setRefreshKey((key) => key + 1);
                }}
              >
                Try again
              </button>
            </div>
          )}

          <section className="dashboard-balance-grid">
            <article className="dashboard-balance-card dashboard-balance-primary">
              <div className="dashboard-card-top">
                <span>Total balance</span>
                <div className="dashboard-balance-icon">
                  <ReceiptText size={20} />
                </div>
              </div>

              <h2>{formatMoney(data.totalBalance)}</h2>

              <p>
                {data.totalBalance >= 0
                  ? "You're owed more than you owe"
                  : "You owe more than you're owed"}
              </p>
            </article>

            <article className="dashboard-balance-card">
              <div className="dashboard-card-top">
                <span>You owe</span>
                <div className="dashboard-balance-icon dashboard-icon-red">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              <h2>{formatMoney(data.iOwe)}</h2>
              <p>Outstanding amounts you need to pay</p>
            </article>

            <article className="dashboard-balance-card">
              <div className="dashboard-card-top">
                <span>You're owed</span>
                <div className="dashboard-balance-icon dashboard-icon-green">
                  <ArrowDownLeft size={20} />
                </div>
              </div>

              <h2>{formatMoney(data.owedToMe)}</h2>
              <p>Outstanding amounts others owe you</p>
            </article>
          </section>

          <section className="dashboard-sections-grid">
            <article className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2>Recent expenses</h2>
                  <p>Your latest shared transactions</p>
                </div>

                <Link
                  to="/dashboard/expenses"
                  className="dashboard-view-link"
                >
                  View all <ChevronRight size={16} />
                </Link>
              </div>

              {data.recentExpenses.length === 0 ? (
                <div className="dashboard-empty-state">
                  <ReceiptText size={28} />
                  <h3>No expenses yet</h3>
                  <p>
                    Add an expense to start tracking shared costs.
                  </p>
                  <Link to="/dashboard/expenses/new">
                    Add your first expense
                  </Link>
                </div>
              ) : (
                <div className="dashboard-expenses-list">
                  {data.recentExpenses.map((expense) => (
                    <div
                      className="dashboard-expense-row"
                      key={expense.id}
                    >
                      <div className="dashboard-expense-icon">
                        <ReceiptText size={19} />
                      </div>

                      <div className="dashboard-expense-info">
                        <h3>{expense.title}</h3>
                        <p>
                          {expense.groupName} · {expense.date}
                        </p>
                      </div>

                      <div className="dashboard-expense-amount">
                        <strong>
                          {formatMoney(
                            expense.amount,
                            expense.currency
                          )}
                        </strong>

                        <span
                          className={`dashboard-expense-status status-${expense.status}`}
                        >
                          {expense.status === "paid"
                            ? "Paid by you"
                            : expense.status === "owed"
                              ? "Your share is unpaid"
                              : expense.status === "settled"
                                ? "Settled"
                                : `Paid by ${expense.paidBy}`}
                        </span>
                      </div>

                      <Link
                        to="/dashboard/expenses"
                        className="dashboard-more-button"
                        aria-label={`View expenses including ${expense.title}`}
                      >
                        <MoreHorizontal size={20} />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </article>

            <article className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2>Your groups</h2>
                  <p>Shared spaces you're part of</p>
                </div>

                <Link
                  to="/dashboard/groups"
                  className="dashboard-view-link"
                >
                  View all <ChevronRight size={16} />
                </Link>
              </div>

              {data.groups.length === 0 ? (
                <div className="dashboard-empty-state">
                  <Users size={28} />
                  <h3>No groups yet</h3>
                  <p>
                    Create a group to start sharing expenses.
                  </p>
                  <Link to="/dashboard/groups">
                    Explore groups
                  </Link>
                </div>
              ) : (
                <div className="dashboard-groups-list">
                  {data.groups.map((group) => (
                    <Link
                      to="/dashboard/groups"
                      className="dashboard-group-row"
                      key={group.id}
                    >
                      <div className="dashboard-group-icon">
                        <Users size={20} />
                      </div>

                      <div className="dashboard-group-info">
                        <h3>{group.name}</h3>
                        <p>
                          {group.members}{" "}
                          {group.members === 1 ? "member" : "members"}
                        </p>
                      </div>

                      <ChevronRight size={18} />
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/dashboard/groups"
                className="dashboard-create-group-link"
              >
                <Plus size={17} />
                Create or join a group
              </Link>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
