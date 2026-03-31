import { renderEarningsContent } from "./modules/earnings-content.js";
import { rendertourpagehearder } from "./modules/tour-page-header.js"; 

export function renderEarningsPage(containerId, currentUser) {
    // Re-use header logic to show styling consistency, then load specific earnings content.
    rendertourpagehearder("main", currentUser);
    renderEarningsContent("main", currentUser);
}
