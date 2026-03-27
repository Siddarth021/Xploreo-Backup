export function renderTour(containerId, currentUser) {
    const container = document.getElementById(containerId);
    const allRequests = JSON.parse(localStorage.getItem("tours")) || [];
    const myRequests = allRequests.filter(req => String(req.guideId).trim() == String(currentUser.id).trim());
    if (myRequests.length == 0) {
        container.innerHTML = `
            <div class="table-card">
                <h2>New Tour Requests</h2>
                <p class='no-data'>No new requests for you today!</p>
            </div>`;
        return;
    }
    else{
    container.innerHTML = `
        <div class="stat-card darkblue">
            <div class="card-header">
                <div>
                    <h2>Tours</h2>
                    <p>Current pending tour requests for your review</p>
                </div>
            </div>
            <table class="tour-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Destination</th>
                        <th>Date & Time</th>
                        <th>Guests</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${myRequests.map(req => `
                        <tr>
                            <td class="cust-name">${req.customer}</td>
                            <td>${req.destination}</td>
                            <td>${req.dateTime}</td>
                            <td>${req.guests}</td>
                            <td class="amount-cell">$${req.amount}</td>
                            <td><span class="status-tag ${req.status}">${req.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    }
}