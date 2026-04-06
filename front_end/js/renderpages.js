import { renderAdminDashboard } from "./adminDashboard.js";
import { renderdasboard } from "./dashboard.js";
import { renderHotelDashboard } from "./modules/hotelDashboard.js";
import { renderBookingsPage } from "./modules/hotel-bookings-page.js";
import { renderServicesPage } from "./modules/hotel-services-page.js";
import { renderHotelEarningPage } from "./modules/hotel-earning-page.js";
import { rendertourpage } from "./tours.js";
import { renderEarningsPage } from "./earnings.js";
import { renderReviewsPage } from "./reviews.js";
import { renderSchedulePage } from "./schedule.js";
import { renderProfilePage } from "./profile.js";
import { renderSupportPage } from "./support.js";
import { initUsers } from "./modules/users.js";
import { initFinance } from "./modules/finance.js";
import { renderExperienceHomePage } from "./modules/experience_home.js";
import { renderExperienceEarningsPage } from "./modules/experience_earnings.js";
import { renderExperienceBookingsPage } from "./modules/experience_bookings.js";
import { renderExperienceCatalogPage } from "./modules/experience_experience.js";
import { renderExperienceProfilePage } from "./modules/experience_profile.js";
import { initOperations } from "./modules/operations.js";
import { renderTechAdminDashboard } from "./techAdminDashboard.js";
import { initTicketManagement } from "./modules/tech_tickets.js";
import { initTechActivity } from "./modules/tech_activity.js";
import { initTechLogs } from "./modules/tech_logs.js";
import { renderTechTicketDetail } from "./modules/tech_ticket_detail.js";

// Traveler modules
import { renderTravelerDashboard } from "./modules/travelerDashboard.js";
import { renderTravelerWishlist } from "./modules/travelerWishlist.js";
import { renderTravelerTrips } from "./modules/travelerTrips.js";
import { renderTravelerPlanDetailPage } from "./modules/travelerPlanDetailPage.js";
import { renderTravelerPackageSearchPage } from "./modules/travelerPackageSearchPage.js";
import { renderTravelerHotelSearchPage } from "./modules/travelerHotelSearchPage.js";
import { renderTravelerHotelDetailPage } from "./modules/travelerHotelDetailPage.js";
import { renderTravelerHotelConfirmationPage } from "./modules/travelerHotelConfirmationPage.js";
import { renderTravelerHotelBookingPage } from "./modules/travelerHotelBookingPage.js";
import { renderTravelerFlightsPage } from "./modules/travelerFlightsPage.js";
import { renderTravelerFlightSearchPage } from "./modules/travelerFlightSearchPage.js";
import { renderTravelerFlightDetailPage } from "./modules/travelerFlightDetailPage.js";
import { renderTravelerBookingConfirmationPage } from "./modules/travelerBookingConfirmationPage.js";
import { renderTravelerBookingDetailsPage } from "./modules/travelerBookingDetailsPage.js";

