import { travelerData } from "../../data/traveler.js";

const SEARCH_STORAGE_KEY = "traveler_dashboard_search_state";
const HOTEL_DETAIL_PAGE = "./hotel-detail.html";
const WISHLIST_STORAGE_KEY = "traveler_wishlist";
const ROOM_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const SORT_OPTIONS = [
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
    "Reviews"
];

const HOTEL_RESULTS_PAGE_DATA = travelerData.searchCatalog.hotels.map((item) => ({
    id: item.id,
    city: item.city,
    title: item.name,
    area: item.area,
    distance: item.distance,
    category: item.category,
    categoryCount: item.categoryCount,
    image: item.image,
    categoryImage: item.image,
    rating: Number(item.rating),
    reviews: item.reviews,
    description: item.description,
    tags: item.tags,
    oldPrice: item.oldPriceValue,
    offer: item.offer,
    price: item.priceValue,
    taxes: item.taxes,
    stars: item.stars,
    maxGuests: item.maxGuests,
    promoted: Boolean(item.promoted)
}));

const CATEGORY_IMAGE_MAP = {
    "Beach Stays": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=900",
    "Luxury Stays": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=900",
    "Family Stays": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=900",
    "Party Stays": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900",
    "Budget Stays": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=900",
    "City Stays": "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&q=80&w=900"
};

