import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  ReceiptText,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/admin/Expenses.css";

const expenses = [
  {
    id: 1,
    title: "Dinner at Artigiano",
    group: "Trip to Tirana",
    paidBy: "Era Ahmeti",
    email: "era@example.com",
    amount: 48.5,
    members: 4,
    category: "Food",
    date: "Today",
    status: "Settled",
  },
  {
    id: 2,
    title: "Hotel",
    group: "Trip to Tirana",
    paidBy: "Ardit Krasniqi",
    email: "ardit@example.com",
    amount: 120,
    members: 4,
    category: "Travel",
    date: "Yesterday",
    status: "Pending",
  },
  {
    id: 3,
    title: "Groceries",
    group: "House expenses",
    paidBy: "Era Ahmeti",
    email: "era@example.com",
    amount: 64.2,
    members: 3,
    category: "Food",
    date: "Sep 28",
    status: "Settled",
  },
  {
    id: 4,
    title: "Uber",
    group: "Friday night",
    paidBy: "Leon Berisha",
    email: "leon@example.com",
    amount: 18,
    members: 5,
    category: "Transport",
    date: "Sep 27",
    status: "Settled",
  },
  {
    id: 5,
    title: "Airbnb",
    group: "Trip to Tirana",
    paidBy: "Era Ahmeti",
    email: "era@example.com",
    amount: 180,
    members: 4,
    category: "Travel",
    date: "Sep 26",
    status: "Pending",
  },
  {
    id: 6,
    title: "Dinner",
    group: "Friday night",
    paidBy: "Era Ahmeti",
    email: "era@example.com",
    amount: 42,
    members: 5,
    category: "Food",
    date: "Sep 25",
    status: "Settled",
  },
  {
    id: 7,
    title: "Electricity bill",
    group: "House expenses",
    paidBy: "Era Ahmeti",
    email: "era@example.com",
    amount: 75.4,
    members: 3,
    category: "Bills",
    date: "Sep 24",
    status: "Pending",
  },
  {
    id: 8,
    title: "Taxi",
    group: "Trip to Tirana",
    paidBy: "Ardit Krasniqi",
    email: "ardit@example.com",
    amount: 22,
    members: 4,
    category: "Transport",
    date: "Sep 23",
    status: "Settled",
  },
  {
    id: 9,
    title: "Coffee",
    group: "University project",
    paidBy: "Genti Neziri",
    email: "genti@example.com",
    amount: 16.5,
    members: 4,
    category: "Food",
    date: "Sep 22",
    status: "Settled",
  },
  {
    id: 10,
    title: "Gas",
    group: "Apartment",
    paidBy: "Leon Berisha",
    email: "leon@example.com",
    amount: 55,
    members: 3,
    category: "Bills",
    date: "Sep 21",
    status: "Pending",
  },
];

function AdminExpenses() {
  return (
    <div className="admin-expenses-page">
      <DashboardSidebar />

      <main className="admin-expenses-main">
        <header className="admin-expenses-header">
          <div>
            <span className="admin-expenses-eyebrow">
              ADMIN / EXPENSES
            </span>

            <h1>Expenses</h1>

            <p>
              Monitor shared expenses and financial activity across Payo.
            </p>
          </div>

          <button className="admin-expenses-export">
            Export data
          </button>
        </header>

        <section className="admin-expenses-stats">
          <div className="admin-expenses-stat-card">
            <div className="admin-expenses-stat-top">
              <span>Total expenses</span>

              <div className="admin-expenses-stat-icon">
                <ReceiptText size={17} />
              </div>
            </div>

            <strong>18,642</strong>

            <div className="admin-expenses-stat-meta positive">
              <ArrowUpRight size={13} />
              12.4%
              <span>vs last month</span>
            </div>
          </div>

          <div className="admin-expenses-stat-card">
            <div className="admin-expenses-stat-top">
              <span>Total volume</span>

              <div className="admin-expenses-stat-icon green">
                <TrendingUp size={17} />
              </div>
            </div>

            <strong>€84.2K</strong>

            <div className="admin-expenses-stat-meta positive">
              <ArrowUpRight size={13} />
              8.7%
              <span>vs last month</span>
            </div>
          </div>

          <div className="admin-expenses-stat-card">
            <div className="admin-expenses-stat-top">
              <span>Average expense</span>

              <div className="admin-expenses-stat-icon">
                <ArrowDownRight size={17} />
              </div>
            </div>

            <strong>€45.16</strong>

            <div className="admin-expenses-stat-meta">
              <span>Per transaction</span>
            </div>
          </div>

          <div className="admin-expenses-stat-card">
            <div className="admin-expenses-stat-top">
              <span>Active users</span>

              <div className="admin-expenses-stat-icon">
                <Users size={17} />
              </div>
            </div>

            <strong>1,892</strong>

            <div className="admin-expenses-stat-meta">
              <span>With expense activity</span>
            </div>
          </div>
        </section>

        <section className="admin-expenses-panel">
          <div className="admin-expenses-panel-header">
            <div>
              <h2>All expenses</h2>

              <p>
                Every expense recorded across the Payo platform.
              </p>
            </div>

            <span className="admin-expenses-count">
              18,642 expenses
            </span>
          </div>

          <div className="admin-expenses-toolbar">
            <div className="admin-expenses-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search expenses, users or groups..."
              />
            </div>

            <div className="admin-expenses-filters">
              <button className="admin-expenses-filter">
                <CalendarDays size={15} />
                Date
                <ChevronDown size={14} />
              </button>

              <button className="admin-expenses-filter">
                Category
                <ChevronDown size={14} />
              </button>

              <button className="admin-expenses-filter">
                Status
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="admin-expenses-table-wrapper">
            <div className="admin-expenses-table">
              <div className="admin-expenses-table-head">
                <span>Expense</span>
                <span>Group</span>
                <span>Paid by</span>
                <span>Category</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Date</span>
                <span />
              </div>

              {expenses.map((expense) => (
                <div
                  className="admin-expenses-table-row"
                  key={expense.id}
                >
                  <div className="admin-expense-name">
                    <div className="admin-expense-icon">
                      <ReceiptText size={16} />
                    </div>

                    <div>
                      <strong>{expense.title}</strong>
                      <span>{expense.members} members</span>
                    </div>
                  </div>

                  <div className="admin-expense-group">
                    {expense.group}
                  </div>

                  <div className="admin-expense-user">
                    <div className="admin-expense-avatar">
                      {expense.paidBy
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <strong>{expense.paidBy}</strong>
                      <span>{expense.email}</span>
                    </div>
                  </div>

                  <span className="admin-expense-category">
                    {expense.category}
                  </span>

                  <strong className="admin-expense-amount">
                    €{expense.amount.toFixed(2)}
                  </strong>

                  <span
                    className={`admin-expense-status ${
                      expense.status === "Settled"
                        ? "settled"
                        : "pending"
                    }`}
                  >
                    <i />
                    {expense.status}
                  </span>

                  <span className="admin-expense-date">
                    {expense.date}
                  </span>

                  <button
                    className="admin-expense-more"
                    type="button"
                    aria-label={`More options for ${expense.title}`}
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-expenses-footer">
            <span>Showing 10 of 18,642 expenses</span>

            <div className="admin-expenses-pagination">
              <button disabled>Previous</button>

              <button className="active">1</button>
              <button>2</button>
              <button>3</button>

              <span>...</span>

              <button>1,865</button>

              <button>Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminExpenses;