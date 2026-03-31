import { renderNavbar } from "../../components/layout/navbar.js";
import { homeData } from "../../data/experience_home.js";
console.log("HOME DATA:", homeData);

document.addEventListener("DOMContentLoaded", () => {

    // ✅ NAVBAR
    renderNavbar({ role: "experience" });

    console.log("DATA CHECK:", homeData); // DEBUG

    const statsDiv = document.getElementById("stats");
    const alertsDiv = document.getElementById("alerts");
    const scheduleDiv = document.getElementById("schedule");
    const bookingsDiv = document.getElementById("bookings");

    // ===== STATS =====
    function renderStats() {
        statsDiv.innerHTML = `
            <div class="stat-card blue">
                <p>Today's Bookings</p>
                <h2>${homeData.stats.today}</h2>
            </div>
            <div class="stat-card light-green">
                <p>Upcoming Sessions</p>
                <h2>${homeData.stats.upcoming}</h2>
            </div>
            <div class="stat-card dark-green">
                <p>Total Bookings</p>
                <h2>${homeData.stats.total}</h2>
            </div>
            <div class="stat-card orange">
                <p>Average Rating</p>
                <h2>${homeData.stats.rating}</h2>
            </div>
        `;
    }

    // ===== ALERTS =====
    function renderAlerts() {
        alertsDiv.innerHTML = homeData.schedule.map(s => {
            const percent = (s.booked / s.total) * 100;

            let message = "";
            if (percent === 100) message = "Fully booked — add new slot";
            else if (percent > 85) message = "Nearly full — consider adding slot";
            else if (percent < 40) message = "Low bookings — consider promotion";

            if (!message) return "";

            return `
                <div class="alert-main">
                    <h4>${s.title}</h4>
                    <p>${message}</p>
                </div>
            `;
        }).join("");
    }

    // ===== SCHEDULE =====
    function renderSchedule() {
    scheduleDiv.innerHTML = homeData.schedule.map((s) => {
        const percent = (s.booked / s.total) * 100;

        let status = "Available";
        if (percent > 85) status = "Nearly Full";
        if (percent === 100) status = "Full";

        return `
            <div class="tour-card">
                <div class="card-top-header">
                    <h2>${s.title}</h2>
                </div>

                <p>${s.time}</p>
                <p>${s.booked}/${s.total} seats</p>

                <div class="progress-bar-container">
                    <div class="progress-fill" style="width:${percent}%"></div>
                </div>

                <p class="status-tag">${status}</p>
            </div>
        `;
    }).join("");
}

    // ===== BOOKINGS =====
    function renderBookings() {
        bookingsDiv.innerHTML = homeData.bookings.map(b => `
            <div class="transaction-row">
                <p>${b.name}</p>
                <p>${b.exp}</p>
                <p>${b.seats} seats</p>
            </div>
        `).join("");
    }

    // ===== BUTTON =====
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("manage-btn")) {
            alert("Manage slots clicked");
        }
    });
    // MOCK DATA GENERATOR
function generateMockReviews(count = 8) {
  const names = ["Aarav", "Priya", "Rohit", "Sneha", "Karthik", "Ananya"];
  const comments = [
    "Amazing experience, would totally recommend!",
    "Very well organized and smooth.",
    "Loved every moment of it.",
    "Guide was friendly and knowledgeable.",
    "Worth the price!",
    "Beautiful locations and great vibe."
  ];

  return Array.from({ length: count }, (_, i) => ({
    name: names[Math.floor(Math.random() * names.length)],
    rating: Math.floor(Math.random() * 2) + 4,
    comment: comments[Math.floor(Math.random() * comments.length)],
    image: `https://i.pravatar.cc/100?img=${i + 10}`
  }));
}

// DATA
const reviewsData = generateMockReviews(8);

// RENDER FUNCTION
function renderReviews() {
  const container = document.getElementById("reviewsContainer");

  if (!container) return;

  container.innerHTML = reviewsData.map(review => `
    <div class="review-card">
      <img src="${review.image}" class="review-img" />

      <div class="review-content">
        <h3>${review.name}</h3>
        <div class="stars">
          ${"⭐".repeat(review.rating)}
        </div>
        <p>${review.comment}</p>
      </div>
    </div>
  `).join("");
}

// CALL FUNCTION
renderReviews();

    renderStats();
    renderAlerts();
    renderSchedule();
    renderBookings();

});