import { renderStats } from "./modules/stat-cards.js";

export function renderAdminDashboard(containerId) {
    const container = document.getElementById(containerId);

    container.innerHTML = `
        <div class="dashboard-wrapper">
            <div class="dashboard-header">
                <h1>Operations Dashboard</h1>
                <p>Real-time performance monitoring and ecosystem health.</p>
            </div>

            <div id="admin-stats" class="stats-grid"></div>
        </div>
    `;

    const adminData = [
  {
    label: "TOTAL USERS",
    value: "124,892",
    subtext: "↗ 12% increase vs last month",
    subClass: "green",
    color: "blue",
    icon: "../components/ui/users.png"
  },
  {
    label: "GROSS REVENUE",
    value: "₹1.23Cr",
    subtext: "↑ 8.4% growth this week",
    subClass: "green",
    color: "dark-green",
    icon: "../components/ui/finance.png"
  },
  {
    label: "TOTAL BOOKINGS",
    value: "12,402",
    subtext: "210 pending approvals",
    subClass: "blue-text",
    color: "violet",
    icon: "../components/ui/operations.png"
  },
  {
    label: "ACTIVE PARTNERS",
    value: "842",
    subtext: `
      <span class="avatars">
        <img src="../components/ui/profile.png">
        <img src="../components/ui/profile.png">
        <span class="extra">+12</span>
      </span>
      48 New this month
    `,
    color: "orange",
    icon: "../components/ui/users.png"
  }
];

    renderStats("admin-stats", adminData);
}