import { travelerData } from "../../data/traveler.js";

const CONFIRMED_BOOKING_KEY = "traveler_confirmed_booking";
const CONFIRMED_BOOKING_SESSION_KEY = "traveler_confirmed_booking_session";
const MY_TRIPS_FOCUS_KEY = "traveler_mytrips_focus";

// SVGs
const calendarSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
const xCircleSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
const checkCircleSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
const mapPinSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
const listCalSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;

let activeStatus = "Upcoming";

export function renderTravelerTrips(containerId, user) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const focusStatus = getMyTripsFocusStatus();
    if (focusStatus) {
        activeStatus = focusStatus;
    }

    const trips = getTravelerTripsData();

    const upcomingCount = trips.filter(t => t.status === "Upcoming").length;
    const cancelledCount = trips.filter(t => t.status === "Cancelled").length;
    const completedCount = trips.filter(t => t.status === "Completed").length;

    const displayedTrips = trips.filter(t => t.status === activeStatus);

    const HTML = `
        <div class="dashboard-container trips-page-container">
            <div class="trips-header">
                <div class="trips-header-left">
                    <h1>My Trips</h1>
                    <p>View and manage your bookings</p>
                </div>
                <div class="trips-search">
                    <input type="text" placeholder="Search for a booking">
                    <button class="search-icon-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                </div>
            </div>

            <div class="trips-tabs">
                <button class="trip-tab ${activeStatus === 'Upcoming' ? 'active' : ''}" data-status="Upcoming">
                    ${calendarSvg} Upcoming <span class="pill-counter">${upcomingCount}</span>
                </button>
                <button class="trip-tab ${activeStatus === 'Cancelled' ? 'active' : ''}" data-status="Cancelled">
                    ${xCircleSvg} Cancelled <span class="pill-counter">${cancelledCount}</span>
                </button>
                <button class="trip-tab ${activeStatus === 'Completed' ? 'active' : ''}" data-status="Completed">
                    ${checkCircleSvg} Completed <span class="pill-counter">${completedCount}</span>
                </button>
            </div>

            <div class="trips-list">
                ${displayedTrips.length === 0 ? `<div style="text-align: center; color: #64748B; padding: 40px; font-weight: 500;">No ${activeStatus.toLowerCase()} trips found.</div>` : ''}
                
                ${displayedTrips.map(trip => `
                    <div class="trip-card">
                        <img class="trip-card-img" src="${trip.image}" alt="${trip.title}">
                        <div class="trip-card-body">
                            <h2>${trip.title}</h2>
                            <div class="trip-badge">${trip.type}</div>
                            
                            <div class="trip-meta">
                                <span>${mapPinSvg} ${trip.location}</span>
                                <span>${listCalSvg} ${trip.dateRange}</span>
                            </div>
                            
                            <div class="trip-booking-id">
                                Booking ID: <strong>${trip.bookingId}</strong>
                            </div>
                            
                            <div class="trip-actions">
                                <button class="btn-solid-blue">View Details</button>
                                ${trip.status === 'Upcoming' ? `<button class="btn-outline-teal">Modify Booking</button>` : `<button class="btn-outline-teal">Book Again</button>`}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = HTML;

    // Tab Listeners
    const tabs = container.querySelectorAll(".trip-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            activeStatus = e.currentTarget.getAttribute("data-status");
            renderTravelerTrips(containerId, user);
        });
    });
}

function getTravelerTripsData() {
    const trips = [...(travelerData.myTrips || [])];
    const confirmedBooking = getConfirmedBooking();

    if (!confirmedBooking) {
        return trips;
    }

    const existingIndex = trips.findIndex(trip => Number(trip.bookingId) === Number(confirmedBooking.bookingId));
    const confirmedTrip = mapConfirmedBookingToTrip(confirmedBooking);

    if (existingIndex >= 0) {
        trips[existingIndex] = confirmedTrip;
        return trips;
    }

    return [confirmedTrip, ...trips];
}

function getConfirmedBooking() {
    if (typeof sessionStorage !== "undefined") {
        try {
            const booking = JSON.parse(sessionStorage.getItem(CONFIRMED_BOOKING_SESSION_KEY) || "null");
            if (booking) return booking;
        } catch (error) {
            console.warn("Unable to read confirmed booking from session storage", error);
        }
    }

    if (typeof localStorage !== "undefined") {
        try {
            return JSON.parse(localStorage.getItem(CONFIRMED_BOOKING_KEY) || "null");
        } catch (error) {
            console.warn("Unable to read confirmed booking from local storage", error);
        }
    }

    return null;
}

function getMyTripsFocusStatus() {
    if (typeof sessionStorage === "undefined") {
        return null;
    }

    try {
        return sessionStorage.getItem(MY_TRIPS_FOCUS_KEY);
    } catch (error) {
        return null;
    }
}

function mapConfirmedBookingToTrip(booking) {
    return {
        title: booking.routeLabel,
        location: booking.toLabel,
        dateRange: `${formatTripDate(booking.departureDate)} - ${formatTripDate(formatArrivalValue(booking.departureDate, booking.duration))}`,
        bookingId: Number(booking.bookingId),
        type: booking.type || "Flight",
        status: "Upcoming",
        image: booking.heroImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
    };
}

function formatTripDate(dateValue) {
    const date = new Date(dateValue);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function formatArrivalValue(dateString, duration) {
    const date = new Date(dateString);
    const durationMatch = String(duration).match(/(\d+)h\s*(\d+)m/);
    const minutesToAdd = durationMatch
        ? (Number(durationMatch[1]) * 60) + Number(durationMatch[2])
        : 0;
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date.toISOString();
}
