import { renderReviewsContent } from "./modules/reviews-content.js";
import { rendertourpagehearder } from "./modules/tour-page-header.js"; 

export function renderReviewsPage(containerId, currentUser) {
    rendertourpagehearder("main", currentUser);
    renderReviewsContent("main", currentUser);
}
