
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Download,
  Layers3,
  Users,
  Wallet,
  TrendingUp,
  CircleDollarSign,
  Percent,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";
import "../../styles/admin/Analytics.css";

const analyticsData = {
  "7d": {
    label: "Last 7 days",
    dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    users: [24, 31, 28, 43, 39, 52, 61],
    expenses: [420, 580, 490, 720, 650, 890, 760],
    groups: [8, 12, 10, 15, 13, 18, 16],
    userTotal: "278",
    userChange: "+12.8%",
    expenseTotal: "€4,510",
    expenseChange: "+8.4%",
    groupTotal: "92",
    groupChange: "+6.2%",
    average: "€48.20",
    averageChange: "+3.1%",
  },
  "30d": {
    label: "Last 30 days",
    dates: ["Sep 11", "Sep 15", "Sep 19", "Sep 23", "Sep 27", "Oct 1", "Oct 5", "Oct 10"],
    users: [38, 46, 42, 58, 52, 69, 77, 91],
    expenses: [2400, 3100, 2750, 3900, 3400, 4600, 5100, 5900],
    groups: [12, 16, 14, 21, 18, 24, 27, 31],
    userTotal: "1,284",
    userChange: "+18.6%",
    expenseTotal: "€24,850",
    expenseChange: "+14.2%",
    groupTotal: "364",
    groupChange: "+11.5%",
    average: "€68.27",
    averageChange: "+4.8%",
  },
  "90d": {
    label: "Last 90 days",
    dates: ["Jul", "Mid Jul", "Aug", "Mid Aug", "Sep", "Mid Sep", "Oct"],
    users: [32, 44, 39, 57, 63, 76, 91],
    expenses: [8200, 10400, 9600, 12700, 14800, 17100, 20500],
    groups: [38, 46, 43, 57, 62, 75, 89],
    userTotal: "3,642",
    userChange: "+26.4%",
    expenseTotal: "€68,420",
    expenseChange: "+21.7%",
    groupTotal: "1,042",
    groupChange: "+19.3%",
    average: "€65.66",
    averageChange: "+5.6%",
  },
  "12m": {
    label: "Last 12 months",
    dates: ["Nov", "Jan", "Mar", "May", "Jul", "Aug", "Sep", "Oct"],
    users: [18, 25, 32, 40, 47, 58, 74, 91],
    expenses: [3800, 5100, 7400, 9800, 12300, 14900, 18400, 22100],
    groups: [14, 22, 31, 39, 47, 59, 73, 91],
    userTotal: "12,486",
    userChange: "+42.8%",
    expenseTotal: "€248,640",
    expenseChange: "+34.6%",
    groupTotal: "3,218",
    groupChange: "+29.1%",
    average: "€77.27",
    averageChange: "+8.2%",
  },
};

const categoryData = [
  { name: "Food & dining", amount: 8240, percentage: 34, color: "#20b86b" },
  { name: "Travel", amount: 6320, percentage: 26, color: "#6f8ef6" },
  { name: "Shopping", amount: 4370, percentage: 18, color: "#f3b34c" },
  { name: "Housing", amount: 2910, percentage: 12, color: "#a78bfa" },
  { name: "Other", amount: 2430, percentage: 10, color: "#b8c1cc" },
];

const topGroups = [
  { name: "Prishtina Weekend", members: 18, expenses: 142, total: 4280 },
  { name: "Flat 4B", members: 6, expenses: 96, total: 2160 },
  { name: "Summer in Albania", members: 12, expenses: 83, total: 1950 },
  { name: "University Friends", members: 9, expenses: 67, total: 1480 },
];

function formatEuro(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  description,
  tone,
  index,
}) {
  return (
    <motion.article
      className="analytics-metric-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <div className="analytics-metric-top">
        <div className={`analytics-metric-icon ${tone}`}>
          <Icon size={19} strokeWidth={1.9} />
        </div>
        <span className="analytics-metric-change">
          <ArrowUpRight size={14} />
          {change}
        </span>
      </div>

      <p className="analytics-metric-label">{label}</p>
      <h3 className="analytics-metric-value">{value}</h3>
      <p className="analytics-metric-description">{description}</p>
    </motion.article>
  );
}

