export function initTicketManagement() {
    let techAdminData = JSON.parse(localStorage.getItem("techAdminData"));
    if (!techAdminData) return;

    // Handle URL parameters for filtering (e.g., from Dashboard tiles)
    const urlParams = new URLSearchParams(window.location.search);
    let currentFilter = urlParams.get('status') || "all";
    let searchQuery = "";

    // Sync active tab state with currentFilter
    const updateTabUI = () => {
        document.querySelectorAll(".filter-btn").forEach(btn => {
            if (btn.dataset.status === currentFilter) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    };

    const renderTickets = () => {
        const tbody = document.getElementById("ticket-tbody");
        if (!tbody) return;

        const filteredTickets = techAdminData.tickets.filter(ticket => {
            const matchesFilter = currentFilter === "all" || ticket.status === currentFilter;
            const matchesSearch = ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        tbody.innerHTML = filteredTickets.map(ticket => `
            <tr class="ticket-row" data-id="${ticket.id}">
                <td style="font-weight: 600; color: #2563EB;">${ticket.id}</td>
                <td>
                    <div style="font-weight: 600;">${ticket.userName}</div>
                    <div style="font-size: 12px; color: #6B7280; text-transform: capitalize;">${ticket.userRole.replace('_', ' ')}</div>
                </td>
                <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${ticket.subject}</td>
                <td><span class="status-tag ${ticket.priority}">${ticket.priority}</span></td>
                <td><span class="status-tag ${ticket.status}">${ticket.status}</span></td>
                <td><span style="font-size: 13px; color: #4B5563;">${ticket.category}</span></td>
                <td style="text-align: right;">
                    <button class="secondary-btn" style="padding: 6px 12px; font-size: 13px;" onclick="window.viewTicket('${ticket.id}')">View Details</button>
                </td>
            </tr>
        `).join('');
    };

    // Filter Buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            currentFilter = e.target.dataset.status;
            updateTabUI();
            renderTickets();
            // Update URL without reload
            const newUrl = currentFilter === 'all' ? 'tech_tickets.html' : `tech_tickets.html?status=${currentFilter}`;
            window.history.pushState({path: newUrl}, '', newUrl);
        });
    });

    // Search
    const searchInput = document.getElementById("ticket-search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            renderTickets();
        });
    }

    // View Ticket Handler
    window.viewTicket = (id) => {
        const ticket = techAdminData.tickets.find(t => t.id === id);
        if (!ticket) return;

        const modal = document.getElementById("ticket-modal");
        const modalBody = document.getElementById("modal-body");
        const modalFooter = document.getElementById("modal-footer");

        modalBody.innerHTML = `
            <div class="ticket-details" style="display: flex; flex-direction: column; gap: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="info-group">
                        <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">User Info</label>
                        <span style="font-size: 15px; font-weight: 600;">${ticket.userName} (${ticket.userRole})</span>
                    </div>
                    <div class="info-group">
                        <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">Ticket ID</label>
                        <span style="font-size: 15px; font-weight: 600; color: #2563EB;">${ticket.id}</span>
                    </div>
                </div>
                <div>
                    <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">Subject</label>
                    <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600;">${ticket.subject}</p>
                </div>
                <div style="background: #F9FAFB; padding: 15px; border-radius: 8px; border-left: 4px solid #D1D5DB;">
                    <label style="display: block; font-size: 12px; color: #6B7280; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Description</label>
                    <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.5;">${ticket.description}</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                    <div class="info-group">
                        <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">Priority</label>
                        <span class="status-tag ${ticket.priority}">${ticket.priority}</span>
                    </div>
                    <div class="info-group">
                        <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">Status</label>
                        <span class="status-tag ${ticket.status}">${ticket.status}</span>
                    </div>
                    <div class="info-group">
                        <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">Category</label>
                        <span style="font-size: 14px; font-weight: 600;">${ticket.category}</span>
                    </div>
                </div>
                <div class="info-group">
                    <label style="display: block; font-size: 12px; color: #9CA3AF; font-weight: 700; text-transform: uppercase;">Created At</label>
                    <span style="font-size: 14px; color: #4B5563;">${new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
            </div>
        `;

        modalFooter.innerHTML = `
            <div style="display: flex; gap: 12px; width: 100%; justify-content: flex-end;">
                ${ticket.status === 'pending' ? `
                    <button class="secondary-btn" style="border-color: #3b82f6; color: #3b82f6;" onclick="window.updateTicketStatus('${ticket.id}', 'in-progress')">Mark In-Progress</button>
                    <button class="secondary-btn" style="border-color: #10b981; color: #10b981;" onclick="window.updateTicketStatus('${ticket.id}', 'resolved')">Resolve Ticket</button>
                    <button class="secondary-btn" style="border-color: #ef4444; color: #ef4444;" onclick="window.updateTicketStatus('${ticket.id}', 'escalated')">Escalate</button>
                ` : ticket.status === 'in-progress' ? `
                    <button class="secondary-btn" style="border-color: #10b981; color: #10b981;" onclick="window.updateTicketStatus('${ticket.id}', 'resolved')">Resolve Ticket</button>
                    <button class="secondary-btn" style="border-color: #ef4444; color: #ef4444;" onclick="window.updateTicketStatus('${ticket.id}', 'escalated')">Escalate</button>
                ` : ''}
                <button class="secondary-btn" onclick="window.closeModal()">Close</button>
            </div>
        `;

        modal.classList.add("active");
    };

    // Update Ticket Status Handler
    window.updateTicketStatus = (id, newStatus) => {
        const ticketIndex = techAdminData.tickets.findIndex(t => t.id === id);
        if (ticketIndex !== -1) {
            techAdminData.tickets[ticketIndex].status = newStatus;
            if (newStatus === 'resolved') {
                techAdminData.tickets[ticketIndex].resolvedAt = new Date().toISOString();
            }
            
            // Log this action in user activity
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const newActivity = {
                id: `ACT-${Date.now()}`,
                userId: currentUser.id,
                userName: currentUser.name,
                action: `Updated Ticket ${id} to ${newStatus}`,
                timestamp: new Date().toISOString()
            };
            techAdminData.userActivity.unshift(newActivity);

            localStorage.setItem("techAdminData", JSON.stringify(techAdminData));
            renderTickets();
            window.closeModal();
            // Optional: Toast notification instead of alert
            console.log(`Ticket ${id} status updated to ${newStatus}.`);
        }
    };

    window.closeModal = () => {
        const modal = document.getElementById("ticket-modal");
        if (modal) {
            modal.classList.remove("active");
        }
    };

    // Initial Setup
    updateTabUI();
    renderTickets();
}

