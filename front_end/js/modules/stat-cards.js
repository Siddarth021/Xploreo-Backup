export function renderStats(containerId) {
    const container = document.getElementById(containerId);
    const stats = [
        { label: "Today's Tours", value: "3", icon: "../components/ui/todaytours.svg", color: "blue" },
        { label: "Upcoming Tours", value: "12", icon: "../components/ui/upcomingtours.svg", color: "light-green"},
        { label: "Monthly Earnings", value: "$3,248", icon: "../components/ui/montlyearning.svg", color: "dark-green" },
        { label: "Average Rating", value: "4.8", icon: "../components/ui/avgrating.svg", color: "orange"},
        { label: "Recent Reviews", value: "8", icon: "../components/ui/recentreview.svg", color: "violet"}
    ];

    container.innerHTML = stats.map(stat => `
    <div class="stat-card ${stat.color}">
        <div class="icon-container">
            <img src="${stat.icon}" width="24" height="24">
        </div>
        <h3 class="stat-value">${stat.value}</h3>
        <p class="stat-label">${stat.label}</p>
        <p class="stat-subtext">${stat.subtext || ""}</p>
    </div>
`).join('');
}