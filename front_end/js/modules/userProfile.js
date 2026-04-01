import { userStatusStyles, activityIcons } from '../usersData.js';

export function generateProfileHTML(user) {
    if (!user) {
        return `<div style="text-align:center; color:#a0aec0; padding-top:40px;">User profile unavailable.</div>`;
    }

    return `
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