
export function renderinternalcontents(containerId,currentUser,currentActiveTab){
    const container = document.getElementById(containerId);
    if (!container) return;

    const allRequests = JSON.parse(localStorage.getItem("tours")) || [];
    console.log(allRequests);
    let myRequests = allRequests.filter(req => 
        String(req.guideId).trim() === String(currentUser.id).trim() && req.status === currentActiveTab
    );
    if(currentActiveTab === "pending"){
        if(myRequests.length==0){
        container.innerHTML = `
            <div class="stat-card dark-blue">
                <h2>New Tour Requests</h2>
                <p class='no-data'>No new requests for you today!</p>
            </div>`;
        return;
    }
    else{
        container.innerHTML = `
            <div class="stat-card dark-blue">
                <div class="card-header">
                    <div>
                        <h2>Upcoming Tour</h2>
                        <p>Tours to be taken by you </p>
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
                            <th>View Details</th>
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
                                <td>
                                    <button class="view-all-btn" onclick="openTourModal('${req.id}')">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        }
    }else if(currentActiveTab === 'ongoing'){
        if (myRequests.length === 0) {
        container.innerHTML = `
            <div class="stat-card dark-blue">
                <h2>Ongoing Tours</h2>
                <p class='no-data'>You don't have any tours in progress right now.</p>
            </div>`;
        return;
    }
    container.innerHTML = myRequests.map(req => {
        const totalSteps = req.plan_iternary ? req.plan_iternary.length : 1;
        const currentStepIndex = req.plan_iternary ? req.plan_iternary.indexOf(req.currentloction) + 1 : 0;
        const progress = Math.round((currentStepIndex / totalSteps) * 100);
        console.log(myRequests);
        return `
            <div class="ongoing-tour-card">
                <div class="card-top">
                    <div class="tour-header">
                        <div class="title-row">
                            <h2>${req.title}</h2>
                            <span class="status-pill">In Progress</span>
                        </div>
                        <p class="customer-name">${req.customer}</p>
                    </div>
                    <div class="tour-price-info">
                        <p class="price">$${req.amount}</p>
                        <p class="guests">${req.guests} guests</p>
                    </div>
                </div>

                <div class="info-boxes">
                    <div class="info-box blue-bg">
                        <label>Started At</label>
                        <span>${req.dateTime.split('|')[1]}</span>
                    </div>
                    <div class="info-box purple-bg">
                        <label>Current Location</label>
                        <span>${req.currentloction}</span>
                    </div>
                    <div class="info-box orange-bg">
                        <label>Next Stop</label>
                        <span>${req.plan_iternary[currentStepIndex] || "Finishing Soon"}</span>
                    </div>
                </div>

                <div class="progress-section">
                    <div class="progress-labels">
                        <label>Tour Progress</label>
                        <span class="percent">${progress}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-fill" style="width: ${progress}%;"></div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn-route" onclick="openTourModal('${req.id}')">
                        View Details
                    </button>
                    <button class="btn-complete" onclick="handleTourAction('${req.id}', 'completed')">
                        Complete
                    </button>
                </div>
            </div>
        `;
    }).join('');

    }else if(currentActiveTab === "completed"){
        if(myRequests.length==0){
        container.innerHTML = `
            <div class="stat-card dark-blue">
                <h2>Completed</h2>
                <p class='no-data'>No new requests for you today!</p>
            </div>`;
        return;
    }
    else{
        container.innerHTML = `
            <div class="stat-card dark-blue">
                <div class="card-header">
                    <div>
                        <h2>Completed Tour</h2>
                        <p>Tours taken by you </p>
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
}

window.closeModal = () => {
    const modal = document.getElementById("tourModal");
    
    if (modal) {
        modal.style.display = "none";
        document.getElementById("modalBody").innerHTML = "";
    }
};

window.addEventListener("click", (event) => {
    const modal = document.getElementById("tourModal");
    if (event.target === modal) {
        closeModal();
    }
});
