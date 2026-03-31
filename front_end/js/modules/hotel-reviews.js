export function renderHotelReviews(containerId) {
    const container = document.getElementById(containerId);

    const reviews = [
        { name: "Lisa Anderson", text: "Amazing stay!", rating: 5 },
        { name: "Robert Martinez", text: "Very comfortable.", rating: 4 }
    ];

    container.innerHTML = `
        <div class="hotel-card-header">
            <h2>Customer Reviews</h2>
        </div>

        <div class="hotel-review-grid">
            ${reviews.map(r => `
                <div class="hotel-review-box">
                    <p class="cust-name">${r.name}</p>
                    <p>${r.text}</p>
                    <div>${"⭐".repeat(r.rating)}</div>
                </div>
            `).join("")}
        </div>
    `;
}