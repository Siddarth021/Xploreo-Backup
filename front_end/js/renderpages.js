import { renderAdminDashboard } from "./adminDashboard.js";
import { renderDashboard } from "./dashboard.js";
import { renderStats } from "./modules/stat-cards.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {

        renderDashboard(user);
        renderStats("stats-section");

        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {

        renderAdminDashboard("admin-dashboard");

        document.getElementById("admin-dashboard").style.display = "block";
        document.getElementById("main").style.display = "none";

    } else {
        console.log("Unknown role:", user.role);
    }
}