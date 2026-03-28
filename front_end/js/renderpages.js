import { renderAdminDashboard } from "./adminDashboard.js";

import { renderdasboard } from "./dashboard.js";
import { rendertourpage } from "./tours.js";

export function renderPageContent(user) {
    const path = window.location.pathname.split("/").pop();

    if (user.role === "guide" && path === "dashboard.html") {

        renderdasboard("main",user);
        document.getElementById("admin-dashboard").style.display = "none";

    } else if (user.role === "superadmin" && path === "dashboard.html") {

        renderAdminDashboard("admin-dashboard");

        document.getElementById("admin-dashboard").style.display = "block";
        document.getElementById("main").style.display = "none";

    }else if (user.role === "guide" && path === "tours.html"){
        rendertourpage("main",user)
        console.log("in tourpage");
    } else {
        console.log("Unknown role:", user.role);
    }
}