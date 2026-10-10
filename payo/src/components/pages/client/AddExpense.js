
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Coffee,
  CreditCard,
  Home,
  Plane,
  Plus,
  Receipt,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wallet,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../../sections/DashboardSidebar";
import "../../styles/client/AddExpense.css";

const categories = [
  { name: "Food & dining", icon: Utensils, color: "green" },
  { name: "Groceries", icon: ShoppingBag, color: "orange" },
  { name: "Transport", icon: Plane, color: "blue" },
  { name: "Housing", icon: Home, color: "purple" },
  { name: "Coffee", icon: Coffee, color: "brown" },
  { name: "Shopping", icon: CreditCard, color: "pink" },
  { name: "Other", icon: Receipt, color: "gray" },
];

const initialGroups = [
  {
    id: "weekend",
    name: "Prishtina Weekend",
    members: [
      { id: "elsa", name: "Elsa Tahiri", initials: "ET", color: "green" },
      { id: "ardit", name: "Ardit Krasniqi", initials: "AK", color: "blue" },
      { id: "era", name: "Era Ahmeti", initials: "EA", color: "purple" },
      { id: "leon", name: "Leon Berisha", initials: "LB", color: "orange" },
    ],
  },
  {
    id: "flat",
    name: "Flat 4B",
    members: [
      { id: "elsa", name: "Elsa Tahiri", initials: "ET", color: "green" },
      { id: "ardit", name: "Ardit Krasniqi", initials: "AK", color: "blue" },
      { id: "leon", name: "Leon Berisha", initials: "LB", color: "orange" },
    ],
  },
  {
    id: "university",
    name: "University Friends",
    members: [
      { id: "elsa", name: "Elsa Tahiri", initials: "ET", color: "green" },
      { id: "era", name: "Era Ahmeti", initials: "EA", color: "purple" },
      { id: "ardit", name: "Ardit Krasniqi", initials: "AK", color: "blue" },
    ],
  },
];

const initialCustomAmounts = {
  elsa: "25",
  ardit: "25",
  era: "25",
  leon: "25",
};

