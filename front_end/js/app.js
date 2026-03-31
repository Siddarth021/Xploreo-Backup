import { renderNavbar } from "../components/layout/navbar.js";
import { renderPageContent} from "./renderpages.js";
import { users } from "../data/user.js";
import { tour } from "../data/tour.js";
import {reviews } from "../data/review.js";
import { hotelBookings } from "../data/hotelBookings.js";
import { hotelReviews } from "../data/hotelReviews.js";
import { hotelActivity } from "../data/hotelActivity.js";
import { hotelServices } from "../data/hotelServices.js";

function initializeData() {

    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (!localStorage.getItem("tours")) {
        localStorage.setItem("tours", JSON.stringify(tour));
    }

    if (!localStorage.getItem("reviews")) {
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

    if (!localStorage.getItem("hotelBookings")) {
        localStorage.setItem("hotelBookings", JSON.stringify(hotelBookings));
    }

    if (!localStorage.getItem("hotelReviews")) {
        localStorage.setItem("hotelReviews", JSON.stringify(hotelReviews));
    }

    if (!localStorage.getItem("hotelActivity")) {
        localStorage.setItem("hotelActivity", JSON.stringify(hotelActivity));
    }

    if (!localStorage.getItem("hotelServices")) {
        localStorage.setItem("hotelServices", JSON.stringify(hotelServices));
    }

    console.log("LocalStorage Seeded Successfully!");
}

document.addEventListener("DOMContentLoaded", () => {
    initializeData();

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        //currentUser = users.find(u => u.id === "101");
        currentUser = users.find(u => u.id === "201");
        //currentUser = users.find(u => u.role === "hotel");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    renderNavbar(currentUser);
    renderPageContent(currentUser);
});
