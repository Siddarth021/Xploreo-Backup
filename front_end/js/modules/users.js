export function initUsers() {
    const mainContainer = document.getElementById("main");
    if (!mainContainer) return;

    // =======================
    // 🔹 DATA DEFINITIONS
    // =======================
    
    // Data for the 4 Top Cards
    const opsData = [
        { 
            label: "New Registrations", value: "1,284", 
            subtext: "Past 30 days activity", color: "blue",
            icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233182ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='8.5' cy='7' r='4'%3E%3C/circle%3E%3Cline x1='20' y1='8' x2='20' y2='14'%3E%3C/line%3E%3Cline x1='23' y1='11' x2='17' y2='11'%3E%3C/line%3E%3C/svg%3E",
            trend: "+12.0%", subClass: "trend-up"
        },
        { 
            label: "Verification Queue", value: "42", 
            subtext: "Awaiting admin review", color: "dark-green",
            icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338a169' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'%3E%3C/path%3E%3Crect x='8' y='2' width='8' height='4' rx='1' ry='1'%3E%3C/rect%3E%3Ccircle cx='12' cy='14' r='4'%3E%3C/circle%3E%3Cpolyline points='12 12 12 14 14 14'%3E%3C/polyline%3E%3C/svg%3E",
            trend: "URGENT", subClass: "badge-urgent"
        },
        { 
            label: "Avg Response Time", value: "4.2h", 
            subtext: "Resolution efficiency rate", color: "violet",
            icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233182ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E"
        },
        { 
            label: "Partner Satisfaction", value: "94%", 
            subtext: "Quarterly survey data", color: "orange",
            icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233182ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolygon points='12 8 13.09 10.26 15.5 10.61 13.75 12.32 14.17 14.74 12 13.6 9.83 14.74 10.25 12.32 8.5 10.61 10.91 10.26 12 8'%3E%3C/polygon%3E%3C/svg%3E",
            trend: "★★★★☆", subClass: "stars"
        }
    ];

    // Status Dictionaries
    const userStatusStyles = {
        "Active": { color: "#1e8e3e", bg: "#e6f4ea" },
        "Pending": { color: "#d97706", bg: "#fef3c7" },
        "Inactive": { color: "#e53e3e", bg: "#fff5f5" }
    };

    const partnerStatusStyles = {
        "Verified": { color: "#1e8e3e", bg: "#e6f4ea" },
        "Under Review": { color: "#d97706", bg: "#fef3c7" },
        "Unverified": { color: "#e53e3e", bg: "#fff5f5" }
    };

    // Users Data
    let platformUsersData = [
        { 
            id: "#AM-0922", name: "Elena Vance", email: "elena.v@example.com",
            role: "Traveler", avatarBg: "#2b6cb0", initials: "EV", status: "Active", joined: "Oct 12, 2023",
            activity: [
                { type: "check", bg: "#e6f4ea", color: "#1e8e3e", title: "Booked: Amalfi Coastal Escape", time: "2 hours ago • Booking #3849" }
            ],
            summary: { spent: "₹1.85L", trips: "8" }
        },
        { 
            id: "#AM-0923", name: "Julian Black", email: "j.black@company.org",
            role: "Guide", avatarBg: "#e2e8f0", initials: "JB", status: "Pending", joined: "Nov 04, 2023",
            activity: [
                { type: "alert", bg: "#fff7ed", color: "#d97706", title: "Submitted KYC Documents", time: "1 day ago • Awaiting Review" }
            ],
            summary: { spent: "₹0", trips: "0" }
        },
        { 
            id: "#AM-0924", name: "Marcus Thorne", email: "m.thorne@global.com",
            role: "Traveler", avatarBg: "#2d3748", initials: "MT", status: "Active", joined: "Dec 15, 2023",
            activity: [
                { type: "star", bg: "#fffaf0", color: "#d97706", title: "Left a 5-star review", time: "3 hours ago • Experience: Kyoto Hike" }
            ],
            summary: { spent: "₹4.2L", trips: "12" }
        }
    ];

    // Partners Data
    let partnersData = [
        {
            id: "#PRT-01", name: "Luxe Mediterraneo", location: "Santorini, Greece", initials: "LM",
            type: "BOUTIQUE HOTEL", typeColor: "#3182ce", typeBg: "#ebf8ff", rating: "4.9",
            status: "Verified", joined: "Mar 12, 2021", revenue: 85
        },
        {
            id: "#PRT-02", name: "Alpine Treks Ltd", location: "Zermatt, Switzerland", initials: "AT",
            type: "TOUR OPERATOR", typeColor: "#2f855a", typeBg: "#f0fff4", rating: "4.7",
            status: "Under Review", joined: "Jun 30, 2022", revenue: 40
        },
        {
            id: "#PRT-03", name: "Grand Tours Global", location: "London, UK", initials: "GT",
            type: "TRANSPORT", typeColor: "#805ad5", typeBg: "#faf5ff", rating: "4.2",
            status: "Verified", joined: "Jan 15, 2020", revenue: 95
        }
    ];

    let currentUserFilter = "All";
    let currentPartnerFilter = "All";

    const activityIcons = {
        check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        alert: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    };

    // =======================
    // 🔹 HTML RENDERING
    // =======================
    mainContainer.innerHTML = `
        <style>
            .stat-card { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #edf2f7; position: relative; }
            .card-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; background: #f7fafc; }
            .stat-label { color: #4a5568; font-size: 14px; margin: 0; font-weight: 500; }
            .stat-value { font-size: 32px; font-weight: 700; margin: 8px 0; color: #1a202c; }
            .stat-subtext { font-size: 12px; color: #a0aec0; margin: 0; display: flex; align-items: center; gap: 5px; }
            .trend-up { color: #1e8e3e; font-weight: 600; position: absolute; top: 24px; right: 24px; background: #e6f4ea; padding: 4px 8px; border-radius: 10px; font-size: 11px; }
            .badge-urgent { color: #e53e3e; font-weight: 800; position: absolute; top: 24px; right: 24px; background: #fff5f5; padding: 4px 8px; border-radius: 6px; border: 1px solid #feb2b2; font-size: 10px; }
            .stars { color: #38a169; position: absolute; top: 24px; right: 24px; font-size: 14px; }
            .user-row:hover, .partner-row:hover { background: #f8fafc; }
            
            .filter-btn { padding: 6px 14px; border-radius: 20px; border: 1px solid #edf2f7; background: #f8fafc; color: #718096; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
            .filter-btn.active { background: #ebf8ff; color: #3182ce; border-color: #90cdf4; }
            .filter-btn:hover:not(.active) { background: #edf2f7; }
            .remove-btn { background: transparent; border: none; color: #e53e3e; cursor: pointer; padding: 6px; border-radius: 6px; transition: background 0.2s; display: flex; align-items: center; justify-content: center; }
            .remove-btn:hover { background: #fff5f5; }
            .role-badge { padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #edf2f7; color: #4a5568; }
            
            /* Status dropdown styling */
            .status-select { 
                border: none; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; 
                cursor: pointer; outline: none; transition: all 0.2s; appearance: none;
                text-align: center;
            }
            .status-select:hover { filter: brightness(0.95); }
        </style>

        <div class="page-header" style="margin-bottom: 24px;">
            <h1 class="page-title" style="margin-top: 0; font-size: 28px;">User & Partner Statistics</h1>
            <p class="page-subtitle" style="margin: 5px 0 0; font-size: 14px; color: #718096;">Real-time performance monitoring and ecosystem health.</p>
        </div>
        
        <div id="ops-stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px;">
            ${opsData.map(stat => `
                <div class="stat-card ${stat.color}">
                    <div class="card-icon">
                        <img src="${stat.icon}" style="width:18px;">
                    </div>
                    <p class="stat-label">${stat.label.toUpperCase()}</p>
                    <h2 class="stat-value">${stat.value}</h2>
                    <p class="stat-subtext">
                        ${stat.trend ? `↗ ${stat.trend} ` : ""}
                        ${stat.subtext}
                    </p>
                </div>
            `).join('')}
        </div>

        <div style="display:grid; grid-template-columns: 1fr 380px; gap:24px; align-items: start; margin-bottom: 32px;">
            <div style="background:#fff; border-radius:20px; border:1px solid #edf2f7; overflow:hidden;">
                <div style="padding:24px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div>
                        <h3 style="margin:0;">Manage Platform Users</h3>
                        <p style="color:#718096; font-size:14px; margin:4px 0 0 0;">Comprehensive directory of all registered accounts</p>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button class="filter-btn user-filter-btn active" data-filter="All">All</button>
                        <button class="filter-btn user-filter-btn" data-filter="Traveler">Travelers</button>
                        <button class="filter-btn user-filter-btn" data-filter="Guide">Guides</button>
                    </div>
                </div>
                <table style="width:100%; border-collapse:collapse; text-align:left;">
                    <thead>
                        <tr style="background:#f8fafc; color:#a0aec0; font-size:11px; text-transform:uppercase; letter-spacing:0.05em;">
                            <th style="padding:16px 24px;">ID</th>
                            <th style="padding:16px;">User</th>
                            <th style="padding:16px;">Role</th>
                            <th style="padding:16px;">Status</th>
                            <th style="padding:16px;">Joined</th>
                            <th style="padding:16px 24px; text-align:center;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="users-tbody">
                        </tbody>
                </table>
            </div>

            <div id="profile-panel" style="background:#fff; border-radius:20px; border:1px solid #edf2f7; padding:40px 24px; position:sticky; top:24px;">
                </div>
        </div>

        <div style="background:#fff; border-radius:20px; border:1px solid #edf2f7; overflow:hidden;">
            <div style="padding:24px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #edf2f7;">
                <div>
                    <h3 style="margin:0; font-size:24px; color:#1a202c;">Service Partner Network</h3>
                    <p style="color:#718096; font-size:15px; margin:4px 0 0 0;">Manage institutional and boutique providers across the global ecosystem</p>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="filter-btn partner-filter-btn active" data-filter="All">All</button>
                    <button class="filter-btn partner-filter-btn" data-filter="BOUTIQUE HOTEL">Boutique Hotel</button>
                    <button class="filter-btn partner-filter-btn" data-filter="TOUR OPERATOR">Tour Operator</button>
                    <button class="filter-btn partner-filter-btn" data-filter="TRANSPORT">Transport</button>
                </div>
            </div>
            
            <table style="width:100%; border-collapse:collapse; text-align:left;">
                <thead>
                    <tr style="background:#f8fafc; color:#a0aec0; font-size:11px; text-transform:uppercase; letter-spacing:0.05em; border-bottom:1px solid #edf2f7;">
                        <th style="padding:16px 24px;">Partner Name</th>
                        <th style="padding:16px;">Business Type</th>
                        <th style="padding:16px;">Global Rating</th>
                        <th style="padding:16px;">Status</th>
                        <th style="padding:16px;">Joined Date</th>
                        <th style="padding:16px 24px;">Revenue Contribution</th>
                    </tr>
                </thead>
                <tbody id="partners-tbody">
                    </tbody>
            </table>
        </div>
    `;

    // =======================
    // 🔹 DYNAMIC LOGIC - USERS
    // =======================
    function updateProfile(id) {
        const panel = document.getElementById("profile-panel");
        const user = platformUsersData.find(u => u.id === id);
        
        if (!user) {
            panel.dataset.currentId = "";
            panel.innerHTML = `<div style="text-align:center; color:#a0aec0; padding-top:40px;">User profile unavailable.</div>`;
            return;
        }

        panel.dataset.currentId = id;
        panel.innerHTML = `
            <div style="text-align:center; margin-bottom:32px;">
                <div style="width:90px; height:90px; border-radius:50%; background:${user.avatarBg}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:600; margin:0 auto 16px; border:4px solid #f8fafc; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                    ${user.initials}
                </div>
                <h2 style="margin:0; font-size:24px; color:#1a202c;">${user.name}</h2>
                <p style="color:#718096; margin:4px 0 0 0; font-size:14px;">${user.email}</p>
                <div style="margin-top:8px;">
                    <span class="role-badge">${user.role}</span>
                    <span style="margin-left:8px; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; background: ${userStatusStyles[user.status].bg}; color: ${userStatusStyles[user.status].color};">${user.status}</span>
                </div>
            </div>

            <div style="margin-bottom:32px;">
                <p style="font-size:11px; font-weight:700; color:#a0aec0; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:16px; border-bottom: 1px solid #f7fafc; padding-bottom: 8px;">Recent Activity</p>
                <div style="display:flex; flex-direction:column; gap:20px;">
                    ${user.activity.map(act => `
                        <div style="display:flex; gap:12px;">
                            <div style="width:32px; height:32px; border-radius:10px; background:${act.bg}; color:${act.color}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                ${activityIcons[act.type]}
                            </div>
                            <div>
                                <div style="font-size:14px; font-weight:600; color:#2d3748;">${act.title}</div>
                                <div style="font-size:12px; color:#a0aec0; margin-top:2px;">${act.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div>
                <p style="font-size:11px; font-weight:700; color:#a0aec0; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:16px;">Booking Summary</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                    <div style="background:#f8fafc; padding:16px; border-radius:16px; border:1px solid #edf2f7;">
                        <div style="font-size:11px; color:#718096; font-weight:600; text-transform:uppercase;">Total Spent</div>
                        <div style="font-size:20px; font-weight:700; color:#2d3748; margin-top:4px;">${user.summary.spent}</div>
                    </div>
                    <div style="background:#f8fafc; padding:16px; border-radius:16px; border:1px solid #edf2f7;">
                        <div style="font-size:11px; color:#718096; font-weight:600; text-transform:uppercase;">Trips Done</div>
                        <div style="font-size:20px; font-weight:700; color:#2d3748; margin-top:4px;">${user.summary.trips}</div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderUserTable() {
        const tbody = document.getElementById("users-tbody");
        const filteredData = currentUserFilter === "All" ? platformUsersData : platformUsersData.filter(u => u.role === currentUserFilter);

        if (filteredData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="padding:24px; text-align:center; color:#a0aec0;">No users found.</td></tr>`;
            return;
        }

        tbody.innerHTML = filteredData.map(user => `
            <tr class="user-row" data-id="${user.id}" style="cursor:pointer; border-top:1px solid #edf2f7; transition: background 0.2s;">
                <td style="padding:20px 24px; color:#718096; font-size:13px;">${user.id}</td>
                <td style="padding:20px 16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:36px; height:36px; border-radius:50%; background:${user.avatarBg}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:13px;">
                            ${user.initials}
                        </div>
                        <div>
                            <div style="font-weight:600; color:#2d3748; font-size:14px;">${user.name}</div>
                            <div style="font-size:12px; color:#a0aec0;">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td style="padding:20px 16px;"><span class="role-badge">${user.role}</span></td>
                <td style="padding:20px 16px;">
                    <select class="status-select user-status-select" data-id="${user.id}" style="background:${userStatusStyles[user.status].bg}; color:${userStatusStyles[user.status].color};">
                        <option value="Active" ${user.status === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="Pending" ${user.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Inactive" ${user.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                    </select>
                </td>
                <td style="padding:20px 16px; color:#718096; font-size:13px;">${user.joined}</td>
                <td style="padding:20px 24px; text-align:center;">
                    <button class="remove-btn" data-id="${user.id}" title="Remove User">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');

        attachUserListeners();
    }

    function attachUserListeners() {
        document.querySelectorAll(".user-row").forEach(row => {
            row.addEventListener("click", (e) => {
                if(e.target.tagName === "SELECT" || e.target.closest('.remove-btn')) return;
                document.querySelectorAll(".user-row").forEach(r => r.style.background = "transparent");
                row.style.background = "#f8fafc";
                updateProfile(row.dataset.id);
            });
        });

        document.querySelectorAll(".user-status-select").forEach(select => {
            select.addEventListener("change", (e) => {
                const userId = e.target.dataset.id;
                const userIndex = platformUsersData.findIndex(u => u.id === userId);
                if (userIndex !== -1) platformUsersData[userIndex].status = e.target.value;
                renderUserTable();
                if(document.getElementById("profile-panel").dataset.currentId === userId) updateProfile(userId);
            });
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const userId = btn.dataset.id;
                platformUsersData = platformUsersData.filter(u => u.id !== userId);
                renderUserTable();
                if(document.getElementById("profile-panel").dataset.currentId === userId) updateProfile(null);
            });
        });
    }

    // =======================
    // 🔹 DYNAMIC LOGIC - PARTNERS
    // =======================
    function renderPartnerTable() {
        const tbody = document.getElementById("partners-tbody");
        const filteredData = currentPartnerFilter === "All" ? partnersData : partnersData.filter(p => p.type === currentPartnerFilter);

        if (filteredData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="padding:24px; text-align:center; color:#a0aec0;">No partners found in this category.</td></tr>`;
            return;
        }

        tbody.innerHTML = filteredData.map(partner => `
            <tr class="partner-row" style="border-bottom:1px solid #edf2f7; transition: background 0.2s;">
                <td style="padding:20px 24px;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <div style="width:40px; height:40px; border-radius:10px; background:${partner.typeBg}; color:${partner.typeColor}; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:15px;">
                            ${partner.initials}
                        </div>
                        <div>
                            <div style="font-weight:700; color:#1a202c; font-size:15px;">${partner.name}</div>
                            <div style="font-size:13px; color:#a0aec0; margin-top:2px;">${partner.location}</div>
                        </div>
                    </div>
                </td>
                <td style="padding:20px 16px;">
                    <span style="background:${partner.typeBg}; color:${partner.typeColor}; padding:6px 14px; border-radius:20px; font-size:11px; font-weight:700; display:inline-block; letter-spacing:0.05em;">
                        ${partner.type}
                    </span>
                </td>
                <td style="padding:20px 16px;">
                    <div style="display:flex; align-items:center; gap:6px; font-weight:700; font-size:15px; color:#2d3748;">
                        ${partner.rating}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ecc94b" stroke="#ecc94b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                </td>
                <td style="padding:20px 16px;">
                    <select class="status-select partner-status-select" data-id="${partner.id}" style="background:${partnerStatusStyles[partner.status].bg}; color:${partnerStatusStyles[partner.status].color};">
                        <option value="Verified" ${partner.status === 'Verified' ? 'selected' : ''}>Verified</option>
                        <option value="Under Review" ${partner.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                        <option value="Unverified" ${partner.status === 'Unverified' ? 'selected' : ''}>Unverified</option>
                    </select>
                </td>
                <td style="padding:20px 16px; color:#4a5568; font-size:14px;">${partner.joined}</td>
                <td style="padding:20px 24px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div style="flex-grow:1; height:6px; background:#edf2f7; border-radius:3px; overflow:hidden;">
                            <div style="width:${partner.revenue}%; height:100%; background:#2b6cb0; border-radius:3px;"></div>
                        </div>
                        <div style="font-weight:600; font-size:13px; color:#4a5568; min-width:32px;">${partner.revenue}%</div>
                    </div>
                </td>
            </tr>
        `).join('');

        attachPartnerListeners();
    }

    function attachPartnerListeners() {
        document.querySelectorAll(".partner-status-select").forEach(select => {
            select.addEventListener("change", (e) => {
                const partnerId = e.target.dataset.id;
                const index = partnersData.findIndex(p => p.id === partnerId);
                if (index !== -1) partnersData[index].status = e.target.value;
                renderPartnerTable();
            });
        });
    }

    // =======================
    // 🔹 FILTER BUTTON INIT
    // =======================
    document.querySelectorAll(".user-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".user-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentUserFilter = btn.dataset.filter;
            renderUserTable();
        });
    });

    document.querySelectorAll(".partner-filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".partner-filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentPartnerFilter = btn.dataset.filter;
            renderPartnerTable();
        });
    });

    // Boot Up Tables
    renderUserTable();
    renderPartnerTable();
    const initialRows = document.querySelectorAll(".user-row");
    if (initialRows.length > 0) initialRows[0].click();
}