export function renderTechAdminDashboard(containerId) {
    const techAdminData = JSON.parse(localStorage.getItem("techAdminData"));
    if (!techAdminData) return;

    // Show Tech Admin Dashboard, hide others
    const techDash = document.getElementById("tech-admin-dashboard");
    const adminDash = document.getElementById("admin-dashboard");
    const mainDash = document.getElementById("main");
    const hotelDash = document.getElementById("hotel-dashboard");

    if (techDash) techDash.style.display = "block";
    if (adminDash) adminDash.style.display = "none";
    if (mainDash) mainDash.style.display = "none";
    if (hotelDash) hotelDash.style.display = "none";

    // 1. Render Stats
    const statsContainer = document.getElementById("tech-stats");
    if (statsContainer) {
        const stats = [
            { label: "Total Tickets", value: techAdminData.stats.totalTickets, icon: "../components/ui/support.svg", color: "blue" },
            { label: "Pending Tickets", value: techAdminData.stats.pendingTickets, icon: "../components/ui/support.svg", color: "orange" },
            { label: "System Uptime", value: techAdminData.stats.systemUptime, icon: "../components/ui/operations.png", color: "dark-green" },
            { label: "Active Users", value: techAdminData.stats.activeUsers, icon: "../components/ui/users.png", color: "violet" }
        ];

        statsContainer.innerHTML = stats.map(stat => `
            <div class="stat-card ${stat.color}">
                <div class="card-icon">
                    <img src="${stat.icon}" alt="icon">
                </div>
                <p class="stat-label">${stat.label}</p>
                <h2 class="stat-value">${stat.value}</h2>
            </div>
        `).join('');
    }

    // 2. Render Recent Tickets
    const ticketsContainer = document.getElementById("recent-tickets");
    if (ticketsContainer) {
        const recentTickets = techAdminData.tickets.slice(0, 3);
        ticketsContainer.innerHTML = `
            <div class="card-header">
                <h3>Recent Tickets</h3>
                <button class="view-all-btn" onclick="window.location.href='tech_tickets.html'">View All</button>
            </div>
            <div class="ticket-list-mini">
                ${recentTickets.map(ticket => `
                    <div class="ticket-item-mini">
                        <div class="ticket-info">
                            <span class="ticket-id">${ticket.id}</span>
                            <p class="ticket-subject">${ticket.subject}</p>
                        </div>
                        <span class="status-badge ${ticket.status}">${ticket.status}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // 3. Render System Health
    const healthContainer = document.getElementById("system-health");
    if (healthContainer) {
        healthContainer.innerHTML = `
            <h3>System Health</h3>
            <div class="health-metrics">
                <div class="metric">
                    <span>API Response Time</span>
                    <div class="progress-bar"><div class="progress" style="width: 85%"></div></div>
                    <span class="metric-value">240ms</span>
                </div>
                <div class="metric">
                    <span>Memory Usage</span>
                    <div class="progress-bar"><div class="progress" style="width: 45%"></div></div>
                    <span class="metric-value">4.2GB / 8GB</span>
                </div>
                <div class="metric">
                    <span>CPU Load</span>
                    <div class="progress-bar"><div class="progress" style="width: 30%"></div></div>
                    <span class="metric-value">30%</span>
                </div>
            </div>
        `;
    }

    // 4. Render Tech Alerts
    const alertsContainer = document.getElementById("tech-alerts");
    if (alertsContainer) {
        const errors = techAdminData.systemLogs.filter(log => log.type === 'error').slice(0, 2);
        alertsContainer.innerHTML = `
            <h3>Critical Alerts</h3>
            <div class="tech-alerts-list">
                ${errors.map(error => `
                    <div class="tech-alert error">
                        <img src="../components/ui/operations.png" class="alert-icon">
                        <div class="alert-content">
                            <p class="alert-msg">${error.message}</p>
                            <span class="alert-time">${new Date(error.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}
