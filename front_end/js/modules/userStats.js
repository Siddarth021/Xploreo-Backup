import { opsData } from '../../data/usersData.js';

export function getUserStatsHTML() {
    return `
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
    `;
}