export function getNotification(count = 3) {
  return `
    <div class="notification">
      <span class="bell"><img src="" alt="notifications"/></span>
      ${count > 0 ? `<span class="badge">${count}</span>` : ""}
    </div>
  `;
}