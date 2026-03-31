import { renderAdminDashboard } from "./adminDashboard.js";
import { renderdasboard } from "./dashboard.js";
import { rendertourpage } from "./tours.js";
import { renderEarningsPage } from "./earnings.js";
import { renderReviewsPage } from "./reviews.js";
import { initUsers } from "./modules/users.js"; 
import { initFinance } from "./modules/finance.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {
        renderdasboard("main",user);
        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {
        renderAdminDashboard("admin-dashboard");
        document.getElementById("admin-dashboard").style.display = "block";
        document.getElementById("main").style.display = "none";

    } else if (user.role === "superadmin" && path === "users.html") {
        
        // Safely check if admin-dashboard exists before hiding it
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) {
            adminDash.style.display = "none";
        }
        
        // Safely check if main exists before showing it
        const mainDiv = document.getElementById("main");
        if (mainDiv) {
            mainDiv.style.display = "block";
        }
        
        // Inject the Users & Partners HTML!
        initUsers();

    // 3. ADD THIS NEW BLOCK FOR THE FINANCE PAGE
    } else if (user.role === "superadmin" && path === "finance.html") {
        
        // Safely check if admin-dashboard exists before hiding it
        const adminDash = document.getElementById("admin-dashboard");
        if (adminDash) {
            adminDash.style.display = "none";
        }
        
        // Safely check if main exists before showing it
        const mainDiv = document.getElementById("main");
        if (mainDiv) {
            mainDiv.style.display = "block";
        }
        
        // Inject the Finance HTML!
        initFinance();

    } else if (user.role === "guide" && path === "tours.html") {
        rendertourpage("main",user)
        console.log("in tourpage");

    } else if (user.role === "guide" && path === "earnings.html") {
        renderEarningsPage("main", user);

    } else if (user.role === "guide" && path === "reviews.html") {
        renderReviewsPage("main", user);

    } else {
        console.log("Unknown role or path:", user.role, path);
    }
}