export function renderTravelerHotelSearchPage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const state = {
        searchValues: getSearchValues(),
        maxPrice: 2000,
        ratings: new Set(),
        classes: new Set(),
        sortBy: "Popularity",
        sortMenuOpen: false,
        visibleCount: 4
    };

    function render() {
        const searchContext = getSearchResults(state.searchValues);
        const cityResults = searchContext.results;
        const visibleResults = getVisibleResults(cityResults, state);
        const shownResults = visibleResults.slice(0, state.visibleCount);
        const hasMore = visibleResults.length > state.visibleCount;
        const headingLabel = searchContext.heading;

        container.innerHTML = `
            <main class="traveler-hotel-page">
                <div class="traveler-hotel-frame">
                    <section class="traveler-hotel-toolbar">
                        ${renderToolbarField("location", state.searchValues.city || "Dubai, UAE")}
                        ${renderToolbarField("checkIn", state.searchValues.checkIn || "2026-03-21")}
                        ${renderToolbarField("checkOut", state.searchValues.checkOut || "2026-03-24", getNextDateValue(state.searchValues.checkIn || "2026-03-21"))}
                        ${renderToolbarField("rooms", state.searchValues.rooms || "1")}
                        ${renderToolbarField("guests", state.searchValues.guestCount || "2")}
                        <button class="traveler-hotel-search-btn" id="traveler-hotel-search-submit" type="button">
                            ${searchIcon()}
                            <span>Search</span>
                        </button>
                    </section>

                    <section class="traveler-hotel-layout">
                        <aside class="traveler-hotel-filters">
                            <h2>Filters</h2>

                            <div class="traveler-filter-group">
                                <h3>Price per Night</h3>
                                <div class="traveler-price-slider-wrap">
                                    <div class="traveler-price-track" style="--track-progress:${state.maxPrice / 20}%">
                                        <div class="traveler-price-fill"></div>
                                        <div class="traveler-price-thumb"></div>
                                    </div>
                                    <input id="traveler-hotel-price" class="traveler-price-slider" type="range" min="0" max="2000" step="25" value="${state.maxPrice}" aria-label="Filter by price per night">
                                </div>
                                <div class="traveler-filter-range">
                                    <span>$0</span>
                                    <span>${formatPriceCap(state.maxPrice)}</span>
                                </div>
                            </div>

                            <div class="traveler-filter-group">
                                <h3>User Rating</h3>
                                <div class="traveler-filter-list">
                                    ${renderFilterChip("rating", "4.5", "Excellent", "4.5+", state.ratings.has("4.5"))}
                                    ${renderFilterChip("rating", "4.0", "Very Good", "4.0+", state.ratings.has("4.0"))}
                                </div>
                            </div>

                            <div class="traveler-filter-group">
                                <h3>Hotel Class</h3>
                                <div class="traveler-filter-list">
                                    ${renderFilterChip("class", "3", "3★+", "", state.classes.has("3"))}
                                    ${renderFilterChip("class", "4", "4★+", "", state.classes.has("4"))}
                                    ${renderFilterChip("class", "5", "5★", "", state.classes.has("5"))}
                                </div>
                            </div>
                        </aside>

                        <section class="traveler-hotel-results">
                            <div class="traveler-hotel-results-top">
                                <div class="traveler-hotel-results-heading">
                                    <h1>Showing properties in ${escapeHtml(headingLabel)}</h1>
                                    <p>${visibleResults.length} of ${cityResults.length} properties</p>
                                </div>

                                <div class="traveler-hotel-sortbar">
                                    <label>Sort by:</label>
                                    <div class="traveler-hotel-sort-wrap">
                                    <button class="traveler-hotel-sort" id="traveler-hotel-sort-toggle" type="button" aria-expanded="${state.sortMenuOpen ? "true" : "false"}">
                                        <span>${escapeHtml(state.sortBy)}</span>
                                        ${chevronIcon()}
                                    </button>
                                    ${state.sortMenuOpen ? `
                                        <div class="traveler-hotel-sort-menu">
                                            ${SORT_OPTIONS.map((option) => `
                                                <button class="traveler-hotel-sort-option ${state.sortBy === option ? "active" : ""}" type="button" data-sort-option="${escapeHtml(option)}">
                                                    ${escapeHtml(option)}
                                                </button>
                                            `).join("")}
                                        </div>
                                    ` : ""}
                                    </div>
                                </div>
                            </div>

                            ${shownResults.length ? `
                                <div class="traveler-hotel-list">
                                    ${shownResults.map(renderHotelCard).join("")}
                                </div>
                                <div class="traveler-load-more">
                                    ${hasMore ? `<button id="traveler-load-more-hotels" type="button">Load More Properties</button>` : ""}
                                </div>
                            ` : `
                                <div class="traveler-hotel-empty">No hotels found for the selected filters.</div>
                            `}
                        </section>
                    </section>
                </div>
            </main>
        `;

        bindEvents();
    }

    function bindEvents() {
        container.querySelectorAll("[data-search-field]").forEach((field) => {
            const updateField = () => {
                state.searchValues = normalizeSearchValues({
                    ...state.searchValues,
                    [field.dataset.searchField]: field.value
                });

                if (field.dataset.searchField === "checkIn") {
                    const checkOutField = container.querySelector('[data-search-field="checkOut"]');
                    if (checkOutField) {
                        const nextDate = getNextDateValue(field.value);
                        if (nextDate) {
                            checkOutField.min = nextDate;
                        } else {
                            checkOutField.removeAttribute("min");
                        }
                    }
                }
            };

            field.addEventListener("input", updateField);
            field.addEventListener("change", updateField);
            field.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    updateField();
                    applySearch();
                }
            });
        });

        container.querySelector("#traveler-hotel-search-submit")?.addEventListener("click", () => {
            applySearch();
        });

        container.querySelector("#traveler-hotel-price")?.addEventListener("input", (event) => {
            state.maxPrice = Number(event.target.value);
            state.visibleCount = 4;
            render();
        });

        container.querySelectorAll("[data-filter-group='rating']").forEach((button) => {
            button.addEventListener("click", () => {
                toggleSetValue(state.ratings, button.dataset.filterValue);
                state.visibleCount = 4;
                render();
            });
        });

        container.querySelectorAll("[data-filter-group='class']").forEach((button) => {
            button.addEventListener("click", () => {
                toggleSetValue(state.classes, button.dataset.filterValue);
                state.visibleCount = 4;
                render();
            });
        });

        container.querySelector("#traveler-hotel-sort-toggle")?.addEventListener("click", () => {
            state.sortMenuOpen = !state.sortMenuOpen;
            render();
        });

        container.querySelectorAll("[data-sort-option]").forEach((button) => {
            button.addEventListener("click", () => {
                state.sortBy = button.dataset.sortOption;
                state.sortMenuOpen = false;
                state.visibleCount = 4;
                render();
            });
        });

        container.querySelector("#traveler-load-more-hotels")?.addEventListener("click", () => {
            state.visibleCount += 2;
            render();
        });

        container.querySelectorAll("[data-hotel-detail]").forEach((button) => {
            button.addEventListener("click", () => {
                const hotelId = button.dataset.hotelDetail;
                window.location.href = `${HOTEL_DETAIL_PAGE}?hotel=${encodeURIComponent(hotelId)}`;
            });
        });

        container.querySelectorAll("[data-hotel-wishlist]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                const hotelId = button.dataset.hotelWishlist;
                const selectedHotel = HOTEL_RESULTS_PAGE_DATA.find((item) => item.id === hotelId);
                if (!selectedHotel) return;

                const wishlist = getWishlistItems();
                const existingIndex = wishlist.findIndex((item) => item.title === selectedHotel.title);

                if (existingIndex >= 0) {
                    wishlist.splice(existingIndex, 1);
                    saveWishlistItems(wishlist);
                    showSearchToast("Removed from Wishlist");
                } else {
                    wishlist.push(buildWishlistItem(selectedHotel));
                    saveWishlistItems(wishlist);
                    showSearchToast("Added to Wishlist");
                }

                render();
            });
        });
    }

    function applySearch() {
        state.searchValues = normalizeSearchValues(state.searchValues);
        const dateError = getHotelDateValidationError(state.searchValues);
        if (dateError) {
            showSearchToast(dateError);
            render();
            return;
        }
        state.visibleCount = 4;
        state.sortMenuOpen = false;
        persistSearchValues(state.searchValues);
        render();
    }

    render();
}

