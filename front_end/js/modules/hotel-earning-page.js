export function renderHotelEarningPage() {

    renderEarningStats("earning-stats");
    renderEarningPerformance("earning-performance");
    renderEarningRevenue("earning-revenue");
    renderEarningRefund("earning-refund");
    renderEarningTransactions("earning-transactions");
    renderEarningPayout("earning-payout");
}

function renderEarningStats(containerId) {

    const el = document.getElementById(containerId);

    const stats = [
        { label: "Total Revenue", value: "$48,250", color: "blue" },
        { label: "Earnings This Month", value: "$14,800", color: "dark-green" },
        { label: "Refunded Payments", value: "$1,240", color: "orange" },
        { label: "Avg Booking Value", value: "$185", color: "light-green" }
    ];

    el.innerHTML = stats.map(s => `
        <div class="stat-card ${s.color}">
            <p>${s.label}</p>
            <h3>${s.value}</h3>
        </div>
    `).join("");
}

function renderEarningPerformance(containerId) {

    const el = document.getElementById(containerId);

    const data = [
        "Deluxe Room",
        "Saturday",
        "78% Occupancy",
        "2.6% Refund Rate"
    ];

    el.innerHTML = `
        <h3>Performance Insights</h3>

        <div class="hotel-stats-grid">
            ${data.map(d => `
                <div class="hotel-content-card">${d}</div>
            `).join("")}
        </div>
    `;
}

function renderEarningRevenue(containerId) {

    const el = document.getElementById(containerId);

    const data = [
        { name: "Standard Room", value: "$28,500" },
        { name: "Deluxe Room", value: "$19,750" }
    ];

    el.innerHTML = `
        <h3>Revenue Sources</h3>

        ${data.map(r => `
            <p>${r.name} - ${r.value}</p>
        `).join("")}
    `;
}

function renderEarningRefund(containerId) {

    const el = document.getElementById(containerId);

    el.innerHTML = `
        <h3>Refund Breakdown</h3>
        <h2>$1,240</h2>
        <p>2.6% of revenue</p>
    `;
}

function renderEarningTransactions(containerId) {

    const el = document.getElementById(containerId);

    const bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    el.innerHTML = `
        <h3>Recent Transactions</h3>

        ${bookings.map(b => `
            <div class="hotel-booking-row">

                <div>
                    <strong>${b.customer}</strong><br/>
                    <span class="hotel-sub-text">${b.room}</span>
                </div>

                <div>$${b.amount || 0}</div>

                <div>
                    <span class="${b.status === "cancelled" ? "badge-red" : "badge-green"}">
                        ${b.status}
                    </span>
                </div>

            </div>
        `).join("")}
    `;
}

function renderEarningPayout(containerId) {

    const el = document.getElementById(containerId);

    el.innerHTML = `
        <h3>Payout Information</h3>
        <p>Next payout: April 16, 2026</p>
        <h2>$128,450</h2>
    `;
}