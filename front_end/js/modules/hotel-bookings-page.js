let filters = {
    search: "",
    status: [],
    checkIn: "",
    checkOut: "",
    roomType: []
};

export function renderBookingsPage() {
    renderControls();
    applyFilters();
}

function renderControls() {
    const container = document.getElementById("booking-controls");

    container.innerHTML = `
        <div class="hotel-filters" style="display:flex; justify-content:space-between; align-items:center;">
            <input type="text" id="searchInput" placeholder="Search guest or booking ID" style="min-width: 300px;">
            <button id="openFilterBtn" class="btn-light">
                Filter
            </button>
        </div>

        <!-- Filter Modal -->
        <div id="filterPanel" class="hotel-modal hidden">
            <div class="hotel-modal-content" style="width: 450px;">
                <span class="hotel-modal-close" id="closeFilterBtn">&times;</span>
                <h2 style="margin-bottom: 20px;">Filters</h2>
                
                <div style="margin-bottom: 15px;">
                    <label style="font-weight:600;display:block;margin-bottom:8px;">Status</label>
                    <div style="display:flex;gap:15px;flex-wrap:wrap;">
                        <label style="cursor:pointer; font-size: 14px;"><input type="checkbox" class="status-cb" value="confirmed"> Confirmed</label>
                        <label style="cursor:pointer; font-size: 14px;"><input type="checkbox" class="status-cb" value="checked-in"> Checked-in</label>
                        <label style="cursor:pointer; font-size: 14px;"><input type="checkbox" class="status-cb" value="completed"> Completed</label>
                        <label style="cursor:pointer; font-size: 14px;"><input type="checkbox" class="status-cb" value="cancelled"> Cancelled</label>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="font-weight:600;display:block;margin-bottom:8px;">Room Type</label>
                    <div style="display:flex;gap:15px;flex-wrap:wrap;">
                        <label style="cursor:pointer; font-size: 14px;"><input type="checkbox" class="room-cb" value="Deluxe Room"> Deluxe Room</label>
                        <label style="cursor:pointer; font-size: 14px;"><input type="checkbox" class="room-cb" value="Standard Room"> Standard Room</label>
                    </div>
                </div>

                <div style="margin-bottom: 25px;">
                    <div class="filter-date-row">
                        <div class="filter-date-group">
                            <label for="filterCheckIn">Check-in</label>
                            <input type="date" id="filterCheckIn" class="filter-date-input">
                        </div>
                        <div class="filter-date-group">
                            <label for="filterCheckOut">Check-out</label>
                            <input type="date" id="filterCheckOut" class="filter-date-input">
                        </div>
                    </div>
                    <div class="filter-date-error-text" id="filterDateError"></div>
                </div>

                <div class="hotel-actions">
                    <button class="btn-cancel" id="clearFiltersBtn">Clear</button>
                    <button class="btn-blue" id="applyFiltersBtn">Apply</button>
                </div>
            </div>
        </div>
    `;

    attachFilterEvents();
}