function getSearchValues() {
    const fallback = {
        city: "Dubai, UAE",
        checkIn: "2026-03-21",
        checkOut: "2026-03-24",
        rooms: "1",
        guestCount: "2",
        guests: "1 Room, 2 Guests"
    };

    if (typeof localStorage === "undefined") {
        return fallback;
    }

    try {
        const stored = JSON.parse(localStorage.getItem(SEARCH_STORAGE_KEY) || "{}");
        const hotelValues = stored.values?.hotels || {};
        const occupancy = parseRoomsGuestsSummary(hotelValues.guests);
        return normalizeSearchValues({
            city: hotelValues.city || fallback.city,
            checkIn: hotelValues.checkIn || fallback.checkIn,
            checkOut: hotelValues.checkOut || fallback.checkOut,
            rooms: hotelValues.rooms || occupancy.rooms || fallback.rooms,
            guestCount: hotelValues.guestCount || occupancy.guestCount || fallback.guestCount,
            guests: hotelValues.guests || fallback.guests
        });
    } catch (error) {
        return normalizeSearchValues(fallback);
    }
}

function getSearchResults(searchValues) {
    const normalizedSearch = normalizeSearchTerm(normalizeCity(searchValues.city));
    const guestCount = Number.parseInt(searchValues.guestCount, 10) || parseGuestsCount(searchValues.guests);
    const roomCount = Math.max(1, Number.parseInt(searchValues.rooms, 10) || 1);
    const stayNights = getStayNights(searchValues.checkIn, searchValues.checkOut);
    const daySeed = getDateSeed(searchValues.checkIn, searchValues.checkOut);
    const guestEligible = HOTEL_RESULTS_PAGE_DATA.filter((item) => guestCount <= ((item.maxGuests || 2) * roomCount));
    const defaultCity = "Dubai";

    let baseResults = guestEligible;
    let heading = defaultCity;

    if (normalizedSearch) {
        const cityMatches = guestEligible.filter((item) => matchesCityQuery(item.city, normalizedSearch));
        const propertyMatches = guestEligible.filter((item) => matchesPropertyQuery(item, normalizedSearch));
        const exactPropertyMatches = propertyMatches.filter((item) => normalizeSearchTerm(item.title) === normalizedSearch);

        if (cityMatches.length) {
            baseResults = cityMatches;
            heading = formatSearchHeading(cityMatches[0].city);
        } else if (exactPropertyMatches.length) {
            baseResults = exactPropertyMatches;
            heading = exactPropertyMatches.length === 1
                ? exactPropertyMatches[0].title
                : formatSearchHeading(searchValues.city);
        } else if (propertyMatches.length) {
            baseResults = propertyMatches;
            heading = propertyMatches.length === 1
                ? propertyMatches[0].title
                : formatSearchHeading(searchValues.city);
        } else {
            baseResults = [];
            heading = formatSearchHeading(searchValues.city);
        }
    }

    return {
        heading,
        results: baseResults.map((item) => applySearchModifiers(item, stayNights, guestCount, roomCount, daySeed))
    };
}