function money(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

function initialsFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export default function AddExpense() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & dining");
  const [groupId, setGroupId] = useState("weekend");
  const [paidBy, setPaidBy] = useState("elsa");
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [notes, setNotes] = useState("");
  const [splitMethod, setSplitMethod] = useState("equal");
  const [selectedMemberIds, setSelectedMemberIds] = useState([
    "elsa",
    "ardit",
    "era",
    "leon",
  ]);
  const [customAmounts, setCustomAmounts] = useState(initialCustomAmounts);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedExpense, setSavedExpense] = useState(null);
  const [errors, setErrors] = useState({});

  const selectedGroup =
    initialGroups.find((group) => group.id === groupId) || initialGroups[0];

  const members = selectedGroup.members;
  const selectedMembers = members.filter((member) =>
    selectedMemberIds.includes(member.id)
  );

  const totalAmount = Math.max(0, Number(amount) || 0);

  const customTotal = selectedMembers.reduce(
    (sum, member) => sum + Math.max(0, Number(customAmounts[member.id]) || 0),
    0
  );

  const remainingAmount = Math.round((totalAmount - customTotal) * 100) / 100;

  const shares = useMemo(() => {
    const currentMembers = selectedGroup.members.filter((member) =>
      selectedMemberIds.includes(member.id)
    );

    if (currentMembers.length === 0) return [];

    if (splitMethod === "custom") {
      return currentMembers.map((member) => ({
        ...member,
        share: Math.max(0, Number(customAmounts[member.id]) || 0),
      }));
    }

    const totalCents = Math.round(totalAmount * 100);
    const baseCents = Math.floor(totalCents / currentMembers.length);
    let extraCents = totalCents - baseCents * currentMembers.length;

    return currentMembers.map((member) => {
      const extra = extraCents > 0 ? 1 : 0;
      extraCents -= extra;

      return {
        ...member,
        share: (baseCents + extra) / 100,
      };
    });
  }, [
    selectedGroup,
    selectedMemberIds,
    splitMethod,
    customAmounts,
    totalAmount,
  ]);

  const selectedCategory =
    categories.find((item) => item.name === category) || categories[0];
  const CategoryIcon = selectedCategory.icon;

  const canSaveCustomSplit =
    splitMethod !== "custom" ||
    Math.abs(remainingAmount) < 0.005;

  const toggleMember = (memberId) => {
    setSelectedMemberIds((current) => {
      if (current.includes(memberId)) {
        return current.filter((id) => id !== memberId);
      }

      return [...current, memberId];
    });

    setErrors((current) => ({ ...current, members: "" }));
  };

  const changeGroup = (nextGroupId) => {
    const nextGroup = initialGroups.find((group) => group.id === nextGroupId);
    if (!nextGroup) return;

    setGroupId(nextGroupId);

    setSelectedMemberIds((current) => {
      const nextIds = current.filter((id) =>
        nextGroup.members.some((member) => member.id === id)
      );

      return nextIds.length > 0
        ? nextIds
        : nextGroup.members.map((member) => member.id);
    });

    setPaidBy((current) =>
      nextGroup.members.some((member) => member.id === current)
        ? current
        : nextGroup.members[0].id
    );

    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Enter a name for this expense.";
    }

    if (!amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      nextErrors.amount = "Enter an amount greater than zero.";
    }

    if (!date) {
      nextErrors.date = "Choose the expense date.";
    }

    if (selectedMemberIds.length === 0) {
      nextErrors.members = "Select at least one person to split with.";
    }

    if (splitMethod === "custom" && !canSaveCustomSplit) {
      nextErrors.split = "Custom shares must add up to the full expense.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setShowSuccess(false);
      return;
    }

    const expense = {
      title: title.trim(),
      amount: totalAmount,
      category,
      group: selectedGroup.name,
      paidBy: members.find((member) => member.id === paidBy)?.name || " Elsa Tahiri",
      date,
      notes: notes.trim(),
      split: shares.map((member) => ({
        name: member.name,
        amount: member.share,
      })),
    };

    setSavedExpense(expense);
    setShowSuccess(true);
    setErrors({});
  };

  const handleReset = () => {
    setTitle("");
    setAmount("");
    setCategory("Food & dining");
    setGroupId("weekend");
    setPaidBy("elsa");
    setDate(new Date().toLocaleDateString("en-CA"));
    setNotes("");
    setSplitMethod("equal");
    setSelectedMemberIds(["elsa", "ardit", "era", "leon"]);
    setCustomAmounts(initialCustomAmounts);
    setErrors({});
    setShowSuccess(false);
    setSavedExpense(null);
  };

  return (
    <div className="add-expense-page">
      <DashboardSidebar />

      <main className="add-expense-main">
        <div className="add-expense-container">
          <button
            type="button"
            className="add-expense-back"
            onClick={() => navigate("/dashboard/expenses")}
          >
            <ArrowLeft size={16} />
            Back to expenses
          </button>

          <header className="add-expense-header">
            <div>
              <span className="add-expense-eyebrow">EXPENSE MANAGEMENT</span>
              <h1>Add an expense</h1>
              <p>
                Keep shared spending organized. Add the details and decide how
                to split the cost.
              </p>
            </div>

            <div className="add-expense-header-icon">
              <Receipt size={24} strokeWidth={1.7} />
            </div>
          </header>

          {showSuccess && savedExpense && (
            <motion.section
              className="add-expense-success"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
            >
              <div className="add-expense-success-icon">
                <CheckCircle2 size={21} />
              </div>
              <div className="add-expense-success-copy">
                <strong>Expense ready!</strong>
                <span>
                  {savedExpense.title} · {money(savedExpense.amount)} ·{" "}
                  {savedExpense.group}
                </span>
                <small>
                  Demo mode: this expense has not been saved to a database.
                </small>
              </div>
              <button
                type="button"
                className="add-expense-success-close"
                onClick={() => setShowSuccess(false)}
                aria-label="Dismiss success message"
              >
                <X size={17} />
              </button>
            </motion.section>
          )}

          <form className="add-expense-layout" onSubmit={handleSubmit} noValidate>
            <div className="add-expense-form-column">
              <section className="add-expense-card">
                <div className="add-expense-card-heading">
                  <div className="add-expense-step">01</div>
                  <div>
                    <h2>Expense details</h2>
                    <p>What was the money spent on?</p>
                  </div>
                </div>

                <div className="add-expense-field">
                  <label htmlFor="expense-title">
                    Expense name <span>*</span>
                  </label>
                  <input
                    id="expense-title"
                    type="text"
                    placeholder="e.g. Dinner at the restaurant"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      setErrors((current) => ({ ...current, title: "" }));
                    }}
                    maxLength={100}
                    aria-invalid={Boolean(errors.title)}
                  />
                  {errors.title && (
                    <small className="add-expense-error">{errors.title}</small>
                  )}
                </div>

                <div className="add-expense-field">
                  <label htmlFor="expense-amount">
                    Total amount <span>*</span>
                  </label>
                  <div
                    className={`add-expense-amount-input ${
                      errors.amount ? "has-error" : ""
                    }`}
                  >
                    <span className="add-expense-currency">€</span>
                    <input
                      id="expense-amount"
                      type="number"
                      inputMode="decimal"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(event) => {
                        setAmount(event.target.value);
                        setErrors((current) => ({
                          ...current,
                          amount: "",
                          split: "",
                        }));
                      }}
                      aria-invalid={Boolean(errors.amount)}
                    />
                    <span className="add-expense-currency-label">EUR</span>
                  </div>
                  {errors.amount && (
                    <small className="add-expense-error">{errors.amount}</small>
                  )}
                </div>

                <div className="add-expense-field">
                  <label>Category</label>
                  <div className="add-expense-category-grid">
                    {categories.map((item) => {
                      const Icon = item.icon;
                      const active = category === item.name;

                      return (
                        <button
                          type="button"
                          key={item.name}
                          className={`add-expense-category ${
                            active ? "is-selected" : ""
                          }`}
                          onClick={() => setCategory(item.name)}
                          aria-pressed={active}
                        >
                          <span className={`add-expense-category-icon ${item.color}`}>
                            <Icon size={17} />
                          </span>
                          <span>{item.name}</span>
                          {active && (
                            <Check
                              size={13}
                              className="add-expense-category-check"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="add-expense-fields-row">
                  <div className="add-expense-field">
                    <label htmlFor="expense-date">
                      Date <span>*</span>
                    </label>
                    <input
                      id="expense-date"
                      type="date"
                      value={date}
                      onChange={(event) => {
                        setDate(event.target.value);
                        setErrors((current) => ({ ...current, date: "" }));
                      }}
                      aria-invalid={Boolean(errors.date)}
                    />
                    {errors.date && (
                      <small className="add-expense-error">{errors.date}</small>
                    )}
                  </div>

                  <div className="add-expense-field">
                    <label htmlFor="expense-group">Group</label>
                    <div className="add-expense-select-wrap">
                      <Users size={16} />
                      <select
                        id="expense-group"
                        value={groupId}
                        onChange={(event) => changeGroup(event.target.value)}
                      >
                        {initialGroups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>

                <div className="add-expense-field">
                  <label htmlFor="expense-paid-by">Paid by</label>
                  <div className="add-expense-select-wrap">
                    <Wallet size={16} />
                    <select
                      id="expense-paid-by"
                      value={paidBy}
                      onChange={(event) => setPaidBy(event.target.value)}
                    >
                      {members.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} />
                  </div>
                  <small className="add-expense-field-hint">
                    Choose the person who paid the full amount.
                  </small>
                </div>

                <div className="add-expense-field add-expense-notes-field">
                  <label htmlFor="expense-notes">Notes (optional)</label>
                  <textarea
                    id="expense-notes"
                    placeholder="Add a note about this expense..."
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    maxLength={400}
                  />
                  <div className="add-expense-character-count">
                    {notes.length}/400
                  </div>
                </div>
              </section>

              <section className="add-expense-card">
                <div className="add-expense-card-heading">
                  <div className="add-expense-step">02</div>
                  <div>
                    <h2>Split the expense</h2>
                    <p>Choose who shares this expense and how.</p>
                  </div>
                </div>

                <div className="add-expense-split-options">
                  <button
                    type="button"
                    className={`add-expense-split-option ${
                      splitMethod === "equal" ? "is-selected" : ""
                    }`}
                    onClick={() => {
                      setSplitMethod("equal");
                      setErrors((current) => ({ ...current, split: "" }));
                    }}
                    aria-pressed={splitMethod === "equal"}
                  >
                    <div className="add-expense-split-option-icon">
                      <Users size={18} />
                    </div>
                    <div>
                      <strong>Split equally</strong>
                      <span>Everyone pays the same share</span>
                    </div>
                    <span className="add-expense-radio">
                      {splitMethod === "equal" && <span />}
                    </span>
                  </button>

                  <button
                    type="button"
                    className={`add-expense-split-option ${
                      splitMethod === "custom" ? "is-selected" : ""
                    }`}
                    onClick={() => {
                      setSplitMethod("custom");
                      setErrors((current) => ({ ...current, split: "" }));
                    }}
                    aria-pressed={splitMethod === "custom"}
                  >
                    <div className="add-expense-split-option-icon custom">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <strong>Custom amounts</strong>
                      <span>Set each person's exact share</span>
                    </div>
                    <span className="add-expense-radio">
                      {splitMethod === "custom" && <span />}
                    </span>
                  </button>
                </div>

                <div className="add-expense-members-heading">
                  <div>
                    <h3>Split with</h3>
                    <p>Select the people who share this expense.</p>
                  </div>
                  <span>
                    {selectedMembers.length} of {members.length}
                  </span>
                </div>

                <div className="add-expense-members">
                  {members.map((member) => {
                    const selected = selectedMemberIds.includes(member.id);
                    const share = shares.find((item) => item.id === member.id);

                    return (
                      <div
                        className={`add-expense-member ${
                          selected ? "is-selected" : ""
                        }`}
                        key={member.id}
                      >
                        <button
                          type="button"
                          className="add-expense-member-select"
                          onClick={() => toggleMember(member.id)}
                          aria-pressed={selected}
                        >
                          <span className={`add-expense-avatar ${member.color}`}>
                            {member.initials}
                          </span>
                          <span className="add-expense-member-name">
                            <strong>{member.name}</strong>
                            {member.id === paidBy && (
                              <small>Paid the bill</small>
                            )}
                          </span>
                          <span className="add-expense-checkbox">
                            {selected && <Check size={13} />}
                          </span>
                        </button>

                        {selected && splitMethod === "custom" && (
                          <div className="add-expense-custom-share">
                            <span>€</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              inputMode="decimal"
                              aria-label={`Share for ${member.name}`}
                              value={customAmounts[member.id] ?? ""}
                              onChange={(event) => {
                                setCustomAmounts((current) => ({
                                  ...current,
                                  [member.id]: event.target.value,
                                }));
                                setErrors((current) => ({
                                  ...current,
                                  split: "",
                                }));
                              }}
                            />
                          </div>
                        )}

                        {selected && splitMethod === "equal" && (
                          <span className="add-expense-member-share">
                            {money(share?.share || 0)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {errors.members && (
                  <small className="add-expense-error">{errors.members}</small>
                )}

                {splitMethod === "custom" && (
                  <div
                    className={`add-expense-remaining ${
                      canSaveCustomSplit ? "is-balanced" : "is-unbalanced"
                    }`}
                  >
                    <div>
                      <span>Assigned</span>
                      <strong>{money(customTotal)}</strong>
                    </div>
                    <div>
                      <span>{remainingAmount > 0 ? "Remaining" : "Difference"}</span>
                      <strong>{money(Math.abs(remainingAmount))}</strong>
                    </div>
                  </div>
                )}

                {errors.split && (
                  <small className="add-expense-error">{errors.split}</small>
                )}
              </section>

              <div className="add-expense-form-actions">
                <button
                  type="button"
                  className="add-expense-cancel-button"
                  onClick={() => navigate("/dashboard/expenses")}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-expense-submit-button"
                >
                  <Plus size={17} />
                  Add expense
                  <ArrowRight size={16} />
                </button>
              </div>

              <p className="add-expense-demo-note">
                <CircleHelp size={14} />
                Demo version — expenses are not yet saved to a database.
              </p>
            </div>

            <aside className="add-expense-preview-column">
              <div className="add-expense-preview-card">
                <div className="add-expense-preview-top">
                  <span className="add-expense-preview-label">
                    EXPENSE PREVIEW
                  </span>
                  <span className="add-expense-preview-badge">
                    <Sparkles size={12} />
                    Live
                  </span>
                </div>

                <div className="add-expense-preview-icon">
                  <CategoryIcon size={24} />
                </div>

                <h2>{title.trim() || "Your expense name"}</h2>
                <p className="add-expense-preview-category">
                  {category} <span>·</span> {selectedGroup.name}
                </p>

                <div className="add-expense-preview-amount">
                  {money(totalAmount)}
                </div>
                <span className="add-expense-preview-caption">
                  Total expense amount
                </span>

                <div className="add-expense-preview-divider" />

                <div className="add-expense-preview-summary">
                  <span>Paid by</span>
                  <strong>
                    {members.find((member) => member.id === paidBy)?.name ||
                      "Elsa Tahiri"}
                  </strong>
                </div>

                <div className="add-expense-preview-summary">
                  <span>Split method</span>
                  <strong>
                    {splitMethod === "equal" ? "Equal split" : "Custom split"}
                  </strong>
                </div>

                <div className="add-expense-preview-summary">
                  <span>People included</span>
                  <strong>{selectedMembers.length} people</strong>
                </div>

                <div className="add-expense-preview-divider" />

                <div className="add-expense-preview-split-heading">
                  <h3>Each person's share</h3>
                  <span>{selectedMembers.length} members</span>
                </div>

                {shares.length > 0 ? (
                  <div className="add-expense-preview-members">
                    {shares.map((member) => (
                      <div
                        className="add-expense-preview-member"
                        key={member.id}
                      >
                        <span className={`add-expense-avatar ${member.color}`}>
                          {member.initials}
                        </span>
                        <span className="add-expense-preview-member-name">
                          {member.name}
                          {member.id === paidBy && (
                            <small>Paid by this person</small>
                          )}
                        </span>
                        <strong>{money(member.share)}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="add-expense-preview-empty">
                    Select at least one person to see the split.
                  </div>
                )}

                {splitMethod === "custom" && (
                  <div
                    className={`add-expense-preview-total ${
                      canSaveCustomSplit ? "is-balanced" : "is-unbalanced"
                    }`}
                  >
                    <span>Custom split total</span>
                    <strong>{money(customTotal)}</strong>
                    <small>
                      {canSaveCustomSplit
                        ? "The shares match the total."
                        : `${money(Math.abs(remainingAmount))} ${
                            remainingAmount > 0 ? "still needs assigning" : "over the expense total"
                          }.`}
                    </small>
                  </div>
                )}

                <div className="add-expense-preview-tip">
                  <div>
                    <Sparkles size={15} />
                  </div>
                  <p>
                    {splitMethod === "equal"
                      ? "Payo divides the total as evenly as possible. Any extra cent is distributed fairly."
                      : "Adjust each person's share until the assigned amounts match the full expense."}
                  </p>
                </div>
              </div>

              <div className="add-expense-security-note">
                <div className="add-expense-security-icon">
                  <CheckCircle2 size={17} />
                </div>
                <div>
                  <strong>Stay in control</strong>
                  <p>
                    Review the total and every share before adding your
                    expense.
                  </p>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>
    </div>
  );
}
