export function renderActivity(containerId) {
    const container = document.getElementById(containerId);

    const activities = [
        "New booking completed by Alpine Heights",
        "User registered from Hyderabad",
        "Refund processed for Order #4821",
        "New partner added: Desert Camps"
    ];

    container.innerHTML = `
        <div class="activity-card">
            <h3>Ecosystem Activity</h3>

            ${activities.map(a => `
                <div class="activity-item">
                    <span class="dot"></span>
                    <p>${a}</p>
                </div>
            `).join("")}
        </div>
    `;
}