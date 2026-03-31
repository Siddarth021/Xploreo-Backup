import { earningsData } from "../../data/experience_earningsData.js";
import { renderNavbar } from "../../components/layout/navbar.js";

// NAVBAR
renderNavbar({
    name: "User",
    role: "experience",
    profilePic: "https://i.pravatar.cc/150"
});

const table = document.getElementById("earningsTable");
const filter = document.getElementById("dateFilter");

// =========================
// FILTER
// =========================
function getFilteredData(days) {
    const latestDate = new Date(
        Math.max(...earningsData.map(d => new Date(d.date)))
    );

    return earningsData.filter(item => {
        const diff = (latestDate - new Date(item.date)) / (1000 * 60 * 60 * 24);
        return diff <= days;
    });
}

// =========================
// SAFE MAX
// =========================
function getMaxKey(obj) {
    const keys = Object.keys(obj);
    if (keys.length === 0) return "--";
    return keys.reduce((a, b) => obj[a] > obj[b] ? a : b);
}

// =========================
// RENDER
// =========================
function render(data) {
    table.innerHTML = "";

    let total = 0;
    let refunded = 0;
    let bookings = data.length;
    let expMap = {};
    let dayMap = {};
    let cancelled = 0;

    data.forEach(item => {
        total += item.amount;

        if (item.status === "Refunded") {
            refunded += item.amount;
            cancelled++;
        }

        // experience revenue map
        expMap[item.title] = (expMap[item.title] || 0) + item.amount;

        // day map
        const day = new Date(item.date).toLocaleDateString("en-US", { weekday: "long" });
        dayMap[day] = (dayMap[day] || 0) + 1;

        // table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.user}</td>
            <td>${item.title}</td>
            <td>$${item.amount}</td>
            <td>${item.date}</td>
            <td class="${item.status === "Refunded" ? "red" : "green"}">
                ${item.status}
            </td>
        `;
        table.appendChild(row);
    });

    // =========================
    // TOP CARDS
    // =========================
    document.getElementById("totalRevenue").innerText = "$" + total;
    document.getElementById("earnings").innerText = "$" + (total - refunded);
    document.getElementById("refundAmount").innerText = "$" + refunded;
    document.getElementById("avgBooking").innerText =
        bookings ? "$" + Math.round(total / bookings) : "$0";

    // =========================
    // INSIGHTS
    // =========================
    document.getElementById("topExperience").innerText = getMaxKey(expMap);
    document.getElementById("bestDay").innerText = getMaxKey(dayMap);

    document.getElementById("utilization").innerText =
        bookings ? Math.min(100, bookings * 10) + "%" : "0%";

    document.getElementById("cancelRate").innerText =
        bookings ? ((cancelled / bookings) * 100).toFixed(1) + "%" : "0%";

    // =========================
    // REVENUE SOURCES
    // =========================
    const container = document.getElementById("revenueSources");
    container.innerHTML = "";

    let index = 0;

    for (let exp in expMap) {
        const percent = total ? ((expMap[exp] / total) * 100).toFixed(0) : 0;
        const colorClass = index === 0 ? "blue" : "green";

        container.innerHTML += `
            <div class="source-item">
                <div class="source-top">
                    <div class="dot ${colorClass}"></div>
                    <span>${exp}</span>
                    <span class="amount">$${expMap[exp]}</span>
                </div>

                <div class="progress-bar">
                    <div class="progress-fill ${colorClass}" style="width:${percent}%"></div>
                </div>

                <div class="percent">${percent}%</div>
            </div>
        `;

        index++;
    }

    
    document.getElementById("totalRevenueText").innerText = "$" + total;

    // =========================
    // REFUND SECTION
    // =========================
    const refundPercent = total ? ((refunded / total) * 100).toFixed(1) : "0";

    document.getElementById("refundAmountBig").innerText = "$" + refunded;
    document.getElementById("refundPercent").innerText = refundPercent + "%";
    document.getElementById("refundRateText").innerText = refundPercent + "%";

    // progress bar
    document.getElementById("refundBar").style.width = refundPercent + "%";
}

// =========================
// UPDATE
// =========================
function update() {
    let data = getFilteredData(filter.value);

    if (data.length === 0) {
        data = earningsData;
    }

    render(data);
}

filter.addEventListener("change", update);

// INITIAL LOAD
update();