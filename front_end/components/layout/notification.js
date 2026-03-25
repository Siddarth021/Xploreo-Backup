export function getNotification(count = 3) {
  return `
    <div class="notification">
      <span class="bell">🔔</span>
      ${count > 0 ? `<span class="badge">${count}</span>` : ""}
    </div>
  `;
}