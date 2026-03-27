export function renderTour(containerId, currentUserId) {
    const container = document.getElementById(containerId);
    const allRequests = JSON.parse(localStorage.getItem("all_tours")) || [];
    const myRequests = allRequests.filter(req => 
        req.guideId === currentUserId && req.status === "Pending"
    );
    if (myRequests.length === 0) {
        container.innerHTML = "<p class='no-data'>No new requests for you today!</p>";
        return;
    }
    container.innerHTML = `
        <table>
            ${myRequests.map(req => `
                <tr>
                    <td>${req.customer}</td>
                    <td>${req.destination}</td>
                    <td>
                        <button onclick="updateStatus('${req.id}', 'Accepted')">Accept</button>
                    </td>
                </tr>
            `).join('')}
        </table>
    `;
}