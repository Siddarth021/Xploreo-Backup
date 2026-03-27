export function renderStats(containerId, data = null) {
    const container = document.getElementById(containerId);

    const defaultStats = [
        { label: "Today's Tours", value: "3", icon: "../components/ui/todaytours.svg", color: "blue" },
        { label: "Upcoming Tours", value: "12", icon: "../components/ui/upcomingtours.svg", color: "light-green"},
        { label: "Monthly Earnings", value: "$3,248", icon: "../components/ui/montlyearning.svg", color: "dark-green" },
        { label: "Average Rating", value: "4.8", icon: "../components/ui/avgrating.svg", color: "orange"},
        { label: "Recent Reviews", value: "8", icon: "../components/ui/recentreview.svg", color: "violet"}
    ];

    const stats = data || defaultStats;

    container.innerHTML = stats.map(stat => `
        <div class="stat-card ${stat.color}">

            ${stat.icon ? `
            <div class="card-icon">
                <img src="${stat.icon}" alt="icon">
            </div>
            ` : ""}

            <p class="card-title">${stat.label}</p>

            <h2 class="card-value">${stat.value}</h2>

            <p class="card-sub ${stat.subClass || ""}">
                ${stat.subtext || ""}
            </p>

        </div>
    `).join('');
}