import { avgrating } from "../utils/avgrating.js";
import { countreview } from "../utils/countreviews.js";
import { totalAmount } from "../utils/totalamount.js";
import { upcomingtripcount } from "../utils/upcomingtripcount.js";

export function renderStats(containerId,currentUser) {
    const container = document.getElementById(containerId);

    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let myReviews = allReviews.filter(req => 
        String(req.guideId).trim() === String(currentUser.id).trim()
    );
    const alltrips = JSON.parse(localStorage.getItem("tours")) || [];

    let mytrips = alltrips.filter(req => 
        String(req.guideId).trim() === String(currentUser.id).trim()
    );

    let upcomingtrips = mytrips.filter(req =>
        req.status === "pending"
    );

    let ongoingtrips = mytrips.filter(req =>
        req.status === "ongoing"
    );

    const stats = [
        { label: "Today's Tours", value: upcomingtripcount(ongoingtrips), icon: "../components/ui/todaytours.svg", color: "blue" },
        { label: "Upcoming Tours", value: upcomingtripcount(upcomingtrips), icon: "../components/ui/upcomingtours.svg", color: "light-green"},
        { label: "Monthly Earnings", value: "$3,248", icon: "../components/ui/montlyearning.svg", color: "dark-green" },
        { label: "Total Earnings", value: `₹ ${totalAmount(mytrips)}` ,icon: "../components/ui/totaleanings.svg", color:"red"},
        { label: "Average Rating", value: avgrating(myReviews), icon: "../components/ui/avgrating.svg", color: "orange"},
        { label: "Recent Reviews", value: countreview(myReviews), icon: "../components/ui/recentreview.svg", color: "violet"}
    ];

    container.innerHTML = stats.map(stat => `
        <div class="stat-card ${stat.color}">

            ${stat.icon ? `
            <div class="card-icon">
                <img src="${stat.icon}" alt="icon">
            </div>
            ` : ""}

            <p class="stat-label">${stat.label}</p>

            <h2 class="stat-value">${stat.value}</h2>

            <p class="stat-subtext ${stat.subClass || ""}">
                ${stat.subtext || ""}
            </p>

        </div>
    `).join('');
}