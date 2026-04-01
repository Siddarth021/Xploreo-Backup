// Mock Data - Replace with your actual database/API calls
const superAdminData = {
    firstName: "Rahul",
    lastName: "Varma",
    email: "rahul.varma@xploreo.com",
    phone: "+91 98765 43210",
    role: "System Superadmin",
    status: "Active",
    joinedDate: "October 12, 2023",
    lastLogin: "April 1, 2026, 10:45 AM",
    timezone: "Asia/Kolkata (IST)",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Varma&background=0D8ABC&color=fff&size=128"
};

const auditLogData = [
    { date: "April 1, 2026, 10:45 AM", action: "Successful Login", ip: "192.168.1.45", status: "Success" },
    { date: "March 28, 2026, 02:15 PM", action: "Updated Global Payment Settings", ip: "192.168.1.45", status: "Success" },
    { date: "March 25, 2026, 11:30 AM", action: "Created New Admin User (john.doe@xploreo.com)", ip: "192.168.1.12", status: "Success" },
    { date: "March 20, 2026, 09:05 PM", action: "Failed Login Attempt", ip: "45.22.19.102", status: "Failed" },
    { date: "March 15, 2026, 04:20 PM", action: "Exported Monthly Revenue Report", ip: "192.168.1.45", status: "Success" }
];

export function getSuperAdminProfileHTML(admin = superAdminData, logs = auditLogData) {
    return `
        <div style="margin-bottom: 24px;">
            <button onclick="window.location.href='dashboard.html'" style="padding: 8px 16px; background: #fff; border: 1px solid #ced4da; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-weight: 500; color: #495057; font-size: 0.9rem; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Dashboard
            </button>
        </div>

        <div class="page-header" style="margin-bottom: 24px;">
            <h2 style="font-size: 1.5rem; font-weight: bold; color: #212529;">My Profile</h2>
            <p style="color: #6c757d; font-size: 0.9rem;">Manage your superadmin account settings and system preferences.</p>
        </div>

        <div id="profile-grid" style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px; margin-bottom: 32px; align-items: start;">
            
            <div class="stat-card" style="padding: 32px 24px; text-align: center; border-radius: 8px; border: 1px solid #e9ecef; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <div style="margin-bottom: 16px;">
                    <img src="${admin.avatar}" alt="Admin Avatar" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid #e9ecef; object-fit: cover;">
                </div>
                <h3 style="font-size: 1.25rem; font-weight: bold; color: #212529; margin-bottom: 4px;">
                    ${admin.firstName} ${admin.lastName}
                </h3>
                <p style="color: #0d6efd; font-weight: 600; font-size: 0.85rem; margin-bottom: 16px;">
                    ${admin.role}
                </p>
                <span style="background: #e6f4ea; color: #1e8e3e; padding: 4px 12px; border-radius: 16px; font-size: 0.75rem; font-weight: bold;">
                    ● ${admin.status.toUpperCase()}
                </span>
                
                <hr style="border: 0; border-top: 1px solid #e9ecef; margin: 24px 0;">
                
                <div style="text-align: left;">
                    <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 4px;">LAST LOGIN</p>
                    <p style="font-size: 0.85rem; color: #212529; margin-bottom: 16px;">${admin.lastLogin}</p>
                    
                    <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 4px;">MEMBER SINCE</p>
                    <p style="font-size: 0.85rem; color: #212529;">${admin.joinedDate}</p>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 24px;">
                
                <div class="stat-card" style="padding: 24px; border-radius: 8px; border: 1px solid #e9ecef; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <h4 style="font-size: 1.1rem; font-weight: bold; color: #212529; margin-bottom: 20px;">Account Information</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 6px;">FIRST NAME</p>
                            <input type="text" value="${admin.firstName}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 0.9rem; color: #495057; box-sizing: border-box;">
                        </div>
                        <div>
                            <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 6px;">LAST NAME</p>
                            <input type="text" value="${admin.lastName}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 0.9rem; color: #495057; box-sizing: border-box;">
                        </div>
                        <div>
                            <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 6px;">EMAIL ADDRESS</p>
                            <input type="email" value="${admin.email}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 0.9rem; color: #6c757d; background: #f8f9fa; box-sizing: border-box;" readonly>
                        </div>
                        <div>
                            <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 6px;">PHONE NUMBER</p>
                            <input type="text" value="${admin.phone}" style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 0.9rem; color: #495057; box-sizing: border-box;">
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px; text-align: right;">
                        <button style="padding: 10px 20px; background: #0d6efd; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.9rem;">Save Changes</button>
                    </div>
                </div>

                <div class="stat-card" style="padding: 24px; border-radius: 8px; border: 1px solid #e9ecef; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <h4 style="font-size: 1.1rem; font-weight: bold; color: #212529; margin-bottom: 20px;">Security & Preferences</h4>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #e9ecef; margin-bottom: 16px;">
                        <div>
                            <p style="font-weight: 600; color: #212529; margin-bottom: 4px; font-size: 0.95rem;">Password</p>
                            <p style="font-size: 0.85rem; color: #6c757d; margin: 0;">Last changed 3 months ago</p>
                        </div>
                        <button style="padding: 8px 16px; background: transparent; color: #0d6efd; border: 1px solid #0d6efd; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">Change Password</button>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid #e9ecef; margin-bottom: 16px;">
                        <div>
                            <p style="font-weight: 600; color: #212529; margin-bottom: 4px; font-size: 0.95rem;">Two-Factor Authentication (2FA)</p>
                            <p style="font-size: 0.85rem; color: #28a745; margin: 0;">Enabled - Authenticator App</p>
                        </div>
                        <button style="padding: 8px 16px; background: transparent; color: #dc3545; border: 1px solid #dc3545; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.85rem;">Disable</button>
                    </div>
                    
                    <div>
                        <p class="stat-label" style="font-size: 0.75rem; color: #6c757d; font-weight: 600; margin-bottom: 6px;">SYSTEM TIMEZONE</p>
                        <select style="width: 100%; padding: 10px; border: 1px solid #ced4da; border-radius: 6px; font-size: 0.9rem; color: #495057; background-color: #f8f9fa; box-sizing: border-box;">
                            <option value="${admin.timezone}">${admin.timezone}</option>
                            <option value="UTC">Universal Time (UTC)</option>
                            <option value="EST">Eastern Standard Time (EST)</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>

        <div class="stat-card" style="padding: 24px; border-radius: 8px; border: 1px solid #e9ecef; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02); margin-bottom: 40px;">
            <h4 style="font-size: 1.1rem; font-weight: bold; color: #212529; margin-bottom: 20px;">Recent System Activity</h4>
            
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                            <th style="padding: 12px 16px; color: #495057; font-weight: 600;">Date & Time</th>
                            <th style="padding: 12px 16px; color: #495057; font-weight: 600;">Action</th>
                            <th style="padding: 12px 16px; color: #495057; font-weight: 600;">IP Address</th>
                            <th style="padding: 12px 16px; color: #495057; font-weight: 600;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${logs.map(log => `
                            <tr style="border-bottom: 1px solid #e9ecef;">
                                <td style="padding: 12px 16px; color: #6c757d;">${log.date}</td>
                                <td style="padding: 12px 16px; color: #212529; font-weight: 500;">${log.action}</td>
                                <td style="padding: 12px 16px; color: #6c757d;">${log.ip}</td>
                                <td style="padding: 12px 16px;">
                                    <span style="color: ${log.status === 'Success' ? '#1e8e3e' : '#dc3545'}; font-weight: 600; font-size: 0.85rem;">
                                        ${log.status}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}