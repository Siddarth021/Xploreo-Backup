import { filterByGuide } from "../utils/filterByGuide.js";
import { monthlyEarnings } from "../utils/monthlyEarnings.js";
import { earningsByMonth } from "../utils/earningsByMonth.js";
import { formatCurrency } from "../utils/formatCurrency.js";

export function renderEarningsOverview(containerId, currentUser) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allTrips = JSON.parse(localStorage.getItem("tours")) || [];
    const myTrips = filterByGuide(allTrips, currentUser.id);
    const completedTrips = myTrips.filter(t => t.status === "completed");

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const thisMonthEarnings = monthlyEarnings(myTrips, currentMonth, currentYear);
    const { months, total: totalEarnings6Mo } = earningsByMonth(myTrips);
    const last6 = months.slice(-6);
    const toursThisMonth = myTrips.filter(t => {
        const d = new Date(t.dateTime.split(" | ")[0]);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;
    const avgPerTour = completedTrips.length > 0
        ? Math.round(completedTrips.reduce((s, t) => s + (t.amount || 0), 0) / completedTrips.length)
        : 0;
    const lastMonthEarnings = monthlyEarnings(myTrips, currentMonth === 0 ? 11 : currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);
    const growthPct = lastMonthEarnings > 0
        ? Math.round(((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100)
        : (thisMonthEarnings > 0 ? 100 : 0);
    const totalGrowth = 8;
    const maxEarning = Math.max(...last6.map(m => m.amount), 1);
    const chartW = 400, chartH = 180, padX = 40, padY = 20;
    const usableW = chartW - padX * 2;
    const usableH = chartH - padY * 2;

    const points = last6.map((m, i) => {
        const x = padX + (i / (last6.length - 1 || 1)) * usableW;
        const y = padY + usableH - (m.amount / maxEarning) * usableH;
        return { x, y, ...m };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaPath = `${linePath} L${points[points.length - 1].x},${chartH - padY} L${points[0].x},${chartH - padY} Z`;

    const yLabels = [0, Math.round(maxEarning / 2), maxEarning].map((val, i) => {
        const y = padY + usableH - (val / maxEarning) * usableH;
        return `<text x="${padX - 5}" y="${y + 4}" text-anchor="end" fill="#9CA3AF" font-size="11">${formatCurrency(val)}</text>
                <line x1="${padX}" y1="${y}" x2="${chartW - padX}" y2="${y}" stroke="#F3F4F6" stroke-width="1"/>`;
    }).join('');

    const chartSVG = `
        <svg viewBox="0 0 ${chartW} ${chartH + 20}" class="earn-line-chart">
            ${yLabels}
            <path d="${areaPath}" fill="url(#chartGrad)" opacity="0.15"/>
            <path d="${linePath}" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#3B82F6" stroke="white" stroke-width="2"/>`).join('')}
            ${points.map(p => `<text x="${p.x}" y="${chartH - padY + 16}" text-anchor="middle" fill="#9CA3AF" font-size="11">${p.label}</text>`).join('')}
            <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3B82F6"/>
                    <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    `;
    const tourTypes = {};
    completedTrips.forEach(t => {
        const dest = t.destination || t.location || "Other";
        let type = "Other Tours";
        const d = dest.toLowerCase();
        if (d.includes("museum") || d.includes("palace") || d.includes("chapelle") || d.includes("notre")) type = "Museum Tours";
        else if (d.includes("food") || d.includes("quarter")) type = "Food Tours";
        else if (d.includes("cruise") || d.includes("river") || d.includes("seine")) type = "Day Trips";
        else type = "City Tours";
        tourTypes[type] = (tourTypes[type] || 0) + (t.amount || 0);
    });

    const typeEntries = Object.entries(tourTypes).sort((a, b) => b[1] - a[1]);
    const typeTotal = typeEntries.reduce((s, [, v]) => s + v, 0) || 1;
    const typeColors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

    let cumulativeAngle = 0;
    const doughnutSegments = typeEntries.map(([name, val], i) => {
        const pct = val / typeTotal;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + pct * 360;
        cumulativeAngle = endAngle;
        const r = 70, cx = 90, cy = 90, inner = 45;
        const startRad = (startAngle - 90) * Math.PI / 180;
        const endRad = (endAngle - 90) * Math.PI / 180;
        const largeArc = pct > 0.5 ? 1 : 0;
        const x1 = cx + r * Math.cos(startRad), y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad), y2 = cy + r * Math.sin(endRad);
        const ix1 = cx + inner * Math.cos(endRad), iy1 = cy + inner * Math.sin(endRad);
        const ix2 = cx + inner * Math.cos(startRad), iy2 = cy + inner * Math.sin(startRad);
        return `<path d="M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} L${ix1},${iy1} A${inner},${inner} 0 ${largeArc} 0 ${ix2},${iy2} Z" fill="${typeColors[i % typeColors.length]}"/>`;
    }).join('');

    const legendItems = typeEntries.map(([name, val], i) =>
        `<div class="earn-legend-item"><span class="earn-legend-dot" style="background:${typeColors[i % typeColors.length]};"></span>${name}<span class="earn-legend-pct">${Math.round((val / typeTotal) * 100)}%</span></div>`
    ).join('');

    // --- Pending Payouts ---
    const pendingAmounts = {
        available: thisMonthEarnings,
        processing: Math.round(thisMonthEarnings * 0.65),
        upcoming: Math.round(thisMonthEarnings * 0.57)
    };
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // --- Recent Transactions ---
    const recentTx = completedTrips
        .sort((a, b) => new Date(b.dateTime.split(" | ")[0]) - new Date(a.dateTime.split(" | ")[0]))
        .slice(0, 4);

    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const myReviews = filterByGuide(allReviews, currentUser.id);

    const txRows = recentTx.map(t => {
        const review = myReviews.find(r => r.tourName && t.title && r.tourName.includes(t.title.split(' ')[0]));
        const customerName = review ? review.customerName : t.customer;
        return `
            <div class="earn-tx-row">
                <div class="earn-tx-info">
                    <h4 class="earn-tx-title">${t.title}</h4>
                    <span class="earn-tx-sub">${customerName} • ${t.dateTime.split(" | ")[0]}</span>
                </div>
                <div class="earn-tx-right">
                    <span class="earn-tx-status">Completed</span>
                    <span class="earn-tx-amount">+${formatCurrency(t.amount)}</span>
                </div>
            </div>
        `;
    }).join('');

    // --- Render ---
    container.innerHTML = `
        <!-- Year selector + Export -->
        <div class="earn-toolbar">
            <select class="earn-year-select">
                <option>${currentYear}</option>
                <option>${currentYear - 1}</option>
            </select>
            <button class="earn-export-btn" onclick="alert('Report exported!')">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Report
            </button>
        </div>

        <!-- Stats Row -->
        <div class="earn-stats-row">
            <div class="earn-stat-card earn-stat-blue">
                <div class="earn-stat-icon" style="background:#EFF6FF; color:#3B82F6;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
                </div>
                ${growthPct !== 0 ? `<span class="earn-stat-badge earn-badge-green">+${growthPct}%</span>` : ''}
                <h2 class="earn-stat-value">${formatCurrency(thisMonthEarnings)}</h2>
                <span class="earn-stat-label">This Month</span>
            </div>
            <div class="earn-stat-card earn-stat-green">
                <div class="earn-stat-icon" style="background:#ECFDF5; color:#10B981;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10l6 6L18 4"/></svg>
                </div>
                <span class="earn-stat-badge earn-badge-green">+${totalGrowth}%</span>
                <h2 class="earn-stat-value">${formatCurrency(totalEarnings6Mo)}</h2>
                <span class="earn-stat-label">Total Earnings (6 mo)</span>
            </div>
            <div class="earn-stat-card earn-stat-orange">
                <div class="earn-stat-icon" style="background:#FFFBEB; color:#F59E0B;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"/></svg>
                </div>
                <h2 class="earn-stat-value">${toursThisMonth}</h2>
                <span class="earn-stat-label">Tours This Month</span>
            </div>
            <div class="earn-stat-card earn-stat-purple">
                <div class="earn-stat-icon" style="background:#F5F3FF; color:#8B5CF6;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 8.586V5z"/></svg>
                </div>
                <h2 class="earn-stat-value">${formatCurrency(avgPerTour)}</h2>
                <span class="earn-stat-label">Avg. per Tour</span>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="earn-charts-row">
            <div class="earn-chart-card earn-chart-line">
                <div class="earn-chart-header">
                    <div>
                        <h3 class="earn-chart-title">Monthly Earnings</h3>
                        <p class="earn-chart-sub">Last 6 months performance</p>
                    </div>
                </div>
                ${chartSVG}
            </div>
            <div class="earn-chart-card earn-chart-donut">
                <div class="earn-chart-header">
                    <div>
                        <h3 class="earn-chart-title">Revenue by Tour Type</h3>
                        <p class="earn-chart-sub">This month</p>
                    </div>
                </div>
                <div class="earn-donut-wrapper">
                    <svg viewBox="0 0 180 180" class="earn-donut-svg">
                        ${doughnutSegments || '<circle cx="90" cy="90" r="70" fill="#F3F4F6"/><circle cx="90" cy="90" r="45" fill="white"/>'}
                    </svg>
                    <div class="earn-legend">${legendItems}</div>
                </div>
            </div>
        </div>

        <!-- Pending Payouts -->
        <div class="earn-pending-section">
            <div class="earn-pending-header">
                <div>
                    <h3 class="earn-pending-title">Pending Payouts</h3>
                    <p class="earn-pending-sub">Earnings ready to be transferred to your account</p>
                </div>
                <button class="earn-payout-btn" onclick="alert('Payout requested!')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    Request Payout
                </button>
            </div>
            <div class="earn-pending-cards">
                <div class="earn-pending-card earn-pc-green">
                    <span class="earn-pc-label" style="color:#10B981;">Available Balance</span>
                    <h2 class="earn-pc-value">${formatCurrency(pendingAmounts.available)}</h2>
                    <span class="earn-pc-sub">From ${monthNames[currentMonth]} tours</span>
                </div>
                <div class="earn-pending-card earn-pc-blue">
                    <span class="earn-pc-label" style="color:#3B82F6;">Processing</span>
                    <h2 class="earn-pc-value">${formatCurrency(pendingAmounts.processing)}</h2>
                    <span class="earn-pc-sub">Expected in 3-5 days</span>
                </div>
                <div class="earn-pending-card earn-pc-gray">
                    <span class="earn-pc-label" style="color:#6B7280;">Upcoming</span>
                    <h2 class="earn-pc-value">${formatCurrency(pendingAmounts.upcoming)}</h2>
                    <span class="earn-pc-sub">Future tour payments</span>
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="earn-tx-section">
            <div class="earn-tx-header">
                <h3 class="earn-tx-section-title">Recent Transactions</h3>
                <button class="earn-tx-view-all" onclick="window.switchTab('payout-history')">View All</button>
            </div>
            ${txRows || '<p style="text-align:center;color:#9CA3AF;padding:20px;">No transactions yet.</p>'}
        </div>
    `;
}
