export function initTechLogs() {
    let techAdminData = JSON.parse(localStorage.getItem("techAdminData"));
    if (!techAdminData) return;

    let searchQuery = "";

    const renderLogs = () => {
        const tbody = document.getElementById("logs-tbody");
        if (!tbody) return;

        const filteredLogs = techAdminData.systemLogs.filter(log => {
            return log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   log.message.toLowerCase().includes(searchQuery.toLowerCase());
        });

        tbody.innerHTML = filteredLogs.map(log => `
            <tr class="log-row ${log.type}">
                <td>${new Date(log.timestamp).toLocaleString()}</td>
                <td><span class="type-badge ${log.type}">${log.type.toUpperCase()}</span></td>
                <td>${log.source}</td>
                <td>${log.message}</td>
                <td><span class="status-badge ${log.type === 'error' ? 'pending' : 'resolved'}">${log.type === 'error' ? 'Unresolved' : 'Logged'}</span></td>
            </tr>
        `).reverse().join('');
    };

    // Search
    const searchInput = document.getElementById("logs-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderLogs();
        });
    }

    // Initial Render
    renderLogs();
}
