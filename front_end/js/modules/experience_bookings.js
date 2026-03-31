import { bookingsData } from "../../data/experience_bookings.js";

// ===============================
// INIT STORAGE
// ===============================

if (!localStorage.getItem("experienceBookings")) {
  localStorage.setItem("experienceBookings", JSON.stringify(bookingsData));
}

let experiences = JSON.parse(localStorage.getItem("experienceBookings")) || [];

// ===============================
// RENDER BOOKINGS
// ===============================

function renderBookings() {
  const container = document.getElementById("bookingList");
  if (!container) return;

  container.innerHTML = "";

  experiences.forEach(exp => {
    const totalGuests = exp.users.reduce((sum, u) => sum + u.seats, 0);

    container.innerHTML += `
      <div class="card">
        <h2>${exp.title}</h2>
        <p>${exp.date} • ${exp.time}</p>

        <div class="total">Total Guests: ${totalGuests}</div>

        ${exp.users.map(user => `
          <div class="user-row">

            <div>
              <strong>${user.name}</strong><br>
              ${user.id}
            </div>

            <div>${user.seats} guests</div>

            <div class="status ${user.status}">
              ${formatStatus(user.status)}
            </div>

            <button onclick="openModalById('${user.id}')">
              View Details
            </button>

            ${
              user.status === "confirmed"
                ? `<button onclick="markCheckIn('${user.id}')">Mark Check-in</button>`
                : user.status === "checked"
                ? `<span>Checked-in</span>`
                : ``
            }

          </div>
        `).join("")}
      </div>
    `;
  });
}

// ===============================
// STATUS FORMAT
// ===============================

function formatStatus(status) {
  if (status === "checked") return "Checked-In";
  if (status === "confirmed") return "Confirmed";
  if (status === "cancelled") return "Cancelled";
  return status;
}

// ===============================
// FIND USER
// ===============================

function findBookingById(id) {
  for (let exp of experiences) {
    const user = exp.users.find(u => u.id === id);
    if (user) return { user, exp };
  }
  return null;
}

// ===============================
// OPEN MODAL
// ===============================

window.openModalById = function(id) {
  const result = findBookingById(id);
  if (!result) return;

  const { user, exp } = result;

  const modal = document.getElementById("bookingModal");
  modal.style.display = "flex";

  document.getElementById("modalName").innerText = user.name;
  document.getElementById("modalId").innerText = user.id;

  const statusEl = document.getElementById("modalStatus");
  statusEl.innerText = formatStatus(user.status);
  statusEl.className = "status-badge " + user.status;

  document.getElementById("modalExperience").innerText = exp.title;
  document.getElementById("modalDate").innerText = exp.date;
  document.getElementById("modalTime").innerText = exp.time;
  document.getElementById("modalGuests").innerText = user.seats + " guests";

  document.getElementById("modalCustomer").innerText = user.name;
  document.getElementById("modalPhone").innerText = "+1 (555) 123-4567";
  document.getElementById("modalEmail").innerText =
    user.name.toLowerCase().replace(" ", ".") + "@email.com";

  document.getElementById("modalAmount").innerText = "$ " + (user.seats * 90);

  document.getElementById("modalPaymentStatus").innerText =
    user.status === "cancelled" ? "Refunded" : "Paid";
};

// ===============================
// CLOSE MODAL
// ===============================

window.closeModal = function() {
  document.getElementById("bookingModal").style.display = "none";
};

// ===============================
// CHECK-IN
// ===============================

window.markCheckIn = function(id) {
  for (let exp of experiences) {
    const user = exp.users.find(u => u.id === id);
    if (user) {
      user.status = "checked";
    }
  }

  localStorage.setItem("experienceBookings", JSON.stringify(experiences));
  renderBookings();
};

// ===============================
// INIT
// ===============================

renderBookings();