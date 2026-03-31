import { renderNavbar } from "../components/layout/navbar.js";
import { renderPageContent} from "./renderpages.js";
import { users } from "../data/user.js";
import { tour } from "../data/tour.js";
import {reviews } from "../data/review.js";
import { hotelBookings } from "../data/hotelBookings.js";
import { hotelReviews } from "../data/hotelReviews.js";
import { hotelActivity } from "../data/hotelActivity.js";
import { hotelServices } from "../data/hotelServices.js";
import { partners } from "../data/partners.js";
import { initOperations } from './modules/operations.js';
import { initUsers } from './modules/users.js';

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

    console.log("LocalStorage Seeded Successfully!");

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
    if (!localStorage.getItem("partners")) {
        localStorage.setItem("partners", JSON.stringify(partners));
    }

    // Dynamic Date Logic Implementation
    let storedTours = JSON.parse(localStorage.getItem("tours"));
    if (storedTours) {
        const todayStr = new Date().toISOString().split('T')[0];
        
        storedTours.forEach(t => {
            if (t.status !== 'completed') {
                const tourDateStr = t.dateTime.split(' | ')[0];
                if (tourDateStr === todayStr && t.status !== 'ongoing') {
                    t.status = 'ongoing';
                    if(!t.currentloction) t.currentloction = t.plan_iternary[0];
                } else if (tourDateStr > todayStr && t.status !== 'pending') {
                    t.status = 'pending'; // Treated as 'upcoming'
                }
            }
        });
        localStorage.setItem("tours", JSON.stringify(storedTours));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeData();

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        currentUser = users.find(u => u.id === "00001");
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    renderNavbar(currentUser);
    renderPageContent(currentUser);
});

window.addEventListener("unload", (event) => {
    console.log("Refresh is starting...");
    localStorage.clear();
    location.reload();
});

if (window.location.pathname.includes('opsbook.html')) {
    initOperations();
}

document.getElementById('nav-users-btn').addEventListener('click', () => {
    initUsers();
});
