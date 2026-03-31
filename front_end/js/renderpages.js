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

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {
        renderdasboard("main",user);
        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        document.getElementById("admin-dashboard").style.display = "block";
        document.getElementById("main").style.display = "none";
    }

    // ==== HOTEL =====
    if (user.role === "hotel" && path === "hotelDashboard.html") {
        renderHotelDashboard(user);
    }

    if (user.role === "hotel" && path === "hotelBookings.html") {
        renderBookingsPage();
    }

    if (user.role === "hotel" && path === "hotelRooms.html") {
        renderServicesPage();
    }

    if (user.role === "hotel" && path === "hotelEarning.html") {
        renderHotelEarningPage();
    }

}