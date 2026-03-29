export function renderOperationsPage() {
    const container = document.getElementById("ops-content");
    if (!container) return;

    container.innerHTML = `
        <div class="stats-grid">

            <div class="stat-card blue">
                <div class="card-icon">
                    <img src="../components/ui/operations.png">
                </div>
                <p class="stat-label">TOTAL BOOKINGS</p>
                <h2 class="stat-value">4,120</h2>
            </div>

            <div class="stat-card orange">
                <div class="card-icon">
                    <img src="../components/ui/alerts.png">
                </div>
                <p class="stat-label">PENDING REVIEW</p>
                <h2 class="stat-value">28</h2>
            </div>

            <div class="stat-card light-green">
                <div class="card-icon">
                    <img src="../components/ui/finance.png">
                </div>
                <p class="stat-label">CONFIRMED REVENUE</p>
                <h2 class="stat-value">₹2.4Cr</h2>
            </div>

            <div class="stat-card violet">
                <div class="card-icon">
                    <img src="../components/ui/users.png">
                </div>
                <p class="stat-label">ACTIVE TOURS</p>
                <h2 class="stat-value">184</h2>
            </div>

        </div>
    `;
}
