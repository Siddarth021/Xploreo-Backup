export function initOperations() {
    const mainContainer = document.getElementById("main");
    if (!mainContainer) return;

    // The data for Operations Hub
    const opsData = [
        {
            label: "TOTAL ANNUAL BOOKINGS",
            value: "12,482",
            subtext: "↗ +12.5% vs FY23",
            subClass: "green",
            color: "blue",
            icon: "../components/ui/operations.png"
        },
        {
            label: "ONGOING EXPERIENCES",
            value: "843",
            subtext: "live sessions",
            subClass: "blue-text",
            color: "dark-green",
            icon: "../components/ui/finance.png"
        },
        {
            label: "SUCCESSFUL COMPLETIONS",
            value: "11,204",
            subtext: "94% Target",
            subClass: "green",
            color: "violet",
            icon: "../components/ui/operations.png"
        },
        {
            label: "ATTRITION & REFUNDS",
            value: "435",
            subtext: "within SLAs",
            subClass: "red", 
            color: "orange",
            icon: "../components/ui/users.png"
        }
    ];

    mainContainer.innerHTML = `
        <div class="page-header">
            <h1 class="page-title" style="margin-top: 0; font-size: 24px;">Operations Hub</h1>
            <p class="page-subtitle" style="margin: 5px 0 0; font-size: 14px;">Global real-time booking intelligence and lifecycle management.</p>
        </div>
        
        <div id="ops-stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
            ${opsData.map(stat => `
                <div class="stat-card ${stat.color}">
                    <div class="card-icon">
                        <img src="${stat.icon}" alt="icon">
                    </div>
                    <p class="stat-label">${stat.label}</p>
                    <h2 class="stat-value">${stat.value}</h2>
                    <p class="stat-subtext ${stat.subClass || ""}">${stat.subtext}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="section-header" style="margin-top: 40px;">
            <h2>Comprehensive Ledger</h2>
            <p>Detailed transactional audit of every journey across the network.</p>
        </div>
        <div class="ledger-card">
            <table class="ledger-table">
                <thead>
                    <tr>
                        <th>ID REFERENCE</th>
                        <th>TRAVELER ACCOUNT</th>
                        <th>EXPERIENCE SERVICE</th>
                        <th>DEPLOYMENT DATE</th>
                        <th>LEAD GUIDE</th>
                        <th>LEDGER STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#" class="id-link">98421</a></td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-blue">EM</div>
                                <div class="text-stack">
                                    <span class="main-text">Elena Moretti</span>
                                    <span class="sub-text">Premium Member</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="text-stack">
                                <span class="main-text">Venice Gondola Private Tour</span>
                                <span class="sub-text">Luxe Tier</span>
                            </div>
                        </td>
                        <td class="date-text">Oct 24, 2024</td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-gray">MP</div>
                                <span class="main-text">Marco Polo</span>
                            </div>
                        </td>
                        <td><span class="status-badge status-confirmed">CONFIRMED</span></td>
                    </tr>
                    <tr>
                        <td><a href="#" class="id-link">98420</a></td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-blue">JS</div>
                                <div class="text-stack">
                                    <span class="main-text">James Smith</span>
                                    <span class="sub-text">Corporate</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="text-stack">
                                <span class="main-text">Kyoto Temple Hike</span>
                                <span class="sub-text">Full Day</span>
                            </div>
                        </td>
                        <td class="date-text">Oct 24, 2024</td>
                        <td>
                            <div class="cell-flex">
                                <div class="avatar avatar-light-gray">YT</div>
                                <span class="main-text">Yuki Tanaka</span>
                            </div>
                        </td>
                        <td><span class="status-badge status-ongoing">ONGOING</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="revenue-header">
            <div>
                <h2>Revenue Recovery</h2>
                <p>Monitoring cancellations and handling refund automation.</p>
            </div>
            <a href="#" class="manage-link" id="open-queue-btn">MANAGE QUEUE</a>
        </div>

        <div class="recovery-card">
            <div class="recovery-card-header">
                <span class="recovery-meta">REFUND QUEUE • 98305</span>
                <span class="status-badge badge-refunded">FULLY REFUNDED</span>
            </div>
            <h3 class="recovery-title">Sahara Desert Overnight Trek</h3>
            <div class="details-grid grid-3-col">
                <div class="detail-box">
                    <span class="detail-label">REASON</span>
                    <span class="detail-value">Flight<br>Cancellation</span>
                </div>
                <div class="detail-box">
                    <span class="detail-label">IMPACT</span>
                    <span class="detail-value text-red">-₹1.2L</span>
                </div>
                <div class="detail-box">
                    <span class="detail-label">RESOLUTION ID</span>
                    <span class="detail-value">552190</span>
                </div>
            </div>
        </div>

        <div class="dispute-header">
            <h2>Dispute Resolution Center</h2>
            <p>Escalated conflicts between partners, guides, and travelers.</p>
        </div>
        
        <div class="dispute-card">
            <table class="dispute-table">
                <thead>
                    <tr>
                        <th>DISPUTE CASE</th>
                        <th>BOOKING REF</th>
                        <th>ISSUE CATEGORY</th>
                        <th>SEVERITY</th>
                        <th>RESOLUTION FLOW</th>
                        <th>SYSTEM ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><a href="#" class="case-link">4412</a></td>
                        <td><span class="ref-text">97001</span></td>
                        <td>
                            <span class="issue-main">Partner No-Show Claim</span>
                            <span class="issue-sub">Traveler documentation<br>provided via website</span>
                        </td>
                        <td><span class="severity-critical">CRITICAL</span></td>
                        <td>
                            <div class="flow-status">
                                <span class="dot dot-red"></span> Open Inquiry
                            </div>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn-resolve" data-case="4412" data-ref="97001" data-issue="Partner No-Show Claim">Resolve</button>
                                <button class="btn-escalate" data-case="4412" data-ref="97001" data-issue="Partner No-Show Claim">Escalate</button>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td><a href="#" class="case-link">4410</a></td>
                        <td><span class="ref-text">97055</span></td>
                        <td>
                            <span class="issue-main">Vehicle Logistics Quality</span>
                            <span class="issue-sub">Reported AC failure<br>during desert excursion</span>
                        </td>
                        <td><span class="severity-standard">STANDARD</span></td>
                        <td>
                            <div class="flow-status">
                                <span class="dot dot-yellow"></span> Gathering Evidence
                            </div>
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn-resolve" data-case="4410" data-ref="97055" data-issue="Vehicle Logistics Quality">Resolve</button>
                                <button class="btn-escalate" data-case="4410" data-ref="97055" data-issue="Vehicle Logistics Quality">Escalate</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="manage-queue-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="queue-modal-title">Manage Queue Workflow</h3>
                    <button class="close-btn" data-target="manage-queue-modal">&times;</button>
                </div>
                <div class="modal-body queue-default-state">
                    <p>Select a bulk action to apply to the current recovery queue.</p>
                    <div class="modal-actions">
                        <button id="btn-escalate-queue" class="btn btn-primary">Assign All to Escalation Team</button>
                        <button id="btn-process-queue" class="btn btn-secondary">Auto-Process Eligible Refunds</button>
                    </div>
                </div>
                <div class="modal-body success-state" style="display: none; text-align: center; padding: 10px 0 20px;">
                    <div style="font-size: 48px; color: #1e8e3e; margin-bottom: 12px; font-weight: bold;">✓</div>
                    <h3 style="margin: 0 0 8px 0; color: #1a202c; font-size: 20px;">Action Confirmed</h3>
                    <p class="success-message-text" style="margin: 0; color: #4a5568; font-size: 15px;"></p>
                </div>
            </div>
        </div>

        <div id="resolve-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="dynamic-title">Resolve Case</h3>
                    <button class="close-btn" data-target="resolve-modal">&times;</button>
                </div>
                <div class="modal-body form-state">
                    <div style="background: #f7fafc; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                        <strong>Case ID:</strong> <span class="inject-case"></span><br>
                        <strong>Ref:</strong> <span class="inject-ref"></span><br>
                        <strong>Issue:</strong> <span class="inject-issue"></span>
                    </div>
                    <p>Select the final resolution outcome for this dispute.</p>
                    <select style="width: 100%; padding: 10px; margin-bottom: 16px; border-radius: 6px; border: 1px solid #cbd5e0;">
                        <option>Issue Full Refund to Traveler</option>
                        <option>Issue Partial Credit & Warning</option>
                        <option>Dismiss Claim (Insufficient Evidence)</option>
                    </select>
                    <button class="btn btn-primary btn-confirm-action" style="width: 100%;">Confirm Resolution</button>
                </div>
                <div class="modal-body success-state" style="display: none; text-align: center; padding: 10px 0 20px;">
                    <div style="font-size: 48px; color: #1e8e3e; margin-bottom: 12px; font-weight: bold;">✓</div>
                    <h3 style="margin: 0 0 8px 0; color: #1a202c; font-size: 20px;">Case Resolved</h3>
                    <p style="margin: 0; color: #4a5568; font-size: 15px;">The ledger has been updated and parties notified.</p>
                </div>
            </div>
        </div>

        <div id="escalate-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="dynamic-title">Escalate Case</h3>
                    <button class="close-btn" data-target="escalate-modal">&times;</button>
                </div>
                <div class="modal-body form-state">
                    <div style="background: #fff5f5; border: 1px solid #fed7d7; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
                        <strong style="color: #c53030;">Case ID:</strong> <span class="inject-case"></span><br>
                        <strong>Ref:</strong> <span class="inject-ref"></span><br>
                        <strong>Issue:</strong> <span class="inject-issue"></span>
                    </div>
                    <p>Select the appropriate department to review this escalation.</p>
                    <select style="width: 100%; padding: 10px; margin-bottom: 16px; border-radius: 6px; border: 1px solid #cbd5e0;">
                        <option>Operations Admin</option>
                        <option>Technical Admin</option>
                        <option>Non Technical Admin</option>
                    </select>
                    <textarea placeholder="Brief reason for escalation..." style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #cbd5e0; margin-bottom: 16px; resize: none; font-family: inherit; box-sizing: border-box;" rows="3"></textarea>
                    <button class="btn btn-outline btn-confirm-action" style="width: 100%;">Submit Escalation</button>
                </div>
                <div class="modal-body success-state" style="display: none; text-align: center; padding: 10px 0 20px;">
                    <div style="font-size: 48px; color: #1e8e3e; margin-bottom: 12px; font-weight: bold;">✓</div>
                    <h3 style="margin: 0 0 8px 0; color: #1a202c; font-size: 20px;">Case Escalated</h3>
                    <p style="margin: 0; color: #4a5568; font-size: 15px;">The ticket has been routed to the selected department.</p>
                </div>
            </div>
        </div>
    `;

    // --- Modal Javascript Logic ---

    // Generic Modal Close Function
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetModalId = btn.getAttribute('data-target');
            document.getElementById(targetModalId).classList.remove('active');
        });
    });

    // Close on outside click
    const allModals = document.querySelectorAll('.modal-overlay');
    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Generic Success Trigger
    const triggerSuccess = (modalElement, customMessage = null) => {
        const header = modalElement.querySelector('.modal-header');
        const defaultState = modalElement.querySelector('.queue-default-state, .form-state');
        const successState = modalElement.querySelector('.success-state');
        
        if (header) header.style.display = "none";
        if (defaultState) defaultState.style.display = "none";
        
        if (customMessage) {
            const msgEl = successState.querySelector('.success-message-text');
            if(msgEl) msgEl.innerText = customMessage;
        }

        successState.style.display = "block";
        
        setTimeout(() => {
            modalElement.classList.remove('active');
            // Reset modal after closing
            setTimeout(() => {
                if (header) header.style.display = "flex";
                if (defaultState) defaultState.style.display = "block";
                successState.style.display = "none";
            }, 300);
        }, 2000);
    };

    // 1. Manage Queue Logic
    const openQueueBtn = document.getElementById('open-queue-btn');
    const queueModal = document.getElementById('manage-queue-modal');
    if (openQueueBtn && queueModal) {
        openQueueBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            queueModal.classList.add('active');
        });

        document.getElementById('btn-escalate-queue')?.addEventListener('click', () => {
            triggerSuccess(queueModal, "All pending cases have been escalated to the team.");
        });
        document.getElementById('btn-process-queue')?.addEventListener('click', () => {
            triggerSuccess(queueModal, "All eligible refunds have been auto-processed.");
        });
    }

    // 2. Resolve & Escalate Logic
    const resolveBtns = document.querySelectorAll('.btn-resolve');
    const escalateBtns = document.querySelectorAll('.btn-escalate');
    const resolveModal = document.getElementById('resolve-modal');
    const escalateModal = document.getElementById('escalate-modal');

    // Function to inject dynamic data into a modal
    const populateModal = (modalElement, btnElement) => {
        const caseId = btnElement.getAttribute('data-case');
        const ref = btnElement.getAttribute('data-ref');
        const issue = btnElement.getAttribute('data-issue');

        modalElement.querySelector('.dynamic-title').innerText = `Manage Case #${caseId}`;
        modalElement.querySelector('.inject-case').innerText = caseId;
        modalElement.querySelector('.inject-ref').innerText = ref;
        modalElement.querySelector('.inject-issue').innerText = issue;
    };

    resolveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            populateModal(resolveModal, btn);
            resolveModal.classList.add('active');
        });
    });

    escalateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            populateModal(escalateModal, btn);
            escalateModal.classList.add('active');
        });
    });

    // Handle Confirm Buttons in Resolve/Escalate Modals
    const confirmButtons = document.querySelectorAll('.btn-confirm-action');
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parentModal = e.target.closest('.modal-overlay');
            triggerSuccess(parentModal);
        });
    });
}