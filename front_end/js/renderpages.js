import { renderStats } from "./modules/stat-cards.js";

export function renderPageContent(user){
    const path = window.location.pathname.split("/").pop();
    if(user.role === "guide" && path == "dashboard.html" ){
        renderStats("stats-section");
    }
}