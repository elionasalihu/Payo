import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CreditCard,
  Download,
  Users,
  Wallet,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/admin/Analytics.css";

const monthlyData = [
  { month: "Apr", users: 1320, expenses: 4200 },
  { month: "May", users: 1480, expenses: 5100 },
  { month: "Jun", users: 1610, expenses: 5800 },
  { month: "Jul", users: 1740, expenses: 6400 },
  { month: "Aug", users: 1840, expenses: 7200 },
  { month: "Sep", users: 1892, expenses: 8420 },
];

const categoryData = [
  { name: "Food & Dining", value: 34, amount: "€28.6K" },
  { name: "Travel", value: 24, amount: "€20.2K" },
  { name: "Bills", value: 18, amount: "€15.2K" },
  { name: "Transport", value: 13, amount: "€10.9K" },
  { name: "Entertainment", value: 7, amount: "€5.9K" },
  { name: "Other", value: 4, amount: "€3.4K" },
];

const topGroups = [
  {
    name: "Trip to Tirana",
    members: 4,
    expenses: 42,
    volume: "€1,248.50",
  },
  {
    name: "Summer vacation",
    members: 6,
    expenses: 31,
    volume: "€982.20",
  },
  {
    name: "House expenses",
    members: 3,
    expenses: 24,
    volume: "€746.80",
  },
  {
    name: "Friday night",
    members: 5,
    expenses: 18,
    volume: "€524.40",
  },
];

const recentActivity = [
  {
    title: "New user registrations",
    description: "42 new users joined Payo",
    value: "+42",
    time: "Today",
    type: "green",
  },
  {
    title: "Expense volume increased",
    description: "€1,240 more than yesterday",
    value: "+8.7%",
    time: "Today",
    type: "blue",
  },
  {
    title: "New groups created",
    description: "18 new groups were created",
    value: "+18",
    time: "Yesterday",
    type: "purple",
  },
  {
    title: "Settlements completed",
    description: "96 balances were settled",
    value: "96",
    time: "Yesterday",
    type: "orange",
  },
];

