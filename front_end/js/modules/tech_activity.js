export function initTechActivity() {
    let techAdminData = JSON.parse(localStorage.getItem("techAdminData"));
    if (!techAdminData) return;

    let searchQuery = "";

    const renderActivity = () => {
        const tbody = document.getElementById("activity-tbody");
        if (!tbody) return;

        const filteredActivity = techAdminData.userActivity.filter(act => {
            return act.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   act.action.toLowerCase().includes(searchQuery.toLowerCase());
        });

        tbody.innerHTML = filteredActivity.map(act => `
            <tr class="activity-row">
                <td>${new Date(act.timestamp).toLocaleString()}</td>
                <td>${act.userName}</td>
                <td>${act.action}</td>
                <td><span class="status-badge resolved">Success</span></td>
            </tr>
        `).reverse().join('');
    };

    // Search
    const searchInput = document.getElementById("activity-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderActivity();
        });
    }

    // Initial Render
    renderActivity();
}
