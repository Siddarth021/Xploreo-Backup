import { homeData, homeTestimonials } from "../../data/experience_home.js";
import { readStorage } from "./experience_shared.js";

export function renderExperienceHomePage() {
    const pageData = readStorage("experienceHome", homeData);
    const stats = document.getElementById("stats");
    const alerts = document.getElementById("alerts");
    const schedule = document.getElementById("schedule");
    const bookings = document.getElementById("bookings");
    const reviews = document.getElementById("reviewsContainer");
    const viewAllBookingsButton = document.querySelector(".home-view-all-btn");
    const todayLabel = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const alertItems = pageData.schedule.map((item) => {
        const percent = (item.booked / item.total) * 100;

        if (percent === 100) {
            return {
                ...item,
                message: `${item.title} (${item.time}) is fully booked - demand is high - add another session to maximize bookings`,
                tone: "high"
            };
        }

        if (percent > 85) {
            return {
                ...item,
                message: `${item.title} (${item.time}) is nearly full - consider adding an extra slot`,
                tone: "medium"
            };
        }

        if (percent < 40) {
            return {
                ...item,
                message: `${item.title} (${item.time}) has low bookings - low demand - consider promotion or pricing adjustment`,
                tone: "low"
            };
        }

        return null;
    }).filter(Boolean);

    if (stats) {
        stats.innerHTML = `
            <div class="stat-card experience-stat-card blue">
                <p>Today's Bookings</p>
                <h2>${pageData.stats.today}</h2>
                <span>Guests arriving today</span>
            </div>
            <div class="stat-card experience-stat-card light-green">
                <p>Upcoming Sessions</p>
                <h2>${pageData.stats.upcoming}</h2>
                <span>Future sessions scheduled</span>
            </div>
            <div class="stat-card experience-stat-card dark-green">
                <p>Total Bookings</p>
                <h2>${pageData.stats.total}</h2>
                <span>Across all active experiences</span>
            </div>
            <div class="stat-card experience-stat-card orange">
                <p>Average Rating</p>
                <h2>${pageData.stats.rating}</h2>
                <span>Current guest sentiment</span>
            </div>
        `;
    }

    if (alerts) {
        alerts.innerHTML = alertItems.length
            ? alertItems.map((item) => `
                <article class="alert-main alert-banner alert-${item.tone}">
                    <span class="alert-icon">${item.tone === "low" ? "i" : "!"}</span>
                    <p>${item.message}</p>
                </article>
            `).join("")
            : `<div class="empty-state compact"><h3>All clear</h3><p>No operational alerts for today.</p></div>`;
    }

    if (schedule) {
        schedule.innerHTML = `
            <p class="schedule-date-label">${todayLabel}</p>
            <div class="schedule-stack">
                ${pageData.schedule.map((item) => {
                    const percent = (item.booked / item.total) * 100;
                    let status = "Available";
                    let statusClass = "available";
                    let progressClass = "green";

                    if (percent > 85) {
                        status = "Nearly Full";
                        statusClass = "nearly-full";
                        progressClass = "warning";
                    }

                    if (percent === 100) {
                        status = "Full";
                        statusClass = "full";
                        progressClass = "red";
                    }

                    return `
                        <article class="tour-card experience-schedule-row">
                            <div class="schedule-row-top">
                                <h2>${item.title}</h2>
                                <button type="button" class="schedule-manage-btn" data-schedule-title="${item.title}">Manage Slots</button>
                            </div>
                            <p class="schedule-time">${item.time}</p>
                            <div class="schedule-row-bottom">
                                <p class="schedule-seat-count">${item.booked}/${item.total} seats</p>
                                <span class="status-pill ${statusClass}">${status}</span>
                            </div>
                            <div class="progress-bar-container schedule-progress">
                                <div class="progress-fill ${progressClass}" style="width:${percent}%"></div>
                            </div>
                        </article>
                    `;
                }).join("")}
            </div>
        `;

        schedule.onclick = (event) => {
            const button = event.target.closest(".schedule-manage-btn");
            if (!button) return;

            const scheduleTitle = button.dataset.scheduleTitle;
            const params = new URLSearchParams();
            if (scheduleTitle) params.set("manage", scheduleTitle);
            window.location.href = `../pages/experience_experience.html${params.toString() ? `?${params.toString()}` : ""}`;
        };
    }

    if (bookings) {
        bookings.innerHTML = pageData.bookings.map((booking) => {
            const guestName = booking.name || booking.guest || booking.user || "Guest";
            const experienceName = booking.exp || booking.experience || booking.title || "Experience";
            const bookingDate = booking.date || booking.day || "";
            const bookingTime = booking.time || booking.slot || "";
            const seats = booking.seats ?? booking.guests ?? 0;

            return `
                <article class="transaction-row experience-transaction-row">
                    <div class="booking-person">
                        <strong>${guestName}</strong>
                        <p>${experienceName}</p>
                    </div>
                    <div class="booking-datetime">
                        <span>${bookingDate}</span>
                        <span>${bookingTime}</span>
                    </div>
                    <span class="section-chip booking-seat-chip">${seats} seats</span>
                </article>
            `;
        }).join("");
    }

    if (viewAllBookingsButton) {
        viewAllBookingsButton.onclick = () => {
            window.location.href = "../pages/experience_bookings.html";
        };
    }

    if (reviews) {
        reviews.innerHTML = homeTestimonials.map((review) => `
            <article class="review-card">
                <img src="${review.image}" class="review-img" alt="${review.name}" />
                <div class="review-content">
                    <h3>${review.name}</h3>
                    <div class="stars">${"⭐".repeat(review.rating)}</div>
                    <p>${review.comment}</p>
                </div>
            </article>
        `).join("");
    }
}