function getVisibleResults(results, state) {
    const filtered = results.filter((item) => {
        if (item.price > state.maxPrice) return false;
        if (state.ratings.size && ![...state.ratings].some((rating) => item.rating >= Number(rating))) return false;
        if (state.classes.size && !state.classes.has(String(item.stars))) return false;
        return true;
    });

    return filtered.sort((left, right) => {
        if (state.sortBy === "Price: Low to High") return left.price - right.price;
        if (state.sortBy === "Price: High to Low") return right.price - left.price;
        if (state.sortBy === "Rating") return right.rating - left.rating || right.reviews - left.reviews;
        if (state.sortBy === "Reviews") return right.reviews - left.reviews || right.rating - left.rating;
        return (right.rating * 100 + right.reviews / 10) - (left.rating * 100 + left.reviews / 10);
    });
}

function renderToolbarField(type, value, minValue = "") {
    const icon = type === "checkIn" || type === "checkOut" ? calendarIcon() : type === "guests" ? guestsIcon() : locationIcon();

    if (type === "location") {
        return `
            <label class="traveler-hotel-toolbar-field">
                ${icon}
                <input class="traveler-hotel-toolbar-input" type="text" value="${escapeHtml(value)}" data-search-field="city" placeholder="Where are you staying?">
            </label>
        `;
    }

    if (type === "rooms") {
        return `
            <label class="traveler-hotel-toolbar-field">
                ${guestsIcon()}
                <select class="traveler-hotel-toolbar-select" data-search-field="rooms">
                    ${ROOM_OPTIONS.map((option) => `<option value="${option}" ${option === String(value) ? "selected" : ""}>${option} Room${option === "1" ? "" : "s"}</option>`).join("")}
                </select>
            </label>
        `;
    }

    if (type === "guests") {
        return `
            <label class="traveler-hotel-toolbar-field">
                ${guestsIcon()}
                <select class="traveler-hotel-toolbar-select" data-search-field="guestCount">
                    ${GUEST_OPTIONS.map((option) => `<option value="${option}" ${option === String(value) ? "selected" : ""}>${option} Guest${option === "1" ? "" : "s"}</option>`).join("")}
                </select>
            </label>
        `;
    }

    return `
        <label class="traveler-hotel-toolbar-field">
            ${icon}
            <input class="traveler-hotel-toolbar-input traveler-hotel-toolbar-date" type="date" value="${escapeHtml(value)}" data-search-field="${type}" ${minValue ? `min="${minValue}"` : ""}>
        </label>
    `;
}

function renderFilterChip(group, value, label, meta, active) {
    return `
        <button class="traveler-filter-chip ${active ? "active" : ""}" type="button" data-filter-group="${group}" data-filter-value="${value}">
            <span>${escapeHtml(label)}</span>
            ${meta ? `<small>${escapeHtml(meta)}</small>` : `<small></small>`}
        </button>
    `;
}

