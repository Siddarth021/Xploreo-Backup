import { renderAdminDashboard } from "./adminDashboard.js";
import { renderdasboard } from "./dashboard.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {
<<<<<<< HEAD

        renderdasboard(user);
=======
        renderdasboard(user);
        renderStats("stats-section");
>>>>>>> e00e351 (admin dashboard UI + charts + alerts completed)
        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {
    renderAdminDashboard("admin-dashboard");

    // ✅ SHOW admin
    document.getElementById("admin-dashboard").style.display = "block";

    // ✅ HIDE guide
    document.getElementById("main").style.display = "none";
} else {
        console.log("Unknown role:", user.role);
    }
}