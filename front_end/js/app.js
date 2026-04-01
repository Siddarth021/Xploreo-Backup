import { renderNavbar } from "../components/layout/navbar.js";
import { renderPageContent } from "./renderpages.js";
import { users } from "../data/user.js";
import { tour } from "../data/tour.js";
import { reviews } from "../data/review.js";
import { homeData } from "../data/experience_home.js";
import { earningsData } from "../data/experience_earningsData.js";
import { bookingsData } from "../data/experience_bookings.js";
import { experiences as experienceCatalog } from "../data/experience_experience_data.js";
import { profileData as experienceProfile } from "../data/experience_profile.js";
import { hotelBookings } from "../data/hotelBookings.js";
import { hotelReviews } from "../data/hotelReviews.js";
import { hotelActivity } from "../data/hotelActivity.js";
import { hotelServices } from "../data/hotelServices.js";
import { partners } from "../data/partners.js";
import { initLogin } from "./login.js";
import { initSignup } from "./signup.js";

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

    if (!localStorage.getItem("partners")) {
        localStorage.setItem("partners", JSON.stringify(partners));
    }
    if (!localStorage.getItem("experienceHome")) {
        localStorage.setItem("experienceHome", JSON.stringify(homeData));
    }

    if (!localStorage.getItem("experienceEarnings")) {
        localStorage.setItem("experienceEarnings", JSON.stringify(earningsData));
    }

    if (!localStorage.getItem("experienceBookings")) {
        localStorage.setItem("experienceBookings", JSON.stringify(bookingsData));
    }

    if (!localStorage.getItem("experienceCatalog")) {
        localStorage.setItem("experienceCatalog", JSON.stringify(experienceCatalog));
    }

    if (!localStorage.getItem("experienceProfile")) {
        localStorage.setItem("experienceProfile", JSON.stringify(experienceProfile));
    }
    let storedTours = JSON.parse(localStorage.getItem("tours"));
    if (storedTours) {
        const todayStr = new Date().toISOString().split("T")[0];

        storedTours.forEach((t) => {
            if (t.status !== "completed") {
                const tourDateStr = t.dateTime.split(" | ")[0];
                if (tourDateStr === todayStr && t.status !== "ongoing") {
                    t.status = "ongoing";
                    if (!t.currentloction) t.currentloction = t.plan_iternary[0];
                } else if (tourDateStr > todayStr && t.status !== "pending") {
                    t.status = "pending";
                }
            }
        });
        localStorage.setItem("tours", JSON.stringify(storedTours));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeData();

    const path = window.location.pathname.split("/").pop();

    if (path === "login.html") {
        initLogin();
        return;
    }

    if (path === "signup.html") {
        initSignup();
        return;
    }

    const isExperienceRoute = path.startsWith("experience_");
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {

        currentUser = users.find(u => u.id === "00001");
    }
    if (isExperienceRoute) {
        const servicePartnerUser = users.find((user) => user.role === "service_partner");
        currentUser = servicePartnerUser
            ? { ...servicePartnerUser, role: "experience" }
            : { role: "experience" };
    } else if (!currentUser) {
        currentUser = users.find((u) => u.id === "00001");
        currentUser = users.find(u => u.id === "00001");

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    renderNavbar(currentUser);
    renderPageContent(currentUser);
});


window.addEventListener("unload", () => {
    const path = window.location.pathname.split("/").pop();

    if (path.startsWith("experience_")) {
        return;
    }

    console.log("Refresh is starting...");

});