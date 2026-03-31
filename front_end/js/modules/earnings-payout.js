import { filterByGuide } from "../utils/filterByGuide.js";
import { formatCurrency } from "../utils/formatCurrency.js";
import { monthlyEarnings } from "../utils/monthlyEarnings.js";

export function renderPayoutHistory(containerId, currentUser) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allTrips = JSON.parse(localStorage.getItem("tours")) || [];
    const myTrips = filterByGuide(allTrips, currentUser.id);
    const completedTrips = myTrips.filter(t => t.status === "completed");

    const now = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Generate payout history from completed tour data
    const payouts = [];
    for (let i = 0; i < 12; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const mo = d.getMonth();
        const yr = d.getFullYear();
        const earnings = monthlyEarnings(myTrips, mo, yr);
        if (earnings > 0) {
            const toursInMonth = completedTrips.filter(t => {
                const td = new Date(t.dateTime.split(" | ")[0]);
                return td.getMonth() === mo && td.getFullYear() === yr;
            });
            payouts.push({
                date: `${monthNames[mo]} 15, ${yr}`,
                ref: `PAY-${yr}-${String(mo + 1).padStart(2, '0')}-001`,
                method: "Bank Transfer",
                tours: toursInMonth.length,
                amount: earnings,
                status: "Completed"
            });
        }
    }

    const totalPaidOut = payouts.reduce((s, p) => s + p.amount, 0);
    const avgPayout = payouts.length > 0 ? Math.round(totalPaidOut / payouts.length) : 0;
    const lastPayoutDate = payouts.length > 0 ? payouts[0].date.split(",")[0].replace(/\s\d+$/, ' ' + payouts[0].date.match(/\d+,/)?.[0]?.replace(',', '') || '') : "N/A";
    const lastPayDateShort = payouts.length > 0 ? payouts[0].date.split(",")[0] : "N/A";

    const payoutRows = payouts.map(p => `
        <tr class="earn-pay-row">
            <td>
                <div class="earn-pay-date-cell">
                    <svg width="14" height="14" fill="none" stroke="#9CA3AF" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    ${p.date}
                </div>
            </td>
            <td class="earn-pay-ref">${p.ref}</td>
            <td>
                <div class="earn-pay-method-cell">
                    <svg width="14" height="14" fill="none" stroke="#9CA3AF" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
                    ${p.method}
                </div>
            </td>
            <td>${p.tours} tours</td>
            <td class="earn-pay-amount">${formatCurrency(p.amount)}</td>
            <td><span class="earn-pay-status-badge">${p.status}</span></td>
            <td>
                <button class="earn-receipt-btn" onclick="alert('Downloading receipt for ${p.ref}')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Receipt
                </button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <!-- Payout Stats -->
        <div class="earn-stats-row">
            <div class="earn-stat-card earn-stat-blue">
                <div class="earn-stat-icon" style="background:#EFF6FF; color:#3B82F6;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <h2 class="earn-stat-value">${payouts.length}</h2>
                <span class="earn-stat-label">Total Payouts</span>
            </div>
            <div class="earn-stat-card earn-stat-green">
                <div class="earn-stat-icon" style="background:#ECFDF5; color:#10B981;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><rect x="2" y="5" width="16" height="10" rx="2"/><path d="M2 10h16"/></svg>
                </div>
                <h2 class="earn-stat-value">${formatCurrency(totalPaidOut)}</h2>
                <span class="earn-stat-label">Total Paid Out</span>
            </div>
            <div class="earn-stat-card earn-stat-orange">
                <div class="earn-stat-icon" style="background:#FFFBEB; color:#F59E0B;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"/></svg>
                </div>
                <h2 class="earn-stat-value">${formatCurrency(avgPayout)}</h2>
                <span class="earn-stat-label">Avg. Payout</span>
            </div>
            <div class="earn-stat-card earn-stat-purple">
                <div class="earn-stat-icon" style="background:#F5F3FF; color:#8B5CF6;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 8.586V5z"/></svg>
                </div>
                <h2 class="earn-stat-value">${lastPayDateShort}</h2>
                <span class="earn-stat-label">Last Payout</span>
            </div>
        </div>

        <!-- Payout History Table -->
        <div class="earn-pay-section">
            <div class="earn-pay-header">
                <h3 class="earn-pay-title">Payout History</h3>
                <button class="earn-download-all-btn" onclick="alert('Downloading all receipts...')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download All
                </button>
            </div>
            <div class="earn-pay-table-wrapper">
                <table class="earn-pay-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Reference</th>
                            <th>Method</th>
                            <th>Tours</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${payoutRows || '<tr><td colspan="7" style="text-align:center;padding:30px;color:#9CA3AF;">No payouts yet.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
