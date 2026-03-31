import { profileData } from "../data/profileData.js";

window.onload = () => {

  // SAFE ELEMENT GET
  function get(id) {
    return document.getElementById(id);
  }

  // LOAD DATA
  function loadData() {
    get("companyName").textContent = profileData.company || "No Name";
    get("location").textContent = profileData.location || "No Location";

    get("title").value = profileData.title || "";
    get("region").value = profileData.region || "";
    get("description").value = profileData.description || "";
    get("category").value = profileData.category || "";
    get("duration").value = profileData.duration || "";
    get("groupSize").value = profileData.groupSize || "";
    get("phone").value = profileData.phone || "";
    get("email").value = profileData.email || "";
    get("gst").value = profileData.gst || "";
    get("bank").value = profileData.bank || "";

    get("instant").checked = profileData.instant;

    renderDays();
    renderSlots();
  }

  // EDIT
  get("editBtn").onclick = () => {
    document.querySelectorAll("input, textarea").forEach(el => {
      el.disabled = false;
    });

    get("editBtn").classList.add("hidden");
    get("saveBtn").classList.remove("hidden");
  };

  // SAVE
  get("saveBtn").onclick = () => {
    document.querySelectorAll("input, textarea").forEach(el => {
      el.disabled = true;
    });

    get("editBtn").classList.remove("hidden");
    get("saveBtn").classList.add("hidden");

    alert("Saved ✅");
  };

  // DAYS
  function renderDays() {
    const daysEl = get("days");
    daysEl.innerHTML = "";

    profileData.days.forEach(day => {
      const span = document.createElement("span");
      span.textContent = day;

      if (profileData.activeDays.includes(day)) {
        span.style.background = "#2563eb";
        span.style.color = "#fff";
      }

      span.onclick = () => {
        if (profileData.activeDays.includes(day)) {
          profileData.activeDays =
            profileData.activeDays.filter(d => d !== day);
        } else {
          profileData.activeDays.push(day);
        }
        renderDays();
      };

      daysEl.appendChild(span);
    });
  }

  // SLOTS
  function renderSlots() {
    const slotsEl = get("slots");
    slotsEl.innerHTML = "";

    profileData.slots.forEach((slot, i) => {
      const span = document.createElement("span");
      span.textContent = slot;

      span.onclick = () => {
        profileData.slots.splice(i, 1);
        renderSlots();
      };

      slotsEl.appendChild(span);
    });
  }

  // ADD SLOT
  get("addSlot").onclick = () => {
    const val = prompt("Enter time:");
    if (val) {
      profileData.slots.push(val);
      renderSlots();
    }
  };

  loadData();
};