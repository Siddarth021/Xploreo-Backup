import { renderStats } from "./modules/stat-cards.js";
import { renderTour } from "./modules/tour-card.js";
import { renderWelcomemsg} from "./modules/welcome-card.js";
import { renderDashEarnings } from "./modules/dash-earnings.js";
import { renderDashReviews } from "./modules/dash-reviews.js";

export function renderdasboard(containerId, currentUser) {
    if(document.getElementById("welcome-section")) renderWelcomemsg("welcome-section", currentUser);
    if(document.getElementById("stats-section")) renderStats("stats-section", currentUser);
    if(document.getElementById("tour-section")) renderTour("tour-section", currentUser);
    
    // Execute imported modules for Earnings and Reviews cleanly
    renderDashEarnings("earnings-section");
    renderDashReviews("reviews-section", currentUser);
}