import { renderTravelerExperienceSearchPage } from "./modules/travelerExperienceSearchPage.js";
import { renderTravelerExperienceDetailPage } from "./modules/travelerExperienceDetailPage.js";
import { renderTravelerExperienceBookingPage } from "./modules/travelerExperienceBookingPage.js";
import { renderTravelerExperienceConfirmationPage } from "./modules/travelerExperienceConfirmationPage.js";
import { initTripPlannerPage } from "./modules/tripPlannerPage.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop() || "dashboard.html";

    if (user.role === "traveller" && (path === "dashboard.html" || path === "traveller_dashboard.html" || path === "travelerDashboard.html")) {
        renderTravelerDashboard("main", user);
        return;
    } 

    if (user.role === "traveller" && (path === "wishlist.html" || path === "traveller_wishlist.html")) {
        renderTravelerWishlist("main", user);
        return;
    } 

    if (user.role === "traveller" && (path === "mytrips.html" || path === "traveller_mytrips.html")) {
        renderTravelerTrips("main", user);
        return;
    } 

    if (user.role === "traveller") {
        const travelerRoutes = {
            "traveller_plan-detail.html": renderTravelerPlanDetailPage,
            "traveller_package-search.html": renderTravelerPackageSearchPage,
            "traveller_hotel-search.html": renderTravelerHotelSearchPage,
            "traveller_hotel-detail.html": renderTravelerHotelDetailPage,
            "traveller_hotel-confirmation.html": renderTravelerHotelConfirmationPage,
            "traveller_hotel-booking.html": renderTravelerHotelBookingPage,
            "traveller_flights.html": renderTravelerFlightsPage,
            "traveller_flight-search.html": renderTravelerFlightSearchPage,
            "traveller_flight-detail.html": renderTravelerFlightDetailPage,
            "traveller_booking-confirmation.html": renderTravelerBookingConfirmationPage,
            "traveller_booking-details.html": renderTravelerBookingDetailsPage,
            "traveller_experience-search.html": renderTravelerExperienceSearchPage,
            "traveller_experience-detail.html": renderTravelerExperienceDetailPage,
            "traveller_experience-booking.html": renderTravelerExperienceBookingPage,
            "traveller_experience-confirmation.html": renderTravelerExperienceConfirmationPage,
            "traveller_trip-planning.html": initTripPlannerPage,
            "support.html": renderSupportPage
        };

        if (travelerRoutes[path]) {
            travelerRoutes[path]("main");
            return;
        }
    }
    if (user.role === "guide" && path === "dashboard.html") {
        renderdasboard("main", user);
        const main = document.getElementById("main");
        const admin = document.getElementById("admin-dashboard");
        const hotel = document.getElementById("hotel-dashboard");
        if (main) main.style.display = "block";
        if (admin) admin.style.display = "none";
        if (hotel) hotel.style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        const main = document.getElementById("main");
        const admin = document.getElementById("admin-dashboard");
        const hotel = document.getElementById("hotel-dashboard");
        if (admin) admin.style.display = "block";
        if (main) main.style.display = "none";
        if (hotel) hotel.style.display = "none";
        document.getElementById("tech-admin-dash").style.display ="none";

    } else if (user.role === "superadmin" && path === "users.html") {
        initUsers();
        
    }else if (user.role === "superadmin" && path === "opsbook.html"){
        const mainDiv = document.getElementById("main");
        if (mainDiv) mainDiv.style.display = "block";
        initOperations();
    } 
    else if (user.role === "superadmin" && path === "finance.html") {
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) adminDash.style.display = "none";

        const mainDiv = document.getElementById("main");
        if (mainDiv) mainDiv.style.display = "block";

        initFinance();
    } else if (user.role === "techadmin" && path === "dashboard.html") {
        renderTechAdminDashboard("tech-admin-dash");
        document.getElementById("tech-admin-dash").style.display ="block";
    } else if (user.role === "techadmin" && path === "tech_tickets.html") {
        initTicketManagement();
    } else if (user.role === "techadmin" && path === "tech_ticket_detail.html") {
        renderTechTicketDetail("main");
    } else if (user.role === "techadmin" && path === "tech_activity.html") {
        initTechActivity();
    } else if (user.role === "techadmin" && path === "tech_logs.html") {
        initTechLogs();
    } else if (user.role === "guide" && path === "tours.html") {
        rendertourpage("main", user);
    } else if (user.role === "guide" && path === "earnings.html") {
        renderEarningsPage("main", user);
    } else if (user.role === "guide" && path === "reviews.html") {
        renderReviewsPage("main", user);
    } else if (user.role === "guide" && path === "schedule.html") {
        renderSchedulePage("main", user);
    } else if ((user.role === "guide" || user.role === "experience" || user.role === "techadmin") && path === "profile.html") {
        renderProfilePage("main", user);
    } else if ((user.role === "guide" || user.role === "hotel" || user.role === "experience") && path === "support.html") {
        renderSupportPage("main", user);
    } else if (user.role === "hotel" && (path === "dashboard.html" || path === "hotelDashboard.html")) {
        renderHotelDashboard(user);
        const main = document.getElementById("main");
        const admin = document.getElementById("admin-dashboard");
        const hotel = document.getElementById("hotel-dashboard");
        if (main) main.style.display = "none";
        if (admin) admin.style.display = "none";
        if (hotel) hotel.style.display = "block";
    } else if (user.role === "hotel" && path === "hotelBookings.html") {
        renderBookingsPage();
    } else if (user.role === "hotel" && path === "hotelRooms.html") {
        renderServicesPage();
    } else if (user.role === "hotel" && path === "hotelEarning.html") {
        renderHotelEarningPage();
    } else if (user.role === "experience" && path === "dashboard.html") {
        renderExperienceHomePage();
        document.getElementById("experience-dashboard").style.display = "block";
        document.getElementById("admin-dashboard").style.display = "none";
        document.getElementById("main").style.display = "none";
        document.getElementById("hotel-dashboard").style.display = "none";
        document.getElementById("tech-admin-dash").style.display = "none";
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
