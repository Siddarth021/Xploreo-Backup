// Notice we removed the import for renderStats here!
import { renderChart } from "./modules/chart.js";
import { renderPartners } from "./modules/partners.js";
import { renderAlerts } from "./modules/alerts.js";
import { renderActivity } from "./modules/activity.js";

// TOTAL USERS
function getTotalUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.length.toLocaleString();
}

// TOTAL BOOKINGS (sum of partner bookings)
function getTotalBookings() {
    const partners = JSON.parse(localStorage.getItem("partners")) || [];

    let total = 0;
    partners.forEach(p => total += p.bookings);

    return total.toLocaleString();
}

// TOTAL REVENUE (sum of partner revenue)
function getTotalRevenue() {
    const partners = JSON.parse(localStorage.getItem("partners")) || [];

    let total = 0;
    partners.forEach(p => total += p.revenue);

    return "₹" + (total / 10000000).toFixed(3) + "Cr";
}

// ACTIVE PARTNERS (only top ones)
function getActivePartners() {
    const partners = JSON.parse(localStorage.getItem("partners")) || [];

    const active = partners.filter(p => p.bookings > 500);
    return active.length;
}

export function renderAdminDashboard(containerId) {
    // header render separately
    const header = document.getElementById("admin-header");

    if (header) {
        header.innerHTML = `
            <div class="dashboard-header">
                <h1>Operations Dashboard</h1>
                <p>Real-time performance monitoring and ecosystem health.</p>
            </div>
        `;
    }

    const adminData = [
        {
            label: "TOTAL USERS",
            value: getTotalUsers(),
            subtext: "↗ dynamic data",
            subClass: "green",
            color: "blue",
            icon: "../components/ui/users.png"
        },
        {
            label: "GROSS REVENUE",
            value: getTotalRevenue(),
            subtext: "dynamic revenue",
            subClass: "green",
            color: "dark-green",
            icon: "../components/ui/finance.png"
        },
        {
            label: "TOTAL BOOKINGS",
            value: getTotalBookings(),
            subtext: "dynamic bookings",
            subClass: "blue-text",
            color: "violet",
            icon: "../components/ui/operations.png"
        },
        {
            label: "ACTIVE PARTNERS",
            value: getActivePartners(),
            subtext: "based on guide users",
            color: "orange",
            icon: "../components/ui/users.png"
        }
    ];

    // --- NEW DIRECT RENDERING LOGIC ---
    // We bypass your teammate's stat-cards.js completely and draw the cards right here.
    const statsContainer = document.getElementById("admin-stats");
    
    if (statsContainer) {
        statsContainer.innerHTML = adminData.map(stat => `
            <div class="stat-card ${stat.color || 'blue'}">
                ${stat.icon ? `
                <div class="card-icon">
                    <img src="${stat.icon}" alt="icon">
                </div>
                ` : ""}
                <p class="stat-label">${stat.label}</p>
                <h2 class="stat-value">${stat.value}</h2>
                <p class="stat-subtext ${stat.subClass || ""}">
                    ${stat.subtext || ""}
                </p>
            </div>
        `).join('');
    }

    // --- RENDER THE REST OF YOUR MODULES ---
    renderChart("admin-chart");
    renderPartners("admin-partners");
    renderAlerts("admin-alerts");
    renderActivity("admin-activity");
}
