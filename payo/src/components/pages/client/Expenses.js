import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  ReceiptText,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/client/Expenses.css";

const expenses = [
  {
    id: 1,
    title: "Dinner at Artigiano",
    group: "Trip to Tirana",
    category: "Food",
    person: "You",
    amount: 48.5,
    date: "Today",
    type: "paid",
  },
  {
    id: 2,
    title: "Hotel",
    group: "Trip to Tirana",
    category: "Travel",
    person: "Ardit",
    amount: 120,
    date: "Yesterday",
    type: "owed",
  },
  {
    id: 3,
    title: "Groceries",
    group: "House expenses",
    category: "Food",
    person: "You",
    amount: 64.2,
    date: "Sep 28",
    type: "paid",
  },
  {
    id: 4,
    title: "Uber",
    group: "Friday night",
    category: "Transport",
    person: "Leon",
    amount: 18,
    date: "Sep 27",
    type: "owed",
  },
  {
    id: 5,
    title: "Airbnb",
    group: "Trip to Tirana",
    category: "Travel",
    person: "You",
    amount: 180,
    date: "Sep 26",
    type: "paid",
  },
  {
    id: 6,
    title: "Dinner",
    group: "Friday night",
    category: "Food",
    person: "Era",
    amount: 42,
    date: "Sep 25",
    type: "owed",
  },
  {
    id: 7,
    title: "Electricity bill",
    group: "House expenses",
    category: "Bills",
    person: "You",
    amount: 75.4,
    date: "Sep 24",
    type: "paid",
  },
  {
    id: 8,
    title: "Taxi",
    group: "Trip to Tirana",
    category: "Transport",
    person: "Ardit",
    amount: 22,
    date: "Sep 23",
    type: "owed",
  },
];

function Expenses() {
  return (
    <div className="expenses-page">
      <DashboardSidebar />

      <main className="expenses-main">
        <header className="expenses-header">
          <div>
            <span className="expenses-eyebrow">EXPENSES</span>

            <h1>Your expenses</h1>

            <p>
              Keep track of everything you’ve shared and paid.
            </p>
          </div>

          <button className="expenses-add-button">
            <Plus size={16} />
            Add expense
          </button>
        </header>

        <section className="expenses-summary">
          <div className="expenses-summary-card">
            <div className="expenses-summary-top">
              <span>Total spent</span>

              <div className="expenses-summary-icon">
                <ReceiptText size={17} />
              </div>
            </div>

            <strong>€570.10</strong>

            <span className="expenses-summary-description">
              Across 8 expenses
            </span>
          </div>

          <div className="expenses-summary-card">
            <div className="expenses-summary-top">
              <span>You paid</span>

              <div className="expenses-summary-icon">
                <ArrowUpRight size={17} />
              </div>
            </div>

            <strong>€368.10</strong>

            <span className="expenses-summary-description">
              4 expenses paid by you
            </span>
          </div>

          <div className="expenses-summary-card">
            <div className="expenses-summary-top">
              <span>You owe</span>

              <div className="expenses-summary-icon expenses-summary-icon-red">
                <ArrowDownLeft size={17} />
              </div>
            </div>

            <strong>€38.20</strong>

            <span className="expenses-summary-description">
              Across 2 groups
            </span>
          </div>
        </section>

        <section className="expenses-panel">
          <div className="expenses-panel-header">
            <div>
              <h2>All expenses</h2>
              <p>Every shared expense across your groups.</p>
            </div>

            <span className="expenses-count">
              {expenses.length} expenses
            </span>
          </div>

          <div className="expenses-toolbar">
            <div className="expenses-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search expenses..."
              />
            </div>

            <div className="expenses-filters">
              <button className="expenses-filter-button">
                <CalendarDays size={15} />
                Date
                <ChevronDown size={14} />
              </button>

              <button className="expenses-filter-button">
                <SlidersHorizontal size={15} />
                Filter
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="expenses-list">
            {expenses.map((expense) => (
              <div className="expense-row" key={expense.id}>
                <div className="expense-row-icon">
                  <ReceiptText size={17} />
                </div>

                <div className="expense-row-info">
                  <strong>{expense.title}</strong>

                  <span>
                    {expense.group} · {expense.category}
                  </span>
                </div>

                <div className="expense-row-date">
                  {expense.date}
                </div>

                <div className="expense-row-person">
                  <span>
                    {expense.type === "paid"
                      ? "Paid by"
                      : "Paid by"}
                  </span>

                  <strong>{expense.person}</strong>
                </div>

                <div className="expense-row-amount">
                  <strong
                    className={
                      expense.type === "owed"
                        ? "expense-positive"
                        : ""
                    }
                  >
                    {expense.type === "owed" ? "+" : "-"}€
                    {expense.amount.toFixed(2)}
                  </strong>

                  <span>
                    {expense.type === "owed"
                      ? "You are owed"
                      : "You paid"}
                  </span>
                </div>

                <button className="expense-row-more">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="expenses-panel-footer">
            <span>
              Showing {expenses.length} of {expenses.length} expenses
            </span>

            <button>
              View activity
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Expenses;