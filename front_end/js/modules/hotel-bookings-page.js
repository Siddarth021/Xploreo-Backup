export function renderBookingsPage() {
    renderControls();
    renderList("all");
}

function renderControls() {
    const container = document.getElementById("booking-controls");

    container.innerHTML = `
        <div class="hotel-tabs">
            <span class="active" data-filter="all">All</span>
            <span data-filter="confirmed">Confirmed</span>
            <span data-filter="checked-in">Checked-In</span>
            <span data-filter="completed">Completed</span>
            <span data-filter="cancelled">Cancelled</span>
        </div>

        <div class="hotel-filters">
            <input type="text" id="searchInput" placeholder="Search guest or booking ID">

            <select id="roomFilter">
                <option value="all">All Rooms</option>
                <option value="Deluxe Room">Deluxe Room</option>
                <option value="Standard Room">Standard Room</option>
            </select>

            <input type="date" id="startDate">
            <input type="date" id="endDate">
        </div>
    `;

    attachTabEvents();
    attachFilterEvents();
}

function attachTabEvents() {
    const tabs = document.querySelectorAll(".hotel-tabs span");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {

            // remove active
            tabs.forEach(t => t.classList.remove("active"));

            // add active
            tab.classList.add("active");

            const filter = tab.dataset.filter;

            renderList(filter);
        });
    });
}

function attachFilterEvents() {
    const searchInput = document.getElementById("searchInput");
    const roomFilter = document.getElementById("roomFilter");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    if (roomFilter) {
        roomFilter.addEventListener("change", applyFilters);
    }

    if (startDate) {
        startDate.addEventListener("change", applyFilters);
    }

    if (endDate) {
        endDate.addEventListener("change", applyFilters);
    }
}

function parseDate(dateStr) {
    return new Date(dateStr);
}

function isSameDate(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);

    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
    //return true;
}
function applyFilters() {

    const searchInput = document.getElementById("searchInput");
    const roomFilter = document.getElementById("roomFilter");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const activeTabEl = document.querySelector(".hotel-tabs .active");

    // SAFETY FALLBACKS
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const roomValue = roomFilter ? roomFilter.value : "all";
    const startDateVal = startDate ? startDate.value : "";
    const endDateVal = endDate ? endDate.value : "";
    const activeTab = activeTabEl ? activeTabEl.dataset.filter : "all";

    let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    // TAB FILTER
    if (activeTab !== "all") {
        bookings = bookings.filter(b => b.status === activeTab);
    }

    // SEARCH
    if (searchValue) {
        bookings = bookings.filter(b =>
            b.customer.toLowerCase().includes(searchValue) ||
            String(b.id).includes(searchValue)
        );
    }

    // ROOM
    if (roomValue !== "all") {
        bookings = bookings.filter(b => b.room === roomValue);
    }

    // DATE RANGE
    if (startDateVal && endDateVal) {
        const start = new Date(startDateVal);
        const end = new Date(endDateVal);

        bookings = bookings.filter(b => {
            const checkIn = parseDate(b.checkIn);
            return checkIn >= start && checkIn <= end;
        });
    }

    renderFilteredList(bookings);
}

function renderList(filter) {
    const container = document.getElementById("booking-list");
    let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    if (filter !== "all") {
        bookings = bookings.filter(b => b.status === filter);
    }

    if (bookings.length === 0) {
        container.innerHTML = `<p class="hotel-sub-text">No bookings found</p>`;
        return;
    }

    container.innerHTML = bookings.map(b => `
        <div class="hotel-booking-card">

            <div class="hotel-booking-left">
                <p class="hotel-cust-name">
                    ${b.customer}
                    <span class="hotel-status ${b.status}">${b.status}</span>
                </p>

                <p class="hotel-sub-text">
                    ${b.room} • ${b.guests} Guests • ID: ${b.id}
                </p>
            </div>

            <div class="hotel-booking-middle">
                <div>
                    <p>${b.checkIn}</p>
                    <span class="hotel-sub-text">Check-in</span>
                </div>

                <div>→</div>

                <div>
                    <p>${b.checkOut}</p>
                    <span class="hotel-sub-text">Check-out</span>
                </div>

                <div class="hotel-badge">${b.nights} nights</div>
            </div>

            <div class="hotel-booking-right">
                <h3>$${b.amount}</h3>

                <div class="hotel-actions">
                    <button class="btn-light" onclick="openBookingModal('${b.id}')">
                        View Details
                    </button>
                    ${renderActionButton(b.status, b)}
                </div>
            </div>

        </div>
    `).join("");
}

