import { opsData } from '../../data/usersData.js';

export function getUserStatsHTML() {
    return `
        <div id="ops-stats" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px;">
            ${opsData.map(stat => `
                <div class="stat-card ${stat.color}">
                    
                    <div style="margin-bottom: 12px;">
                        <img src="${stat.icon}" style="width: 26px; opacity: 0.6; filter: grayscale(100%);">
                    </div>
                    
                    <p class="stat-label" style="font-weight: 600; color: #6c757d; margin-bottom: 8px; font-size: 0.85rem;">
                        ${stat.label.toUpperCase()}
                    </p>
                    
                    <h2 class="stat-value" style="font-size: 1.8rem; margin-bottom: 8px; font-weight: bold; color: #212529;">
                        ${stat.value}
                    </h2>
                    
                    <p class="stat-subtext" style="font-size: 0.85rem; color: #a0aab2; margin: 0;">
                        ${stat.trend ? `<span style="color: #28a745;">↗ ${stat.trend}</span> ` : ""}
                        ${stat.subtext}
                    </p>
                    
                </div>
            `).join('')}
        </div>
    `;
}