function renderHotelCard(item) {
    const isWishlisted = getWishlistItems().some((savedItem) => savedItem.title === item.title);

    return `
        <article class="traveler-hotel-card">
            <div class="traveler-hotel-media" style="background-image:url('${item.image}')">
                ${item.promoted ? `<span class="traveler-hotel-badge">Sponsored</span>` : ""}
                <button class="traveler-hotel-fav ${isWishlisted ? "active" : ""}" type="button" aria-label="Save hotel" aria-pressed="${isWishlisted ? "true" : "false"}" data-hotel-wishlist="${item.id}">
                    ${heartIcon()}
                </button>
            </div>

            <div class="traveler-hotel-body">
                <h2>${escapeHtml(item.title)}</h2>
                <div class="traveler-hotel-rating">
                    <span class="traveler-rating-stars">${"★".repeat(item.stars)}</span>
                    <span>•</span>
                    <span class="traveler-rating-score">${item.rating.toFixed(1)}</span>
                    <span>(${item.reviews} reviews)</span>
                </div>
                <div class="traveler-hotel-location">
                    ${locationIcon()}
                    <span>${escapeHtml(item.area)} • ${escapeHtml(item.distance)}</span>
                </div>
                <div class="traveler-hotel-tags">
                    ${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
                </div>
                <div class="traveler-hotel-description">${escapeHtml(item.description)}</div>
                <div class="traveler-hotel-divider"></div>
                <div class="traveler-hotel-bottom">
                    <div class="traveler-hotel-pricing">
                        ${item.oldPrice ? `
                            <div class="traveler-hotel-old-price">
                                <del>$${item.oldPrice}</del>
                                <span class="traveler-hotel-offer">${escapeHtml(item.offer || "")}</span>
                            </div>
                        ` : ""}
                        <div class="traveler-hotel-price-line">
                            <strong>$${item.price}</strong>
                            <span>per night</span>
                        </div>
                        <div class="traveler-hotel-taxes">+ $${item.taxes} taxes & fees</div>
                    </div>

                    <button class="traveler-hotel-cta" type="button" data-hotel-detail="${item.id}">View Details</button>
                </div>
            </div>
        </article>
    `;
}

function toggleSetValue(setRef, value) {
    if (setRef.has(value)) {
        setRef.delete(value);
        return;
    }

    setRef.add(value);
}

function normalizeCity(value) {
    const raw = String(value || "").trim();
    if (!raw) return "Dubai";
    return raw.split(",")[0].trim() || raw;
}

function normalizeSearchTerm(value) {
    return String(value || "").trim().toLowerCase();
}