function attachFilterEvents() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            filters.search = e.target.value.toLowerCase();
            applyFilters();
        });
    }

    const openFilterBtn = document.getElementById("openFilterBtn");
    const closeFilterBtn = document.getElementById("closeFilterBtn");
    const filterPanel = document.getElementById("filterPanel");

    if (openFilterBtn) {
        openFilterBtn.addEventListener("click", () => {
            filterPanel.classList.remove("hidden");
        });
    }

    if (closeFilterBtn) {
        closeFilterBtn.addEventListener("click", () => {
            filterPanel.classList.add("hidden");
        });
    }

    const applyFiltersBtn = document.getElementById("applyFiltersBtn");
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", () => {
            filters.status = Array.from(document.querySelectorAll(".status-cb:checked")).map(cb => cb.value);
            filters.roomType = Array.from(document.querySelectorAll(".room-cb:checked")).map(cb => cb.value);
            filters.checkIn = document.getElementById("filterCheckIn").value;
            filters.checkOut = document.getElementById("filterCheckOut").value;

            applyFilters();
            filterPanel.classList.add("hidden");
        });
    }

    const clearFiltersBtn = document.getElementById("clearFiltersBtn");
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            filters.search = "";
            filters.status = [];
            filters.checkIn = "";
            filters.checkOut = "";
            filters.roomType = [];

            if (searchInput) searchInput.value = "";
            document.querySelectorAll(".status-cb").forEach(cb => cb.checked = false);
            document.querySelectorAll(".room-cb").forEach(cb => cb.checked = false);
            
            const localCheckInInput = document.getElementById("filterCheckIn");
            const localCheckOutInput = document.getElementById("filterCheckOut");
            const localDateError = document.getElementById("filterDateError");
            
            if (localCheckInInput) localCheckInInput.value = "";
            if (localCheckOutInput) {
                localCheckOutInput.value = "";
                localCheckOutInput.min = "";
                localCheckOutInput.classList.remove("is-invalid");
            }
            if (localDateError) localDateError.textContent = "";
            if (applyFiltersBtn) applyFiltersBtn.disabled = false;

            applyFilters();
            filterPanel.classList.add("hidden");
        });
    }

    // --- Date Validation Logic ---
    const filterCheckIn = document.getElementById("filterCheckIn");
    const filterCheckOut = document.getElementById("filterCheckOut");
    const filterDateError = document.getElementById("filterDateError");
    // Re-fetch applyBtn locally
    const filterApplyBtn = document.getElementById("applyFiltersBtn");

    function validateDates() {
        if (!filterCheckIn || !filterCheckOut) return;
        
        const inDateVal = filterCheckIn.value;
        const outDateVal = filterCheckOut.value;

        // If either is empty, simply clear any errors and leave it open
        if (!inDateVal || !outDateVal) {
            if (filterDateError) filterDateError.textContent = "";
            filterCheckOut.classList.remove("is-invalid");
            if (filterApplyBtn) filterApplyBtn.disabled = false;
            return;
        }

        const cin = new Date(inDateVal);
        const cout = new Date(outDateVal);

        if (cout <= cin) {
            if (filterDateError) filterDateError.textContent = "Check-out date must be after Check-in date";
            filterCheckOut.classList.add("is-invalid");
            if (filterApplyBtn) filterApplyBtn.disabled = true;
        } else {
            if (filterDateError) filterDateError.textContent = "";
            filterCheckOut.classList.remove("is-invalid");
            if (filterApplyBtn) filterApplyBtn.disabled = false;
        }
    }

    if (filterCheckIn) {
        filterCheckIn.addEventListener("change", (e) => {
            if (e.target.value) {
                const checkInDate = new Date(e.target.value);
                checkInDate.setDate(checkInDate.getDate() + 1);
                if (filterCheckOut) {
                    filterCheckOut.min = checkInDate.toISOString().split("T")[0];
                }
            } else {
                if (filterCheckOut) filterCheckOut.min = "";
            }
            validateDates();
        });
    }

    if (filterCheckOut) {
        filterCheckOut.addEventListener("change", validateDates);
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
}

function applyFilters() {
    let bookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    // Search (Instantly applies)
    if (filters.search) {
        bookings = bookings.filter(b =>
            b.customer.toLowerCase().includes(filters.search) ||
            String(b.id).toLowerCase().includes(filters.search)
        );
    }

    // Status (Panel)
    if (filters.status && filters.status.length > 0) {
        bookings = bookings.filter(b => filters.status.includes(b.status.toLowerCase()));
    }

    // Room Type (Panel)
    if (filters.roomType && filters.roomType.length > 0) {
        bookings = bookings.filter(b => filters.roomType.includes(b.room));
    }

    // Check-in Date (Panel)
    if (filters.checkIn) {
        const filterStart = new Date(filters.checkIn);
        filterStart.setHours(0, 0, 0, 0);
        bookings = bookings.filter(b => {
            const checkInDate = parseDate(b.checkIn);
            checkInDate.setHours(0, 0, 0, 0);
            return checkInDate >= filterStart;
        });
    }

    // Check-out Date (Panel)
    if (filters.checkOut) {
        const filterEnd = new Date(filters.checkOut);
        filterEnd.setHours(0, 0, 0, 0);
        bookings = bookings.filter(b => {
            const checkOutDate = parseDate(b.checkOut);
            checkOutDate.setHours(0, 0, 0, 0);
            return checkOutDate <= filterEnd;
        });
    }

    renderFilteredList(bookings);
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

window.openBookingModal = function (id) {
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

window.cancelBooking = function (id) {
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

window.checkIn = function (id) {
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

window.checkOut = function (id) {
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