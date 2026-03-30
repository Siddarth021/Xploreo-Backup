export function renderDashEarnings(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="dash-earnings-wrapper">
            <h2 class="dash-section-title">Earnings Overview</h2>
            <p class="dash-section-subtitle">Last 6 months performance</p>
            
            <div class="dash-chart-container">
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 35%;"></div><span class="chart-label">Apr</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 45%;"></div><span class="chart-label">May</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 40%;"></div><span class="chart-label">Jun</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 70%;"></div><span class="chart-label">Jul</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 85%;"></div><span class="chart-label">Aug</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 60%;"></div><span class="chart-label">Sep</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 50%;"></div><span class="chart-label">Oct</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 80%;"></div><span class="chart-label">Nov</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 65%;"></div><span class="chart-label">Dec</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 95%;"></div><span class="chart-label">Jan</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 75%;"></div><span class="chart-label">Feb</span></div>
                <div class="dash-chart-bar-group"><div class="dash-chart-bar" style="height: 85%;"></div><span class="chart-label">Mar</span></div>
            </div>
            
            <div class="dash-earnings-footer">
                <div class="dash-earnings-total-block">
                    <span class="dash-earnings-label">Total Earnings</span>
                    <h2 class="dash-earnings-value">$18,648</h2>
                </div>
            </div>
        </div>
    `;
}
