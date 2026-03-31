import { avgrating } from "../utils/avgrating.js";
import { countreview } from "../utils/countreviews.js";
import { totalAmount } from "../utils/totalamount.js";
import { upcomingtripcount } from "../utils/upcomingtripcount.js";
import { filterByGuide } from "../utils/filterByGuide.js";
import { monthlyEarnings } from "../utils/monthlyEarnings.js";
import { formatCurrency } from "../utils/formatCurrency.js";

export function renderStats(containerId, currentUser) {
    const container = document.getElementById(containerId);

    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const myReviews = filterByGuide(allReviews, currentUser.id);

    const allTrips = JSON.parse(localStorage.getItem("tours")) || [];
    const myTrips = filterByGuide(allTrips, currentUser.id);

    const upcomingTrips = myTrips.filter(t => t.status === "pending");
    const ongoingTrips = myTrips.filter(t => t.status === "ongoing");

    // Dynamic monthly earnings for the current month
    const now = new Date();
    const currentMonthEarnings = monthlyEarnings(myTrips, now.getMonth(), now.getFullYear());

    const stats = [
        { label: "Today's Tours", value: upcomingtripcount(ongoingTrips), icon: "../components/ui/todaytours.svg", color: "blue" },
        { label: "Upcoming Tours", value: upcomingtripcount(upcomingTrips), icon: "../components/ui/upcomingtours.svg", color: "light-green" },
        { label: "Monthly Earnings", value: formatCurrency(currentMonthEarnings), icon: "../components/ui/montlyearning.svg", color: "dark-green" },
        { label: "Total Earnings", value: formatCurrency(totalAmount(myTrips)), icon: "../components/ui/totalearnings.svg", color: "red" },
        { label: "Average Rating", value: avgrating(myReviews), icon: "../components/ui/avgrating.svg", color: "orange" },
        { label: "Recent Reviews", value: countreview(myReviews), icon: "../components/ui/recentreview.svg", color: "violet" }
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