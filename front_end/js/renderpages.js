import { renderStats } from "./modules/stat-cards.js";
import { renderAdminDashboard } from "./adminDashboard.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    // ===== GUIDE =====
    if (user.role === "guide" && path === "dashboard.html") {
        renderStats("stats-section");

        // hide admin
        document.getElementById("admin-dashboard").style.display = "none";
    }

    // ===== ADMIN =====
    if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");

        // hide guide layout
        document.getElementById("main").style.display = "none";
    }
}