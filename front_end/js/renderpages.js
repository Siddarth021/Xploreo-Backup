import { renderAdminDashboard } from "./adminDashboard.js";
import { renderdasboard } from "./dashboard.js";
import { renderHotelDashboard } from "./modules/hotelDashboard.js";
import { renderBookingsPage } from "./modules/hotel-bookings-page.js";
import { renderServicesPage } from "./modules/hotel-services-page.js";
import { renderHotelEarningPage } from "./modules/hotel-earning-page.js";
import { rendertourpage } from "./tours.js";
import { renderEarningsPage } from "./earnings.js";
import { renderReviewsPage } from "./reviews.js";
import { initUsers } from "./modules/users.js";
import { initFinance } from "./modules/finance.js";
import { renderExperienceHomePage } from "./modules/experience_home.js";
import { renderExperienceEarningsPage } from "./modules/experience_earnings.js";
import { renderExperienceBookingsPage } from "./modules/experience_bookings.js";
import { renderExperienceCatalogPage } from "./modules/experience_experience.js";
import { renderExperienceProfilePage } from "./modules/experience_profile.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {
        renderdasboard("main", user);
        document.getElementById("main").style.display = "block";
        document.getElementById("admin-dashboard").style.display = "none";
        document.getElementById("hotel-dashboard").style.display = "none";
    } else if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        document.getElementById("admin-dashboard").style.display = "block";
        document.getElementById("main").style.display = "none";
        document.getElementById("hotel-dashboard").style.display = "none";
    } else if (user.role === "superadmin" && path === "users.html") {
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) adminDash.style.display = "none";

        const mainDiv = document.getElementById("main");
        if (mainDiv) mainDiv.style.display = "block";

        initUsers();
    } else if (user.role === "superadmin" && path === "finance.html") {
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) adminDash.style.display = "none";

        const mainDiv = document.getElementById("main");
        if (mainDiv) mainDiv.style.display = "block";

        initFinance();
    } else if (user.role === "guide" && path === "tours.html") {
        rendertourpage("main", user);
    } else if (user.role === "guide" && path === "earnings.html") {
        renderEarningsPage("main", user);
    } else if (user.role === "guide" && path === "reviews.html") {
        renderReviewsPage("main", user);
    } else if (user.role === "hotel" && (path === "dashboard.html" || path === "hotelDashboard.html")) {
        renderHotelDashboard(user);
        document.getElementById("main").style.display = "none";
        document.getElementById("admin-dashboard").style.display = "none";
        document.getElementById("hotel-dashboard").style.display = "block";
    } else if (user.role === "hotel" && path === "hotelBookings.html") {
        renderBookingsPage();
    } else if (user.role === "hotel" && path === "hotelRooms.html") {
        renderServicesPage();
    } else if (user.role === "hotel" && path === "hotelEarning.html") {
        renderHotelEarningPage();
    } else if (user.role === "experience" && path === "experience_home.html") {
        renderExperienceHomePage();
    } else if (user.role === "experience" && path === "experience_earnings.html") {
        renderExperienceEarningsPage();
    } else if (user.role === "experience" && path === "experience_bookings.html") {
        renderExperienceBookingsPage();
    } else if (user.role === "experience" && path === "experience_experience.html") {
        renderExperienceCatalogPage();
    } else if (user.role === "experience" && path === "experience_profile.html") {
        renderExperienceProfilePage();
    }
}
