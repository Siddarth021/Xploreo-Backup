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
import { renderTravelerDashboard } from "./modules/travelerDashboard.js";
import { renderTravelerWishlist } from "./modules/travelerWishlist.js";
import { renderTravelerTrips } from "./modules/travelerTrips.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (document.getElementById("traveler-app") || (user.role === "traveller" && path === "dashboard.html")) {
        renderTravelerDashboard("traveler-app", user);
        return;
    } 

    if (document.getElementById("wishlist-app") || (user.role === "traveller" && path === "wishlist.html")) {
        renderTravelerWishlist("wishlist-app", user);
        return;
    } 

    if (document.getElementById("mytrips-app") || (user.role === "traveller" && path === "mytrips.html")) {
        renderTravelerTrips("mytrips-app", user);
        return;
    } 
    
    if (user.role === "guide" && path === "dashboard.html") {
        renderdasboard("main",user);
        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        document.getElementById("admin-dashboard").style.display = "block";
        document.getElementById("main").style.display = "none";
    }else if (user.role === "superadmin" && path === "users.html") {
        
        // Safely check if admin-dashboard exists before hiding it
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) {
            adminDash.style.display = "none";
        }
        
        // Safely check if main exists before showing it
        const mainDiv = document.getElementById("main");
        if (mainDiv) {
            mainDiv.style.display = "block";
        }
        
        // Inject the Users & Partners HTML!
        initUsers();

    // 3. ADD THIS NEW BLOCK FOR THE FINANCE PAGE
    } else if (user.role === "superadmin" && path === "finance.html") {
        
        // Safely check if admin-dashboard exists before hiding it
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) {
            adminDash.style.display = "none";
        }
        
        // Safely check if main exists before showing it
        const mainDiv = document.getElementById("main");
        if (mainDiv) {
            mainDiv.style.display = "block";
        }
        
        // Inject the Finance HTML!
        initFinance();

    } else if (user.role === "guide" && path === "tours.html") {
        rendertourpage("main",user)
        console.log("in tourpage");

    } else if (user.role === "guide" && path === "earnings.html") {
        renderEarningsPage("main", user);

    } else if (user.role === "guide" && path === "reviews.html") {
        renderReviewsPage("main", user);

    }


    // ==== HOTEL =====
    else if (user.role === "hotel" && path === "hotelDashboard.html") {
        renderHotelDashboard(user);
    }

    else if (user.role === "hotel" && path === "hotelBookings.html") {
        renderBookingsPage();
    }

    else if (user.role === "hotel" && path === "hotelRooms.html") {
        renderServicesPage();
    }

    else if (user.role === "hotel" && path === "hotelEarning.html") {
        renderHotelEarningPage();
    }

}