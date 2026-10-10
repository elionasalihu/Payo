import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";

import DashboardSidebar from "../../sections/DashboardSidebar";

import "../../styles/client/Groups.css";

const groups = [
  {
    id: 1,
    name: "Trip to Tirana",
    description: "Weekend trip with friends",
    members: 4,
    expenses: 12,
    balance: "+€24.50",
    status: "positive",
    avatar: "T",
    color: "green",
    updated: "Today",
    membersList: ["AD", "AK", "LB", "EA"],
  },
  {
    id: 2,
    name: "House expenses",
    description: "Monthly household expenses",
    members: 3,
    expenses: 24,
    balance: "-€18.20",
    status: "negative",
    avatar: "H",
    color: "gray",
    updated: "Yesterday",
    membersList: ["AD", "LB", "AR"],
  },
  {
    id: 3,
    name: "Friday night",
    description: "Going out with friends",
    members: 5,
    expenses: 8,
    balance: "+€8.00",
    status: "positive",
    avatar: "F",
    color: "dark",
    updated: "Sep 27",
    membersList: ["AD", "AK", "LB", "DM", "EA"],
  },
  {
    id: 4,
    name: "University project",
    description: "Shared project expenses",
    members: 4,
    expenses: 6,
    balance: "-€12.50",
    status: "negative",
    avatar: "U",
    color: "purple",
    updated: "Sep 24",
    membersList: ["AD", "EA", "GN", "AR"],
  },
  {
    id: 5,
    name: "Summer vacation",
    description: "Vacation expenses",
    members: 6,
    expenses: 31,
    balance: "+€42.80",
    status: "positive",
    avatar: "S",
    color: "orange",
    updated: "Sep 18",
    membersList: ["AD", "AK", "LB", "EA", "DM", "AR"],
  },
  {
    id: 6,
    name: "Apartment",
    description: "Apartment shared costs",
    members: 3,
    expenses: 17,
    balance: "€0.00",
    status: "neutral",
    avatar: "A",
    color: "blue",
    updated: "Sep 12",
    membersList: ["AD", "LB", "GN"],
  },
];

function Groups() {
  return (
    <div className="groups-page">
      <DashboardSidebar />

      <main className="groups-main">
        <header className="groups-header">
          <div>
            <span className="groups-eyebrow">
              GROUPS
            </span>

            <h1>Your groups</h1>

            <p>
              Manage shared expenses and balances with your
              groups.
            </p>
          </div>

          <button className="groups-add-button">
            <Plus size={16} />
            Create group
          </button>
        </header>

        <section className="groups-summary">
          <div className="groups-summary-card">
            <div className="groups-summary-icon">
              <Users size={17} />
            </div>

            <div>
              <span>Total groups</span>
              <strong>6</strong>
            </div>
          </div>

          <div className="groups-summary-card">
            <div className="groups-summary-icon groups-summary-icon-green">
              <ArrowDownRight size={17} />
            </div>

            <div>
              <span>You are owed</span>
              <strong>€75.30</strong>
            </div>
          </div>

          <div className="groups-summary-card">
            <div className="groups-summary-icon groups-summary-icon-red">
              <ArrowUpRight size={17} />
            </div>

            <div>
              <span>You owe</span>
              <strong>€30.70</strong>
            </div>
          </div>

          <div className="groups-summary-card">
            <div className="groups-summary-icon">
              <Users size={17} />
            </div>

            <div>
              <span>Total members</span>
              <strong>25</strong>
            </div>
          </div>
        </section>

        <section className="groups-panel">
          <div className="groups-panel-header">
            <div>
              <h2>All groups</h2>

              <p>
                Groups you are currently a member of.
              </p>
            </div>

            <span className="groups-count">
              {groups.length} groups
            </span>
          </div>

          <div className="groups-toolbar">
            <div className="groups-search">
              <Search size={16} />

              <input
                type="text"
                placeholder="Search groups..."
              />
            </div>

            <button className="groups-filter">
              Recently updated
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="groups-grid">
            {groups.map((group) => (
              <a
                href={`/dashboard/groups/${group.id}`}
                className="group-card"
                key={group.id}
              >
                <div className="group-card-top">
                  <div
                    className={`group-card-avatar ${group.color}`}
                  >
                    {group.avatar}
                  </div>

                  <button
                    className="group-card-more"
                    type="button"
                    onClick={(event) => event.preventDefault()}
                    aria-label={`More options for ${group.name}`}
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </div>

                <div className="group-card-content">
                  <h3>{group.name}</h3>

                  <p>{group.description}</p>
                </div>

                <div className="group-card-meta">
                  <div className="group-members">
                    <div className="group-member-stack">
                      {group.membersList
                        .slice(0, 4)
                        .map((member, index) => (
                          <span
                            key={member}
                            className="group-member-avatar"
                            style={{
                              zIndex:
                                group.membersList.length -
                                index,
                            }}
                          >
                            {member}
                          </span>
                        ))}

                      {group.members > 4 && (
                        <span className="group-member-more">
                          +{group.members - 4}
                        </span>
                      )}
                    </div>

                    <span>
                      {group.members} members
                    </span>
                  </div>
                </div>

                <div className="group-card-footer">
                  <div className="group-expenses">
                    <strong>{group.expenses}</strong>
                    <span>expenses</span>
                  </div>

                  <div
                    className={`group-balance ${group.status}`}
                  >
                    {group.status === "positive" && (
                      <ArrowDownRight size={13} />
                    )}

                    {group.status === "negative" && (
                      <ArrowUpRight size={13} />
                    )}

                    <strong>{group.balance}</strong>
                  </div>
                </div>

                <div className="group-card-bottom">
                  <span>Updated {group.updated}</span>

                  <ChevronRight size={15} />
                </div>
              </a>
            ))}
          </div>

          <div className="groups-create-section">
            <div>
              <strong>Need another group?</strong>
              <span>
                Create a new group and start splitting expenses.
              </span>
            </div>

            <button className="groups-create-button">
              <Plus size={15} />
              Create group
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Groups;