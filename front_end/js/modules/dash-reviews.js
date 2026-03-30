export function renderDashReviews(containerId, currentUser) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allRequests = JSON.parse(localStorage.getItem("tours")) || [];
    const completed = allRequests.filter(req => req.status === 'completed' && req.review);

    container.innerHTML = `
        <div class="dash-reviews-wrapper">
            <h2 class="dash-section-title">Recent Reviews</h2>
            <p class="dash-section-subtitle">Latest feedback from your customers</p>
            
            <div class="dash-reviews-list">
                ${completed.map(c => `
                    <div class="dash-review-item review-inner-card">
                        <div class="dash-review-header borderless-header">
                            <div class="dash-review-meta">
                                <h3 class="dash-review-customer">${c.customer}</h3>
                                <span class="dash-review-tour">${c.title}</span>
                            </div>
                            <div class="rating-stars star-yellow">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <span>5.0</span>
                            </div>
                        </div>
                        <p class="dash-review-text dark-text">"${c.review}"</p>
                        <span class="dash-review-date bold-date">${c.dateTime.split(' | ')[0]}</span>
                    </div>
                `).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 16px;">
                <button class="btn btn-outline-purple" style="border:none;" onclick="window.location.href='./reviews.html'">View All Reviews</button>
            </div>
        </div>
    `;
}
