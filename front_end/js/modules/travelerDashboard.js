import { travelerData } from "../../data/traveler.js";

// Heart SVG helper
const heartSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
const heartIconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

export function renderTravelerDashboard(containerId, user) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const dashboardHTML = `
        <!-- HERO SECTION -->
        <div class="hero-section">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1 class="hero-title">Discover Your Next Adventure</h1>
            </div>
        </div>
                
        <!-- SEARCH WIDGET OVERLAP -->
        <div class="search-widget-container">
            <div class="search-widget" id="main-search-widget">
                    <div class="search-tabs">
                        <button class="search-tab active" data-tab="flights">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.3c-.2.5.1 1.1.6 1.4l5.3 3.5-3.5 3.5-3.1-.8c-.4-.1-.8.1-1 .5l-1 2.2c-.3.7.3 1.4 1 1.3l5.5-1.1 5.5-1.1c.7-.1 1.3-.8 1-1.5l-1-2.2c-.2-.4 0-.8.4-1l3.5-3.5 3.5 5.3c.3.5.9.8 1.4.6l3.3-1.2c.5-.2.8-.6.7-1.1z"></path></svg>
                            Flights
                        </button>
                        <button class="search-tab" data-tab="hotels">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 22v-6.57"></path><path d="M14 22v-6.57"></path><path d="M22 22H2"></path><path d="M22 15a2 2 0 0 0-2-2h-3"></path><path d="M2 15a2 2 0 0 1 2-2h3"></path><path d="M7 2v10"></path><path d="M17 2v10"></path><path d="M7 12V6a5 5 0 0 1 10 0v6"></path></svg>
                            Hotels
                        </button>
                        <button class="search-tab" data-tab="packages">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                            Holiday Packages
                        </button>
                        <button class="search-tab" data-tab="experiences">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                            Experiences
                        </button>
                    </div>
                    
                    <div class="search-panel active" id="flights-panel">
                        <div class="trip-type-toggles">
                            <button class="toggle-btn active">One Way</button>
                            <button class="toggle-btn">Round Trip</button>
                        </div>
                        <div class="search-inputs-row">
                            <div class="input-group">
                                <label>From</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <input type="text" placeholder="City or airport" value="New York (JFK)">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>To</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <input type="text" placeholder="City or airport">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Departure</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="text" placeholder="dd-mm-yyyy">
                                </div>
                            </div>
                            <div class="input-group hidden" id="return-date-group">
                                <label>Return</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="text" placeholder="dd-mm-yyyy">
                                </div>
                            </div>
                            <div class="input-group" id="travellers-group">
                                <label>Travellers</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <input type="text" value="1 Traveller, Economy" readonly>
                                </div>
                            </div>
                        </div>
                        <button class="search-submit-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            SEARCH FLIGHTS
                        </button>
                    </div>
                    
                    <div class="search-panel" id="hotels-panel">
                        <div class="search-inputs-row" style="margin-top: 20px;">
                            <div class="input-group full-width-input">
                                <label>City</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <input type="text" placeholder="Enter city or hotel name">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Check-in</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="text" placeholder="dd-mm-yyyy">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Check-out</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="text" placeholder="dd-mm-yyyy">
                                </div>
                            </div>
                            <div class="input-group full-width-input">
                                <label>Rooms & Guests</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <input type="text" placeholder="1 Room, 2 Guests">
                                </div>
                            </div>
                        </div>
                        <button class="search-submit-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            SEARCH HOTELS
                        </button>
                    </div>

                    <div class="search-panel" id="packages-panel">
                        <div class="search-inputs-row" style="margin-top: 20px;">
                            <div class="input-group">
                                <label>From City</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <input type="text" placeholder="Your city">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Destination</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <input type="text" placeholder="Where to?">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Departure Date</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="text" placeholder="dd-mm-yyyy">
                                </div>
                            </div>
                            <div class="input-group">
                                <label>Rooms & Guests</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <input type="text" placeholder="1 Room, 2 Guests">
                                </div>
                            </div>
                        </div>
                        <button class="search-submit-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            SEARCH PACKAGES
                        </button>
                    </div>

                    <div class="search-panel" id="experiences-panel">
                        <div class="search-inputs-row" style="margin-top: 20px;">
                            <div class="input-group full-width-input">
                                <label>Destination</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <input type="text" placeholder="Where do you want to explore?">
                                </div>
                            </div>
                            <div class="input-group full-width-input">
                                <label>Activity Date</label>
                                <div class="input-wrapper">
                                    <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <input type="text" placeholder="dd-mm-yyyy">
                                </div>
                            </div>
                        </div>
                        <button class="search-submit-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            SEARCH EXPERIENCES
                        </button>
                    </div>
            </div>
        </div>

        <!-- MAIN DASHBOARD CONTENT -->
        <div class="dashboard-container">
            <!-- 1. TRENDING DESTINATIONS -->
            <section class="travel-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Trending Destinations</h2>
                        <p class="section-subtitle">Popular places worth exploring right now</p>
                    </div>
                    <button class="view-all-link">View All<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                </div>
                <div class="cards-grid destinations-grid">
                    ${travelerData.destinations.map(dest => `
                        <div class="destination-card" style="background-image: url('${dest.image}');">
                            <div class="card-gradient"></div>
                            <button class="heart-btn">${heartIconSvg}</button>
                            <div class="card-info">
                                <h3>${dest.title}</h3>
                                <p>${dest.subtitle}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- 2. RECOMMENDED TOURS -->
            <section class="travel-section light-bg-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Recommended for You</h2>
                        <p class="section-subtitle">Personalized experiences based on your interests</p>
                    </div>
                </div>
                <div class="cards-grid tours-grid">
                    ${travelerData.recommendedTours.map(tour => `
                        <div class="tour-card">
                            <div class="tour-image">
                                <img src="${tour.image}" alt="Tour">
                                <button class="heart-btn-circle">${heartSvg}</button>
                                <div class="rating-badge">★ ${tour.rating} <span>(${tour.reviews})</span></div>
                            </div>
                            <div class="tour-content">
                                <h4>${tour.title}</h4>
                                <p class="tour-desc">${tour.desc}</p>
                                <div class="tour-footer">
                                    <span class="tour-duration"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${tour.duration}</span>
                                    <span class="tour-price">${tour.price}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- 3. EXPLORE BY CATEGORY -->
            <section class="travel-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Explore by Category</h2>
                        <p class="section-subtitle">Find experiences that match your travel style</p>
                    </div>
                </div>
                <div class="cards-grid destinations-grid">
                    ${travelerData.categories.map(cat => `
                        <div class="destination-card" style="background-image: url('${cat.image}');">
                            <div class="card-gradient"></div>
                            <div class="category-icon" style="background: ${cat.color};">
                                ${cat.svg}
                            </div>
                            <div class="card-info">
                                <h3>${cat.title}</h3>
                                <p>${cat.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- 4. HOW IT WORKS -->
            <section class="travel-section text-center">
                <h2 class="section-title">How It Works</h2>
                <p class="section-subtitle">Start your journey in three simple steps</p>
                <div class="steps-container">
                    ${travelerData.steps.map((step, index) => `
                        <div class="step-card">
                            <div class="step-icon">
                                <img src="${step.icon}" alt="Step" style="width: 32px; filter: brightness(0) invert(1);">
                                <span class="step-number">${step.number}</span>
                            </div>
                            <h4>${step.title}</h4>
                            <p>${step.desc}</p>
                        </div>
                        ${index < travelerData.steps.length - 1 ? `<div class="step-line"></div>` : ''}
                    `).join('')}
                </div>
            </section>

            <!-- POPULAR ITINERARIES -->
            <section class="travel-section">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Popular Itineraries</h2>
                        <p class="section-subtitle">Curated multi-day travel experiences</p>
                    </div>
                </div>
                <div class="cards-grid itineraries-grid">
                    ${travelerData.itineraries.map(itin => `
                        <div class="itinerary-card">
                            <div class="itin-image" style="background-image: url('${itin.image}');">
                                <button class="heart-btn-circle">${heartSvg}</button>
                                <div class="days-badge">📅 ${itin.days} Days</div>
                                <div class="itin-title-overlay">
                                    <h3>${itin.title}</h3>
                                    <div class="itin-tags">
                                        ${itin.tags.map(tag => `<span>${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="itin-content">
                                <div class="itin-meta-row">
                                    <span class="itin-rating">★ ${itin.rating} <small>(${itin.reviews})</small></span>
                                    <span class="itin-travelers">👥 ${itin.travelers} travelers</span>
                                </div>
                                <ul class="itin-features">
                                    ${itin.features.map(f => `<li>${f}</li>`).join('')}
                                </ul>
                                <div class="itin-footer">
                                    <div class="itin-price-block">
                                        <span class="price-label">From</span>
                                        <span class="price-value">${itin.price}</span>
                                    </div>
                                    <button class="view-plan-btn">View Plan</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- WHAT TRAVELERS SAY -->
            <section class="travel-section text-center">
                <h2 class="section-title">What Travelers Say</h2>
                <p class="section-subtitle">Real stories from our community</p>
                <div class="cards-grid itineraries-grid" style="margin-top: 40px; text-align: left;">
                    ${travelerData.reviews.map(rev => `
                        <div class="review-card">
                            <div class="review-stars">${rev.stars}</div>
                            <p class="review-text">${rev.text}</p>
                            <div class="reviewer-info">
                                <img src="${rev.avatar}" style="width: 40px; height: 40px; border-radius: 50%; background:#e2e8f0; padding:4px;" alt="Reviewer">
                                <div>
                                    <h4>${rev.name}</h4>
                                    <p>${rev.location}</p>
                                </div>
                                <span class="review-loc">${rev.tourLoc}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            
            <!-- CONTINUE EXPLORING -->
            <section class="travel-section">
                <h2 class="section-title">Continue Exploring</h2>
                <p class="section-subtitle" style="margin-bottom: 30px;">Pick up where you left off</p>
                <div class="cards-grid tours-grid">
                    ${travelerData.continueExploring.map(item => `
                        <div class="tour-card" style="opacity: 0.9;">
                            <div class="tour-image">
                                <img src="${item.image}" ${item.grayscale ? 'style="filter: grayscale(100%);"' : ''} alt="Tour">
                                <button class="heart-btn-circle">${heartSvg}</button>
                                <div class="rating-badge" style="background:#10B981; color:white; top:12px; left:12px; right:auto;">${item.badge}</div>
                            </div>
                            <div class="tour-content">
                                <h4>${item.title}</h4>
                                <p class="tour-desc">${item.desc}</p>
                                <div class="tour-footer">
                                    <span class="tour-duration" style="color:#9CA3AF;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${item.duration}</span>
                                    <span class="tour-price">${item.price}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>
    `;

    container.innerHTML = dashboardHTML;
    attachDashboardEvents();
}

// Extract event listeners that were previously in js/traveler/dashboard.js
function attachDashboardEvents() {
    // Search Tabs functionality
    const searchTabs = document.querySelectorAll(".search-tab");
    const searchPanels = document.querySelectorAll(".search-panel");
    
    searchTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            searchTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            searchPanels.forEach(p => p.classList.remove("active"));
            const tabId = tab.getAttribute("data-tab");
            const activePanel = document.getElementById(tabId + "-panel");
            if (activePanel) activePanel.classList.add("active");
        });
    });

    // Toggle button for Trip Type inside Flights
    const toggleBtns = document.querySelectorAll(".toggle-btn");
    const returnDateGroup = document.getElementById("return-date-group");
    const travellersGroup = document.getElementById("travellers-group");

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            toggleBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            // Toggle Round Trip Layout formatting for 2-column grid
            if (e.target.textContent === "Round Trip") {
                returnDateGroup.classList.remove("hidden");
                travellersGroup.classList.add("full-width-input");
            } else {
                returnDateGroup.classList.add("hidden");
                travellersGroup.classList.remove("full-width-input");
            }
        });
    });

    // Initialize Wishlist State
    let wishlist = JSON.parse(localStorage.getItem("traveler_wishlist") || "[]");

    // Heart Button Interactions
    const heartBtns = document.querySelectorAll(".heart-btn, .heart-btn-circle");
    heartBtns.forEach(btn => {
        const cardItem = btn.closest('.destination-card, .tour-card, .itinerary-card');
        let itemData = { likes: Math.floor(Math.random() * 20) + 5 }; // Fake default likes

        // Extract metadata safely depending on card type
        if (cardItem) {
            if (cardItem.classList.contains('destination-card')) {
                const h3 = cardItem.querySelector('h3');
                itemData.title = h3 ? h3.textContent : "";
                const p = cardItem.querySelector('.card-info p');
                itemData.location = p ? p.textContent : "";
                const bg = cardItem.style.backgroundImage;
                if (bg) itemData.image = bg.slice(5, -2).replace(/"/g, "");
            } else if (cardItem.classList.contains('tour-card')) {
                const h4 = cardItem.querySelector('h4');
                itemData.title = h4 ? h4.textContent : "";
                const p = cardItem.querySelector('p.tour-desc');
                itemData.location = p ? p.textContent : "";
                const img = cardItem.querySelector('img');
                if (img) itemData.image = img.src;
            } else if (cardItem.classList.contains('itinerary-card')) {
                const h3 = cardItem.querySelector('h3');
                itemData.title = h3 ? h3.textContent : "";
                const tags = cardItem.querySelector('.itin-tags');
                itemData.location = tags ? tags.textContent.trim().replace(/\s+/g, ' ') : "";
                const bg = cardItem.querySelector('.itin-image').style.backgroundImage;
                if (bg) itemData.image = bg.slice(5, -2).replace(/"/g, "");
            }
        }

        // Pre-fill if already in wishlist
        const svg = btn.querySelector("svg");
        if (itemData.title && wishlist.find(i => i.title === itemData.title)) {
            btn.style.color = "#EF4444";
            svg.style.fill = "#EF4444";
        }

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            // Re-fetch wishlist for accuracy
            wishlist = JSON.parse(localStorage.getItem("traveler_wishlist") || "[]");
            
            if (btn.style.color === "rgb(239, 68, 68)" || btn.style.color === "#EF4444") {
                // Remove
                btn.style.color = "#9CA3AF";
                svg.style.fill = "none";
                showToast("Removed from Wishlist");
                
                if (itemData.title) {
                    wishlist = wishlist.filter(i => i.title !== itemData.title);
                }
            } else {
                // Add
                btn.style.color = "#EF4444";
                svg.style.fill = "#EF4444";
                showToast("Added to Wishlist");
                
                if (itemData.title && !wishlist.find(i => i.title === itemData.title)) {
                    wishlist.push(itemData);
                }
            }
            localStorage.setItem("traveler_wishlist", JSON.stringify(wishlist));
        });
    });
}

export function showToast(message) {
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
    
    document.getElementById("toast-message").textContent = message;
    
    toast.classList.remove("show");
    
    // Force reflow
    void toast.offsetWidth;
    
    toast.classList.add("show");
    
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
