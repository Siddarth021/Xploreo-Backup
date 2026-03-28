import { renderNavbar } from "../components/layout/navbar.js";
import { renderPageContent} from "./renderpages.js";
import { users } from "../data/user.js";
import { tour } from "../data/tour.js";
import {reviews } from "../data/review.js";

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
}

document.addEventListener("DOMContentLoaded", () => {
    initializeData();

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        currentUser = users.find(u => u.id === "101");
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