function formatSearchHeading(value) {
    const raw = String(value || "").trim();
    if (!raw) return "Dubai";
    const cityLabel = normalizeCity(raw);
    return cityLabel
        .split(/[\s-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function matchesCityQuery(city, term) {
    return normalizeSearchTerm(city).includes(term);
}

function matchesPropertyQuery(item, term) {
    const haystack = [
        item.title,
        item.area,
        item.category,
        ...item.tags
    ].join(" ").toLowerCase();

    return haystack.includes(term);
}

function applySearchModifiers(item, stayNights, guestCount, roomCount, daySeed) {
    const priceSeed = ((hashValue(item.id) % 9) - 4) * 0.03;
    const guestPremium = Math.max(0, guestCount - 2) * 14;
    const roomPremium = Math.max(0, roomCount - 1) * 10;
    const adjustedPrice = roundPrice(Math.max(95, item.price * (1 + priceSeed) + guestPremium + roomPremium));
    const adjustedOldPrice = item.oldPrice ? roundPrice(Math.max(adjustedPrice + 20, item.oldPrice * (1 + priceSeed * 0.8))) : undefined;
    const adjustedReviews = Math.max(60, item.reviews + (hashValue(item.title) % 31) - 15);

    return {
        ...item,
        price: adjustedPrice,
        oldPrice: adjustedOldPrice,
        reviews: adjustedReviews
    };
}

function normalizeSearchValues(values) {
    const rooms = String(values.rooms || parseRoomsGuestsSummary(values.guests).rooms || "1");
    const guestCount = String(values.guestCount || parseRoomsGuestsSummary(values.guests).guestCount || "2");

    return {
        city: values.city || "Dubai, UAE",
        checkIn: values.checkIn || "2026-03-21",
        checkOut: values.checkOut || "2026-03-24",
        rooms,
        guestCount,
        guests: formatRoomsGuests(rooms, guestCount)
    };
}

function getHotelDateValidationError(searchValues) {
    if (!searchValues.checkIn || !searchValues.checkOut) return "";
    return isDateAfter(searchValues.checkIn, searchValues.checkOut)
        ? ""
        : "Check-out must be after check-in";
}

function persistSearchValues(searchValues) {
    if (typeof localStorage === "undefined") return;

    try {
        const stored = JSON.parse(localStorage.getItem(SEARCH_STORAGE_KEY) || "{}");
        const nextState = {
            ...stored,
            values: {
                ...(stored.values || {}),
                hotels: {
                    ...normalizeSearchValues(searchValues)
                }
            }
        };

        localStorage.setItem(SEARCH_STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
        return;
    }
}

function getWishlistItems() {
    if (typeof localStorage === "undefined") return [];

    try {
        return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
    } catch (error) {
        return [];
    }
}

function saveWishlistItems(items) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
}

function buildWishlistItem(item) {
    return {
        title: item.title,
        location: item.area,
        image: item.image,
        likes: 10 + (Math.abs(hashValue(item.id)) % 20)
    };
}

function getStayNights(checkIn, checkOut) {
    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);
    const diff = Math.round((end.getTime() - start.getTime()) / 86400000);
    return diff > 0 ? diff : 1;
}

function isDateAfter(startDate, endDate) {
    if (!startDate || !endDate) return true;
    return new Date(`${endDate}T00:00:00`) > new Date(`${startDate}T00:00:00`);
}

function getNextDateValue(dateString) {
    if (!dateString) return "";
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
}

function parseGuestsCount(value) {
    const match = String(value || "").match(/(\d+)\s*Guests?/i);
    return match ? Number(match[1]) : 2;
}

function parseRoomsGuestsSummary(value) {
    const text = String(value || "");
    const roomMatch = text.match(/(\d+)\s*Rooms?/i);
    const guestMatch = text.match(/(\d+)\s*Guests?/i);

    return {
        rooms: roomMatch ? roomMatch[1] : "1",
        guestCount: guestMatch ? guestMatch[1] : "2"
    };
}

function formatRoomsGuests(rooms, guests) {
    const roomCount = Math.max(1, Number.parseInt(rooms, 10) || 1);
    const guestCount = Math.max(1, Number.parseInt(guests, 10) || 1);
    return `${roomCount} Room${roomCount === 1 ? "" : "s"}, ${guestCount} Guest${guestCount === 1 ? "" : "s"}`;
}

function getDateSeed(checkIn, checkOut) {
    return getStayNights(checkIn, checkOut) + new Date(`${checkIn}T00:00:00`).getDate();
}

function hashValue(value) {
    return [...String(value || "")].reduce((total, char) => total + char.charCodeAt(0), 0);
}

function roundPrice(value) {
    return Math.round(value / 5) * 5;
}

function showSearchToast(message) {
    if (typeof document === "undefined") return;

    let toast = document.getElementById("wishlist-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "wishlist-toast";
        toast.className = "toast-notification";
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span id="toast-message"></span>
        `;
        document.body.appendChild(toast);
    }

    const messageNode = document.getElementById("toast-message");
    if (messageNode) {
        messageNode.textContent = message;
    }

    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");

    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function formatDate(value) {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-GB");
}

function formatPriceCap(value) {
    const amount = Number(value) || 0;
    return amount >= 2000 ? "$2000+" : `$${amount}`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function locationIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z"></path><circle cx="12" cy="11" r="2.5"></circle></svg>`;
}

function calendarIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"></rect><path d="M8 2v4M16 2v4M3 10h18"></path></svg>`;
}

function guestsIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="10" cy="7" r="3"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 4.13a3 3 0 0 1 0 5.74"></path></svg>`;
}

function searchIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.35-4.35"></path></svg>`;
}

function chevronIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>`;
}

function heartIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 21-1.45-1.32C5.4 15.03 2 11.92 2 8.08 2 5 4.42 2.6 7.5 2.6c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 2.6C19.58 2.6 22 5 22 8.08c0 3.84-3.4 6.95-8.55 11.6z"></path></svg>`;
}
