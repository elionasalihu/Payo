import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Users,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/client/Dashboard.css";

const recentExpenses = [
  {
    id: 1,
    title: "Dinner at Artigiano",
    group: "Trip to Tirana",
    person: "You",
    amount: 48.5,
    date: "Today",
    type: "paid",
  },
  {
    id: 2,
    title: "Hotel",
    group: "Trip to Tirana",
    person: "Ardit",
    amount: 120,
    date: "Yesterday",
    type: "owed",
  },
  {
    id: 3,
    title: "Groceries",
    group: "House expenses",
    person: "You",
    amount: 64.2,
    date: "Sep 28",
    type: "paid",
  },
  {
    id: 4,
    title: "Uber",
    group: "Friday night",
    person: "Leon",
    amount: 18,
    date: "Sep 27",
    type: "owed",
  },
];

const groups = [
  {
    name: "Trip to Tirana",
    members: 4,
    balance: "+€24.50",
    status: "positive",
    avatar: "T",
  },
  {
    name: "House expenses",
    members: 3,
    balance: "-€18.20",
    status: "negative",
    avatar: "H",
  },
  {
    name: "Friday night",
    members: 5,
    balance: "+€8.00",
    status: "positive",
    avatar: "F",
  },
];

function Dashboard() {
  return (
    <div className="dashboard-page">
      <DashboardSidebar />

      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">OVERVIEW</span>

            <h1>
              Good morning, <strong>Amar.</strong>
            </h1>

            <p>Here’s what’s happening with your shared expenses.</p>
          </div>

          <button className="dashboard-header-add">
            <Plus size={16} />
            Add expense
          </button>
        </header>

        {/* Balance cards */}
        <section className="dashboard-balance-grid">
          <div className="dashboard-balance-card dashboard-balance-main">
            <div className="dashboard-card-top">
              <span>Total balance</span>

              <div className="dashboard-card-icon">
                <ReceiptText size={17} />
              </div>
            </div>

            <div className="dashboard-balance-value">€142.80</div>

            <div className="dashboard-balance-footer">
              <span className="dashboard-positive">
                <ArrowUpRight size={13} />
                €32.50
              </span>

              <span>since last month</span>
            </div>
          </div>

          <div className="dashboard-balance-card">
            <div className="dashboard-card-top">
              <span>You owe</span>

              <div className="dashboard-card-icon dashboard-card-icon-red">
                <ArrowUpRight size={17} />
              </div>
            </div>

            <div className="dashboard-small-value">€38.20</div>

            <p className="dashboard-card-description">
              Across 2 groups
            </p>
          </div>

          <div className="dashboard-balance-card">
            <div className="dashboard-card-top">
              <span>You are owed</span>

              <div className="dashboard-card-icon dashboard-card-icon-green">
                <ArrowDownLeft size={17} />
              </div>
            </div>

            <div className="dashboard-small-value">€181.00</div>

            <p className="dashboard-card-description">
              Across 3 groups
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="dashboard-content-grid">
          {/* Recent expenses */}
          <div className="dashboard-panel dashboard-expenses-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Recent expenses</h2>
                <p>Your latest shared expenses</p>
              </div>

              <a href="#">
                View all
                <ChevronRight size={14} />
              </a>
            </div>

            <div className="dashboard-expense-list">
              {recentExpenses.map((expense) => (
                <div className="dashboard-expense" key={expense.id}>
                  <div className="dashboard-expense-icon">
                    <ReceiptText size={17} />
                  </div>

                  <div className="dashboard-expense-info">
                    <strong>{expense.title}</strong>

                    <span>
                      {expense.group} · {expense.date}
                    </span>
                  </div>

                  <div className="dashboard-expense-amount">
                    <strong
                      className={
                        expense.type === "owed"
                          ? "dashboard-positive"
                          : ""
                      }
                    >
                      {expense.type === "owed" ? "+" : "-"}€
                      {expense.amount.toFixed(2)}
                    </strong>

                    <span>
                      {expense.type === "owed"
                        ? `${expense.person} paid`
                        : "You paid"}
                    </span>
                  </div>

                  <button className="dashboard-expense-more">
                    <MoreHorizontal size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Groups */}
          <div className="dashboard-panel dashboard-groups-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Your groups</h2>
                <p>Where your money is shared</p>
              </div>

              <a href="#">
                View all
                <ChevronRight size={14} />
              </a>
            </div>

            <div className="dashboard-groups-list">
              {groups.map((group) => (
                <a href="#" className="dashboard-group-card" key={group.name}>
                  <div className="dashboard-group-card-avatar">
                    {group.avatar}
                  </div>

                  <div className="dashboard-group-card-info">
                    <strong>{group.name}</strong>

                    <span>
                      <Users size={12} />
                      {group.members} members
                    </span>
                  </div>

                  <div
                    className={`dashboard-group-balance ${group.status}`}
                  >
                    {group.balance}
                  </div>

                  <ChevronRight
                    className="dashboard-group-chevron"
                    size={15}
                  />
                </a>
              ))}
            </div>

            <button className="dashboard-new-group">
              <Plus size={15} />
              Create new group
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;