function renderFilteredList(bookings) {
    const container = document.getElementById("booking-list");

    if (bookings.length === 0) {
        container.innerHTML = `<p class="hotel-sub-text">No bookings found</p>`;
        return;
    }

    container.innerHTML = bookings.map(b => `
        <div class="hotel-booking-card">

            <div class="hotel-booking-left">
                <p class="hotel-cust-name">
                    ${b.customer}
                    <span class="hotel-status ${b.status}">${b.status}</span>
                </p>

                <p class="hotel-sub-text">
                    ${b.room} • ${b.guests} Guests • ID: ${b.id}
                </p>
            </div>

            <div class="hotel-booking-middle">
                <div>
                    <p>${b.checkIn}</p>
                    <span class="hotel-sub-text">Check-in</span>
                </div>

                <div>→</div>

                <div>
                    <p>${b.checkOut}</p>
                    <span class="hotel-sub-text">Check-out</span>
                </div>

                <div class="hotel-badge">${b.nights} nights</div>
            </div>

            <div class="hotel-booking-right">
                <h3>$${b.amount}</h3>

                <div class="hotel-actions">
                    <button class="btn-light">View Details</button>
                    ${renderActionButton(b.status, b)}
                </div>
            </div>

        </div>
    `).join("");
}

function renderActionButton(status, booking) {

    const canCheckIn = isSameDate(booking.checkIn);
    const canCheckOut = isSameDate(booking.checkOut);

    if (status === "confirmed") {
        return `
            <button class="btn-green" 
                ${!canCheckIn ? "disabled" : ""} 
                onclick="checkIn('${booking.id}')">
                Check-in
            </button>

            <button class="btn-cancel" onclick="cancelBooking('${booking.id}')">
                Cancel
            </button>
        `;
    }

    if (status === "checked-in") {
        return `
            <button class="btn-blue" 
                ${!canCheckOut ? "disabled" : ""} 
                onclick="checkOut('${booking.id}')">
                Check-out
            </button>
        `;
    }

    if (status === "completed") {
        return `<span class="hotel-status completed">Completed</span>`;
    }

    if (status === "cancelled") {
        return `<span class="hotel-status cancelled">Cancelled</span>`;
    }

    return "";
}

window.openBookingModal = function(id) {
    const bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];
    const booking = bookings.find(b => String(b.id) === String(id));

    const modal = document.getElementById("hotel-modal");
    const body = document.getElementById("hotel-modal-body");

    body.innerHTML = `
        <h2>${booking.customer}</h2>

        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Room:</strong> ${booking.room}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Status:</strong> ${booking.status}</p>

        <hr>

        <p><strong>Check-in:</strong> ${booking.checkIn}</p>
        <p><strong>Check-out:</strong> ${booking.checkOut}</p>
        <p><strong>Nights:</strong> ${booking.nights}</p>

        <hr>

        <p><strong>Total Amount:</strong> $${booking.amount}</p>
    `;

    modal.classList.remove("hidden");
};

const closeBtn = document.getElementById("closeModal");

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        document.getElementById("hotel-modal").classList.add("hidden");
    });
}

window.cancelBooking = function(id) {
    let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    bookings = bookings.map(b => {
        if (String(b.id) === String(id)) {
            return { ...b, status: "cancelled" };
        }
        return b;
    });

    localStorage.setItem("hotelBookings", JSON.stringify(bookings));

    applyFilters(); // re-render
};

window.checkIn = function(id) {
    let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    bookings = bookings.map(b => {
        if (String(b.id) === String(id)) {
            return { ...b, status: "checked-in" };
        }
        return b;
    });

    localStorage.setItem("hotelBookings", JSON.stringify(bookings));

    applyFilters(); // refresh UI
};

window.checkOut = function(id) {
    let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    bookings = bookings.map(b => {
        if (String(b.id) === String(id)) {
            return { ...b, status: "completed" };
        }
        return b;
    });

    localStorage.setItem("hotelBookings", JSON.stringify(bookings));

    applyFilters(); // refresh UI
};