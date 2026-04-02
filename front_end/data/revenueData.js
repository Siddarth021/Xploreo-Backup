export function getRevenueData() {
    // 1. Fetch the refund queue from your database
    const refundQueue = JSON.parse(localStorage.getItem("refunds")) || [];

    // 2. Return real data if it exists, otherwise use the design fallback
    if (refundQueue.length > 0) {
        return refundQueue;
    }

    return [
        {
            queueId: "98305",
            status: "FULLY REFUNDED",
            statusClass: "badge-refunded",
            title: "Sahara Desert Overnight Trek",
            reason: "Flight<br>Cancellation",
            impact: "-₹1.2L",
            impactClass: "text-red",
            resolutionId: "552190"
        }
    ];
}