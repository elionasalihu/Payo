import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Filter,
  Plus,
  ReceiptText,
  UserPlus,
  Users,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/client/Activity.css";

const activity = [
  {
    id: 1,
    type: "expense_added",
    title: "You added an expense",
    description: "Dinner at Artigiano",
    group: "Trip to Tirana",
    amount: "€48.50",
    time: "Today, 8:42 PM",
    icon: ReceiptText,
    tone: "green",
  },
  {
    id: 2,
    type: "payment_received",
    title: "You were paid back",
    description: "Ardit settled his share",
    group: "Trip to Tirana",
    amount: "+€24.50",
    time: "Today, 6:18 PM",
    icon: ArrowDownLeft,
    tone: "green",
  },
  {
    id: 3,
    type: "expense_added",
    title: "New expense added",
    description: "Hotel",
    group: "Trip to Tirana",
    amount: "€120.00",
    time: "Yesterday, 10:24 PM",
    icon: ReceiptText,
    tone: "gray",
  },
  {
    id: 4,
    type: "member_added",
    title: "New member joined",
    description: "Era joined the group",
    group: "Friday night",
    amount: null,
    time: "Yesterday, 4:12 PM",
    icon: UserPlus,
    tone: "blue",
  },
  {
    id: 5,
    type: "expense_added",
    title: "You added an expense",
    description: "Groceries",
    group: "House expenses",
    amount: "€64.20",
    time: "Sep 28, 7:36 PM",
    icon: ReceiptText,
    tone: "gray",
  },
  {
    id: 6,
    type: "payment_sent",
    title: "You paid back Leon",
    description: "Settlement completed",
    group: "Friday night",
    amount: "-€18.00",
    time: "Sep 27, 11:05 PM",
    icon: ArrowUpRight,
    tone: "red",
  },
  {
    id: 7,
    type: "group_created",
    title: "Group created",
    description: "University project",
    group: "University project",
    amount: null,
    time: "Sep 24, 2:41 PM",
    icon: Users,
    tone: "purple",
  },
  {
    id: 8,
    type: "expense_added",
    title: "New expense added",
    description: "Electricity bill",
    group: "House expenses",
    amount: "€75.40",
    time: "Sep 24, 10:13 AM",
    icon: ReceiptText,
    tone: "gray",
  },
];

const summary = [
  {
    label: "This month",
    value: "€368.10",
    description: "You paid",
    icon: CircleDollarSign,
  },
  {
    label: "You received",
    value: "€75.30",
    description: "From settlements",
    icon: ArrowDownLeft,
  },
  {
    label: "Settlements",
    value: "7",
    description: "Completed",
    icon: Check,
  },
];

function Activity() {
  return (
    <div className="activity-page">
      <DashboardSidebar />

      <main className="activity-main">
        <header className="activity-header">
          <div>
            <span className="activity-eyebrow">ACTIVITY</span>

            <h1>Your activity</h1>

            <p>
              Keep track of everything happening across your Payo groups.
            </p>
          </div>

          <button className="activity-add-button">
            <Plus size={16} />
            Add expense
          </button>
        </header>

        <section className="activity-summary">
          {summary.map((item) => {
            const Icon = item.icon;

            return (
              <div className="activity-summary-card" key={item.label}>
                <div className="activity-summary-icon">
                  <Icon size={17} />
                </div>

                <div className="activity-summary-content">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <small>{item.description}</small>
                </div>
              </div>
            );
          })}
        </section>

        <section className="activity-panel">
          <div className="activity-panel-header">
            <div>
              <h2>Recent activity</h2>

              <p>
                A timeline of your latest activity.
              </p>
            </div>

            <span className="activity-count">
              {activity.length} events
            </span>
          </div>

          <div className="activity-toolbar">
            <button className="activity-filter active">
              All activity
            </button>

            <button className="activity-filter">
              Expenses
            </button>

            <button className="activity-filter">
              Payments
            </button>

            <button className="activity-filter">
              Groups
            </button>

            <button className="activity-date-filter">
              <Filter size={14} />
              Filter
              <ChevronDown size={13} />
            </button>
          </div>

          <div className="activity-timeline">
            {activity.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="activity-item"
                  key={item.id}
                >
                  <div className="activity-item-rail">
                    <div
                      className={`activity-item-icon ${item.tone}`}
                    >
                      <Icon size={16} />
                    </div>

                    {index !== activity.length - 1 && (
                      <span className="activity-line" />
                    )}
                  </div>

                  <div className="activity-item-content">
                    <div className="activity-item-main">
                      <div>
                        <h3>{item.title}</h3>

                        <p>
                          {item.description}
                          {item.group && (
                            <>
                              <span className="activity-dot">
                                ·
                              </span>
                              {item.group}
                            </>
                          )}
                        </p>
                      </div>

                      {item.amount && (
                        <strong
                          className={`activity-amount ${
                            item.amount.startsWith("+")
                              ? "positive"
                              : item.amount.startsWith("-")
                              ? "negative"
                              : ""
                          }`}
                        >
                          {item.amount}
                        </strong>
                      )}
                    </div>

                    <span className="activity-time">
                      {item.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="activity-panel-footer">
            <span>
              Showing your latest {activity.length} activities
            </span>

            <button>
              View all activity
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Activity;