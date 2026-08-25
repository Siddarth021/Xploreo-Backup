export function renderHotelReviews(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // No reviews yet in the backend, showing empty state
    container.innerHTML = `
        <div class="hotel-card-header hotel-flex-header">
            <h2>Customer Reviews</h2>
        </div>
        <div class="hotel-empty-state" style="padding: 40px 20px; border: 1px dashed #cbd5e1; box-shadow: none;">
            <p style="color: #64748b; font-size: 15px; margin: 0;">No reviews available yet. When travellers review your hotels, they will appear here.</p>
        </div>
    `;
}