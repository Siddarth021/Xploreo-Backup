import { renderNavbar } from "../../components/layout/navbar.js";
import { experiences as expData } from "../../data/experience_experience_data.js";

const user = {
  name: "User",
  role: "experience"
};

renderNavbar(user);

const container = document.getElementById("experienceList");

// ✅ USE IMPORTED DATA
let experiences = [...expData];

// ================= HELPERS =================
function getStatusClass(status) {
  return status === "active" ? "confirmed" : "cancelled";
}

// ================= RENDER =================
function renderExperiences() {
  container.innerHTML = experiences.map(exp => {

    return `
      <div class="card">
        <div class="experience-card-row">

          <img 
            src="${exp.image}" 
            class="exp-img"
            onerror="this.src='https://via.placeholder.com/180x120'"
          />

          <div class="exp-content">

            <h2>${exp.title}</h2>

            <span class="status ${getStatusClass(exp.status)}">
              ${exp.status}
            </span>

            <div class="exp-details">
              <div>
                <p>Price</p>
                <h3>$ ${exp.price}</h3>
              </div>

              <div>
                <p>Duration</p>
                <h3>${exp.duration}</h3>
              </div>

              <div>
                <p>Capacity</p>
                <h3>${exp.capacity}</h3>
              </div>
            </div>

            <div class="slot-bar">
              ${exp.nextSlot} • ${exp.booked}/${exp.capacity} booked
            </div>

            <div class="actions">
              <button class="primary-btn" onclick="openSlotsModal(${exp.id})">
  Manage Slots
</button>
              <button onclick="openEditModal(${exp.id})">Edit</button>
              <button onclick="goToBookings()">View Bookings</button>
            </div>

          </div>
        </div>
      </div>
    `;
  }).join("");
}

renderExperiences();


// ================= ADD =================
window.openAddModal = function () {
  document.getElementById("addModal").style.display = "flex";
};

window.closeAddModal = function () {
  document.getElementById("addModal").style.display = "none";
};

window.addExperience = function () {

  const fileInput = document.getElementById("expImage");
  let imageURL = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"; // default

  if (fileInput.files[0]) {
    imageURL = URL.createObjectURL(fileInput.files[0]);
  }

  const newExp = {
    id: Date.now(),
    title: document.getElementById("expName").value,
    price: document.getElementById("expPrice").value,
    duration: document.getElementById("expDuration").value,
    capacity: document.getElementById("expCapacity").value,
    status: "active",
    image: imageURL,
    nextSlot: "10:00 AM",
    booked: 0
  };

  experiences.push(newExp);

  closeAddModal();
  renderExperiences();
};

// ================= EDIT =================
window.openEditModal = function (id) {
  const exp = experiences.find(e => e.id === id);

  document.getElementById("editName").value = exp.title;
  document.getElementById("editPrice").value = exp.price;
  document.getElementById("editDuration").value = exp.duration;
  document.getElementById("editCapacity").value = exp.capacity;

  window.currentEditId = id;

  document.getElementById("editModal").style.display = "flex";
};

window.closeEditModal = function () {
  document.getElementById("editModal").style.display = "none";
};

window.saveEdit = function () {
  const exp = experiences.find(e => e.id === window.currentEditId);

  exp.title = document.getElementById("editName").value;
  exp.price = document.getElementById("editPrice").value;
  exp.duration = document.getElementById("editDuration").value;
  exp.capacity = document.getElementById("editCapacity").value;

  closeEditModal();
  renderExperiences();
};
// ===== SLOTS MODAL =====

// OPEN
window.openSlotsModal = function (id) {
  const exp = experiences.find(e => e.id === id);

  document.getElementById("slotTime").value = exp.nextSlot;
  document.getElementById("slotBooked").value = exp.booked;
  document.getElementById("slotCapacity").value = exp.capacity;

  window.currentSlotId = id;

  document.getElementById("slotsModal").style.display = "flex";
};

// CLOSE
window.closeSlotsModal = function () {
  document.getElementById("slotsModal").style.display = "none";
};

// SAVE
window.saveSlots = function () {
  const exp = experiences.find(e => e.id === window.currentSlotId);

  exp.nextSlot = document.getElementById("slotTime").value;
  exp.booked = parseInt(document.getElementById("slotBooked").value);
  exp.capacity = parseInt(document.getElementById("slotCapacity").value);

  closeSlotsModal();
  renderExperiences();
};
window.previewImage = function (event) {
  const file = event.target.files[0];
  const preview = document.getElementById("imagePreview");

  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
};


// ================= NAV =================
window.goToBookings = function () {
  window.location.href = "../pages/experience_bookings.html";
};