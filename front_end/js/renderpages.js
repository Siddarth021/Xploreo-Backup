import { renderAdminDashboard } from "./adminDashboard.js";
import { renderdasboard } from "./dashboard.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    // ===== GUIDE =====
    if (user.role === "guide" && path === "dashboard.html") {
        renderdasboard(user);
        document.getElementById("admin-dashboard").style.display = "none";
    }

    // ===== ADMIN =====
    if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        document.getElementById("main").style.display = "none";
    }
}