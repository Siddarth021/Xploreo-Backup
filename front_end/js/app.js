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
import { renderLandingNavbar } from "../components/layout/navbar_landing.js";
import { initialScheduleData } from "../data/schedule.js";
import { initialProfileData } from "../data/profile-data.js";
import { initialSupportData } from "../data/support-data.js";
import { techAdminData } from "../data/tech_admin_data.js";
import { travelerWorkspaceSeed } from "../data/travelerWorkspaceData.js";
import { travelerData } from "../data/traveler.js";
import { nontechAdminData } from "../data/nontechadmin_data.js";

function initializeData() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (!localStorage.getItem("tours")) {
        // Now that tour.js and travelerWorkspaceSeed are synchronized, we can simply seed from them
        const allTours = tour.concat((travelerWorkspaceSeed.bookings || []).filter(b => !tour.find(t => String(t.id) === String(b.id))));
        localStorage.setItem("tours", JSON.stringify(allTours));
    }

    if (!localStorage.getItem("experienceBookings")) {
        localStorage.setItem("experienceBookings", JSON.stringify(bookingsData));
    }

    if (!localStorage.getItem("hotelBookings")) {
        localStorage.setItem("hotelBookings", JSON.stringify(hotelBookings));
    }

    if (!localStorage.getItem("techAdminData")) {
        localStorage.setItem("techAdminData", JSON.stringify(techAdminData));
    }

    if (!localStorage.getItem("reviews")) {
        localStorage.setItem("reviews", JSON.stringify(reviews));
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

    if (!localStorage.getItem("experienceCatalog")) {
        localStorage.setItem("experienceCatalog", JSON.stringify(experienceCatalog));
    }

    if (!localStorage.getItem("experienceProfile")) {
        localStorage.setItem("experienceProfile", JSON.stringify(experienceProfile));
    }

    if (!localStorage.getItem("scheduleData")) {
        localStorage.setItem("scheduleData", JSON.stringify(initialScheduleData));
    }

    // Profile Data Bridge: Ensures profile always shows the current user's data
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        // Sync the main 'profileData' used by the profile page with the currentUser's current state
        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userSync = allUsers.find(u => u.id === currentUser.id);
        
        if (userSync) {
            const bridgedProfile = {
                ...initialProfileData,
                firstName: userSync.name.split(' ')[0],
                lastName: userSync.name.split(' ').slice(1).join(' '),
                email: userSync.email,
                phone: userSync.phone || userSync.phno,
                role: userSync.role
            };
            localStorage.setItem("profileData", JSON.stringify(bridgedProfile));
        }
    } else if (!localStorage.getItem("profileData")) {
        localStorage.setItem("profileData", JSON.stringify(initialProfileData));
    }

    if (!localStorage.getItem("supportData")) {
        localStorage.setItem("supportData", JSON.stringify(initialSupportData));
    }

    if (!localStorage.getItem("ntaPlans")) {
        localStorage.setItem("ntaPlans", JSON.stringify(nontechAdminData.plans));
    }
    if (!localStorage.getItem("ntaActivity")) {
        localStorage.setItem("ntaActivity", JSON.stringify(nontechAdminData.recentActivity));
    }
    
    if (!localStorage.getItem("techAdminData")) {
        // Merge tickets from supportData into techAdminData for unification
        const allTickets = [
            ...techAdminData.tickets,
            ...initialSupportData.tickets.map(t => ({
                id: t.id,
                userId: "10001", // Default to Sreekar (Guide) for initial demo
                userName: "Sreekar",
                userRole: "guide",
                subject: t.subject,
                description: "Initial support request from guide.",
                status: t.status.toLowerCase(),
                priority: "medium",
                category: t.category,
                createdAt: new Date(t.date).toISOString()
            }))
        ];
        const unifiedTechData = { ...techAdminData, tickets: allTickets };
        localStorage.setItem("techAdminData", JSON.stringify(unifiedTechData));
    }

    
    let storedTours = JSON.parse(localStorage.getItem("tours"));
    if (storedTours && Array.isArray(storedTours)) {
        const todayStr = new Date().toISOString().split("T")[0];
        storedTours.forEach((t) => {
            if (t.status !== "completed" && t.dateTime) {
                const parts = t.dateTime.split(" | ");
                const tourDateStr = parts[0];
                if (tourDateStr === todayStr) {
                    if (t.status !== "ongoing") {
                        t.status = "ongoing";
                        if (!t.currentloction && t.plan_iternary && t.plan_iternary.length > 0) {
                            t.currentloction = t.plan_iternary[0];
                        }
                    }
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

    const path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "login.html") {
        renderLandingNavbar();
        initLogin(users);
    } else if (path === "signup.html") {
        renderLandingNavbar();
        initSignup();
    } else if (path === "index.html") {
        renderLandingNavbar();
    } else {
        // PRIORITIZE: Actual logged-in user from localStorage
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        
        // FALLBACK: If not logged in, prompt for credentials instead of hardcoding 201
        if (!currentUser) {
            let userParam = prompt("Please enter username for dashboard (or cancel for demo user):");
            if (userParam) {
                let passParam = prompt("Please enter password:");
                currentUser = users.find(u => (u.username === userParam || u.email === userParam) && u.password === passParam);
                if (!currentUser) {
                    alert("Invalid credentials. Defaulting to Admin (201).");
                }
            }

            if (!currentUser) {
                currentUser = users.find(u => u.id === "201");
            }

            currentUser = users.find(u => u.id === "00001");
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            console.log("Logged in as:", currentUser.role);
        }

        renderNavbar(currentUser);
        renderPageContent(currentUser);
 
    }
});


if (window.location.pathname.includes('opsbook.html')) {
    initOperations();
}