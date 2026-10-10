
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Home,
  MapPin,
  Plus,
  Sparkles,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../../sections/DashboardSidebar";
import "../../styles/client/CreateGroup.css";

const groupTypes = [
  {
    id: "trip",
    label: "Trip",
    description: "Travel and adventures",
    icon: MapPin,
    color: "#eaf3ff",
    iconColor: "#3975d5",
  },
  {
    id: "household",
    label: "Household",
    description: "Shared living expenses",
    icon: Home,
    color: "#fff2e7",
    iconColor: "#d97736",
  },
  {
    id: "university",
    label: "University",
    description: "Friends and classmates",
    icon: GraduationCap,
    color: "#f0eaff",
    iconColor: "#805ad5",
  },
  {
    id: "other",
    label: "Other",
    description: "Anything you share",
    icon: Wallet,
    color: "#e5f8ed",
    iconColor: "#159456",
  },
];

const currencyOptions = [
  { value: "EUR", label: "EUR — Euro" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "GBP", label: "GBP — British Pound" },
  { value: "CHF", label: "CHF — Swiss Franc" },
];

const initialMembers = [
  {
    id: 1,
    name: "Elsa Tahiri",
    email: "elsa@example.com",
    color: "#dff4e7",
    textColor: "#17824a",
    isYou: true,
  },
];

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function CreateGroup() {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("trip");
  const [currency, setCurrency] = useState("EUR");
  const [inviteEmail, setInviteEmail] = useState("");
  const [members, setMembers] = useState(initialMembers);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const selectedType = groupTypes.find(
    (type) => type.id === groupType
  );

  const avatarColors = [
    ["#e8e4ff", "#6c52bc"],
    ["#ffe8d8", "#b96832"],
    ["#dceeff", "#3477ba"],
    ["#ffe3eb", "#b84d71"],
    ["#e5f5d9", "#558a38"],
  ];

  const memberCount = members.length;

  const groupInitials = useMemo(() => {
    const words = groupName.trim().split(/\s+/).filter(Boolean);

    if (!words.length) return "PG";

    return words
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
  }, [groupName]);

  const handleAddMember = (event) => {
    event.preventDefault();

    const email = inviteEmail.trim().toLowerCase();

    if (!email) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        inviteEmail: "Enter a valid email address.",
      }));
      return;
    }

    if (
      members.some(
        (member) => member.email.toLowerCase() === email
      )
    ) {
      setErrors((prev) => ({
        ...prev,
        inviteEmail: "This person has already been added.",
      }));
      return;
    }

    const nameFromEmail = email
      .split("@")[0]
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    const [bgColor, textColor] =
      avatarColors[(members.length - 1) % avatarColors.length];

    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: nameFromEmail,
        email,
        color: bgColor,
        textColor,
        isYou: false,
      },
    ]);

    setInviteEmail("");

    setErrors((prev) => ({
      ...prev,
      inviteEmail: "",
    }));
  };

  const removeMember = (id) => {
    setMembers((prev) =>
      prev.filter((member) => member.id !== id)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!groupName.trim()) {
      nextErrors.groupName = "Give your group a name.";
    }

    if (groupName.trim().length > 60) {
      nextErrors.groupName =
        "Group names must be 60 characters or fewer.";
    }

    if (members.length < 2) {
      nextErrors.members =
        "Add at least one other person to your group.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        ...nextErrors,
      }));
      return;
    }

    setErrors({});
    setSuccess(true);
  };

  const handleCreateAnother = () => {
    setGroupName("");
    setDescription("");
    setGroupType("trip");
    setCurrency("EUR");
    setInviteEmail("");
    setMembers(initialMembers);
    setErrors({});
    setSuccess(false);
  };

  return (
    <div className="create-group-page">
      <DashboardSidebar />

      <main className="create-group-main">
        <div className="create-group-container">
          <button
            type="button"
            className="create-group-back"
            onClick={() => navigate("/dashboard/groups")}
          >
            <ArrowLeft size={17} />
            <span>Back to groups</span>
          </button>

          <motion.div
            className="create-group-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="create-group-heading-icon">
              <Users size={23} />
            </div>

            <div>
              <div className="create-group-eyebrow">
                YOUR PEOPLE, ONE PLACE
              </div>

              <h1>Create a group</h1>

              <p>
                Bring everyone together and keep shared expenses organized.
              </p>
            </div>
          </motion.div>

          {success ? (
            <motion.section
              className="create-group-success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="create-group-success-icon">
                <CheckCircle2 size={34} />
              </div>

              <span className="create-group-success-label">
                GROUP READY
              </span>

              <h2>{groupName.trim()}</h2>

              <p>
                Your group details are ready. In this demo, the group and
                invitations have not been saved to a server.
              </p>

              <div className="create-group-success-summary">
                <div className="create-group-success-avatar">
                  {groupInitials}
                </div>

                <div>
                  <strong>{groupName.trim()}</strong>

                  <span>
                    {memberCount} members · {currency}
                  </span>
                </div>

                <CheckCircle2 size={20} />
              </div>

              <div className="create-group-success-actions">
                <button
                  type="button"
                  className="create-group-primary"
                  onClick={() => navigate("/dashboard/groups")}
                >
                  Back to groups
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="create-group-secondary"
                  onClick={handleCreateAnother}
                >
                  Create another group
                </button>
              </div>
            </motion.section>
          ) : (
            <form
              className="create-group-layout"
              onSubmit={handleSubmit}
            >
              <div className="create-group-form-column">
                {/* STEP 01: GROUP DETAILS */}
                <motion.section
                  className="create-group-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="create-group-card-heading">
                    <div className="create-group-step">01</div>

                    <div>
                      <h2>Group details</h2>
                      <p>Start with the basics.</p>
                    </div>
                  </div>

                  <div className="create-group-field">
                    <label htmlFor="groupName">
                      Group name <span>*</span>
                    </label>

                    <input
                      id="groupName"
                      type="text"
                      placeholder="e.g. Prishtina Weekend"
                      value={groupName}
                      maxLength={60}
                      onChange={(event) => {
                        setGroupName(event.target.value);

                        setErrors((prev) => ({
                          ...prev,
                          groupName: "",
                        }));
                      }}
                      className={
                        errors.groupName ? "has-error" : ""
                      }
                    />

                    <div className="create-group-field-bottom">
                      {errors.groupName ? (
                        <span className="create-group-error">
                          {errors.groupName}
                        </span>
                      ) : (
                        <span>
                          Make it easy for everyone to recognize.
                        </span>
                      )}

                      <span>{groupName.length}/60</span>
                    </div>
                  </div>

                  <div className="create-group-field">
                    <label htmlFor="groupDescription">
                      Description{" "}
                      <span className="optional">(optional)</span>
                    </label>

                    <textarea
                      id="groupDescription"
                      placeholder="What is this group for?"
                      value={description}
                      maxLength={180}
                      rows={3}
                      onChange={(event) =>
                        setDescription(event.target.value)
                      }
                    />

                    <div className="create-group-field-bottom">
                      <span>
                        A little context helps everyone.
                      </span>

                      <span>{description.length}/180</span>
                    </div>
                  </div>

                  <div className="create-group-field">
                    <label>
                      What is this group for? <span>*</span>
                    </label>

                    <div className="create-group-types">
                      {groupTypes.map((type) => {
                        const TypeIcon = type.icon;
                        const active = groupType === type.id;

                        return (
                          <button
                            type="button"
                            key={type.id}
                            className={`create-group-type ${
                              active ? "is-selected" : ""
                            }`}
                            onClick={() =>
                              setGroupType(type.id)
                            }
                            aria-pressed={active}
                          >
                            <div
                              className="create-group-type-icon"
                              style={{
                                background: type.color,
                                color: type.iconColor,
                              }}
                            >
                              <TypeIcon size={19} />
                            </div>

                            <div className="create-group-type-copy">
                              <strong>{type.label}</strong>
                              <span>{type.description}</span>
                            </div>

                            <div className="create-group-type-check">
                              {active && <Check size={13} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="create-group-field create-group-currency-field">
                    <label htmlFor="groupCurrency">
                      Group currency
                    </label>

                    <div className="create-group-select-wrap">
                      <Wallet size={17} />

                      <select
                        id="groupCurrency"
                        value={currency}
                        onChange={(event) =>
                          setCurrency(event.target.value)
                        }
                      >
                        {currencyOptions.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <ChevronDown size={16} />
                    </div>

                    <span className="create-group-help">
                      Used as the default currency for shared expenses.
                    </span>
                  </div>
                </motion.section>

                {/* STEP 02: INVITE MEMBERS */}
                <motion.section
                  className="create-group-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 }}
                >
                  <div className="create-group-card-heading">
                    <div className="create-group-step">02</div>

                    <div>
                      <h2>Invite your people</h2>
                      <p>
                        Add the people you share expenses with.
                      </p>
                    </div>
                  </div>

                  <div className="create-group-invite-form">
                    <div className="create-group-field">
                      <label htmlFor="inviteEmail">
                        Email address
                      </label>

                      <div className="create-group-invite-input">
                        <input
                          id="inviteEmail"
                          type="email"
                          placeholder="friend@example.com"
                          value={inviteEmail}
                          onChange={(event) => {
                            setInviteEmail(event.target.value);

                            setErrors((prev) => ({
                              ...prev,
                              inviteEmail: "",
                            }));
                          }}
                          className={
                            errors.inviteEmail ? "has-error" : ""
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              handleAddMember(event);
                            }
                          }}
                        />

                        <button
                          type="button"
                          onClick={handleAddMember}
                          disabled={!inviteEmail.trim()}
                        >
                          <Plus size={17} />
                          Add
                        </button>
                      </div>

                      {errors.inviteEmail && (
                        <span className="create-group-error">
                          {errors.inviteEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="create-group-members-heading">
                    <span>Group members</span>

                    <span className="create-group-member-count">
                      {memberCount}
                    </span>
                  </div>

                  <div className="create-group-member-list">
                    {members.map((member) => (
                      <div
                        className="create-group-member"
                        key={member.id}
                      >
                        <div
                          className="create-group-member-avatar"
                          style={{
                            background: member.color,
                            color: member.textColor,
                          }}
                        >
                          {getInitials(member.name)}
                        </div>

                        <div className="create-group-member-info">
                          <strong>{member.name}</strong>
                          <span>{member.email}</span>
                        </div>

                        {member.isYou ? (
                          <span className="create-group-you-badge">
                            You
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="create-group-remove-member"
                            onClick={() =>
                              removeMember(member.id)
                            }
                            aria-label={`Remove ${member.name}`}
                            title="Remove member"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {errors.members && (
                    <div className="create-group-member-error">
                      {errors.members}
                    </div>
                  )}

                  <div className="create-group-invite-note">
                    <Sparkles size={16} />

                    <p>
                      <strong>Better together.</strong> Add your friends
                      now so you can start tracking shared expenses.
                    </p>
                  </div>
                </motion.section>

                {/* FORM ACTIONS */}
                <div className="create-group-form-actions">
                  <button
                    type="button"
                    className="create-group-secondary"
                    onClick={() =>
                      navigate("/dashboard/groups")
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="create-group-primary"
                  >
                    Create group
                    <ArrowRight size={17} />
                  </button>
                </div>

                <p className="create-group-demo-note">
                  <CheckCircle2 size={14} />
                  Demo mode — group creation is not saved to a database.
                </p>
              </div>

              {/* LIVE PREVIEW */}
              <aside className="create-group-preview-column">
                <motion.div
                  className="create-group-preview-card"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="create-group-preview-top">
                    <span className="create-group-preview-label">
                      LIVE PREVIEW
                    </span>

                    <span className="create-group-live-dot" />
                  </div>

                  <div className="create-group-preview-cover">
                    <div className="create-group-preview-pattern pattern-one" />
                    <div className="create-group-preview-pattern pattern-two" />

                    <div
                      className="create-group-preview-symbol"
                      style={{
                        background:
                          selectedType?.color || "#e5f8ed",
                        color:
                          selectedType?.iconColor || "#159456",
                      }}
                    >
                      {selectedType &&
                        (() => {
                          const PreviewIcon = selectedType.icon;
                          return <PreviewIcon size={27} />;
                        })()}
                    </div>

                    <div className="create-group-preview-initials">
                      {groupInitials}
                    </div>
                  </div>

                  <div className="create-group-preview-content">
                    <span className="create-group-preview-type">
                      {selectedType?.label || "Group"}
                    </span>

                    <h3>
                      {groupName.trim() || "Your group name"}
                    </h3>

                    <p>
                      {description.trim() ||
                        "Your group description will appear here."}
                    </p>

                    <div className="create-group-preview-divider" />

                    <div className="create-group-preview-stat">
                      <div className="create-group-preview-stat-icon">
                        <Users size={17} />
                      </div>

                      <div>
                        <span>Members</span>

                        <strong>
                          {memberCount}{" "}
                          {memberCount === 1 ? "person" : "people"}
                        </strong>
                      </div>
                    </div>

                    <div className="create-group-preview-stat">
                      <div className="create-group-preview-stat-icon">
                        <Wallet size={17} />
                      </div>

                      <div>
                        <span>Default currency</span>
                        <strong>{currency}</strong>
                      </div>
                    </div>

                    <div className="create-group-preview-avatars">
                      <div className="create-group-avatar-stack">
                        {members.slice(0, 4).map((member) => (
                          <div
                            key={member.id}
                            className="create-group-stack-avatar"
                            style={{
                              background: member.color,
                              color: member.textColor,
                            }}
                            title={member.name}
                          >
                            {getInitials(member.name)}
                          </div>
                        ))}

                        {members.length > 4 && (
                          <div className="create-group-stack-more">
                            +{members.length - 4}
                          </div>
                        )}
                      </div>

                      <span>
                        {memberCount > 1
                          ? "Ready to split expenses"
                          : "Invite someone to get started"}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <div className="create-group-tip">
                  <div className="create-group-tip-icon">
                    <Sparkles size={18} />
                  </div>

                  <div>
                    <strong>Keep it simple</strong>

                    <p>
                      Choose a name everyone recognizes and invite
                      your group before adding the first expense.
                    </p>
                  </div>
                </div>
              </aside>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default CreateGroup;
