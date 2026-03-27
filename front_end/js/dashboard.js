import {renderStats} from "../js/modules/stat-cards"

export function renderdasboard(user) {
  const dasboard = `
      <div class="dashboard-stat">
        ${renderStats(user)}
      </div>
  `;
  document.getElementById("navbar").innerHTML = dasboard;
}