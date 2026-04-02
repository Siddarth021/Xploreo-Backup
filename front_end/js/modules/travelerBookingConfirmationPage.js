const CONFIRMED_BOOKING_KEY = "traveler_confirmed_booking";
const CONFIRMED_BOOKING_SESSION_KEY = "traveler_confirmed_booking_session";
const MY_TRIPS_FOCUS_KEY = "traveler_mytrips_focus";
const TRAVELER_HOME_PAGE = "./dashboard.html";

export function renderTravelerBookingConfirmationPage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const booking = getConfirmedBooking();
    if (!booking) {
        container.innerHTML = `
            <main class="booking-confirmation-page">
                <div class="flight-detail-empty">
                    <h1>No booking found</h1>
                    <p>Complete a booking from the flight detail page first.</p>
                    <a class="flight-detail-back-link" href="./flight-search.html">Back to flight search</a>
                </div>
            </main>
        `;
        return;
    }

    container.innerHTML = `
        <main class="booking-confirmation-page">
            <section class="booking-confirmed-card">
                <div class="booking-confirmed-icon">✓</div>
                <h1>Booking Confirmed!</h1>
                <p>Your trip has been successfully booked</p>
                <div class="booking-meta-row">
                    <span>Booking ID: <strong>${booking.bookingId}</strong></span>
                    <span>Booked on: <strong>${formatBookedOn(booking.bookedOn)}</strong></span>
                </div>
            </section>

            <section class="booking-confirmed-layout">
                <div class="booking-confirmed-main">
                    <article class="booking-summary-card">
                        <h2>Booking Summary</h2>
                        <div class="booking-route-row">
                            <div>
                                <span>Flight Route</span>
                                <strong>${booking.fromLabel}</strong>
                                <small>${formatTravelDate(booking.departureDate)}</small>
                                <em>${booking.departureTime}</em>
                            </div>
                            <div class="booking-route-plane">✈</div>
                            <div class="align-right">
                                <span>&nbsp;</span>
                                <strong>${booking.toLabel}</strong>
                                <small>${formatArrivalDate(booking.departureDate, booking.duration)}</small>
                                <em>${booking.arrivalTime}</em>
                            </div>
                        </div>
                        <div class="booking-summary-divider"></div>
                        <div class="booking-summary-grid">
                            <div>
                                <span>Airline</span>
                                <strong>${booking.airline} (${booking.flightNumber})</strong>
                            </div>
                            <div>
                                <span>Duration</span>
                                <strong>${booking.duration}</strong>
                            </div>
                            <div>
                                <span>Passengers</span>
                                <strong>${booking.passengers}</strong>
                            </div>
                            <div>
                                <span>Class</span>
                                <strong>${booking.classType}</strong>
                            </div>
                        </div>
                    </article>
                </div>

                <aside class="booking-confirmed-side">
                    <article class="added-to-trips-card">
                        <div class="added-to-trips-head">
                            <div class="booking-confirmed-small-icon">✓</div>
                            <h2>Added to My Trips</h2>
                        </div>
                        <p>This booking is now available in your My Trips dashboard where you can manage all your upcoming adventures.</p>
                        <div class="mini-trip-card">
                            <div class="mini-trip-icon">✈</div>
                            <div>
                                <span>Flight</span>
                                <strong>${getRouteShortLabel(booking)}</strong>
                                <small>${formatTravelDate(booking.departureDate)}</small>
                            </div>
                        </div>
                        <button class="confirmation-primary-btn" id="view-my-trips-btn">View My Trips →</button>
                        <button class="confirmation-secondary-btn" id="continue-exploring-btn">Continue Exploring</button>
                    </article>

                    <article class="whats-next-card">
                        <h3>What's Next?</h3>
                        <ul>
                            ${booking.whatsNext.map(item => `<li>${item}</li>`).join("")}
                        </ul>
                    </article>
                </aside>
            </section>
        </main>
    `;

    bindConfirmationEvents();
}

function bindConfirmationEvents() {
    document.getElementById("view-my-trips-btn")?.addEventListener("click", () => {
        if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(MY_TRIPS_FOCUS_KEY, "Upcoming");
        }
        window.location.href = "./mytrips.html";
    });

    document.getElementById("continue-exploring-btn")?.addEventListener("click", () => {
        window.location.assign(TRAVELER_HOME_PAGE);
    });
}

function getConfirmedBooking() {
    if (typeof sessionStorage !== "undefined") {
        try {
            const sessionBooking = JSON.parse(sessionStorage.getItem(CONFIRMED_BOOKING_SESSION_KEY) || "null");
            if (sessionBooking) return sessionBooking;
        } catch (error) {
            console.warn("Unable to read confirmed booking from session storage", error);
        }
    }

    if (typeof localStorage === "undefined") return null;

    try {
        return JSON.parse(localStorage.getItem(CONFIRMED_BOOKING_KEY) || "null");
    } catch (error) {
        return null;
    }
}

function formatBookedOn(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function formatTravelDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function formatArrivalDate(dateString, duration) {
    const baseDate = new Date(dateString);
    const durationMatch = duration.match(/(\d+)h\s*(\d+)m/);
    const extraMinutes = durationMatch ? (Number(durationMatch[1]) * 60) + Number(durationMatch[2]) : 0;
    baseDate.setMinutes(baseDate.getMinutes() + extraMinutes);
    return baseDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function getRouteShortLabel(booking) {
    const from = booking.fromLabel.split(" ")[0];
    const to = booking.toLabel.split(" ")[0];
    return `${from} → ${to}`;
}
