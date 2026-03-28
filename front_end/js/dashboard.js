import { renderStats } from "./modules/stat-cards.js";
import { renderTour } from "./modules/tour-card.js";
import { renderWelcomemsg} from "./modules/welcome-card.js";

export function renderdasboard(containerId,currentUser) {
    renderWelcomemsg("welcome-section",currentUser);
    renderStats("stats-section",currentUser);
    renderTour("tour-section",currentUser);
}