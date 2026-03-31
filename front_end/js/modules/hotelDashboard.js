import { renderStats } from "./stat-cards.js";
import { renderRooms } from "./hotel-rooms.js";
import { renderBookings } from "./hotel-bookings.js";
import { renderHotelReviews } from "./hotel-reviews.js";
import { renderActivity } from "./hotel-activity.js";

export function renderHotelDashboard(user) {
    renderStats("hotel-stats", [
        { label: "Total Bookings", value: "248", icon: "../components/ui/todaytours.svg", color: "blue" },
        { label: "Revenue", value: "$42,580", icon: "../components/ui/montlyearning.svg", color: "dark-green" },
        { label: "Upcoming", value: "32", icon: "../components/ui/upcomingtours.svg", color: "light-green" },
        { label: "Rating", value: "4.8", icon: "../components/ui/avgrating.svg", color: "orange" }
    ]);

    renderRooms("rooms-section");
    renderBookings("bookings-section");
    renderHotelReviews("reviews-section");
    renderActivity("activity-section");
}