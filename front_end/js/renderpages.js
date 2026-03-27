import { renderAdminDashboard } from "./adminDashboard.js";
import { renderdasboard } from "./dashboard.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {
<<<<<<< HEAD
        renderdasboard(user);
=======
        renderStats("stats-section");
>>>>>>> f53fbbb (updated dashboard and render logic)
        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        document.getElementById("main").style.display = "none";

    } else {
        console.log("Unknown role:", user.role);
    }
}