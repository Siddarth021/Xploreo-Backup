import {
    ensureTravelerSession,
    getSelectedBookingId,
    getTravelerBookings,
    seedTravelerWorkspace
} from "../utils/travelerWorkspaceState.js";
import {
    createEmptyState,
    formatCurrency,
    formatDate,
    showWorkspaceToast
} from "./travelerWorkspaceUI.js";

export function initTravelerBookingDetailsPage(containerId) {
    const container = document.getElementById(containerId);
    const user = ensureTravelerSession();

    if (!container) {
        return;
    }

    seedTravelerWorkspace();

    const bookingId = getSelectedBookingId();
    const booking = getTravelerBookings().find((item) => Number(item.id) === Number(bookingId)) || getTravelerBookings()[0];

    if (!booking) {
        container.innerHTML = createEmptyState("No booking selected", "Open a booking from the bookings page to view the detailed summary.", "Booking details");
        return;
    }

    const paymentTotal = Object.values(booking.paymentBreakdown).reduce((sum, amount) => sum + amount, 0);

    container.innerHTML = `
        <main class="traveler-workspace traveler-booking-detail-page">
            <section class="traveler-hero-panel">
                <div>
                    <p class="traveler-eyebrow">Traveller workspace</p>
                    <h1>Booking Details</h1>
                    <p>Review your confirmed trip booking, payment split, itinerary preview, and downloadable documents.</p>
                </div>
                <div class="hero-link-group">
                    <a class="traveler-link-chip" href="./traveller_bookings.html">Back to bookings</a>
                    <button type="button" class="solid-btn" id="confirm-booking-btn">Confirm Package</button>
                    <button type="button" class="ghost-btn" id="download-invoice-btn">Download invoice</button>
                </div>
            </section>

            <section class="traveler-card traveler-booking-banner" style="background-image:url('${booking.coverImage}')">
                <div class="traveler-booking-banner-overlay">
                    <span class="traveler-status-pill success">${booking.status}</span>
                    <h2>${booking.title}</h2>
                    <p>${booking.destination}</p>
                </div>
                <div class="traveler-booking-metrics">
                    <div>
                        <span>Location</span>
                        <strong>${booking.destination}</strong>
                    </div>
                    <div>
                        <span>Dates</span>
                        <strong>${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}</strong>
                    </div>
                    <div>
                        <span>Travellers</span>
                        <strong>${booking.travellers} travellers • ${booking.duration} days</strong>
                    </div>
                    <div>
                        <span>Booking ID</span>
                        <strong>${booking.id}</strong>
                    </div>
                </div>
            </section>

            <section class="traveler-grid traveler-grid-detail">
                <div class="traveler-card">
                    <div class="traveler-card-header">
                        <div>
                            <h2>Trip summary</h2>
                            <p>Transport, stay, activities, and guide assignment.</p>
                        </div>
                    </div>
                    <div class="detail-summary-grid">
                        <article class="detail-tile">
                            <span>Transport</span>
                            <strong>${booking.transport}</strong>
                            <small>Confirmed</small>
                        </article>
                        <article class="detail-tile">
                            <span>Accommodation</span>
                            <strong>${booking.accommodation}</strong>
                            <small>Confirmed</small>
                        </article>
                        <article class="detail-tile">
                            <span>Activities</span>
                            <strong>${booking.activities.length} experiences booked</strong>
                            <small>${booking.activities.join(", ")}</small>
                        </article>
                        <article class="detail-tile">
                            <span>Tour guide</span>
                            <strong>${booking.guide}</strong>
                            <small>Local specialist</small>
                        </article>
                    </div>

                    <div class="traveler-inline-detail">
                        <div class="traveler-card-header">
                            <div>
                                <h3>Itinerary preview</h3>
                                <p>A quick look at the saved day-by-day plan.</p>
                            </div>
                        </div>
                        <div class="itinerary-timeline">
                            ${booking.itinerary.map((item) => `
                                <div class="timeline-row">
                                    <strong>${item.day}</strong>
                                    <div>
                                        <p>${item.title}</p>
                                        <small>${item.detail}</small>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>

                <aside class="traveler-side-stack">
                    <div class="traveler-card">
                        <div class="traveler-card-header">
                            <div>
                                <h2>Payment details</h2>
                                <p>Total paid</p>
                            </div>
                            <strong>${formatCurrency(paymentTotal)}</strong>
                        </div>
                        <div class="line-item-list">
                            <div><span>Flights</span><strong>${formatCurrency(booking.paymentBreakdown.flights)}</strong></div>
                            <div><span>Accommodation</span><strong>${formatCurrency(booking.paymentBreakdown.stay)}</strong></div>
                            <div><span>Activities</span><strong>${formatCurrency(booking.paymentBreakdown.activities)}</strong></div>
                            <div><span>Guide</span><strong>${formatCurrency(booking.paymentBreakdown.guide)}</strong></div>
                        </div>
                    </div>

                    <div class="traveler-card">
                        <div class="traveler-card-header">
                            <div>
                                <h2>Travel documents</h2>
                                <p>Open or download ready files.</p>
                            </div>
                        </div>
                        <div class="document-list">
                            ${booking.documents.length ? booking.documents.map((document) => `
                                <article class="document-row">
                                    <div>
                                        <strong>${document.title}</strong>
                                        <small>${document.status}</small>
                                    </div>
                                    <div class="inline-actions">
                                        <button type="button" class="ghost-btn small" data-open-document="${document.title}">View</button>
                                        <button type="button" class="ghost-btn small" data-download-document="${document.title}">Download</button>
                                    </div>
                                </article>
                            `).join("") : createEmptyState("No documents available", "This booking does not have any attached travel documents yet.", "Documents")}
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    `;

    container.querySelector("#download-invoice-btn")?.addEventListener("click", () => {
        showWorkspaceToast(`Invoice for ${booking.id} is ready for download.`);
    });

    container.querySelector("#confirm-booking-btn")?.addEventListener("click", () => {
        window.location.href = `./traveller_booking-confirmation.html?booking=${booking.id}`;
    });

    container.querySelectorAll("[data-open-document], [data-download-document]").forEach((button) => {
        button.addEventListener("click", () => {
            const title = button.dataset.openDocument || button.dataset.downloadDocument;
            showWorkspaceToast(`${title} is available in this mock traveller workspace.`);
        });
    });
}
