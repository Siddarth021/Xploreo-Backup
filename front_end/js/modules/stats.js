import { opsData } from '../operationsData.js';

export function getStatsHTML() {
    return `
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
    `;
}