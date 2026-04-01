import { partnerStatusStyles } from '../../data/usersData.js';

export function getPartnerTableShellHTML() {
    return `
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
                <tbody id="partners-tbody"></tbody>
            </table>
        </div>
    `;
}

export function generatePartnerRowsHTML(filteredData) {
    if (filteredData.length === 0) return `<tr><td colspan="6" style="padding:24px; text-align:center; color:#a0aec0;">No partners found in this category.</td></tr>`;

    return filteredData.map(partner => `
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
}