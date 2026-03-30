export function renderReviewsContent(containerId, currentUser) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allRequests = JSON.parse(localStorage.getItem("tours")) || [];
    let completedWithReviews = allRequests.filter(req => 
        String(req.guideId).trim() === String(currentUser.id).trim() && req.status === "completed" && req.review
    );

    const html = `
        <div class="welcome earnings-welcome-spacing">
            <h1>Customer Reviews</h1>
            <p>See what your guests are saying about your tours</p>
        </div>

        <div class="stats-grid earnings-stats-spacing">
            <div class="stat-card orange">
                <p class="stat-label">Average Rating</p>
                <h2 class="stat-value">4.8 <span style="font-size:16px; color:#FBBF24;">★</span></h2>
                <p class="stat-subtext">Based on your overall performance</p>
            </div>
            <div class="stat-card violet">
                <p class="stat-label">Total Reviews</p>
                <h2 class="stat-value">${completedWithReviews.length}</h2>
                <p class="stat-subtext text-purple">From verified guests</p>
            </div>
        </div>

        <div class="tours-grid reviews-grid-spacing">
            ${completedWithReviews.length > 0 ? completedWithReviews.map(r => `
                <div class="tour-card review-card">
                    <div>
                        <div class="review-card-header">
                            <div class="review-card-customer">
                                <h3>${r.customer}</h3>
                                <span>${r.title}</span>
                            </div>
                            <div class="rating-stars large-stars star-yellow">
                                ${Array(5).fill(0).map((_, i) => i < (r.rating || 5) ? '<svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>' : '<svg width="20" height="20" fill="#E5E7EB" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>').join('')}
                            </div>
                        </div>
                        <p class="review-card-text">"${r.review}"</p>
                    </div>
                    <div class="review-card-footer">
                        <span class="review-card-date">${r.dateTime.split(" | ")[0]}</span>
                        <button class="btn btn-outline-purple btn-small">Reply</button>
                    </div>
                </div>
            `).join('') : `
                <div class="empty-state-card full-grid-width">
                    <h2>No Reviews Yet</h2>
                    <p class="no-data">Complete more tours to gather feedback from guests!</p>
                </div>
            `}
        </div>
    `;

    container.innerHTML = html;
}
