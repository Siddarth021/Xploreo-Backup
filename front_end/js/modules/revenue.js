export function getRevenueHTML() {
    return `
        <div class="revenue-header">
            <div>
                <h2>Revenue Recovery</h2>
                <p>Monitoring cancellations and handling refund automation.</p>
            </div>
            <a href="#" class="manage-link" id="open-queue-btn">MANAGE QUEUE</a>
        </div>

        <div class="recovery-card">
            <div class="recovery-card-header">
                <span class="recovery-meta">REFUND QUEUE • 98305</span>
                <span class="status-badge badge-refunded">FULLY REFUNDED</span>
            </div>
            <h3 class="recovery-title">Sahara Desert Overnight Trek</h3>
            <div class="details-grid grid-3-col">
                <div class="detail-box">
                    <span class="detail-label">REASON</span>
                    <span class="detail-value">Flight<br>Cancellation</span>
                </div>
                <div class="detail-box">
                    <span class="detail-label">IMPACT</span>
                    <span class="detail-value text-red">-₹1.2L</span>
                </div>
                <div class="detail-box">
                    <span class="detail-label">RESOLUTION ID</span>
                    <span class="detail-value">552190</span>
                </div>
            </div>
        </div>
    `;
}