function TrendChart({ data, dates, title, subtitle, type = "area" }) {
  const width = 700;
  const height = 230;
  const paddingX = 18;
  const paddingY = 20;
  const max = Math.max(...data) * 1.15;
  const min = 0;

  const points = data.map((value, index) => {
    const x =
      paddingX +
      (index * (width - paddingX * 2)) / Math.max(data.length - 1, 1);
    const y =
      height -
      paddingY -
      ((value - min) / (max - min || 1)) * (height - paddingY * 2);

    return { x, y, value, label: dates[index] };
  });

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `${paddingX},${height - paddingY} ${linePoints} ${
    width - paddingX
  },${height - paddingY}`;

  return (
    <section className="analytics-panel analytics-trend-panel">
      <div className="analytics-panel-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="analytics-chart-legend">
          <span className="analytics-legend-dot" />
          This period
        </span>
      </div>

      <div className="analytics-chart">
        <div className="analytics-chart-grid">
          <span />
          <span />
          <span />
          <span />
        </div>

        <svg
          className="analytics-chart-svg"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={title}
        >
          {type === "area" && (
            <polygon
              points={areaPoints}
              fill="url(#analyticsAreaGradient)"
            />
          )}

          <defs>
            <linearGradient
              id="analyticsAreaGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#20b86b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#20b86b" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          <polyline
            points={linePoints}
            fill="none"
            stroke="#20b86b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {points.map((point, index) => (
            <circle
              key={`${point.label}-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#ffffff"
              stroke="#20b86b"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      <div className="analytics-chart-labels">
        {dates.map((date, index) => (
          <span key={`${date}-${index}`}>{date}</span>
        ))}
      </div>
    </section>
  );
}

function ExpenseBars({ data, dates }) {
  const max = Math.max(...data);

  return (
    <div className="analytics-bars">
      {data.map((value, index) => (
        <div className="analytics-bar-column" key={`${dates[index]}-${index}`}>
          <div className="analytics-bar-track">
            <motion.div
              className="analytics-bar"
              initial={{ height: 0 }}
              animate={{ height: `${(value / max) * 100}%` }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              title={formatEuro(value)}
            />
          </div>
          <span className="analytics-bar-label">{dates[index]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Analytics() {
  const [period, setPeriod] = useState("30d");
  const [category, setCategory] = useState("all");

  const data = analyticsData[period];

  const totalCategoryAmount = categoryData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const visibleCategories = useMemo(() => {
    if (category === "all") return categoryData;
    return categoryData.filter((item) => item.name === category);
  }, [category]);

  const exportAnalytics = () => {
    const rows = [
      ["Metric", "Value", "Change"],
      ["Registered users", data.userTotal, data.userChange],
      ["Tracked expenses", data.expenseTotal, data.expenseChange],
      ["Active groups", data.groupTotal, data.groupChange],
      ["Average group size", data.average, data.averageChange],
      [],
      ["Expense category", "Amount (EUR)", "Share"],
      ...categoryData.map((item) => [
        item.name,
        item.amount,
        `${item.percentage}%`,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => {
            const value = String(cell ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `payo-analytics-${period}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="analytics-page">
      <DashboardSidebar />

      <main className="analytics-main">
        <div className="analytics-container">
          <header className="analytics-page-header">
            <div>
              <span className="analytics-eyebrow">PLATFORM INSIGHTS</span>
              <h1>Analytics</h1>
              <p>
                Understand your platform’s growth, spending patterns, and group
                activity.
              </p>
            </div>

            <div className="analytics-header-actions">
              <label className="analytics-period-select">
                <CalendarDays size={16} />
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  aria-label="Analytics time period"
                >
                  {Object.entries(analyticsData).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} />
              </label>

              <button
                type="button"
                className="analytics-export-button"
                onClick={exportAnalytics}
              >
                <Download size={16} />
                <span>Export report</span>
              </button>
            </div>
          </header>

          <section className="analytics-overview">
            <div className="analytics-section-title">
              <div>
                <h2>Platform overview</h2>
                <p>Key performance indicators for {data.label.toLowerCase()}.</p>
              </div>
              <span className="analytics-live-indicator">
                <span />
                Demo data
              </span>
            </div>

            <div className="analytics-metrics-grid">
              <MetricCard
                icon={Users}
                label="Registered users"
                value={data.userTotal}
                change={data.userChange}
                description="Compared with previous period"
                tone="green"
                index={0}
              />
              <MetricCard
                icon={Wallet}
                label="Expenses tracked"
                value={data.expenseTotal}
                change={data.expenseChange}
                description="Total recorded expense value"
                tone="blue"
                index={1}
              />
              <MetricCard
                icon={Layers3}
                label="Groups created"
                value={data.groupTotal}
                change={data.groupChange}
                description="Shared expense groups"
                tone="purple"
                index={2}
              />
              <MetricCard
                icon={CircleDollarSign}
                label="Average group value"
                value={data.average}
                change={data.averageChange}
                description="Average value per group"
                tone="orange"
                index={3}
              />
            </div>
          </section>

          <section className="analytics-growth-grid">
            <TrendChart
              data={data.users}
              dates={data.dates}
              title="User growth"
              subtitle="New user sign-ups over time"
            />

            <div className="analytics-panel analytics-expense-panel">
              <div className="analytics-panel-heading">
                <div>
                  <h2>Expense volume</h2>
                  <p>Recorded spending across the platform</p>
                </div>
                <div className="analytics-panel-icon">
                  <BarChart3 size={18} />
                </div>
              </div>

              <div className="analytics-expense-total">
                <strong>{data.expenseTotal}</strong>
                <span>
                  <ArrowUpRight size={14} />
                  {data.expenseChange}
                </span>
              </div>

              <ExpenseBars data={data.expenses} dates={data.dates} />

              <div className="analytics-chart-footnote">
                <span className="analytics-legend-dot" />
                Total expense value
              </div>
            </div>
          </section>

          <section className="analytics-lower-grid">
            <div className="analytics-panel analytics-category-panel">
              <div className="analytics-panel-heading">
                <div>
                  <h2>Spending by category</h2>
                  <p>Where users spend the most</p>
                </div>

                <label className="analytics-category-select">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    aria-label="Filter spending categories"
                  >
                    <option value="all">All categories</option>
                    {categoryData.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={13} />
                </label>
              </div>

              <div className="analytics-category-total">
                <span>Total categorized spending</span>
                <strong>
                  {formatEuro(
                    visibleCategories.reduce(
                      (sum, item) => sum + item.amount,
                      0
                    )
                  )}
                </strong>
              </div>

              <div className="analytics-category-list">
                {visibleCategories.map((item) => (
                  <div className="analytics-category-row" key={item.name}>
                    <div className="analytics-category-row-top">
                      <div className="analytics-category-name">
                        <span
                          className="analytics-category-dot"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.name}</span>
                      </div>
                      <div className="analytics-category-amount">
                        <strong>{formatEuro(item.amount)}</strong>
                        <span>{item.percentage}%</span>
                      </div>
                    </div>

                    <div className="analytics-category-track">
                      <div
                        className="analytics-category-fill"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="analytics-panel-footnote">
                Category breakdown uses illustrative demo values.
              </p>
            </div>

            <div className="analytics-panel analytics-groups-panel">
              <div className="analytics-panel-heading">
                <div>
                  <h2>Top performing groups</h2>
                  <p>Groups with the highest recorded spending</p>
                </div>
                <div className="analytics-panel-icon">
                  <TrendingUp size={18} />
                </div>
              </div>

              <div className="analytics-groups-list">
                {topGroups.map((group, index) => (
                  <div className="analytics-group-row" key={group.name}>
                    <div className="analytics-group-rank">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="analytics-group-info">
                      <strong>{group.name}</strong>
                      <span>
                        {group.members} members · {group.expenses} expenses
                      </span>
                    </div>

                    <div className="analytics-group-total">
                      {formatEuro(group.total)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="analytics-groups-footer">
                <span>Ranked by total expense value</span>
                <Percent size={15} />
              </div>
            </div>
          </section>

        
        </div>
      </main>
    </div>
  );
}