function Analytics() {
  const maxExpenses = Math.max(
    ...monthlyData.map((item) => item.expenses)
  );

  return (
    <div className="admin-analytics-page">
      <DashboardSidebar />

      <main className="admin-analytics-main">
        <div className="admin-analytics-container">

          {/* HEADER */}
          <header className="admin-analytics-header">
            <div>
              <span className="admin-analytics-eyebrow">
                ADMIN / ANALYTICS
              </span>

              <h1>Analytics</h1>

              <p>
                Understand how people use Payo and how shared
                expenses are growing.
              </p>
            </div>

            <div className="admin-analytics-header-actions">
              <button
                type="button"
                className="admin-analytics-date"
              >
                <CalendarDays size={16} />
                Last 6 months
              </button>

              <button
                type="button"
                className="admin-analytics-export"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </header>

          {/* STAT CARDS */}
          <section className="admin-analytics-stats">

            <motion.div
              className="admin-analytics-stat-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="admin-analytics-stat-top">
                <span>Total users</span>

                <div className="admin-analytics-stat-icon green">
                  <Users size={17} />
                </div>
              </div>

              <strong>2,481</strong>

              <div className="admin-analytics-stat-change positive">
                <ArrowUpRight size={14} />
                14.8%
                <span>vs last period</span>
              </div>
            </motion.div>

            <motion.div
              className="admin-analytics-stat-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.05,
              }}
            >
              <div className="admin-analytics-stat-top">
                <span>Expense volume</span>

                <div className="admin-analytics-stat-icon blue">
                  <Wallet size={17} />
                </div>
              </div>

              <strong>€84.2K</strong>

              <div className="admin-analytics-stat-change positive">
                <ArrowUpRight size={14} />
                8.7%
                <span>vs last period</span>
              </div>
            </motion.div>

            <motion.div
              className="admin-analytics-stat-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.1,
              }}
            >
              <div className="admin-analytics-stat-top">
                <span>Avg. expense</span>

                <div className="admin-analytics-stat-icon purple">
                  <CreditCard size={17} />
                </div>
              </div>

              <strong>€45.16</strong>

              <div className="admin-analytics-stat-change positive">
                <ArrowUpRight size={14} />
                3.2%
                <span>vs last period</span>
              </div>
            </motion.div>

            <motion.div
              className="admin-analytics-stat-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.15,
              }}
            >
              <div className="admin-analytics-stat-top">
                <span>Active rate</span>

                <div className="admin-analytics-stat-icon orange">
                  <BarChart3 size={17} />
                </div>
              </div>

              <strong>76.3%</strong>

              <div className="admin-analytics-stat-change negative">
                <ArrowDownRight size={14} />
                1.4%
                <span>vs last period</span>
              </div>
            </motion.div>

          </section>

          {/* MAIN ANALYTICS */}
          <section className="admin-analytics-grid">

            {/* GROWTH CHART */}
            <div className="admin-analytics-panel admin-analytics-chart-panel">

              <div className="admin-analytics-panel-header">
                <div>
                  <span className="admin-analytics-panel-label">
                    PLATFORM GROWTH
                  </span>

                  <h2>Users & expense volume</h2>
                </div>

                <div className="admin-analytics-legend">
                  <span>
                    <i className="legend-users" />
                    Users
                  </span>

                  <span>
                    <i className="legend-expenses" />
                    Expenses
                  </span>
                </div>
              </div>

              <div className="admin-analytics-chart">

                <div className="admin-chart-y-axis">
                  <span>10K</span>
                  <span>7.5K</span>
                  <span>5K</span>
                  <span>2.5K</span>
                  <span>0</span>
                </div>

                <div className="admin-chart-area">

                  <div className="admin-chart-grid-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="admin-chart-bars">

                    {monthlyData.map((item) => {
                      const expenseHeight =
                        (item.expenses / maxExpenses) * 100;

                      const userHeight =
                        (item.users / 2000) * 100;

                      return (
                        <div
                          className="admin-chart-column"
                          key={item.month}
                        >
                          <div className="admin-chart-values">

                            <span
                              className="admin-chart-bar expenses"
                              style={{
                                height: `${expenseHeight}%`,
                              }}
                              title={`€${item.expenses.toLocaleString()}`}
                            />

                            <span
                              className="admin-chart-bar users"
                              style={{
                                height: `${userHeight}%`,
                              }}
                              title={`${item.users} users`}
                            />

                          </div>

                          <span className="admin-chart-month">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY BREAKDOWN */}
            <div className="admin-analytics-panel">

              <div className="admin-analytics-panel-header">
                <div>
                  <span className="admin-analytics-panel-label">
                    EXPENSE BREAKDOWN
                  </span>

                  <h2>By category</h2>
                </div>

                <span className="admin-analytics-total">
                  €84.2K
                </span>
              </div>

              <div className="admin-category-list">

                {categoryData.map((category) => (
                  <div
                    className="admin-category-item"
                    key={category.name}
                  >
                    <div className="admin-category-info">
                      <span>{category.name}</span>
                      <strong>{category.amount}</strong>
                    </div>

                    <div className="admin-category-progress">
                      <span
                        style={{
                          width: `${category.value}%`,
                        }}
                      />
                    </div>

                    <small>{category.value}%</small>
                  </div>
                ))}

              </div>
            </div>

          </section>

          {/* BOTTOM GRID */}
          <section className="admin-analytics-bottom-grid">

            {/* TOP GROUPS */}
            <div className="admin-analytics-panel">

              <div className="admin-analytics-panel-header">
                <div>
                  <span className="admin-analytics-panel-label">
                    TOP GROUPS
                  </span>

                  <h2>Most active groups</h2>
                </div>

                <a href="/admin/users">
                  View users
                </a>
              </div>

              <div className="admin-groups-table">

                <div className="admin-groups-table-head">
                  <span>Group</span>
                  <span>Members</span>
                  <span>Expenses</span>
                  <span>Volume</span>
                </div>

                {topGroups.map((group, index) => (
                  <div
                    className="admin-groups-table-row"
                    key={group.name}
                  >
                    <div className="admin-group-name">

                      <span>{index + 1}</span>

                      <div>
                        <strong>{group.name}</strong>
                        <small>
                          Shared expense group
                        </small>
                      </div>

                    </div>

                    <span>{group.members}</span>
                    <span>{group.expenses}</span>
                    <strong>{group.volume}</strong>
                  </div>
                ))}

              </div>
            </div>

            {/* ACTIVITY */}
            <div className="admin-analytics-panel">

              <div className="admin-analytics-panel-header">
                <div>
                  <span className="admin-analytics-panel-label">
                    RECENT TRENDS
                  </span>

                  <h2>Platform activity</h2>
                </div>
              </div>

              <div className="admin-activity-list">

                {recentActivity.map((item) => (
                  <div
                    className="admin-activity-item"
                    key={item.title}
                  >
                    <div
                      className={`admin-activity-dot ${item.type}`}
                    />

                    <div className="admin-activity-content">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </div>

                    <div className="admin-activity-meta">
                      <strong>{item.value}</strong>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </section>

          {/* INSIGHT */}
          <section className="admin-analytics-insight">

            <div className="admin-insight-icon">
              <BarChart3 size={20} />
            </div>

            <div>
              <span>INSIGHT</span>

              <h3>
                Payo is growing steadily across both users and
                expense activity.
              </h3>

              <p>
                Expense volume increased 8.7% compared with the
                previous period, while user registrations grew
                14.8%.
              </p>
            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default Analytics;