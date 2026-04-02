export function initTicketManagement() {
    let techAdminData = JSON.parse(localStorage.getItem("techAdminData"));
    if (!techAdminData) return;

    let currentFilter = "all";
    let searchQuery = "";

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
                <td>${ticket.id}</td>
                <td>${ticket.userName} (${ticket.userRole})</td>
                <td>${ticket.subject}</td>
                <td><span class="priority-badge ${ticket.priority}">${ticket.priority}</span></td>
                <td><span class="status-badge ${ticket.status}">${ticket.status}</span></td>
                <td>${ticket.category}</td>
                <td>
                    <button class="action-btn view" onclick="window.viewTicket('${ticket.id}')">View</button>
                    ${ticket.status === 'pending' || ticket.status === 'in-progress' ? `
                        <button class="action-btn approve" onclick="window.updateTicketStatus('${ticket.id}', 'resolved')">Resolve</button>
                        <button class="action-btn reject" onclick="window.updateTicketStatus('${ticket.id}', 'escalated')">Escalate</button>
                    ` : ''}
                </td>
            </tr>
        `).join('');
    };

    // Filter Buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentFilter = e.target.dataset.status;
            renderTickets();
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
        const modalHeader = document.getElementById("modal-ticket-id");
        const modalBody = document.getElementById("modal-body");
        const modalFooter = document.getElementById("modal-footer");

        modalHeader.innerText = `Ticket: ${ticket.id}`;
        modalBody.innerHTML = `
            <div class="ticket-details">
                <div class="detail-row"><span>User:</span> <p>${ticket.userName} (${ticket.userRole})</p></div>
                <div class="detail-row"><span>Subject:</span> <p>${ticket.subject}</p></div>
                <div class="detail-row"><span>Description:</span> <p>${ticket.description}</p></div>
                <div class="detail-row"><span>Priority:</span> <span class="priority-badge ${ticket.priority}">${ticket.priority}</span></div>
                <div class="detail-row"><span>Status:</span> <span class="status-badge ${ticket.status}">${ticket.status}</span></div>
                <div class="detail-row"><span>Category:</span> <p>${ticket.category}</p></div>
                <div class="detail-row"><span>Created:</span> <p>${new Date(ticket.createdAt).toLocaleString()}</p></div>
                ${ticket.resolvedAt ? `<div class="detail-row"><span>Resolved:</span> <p>${new Date(ticket.resolvedAt).toLocaleString()}</p></div>` : ''}
            </div>
        `;

        modalFooter.innerHTML = `
            ${ticket.status !== 'resolved' ? `
                <button class="primary-btn" onclick="window.updateTicketStatus('${ticket.id}', 'resolved')">Resolve Ticket</button>
                <button class="secondary-btn" onclick="window.updateTicketStatus('${ticket.id}', 'escalated')">Escalate</button>
            ` : ''}
            <button class="close-btn" onclick="window.closeModal()">Close</button>
        `;

        modal.classList.remove("hidden");
        modal.style.display = "flex";
    };

    // Update Ticket Status Handler
    window.updateTicketStatus = (id, newStatus) => {
        const ticketIndex = techAdminData.tickets.findIndex(t => t.id === id);
        if (ticketIndex !== -1) {
            techAdminData.tickets[ticketIndex].status = newStatus;
            if (newStatus === 'resolved') {
                techAdminData.tickets[ticketIndex].resolvedAt = new Date().toISOString();
            }
            localStorage.setItem("techAdminData", JSON.stringify(techAdminData));
            renderTickets();
            window.closeModal();
            alert(`Ticket ${id} status updated to ${newStatus}.`);
        }
    };

    window.closeModal = () => {
        const modal = document.getElementById("ticket-modal");
        if (modal) {
            modal.classList.add("hidden");
            modal.style.display = "none";
        }
    };

    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) closeBtn.onclick = window.closeModal;

    // Initial Render
    renderTickets();
}
