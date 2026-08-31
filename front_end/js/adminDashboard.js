import { renderChart } from "./modules/chart.js";
import { renderPartners } from "./modules/partners.js";
import { renderAlerts } from "./modules/alerts.js";
import { renderActivity } from "./modules/activity.js";

import { fetchAllUsers, fetchTravellerHotelBookings, fetchExperienceBookings } from "./api/services.js";

// TOTAL USERS
function getTotalUsers(backendUsersCount = 0) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return (backendUsersCount + users.length).toLocaleString();
}

// TOTAL BOOKINGS (sum of platform bookings + backend bookings)
function getTotalBookings(backendBookingsCount = 0) {
    const globalBookings = JSON.parse(localStorage.getItem("allPlatformBookings")) || [];
    return (globalBookings.length + backendBookingsCount).toLocaleString();
}

// TOTAL REVENUE (platform fees + commission collected)
function getTotalRevenue(backendRevenue = 0) {
    const revenue = Number(localStorage.getItem("superAdminRevenue")) || 0;
    const total = revenue + backendRevenue;
    return "₹" + total.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

// ACTIVE PARTNERS (only top ones)
function getActivePartners() {
    const partners = JSON.parse(localStorage.getItem("partners")) || [];

    const active = partners.filter(p => p.bookings > 500);
    return active.length;
}

export async function renderAdminDashboard(containerId) {
    // 1. Force the Admin wrapper to be visible, and hide the Guide wrapper
    const adminWrapper = document.getElementById("admin-dashboard");
    const guideWrapper = document.getElementById("main");

    if (adminWrapper) {
        adminWrapper.style.display = "block"; 
    }
    if (guideWrapper) {
        guideWrapper.style.display = "none"; 
    }

    // 2. Render the header
    const header = document.getElementById("admin-header");

    if (header) {
        header.innerHTML = `
            <div class="dashboard-header">
                <h1 style="margin-top: 0;">Operations Dashboard</h1>
                <p>Real-time performance monitoring and ecosystem health.</p>
            </div>
        `;
    }

    let backendUsersCount = 0;
    let backendBookingsCount = 0;
    let backendRevenue = 0;
    let backendBookingsList = [];

    try {
        const backendUsers = await fetchAllUsers();
        backendUsersCount = backendUsers.length;

        const hotelBookings = await fetchTravellerHotelBookings().catch(() => []);
        const experienceBookings = await fetchExperienceBookings().catch(() => []);

        const allBackendBookings = [...hotelBookings, ...experienceBookings];
        backendBookingsCount = allBackendBookings.length;

        allBackendBookings.forEach(b => {
            const totalAmount = Number(b.totalAmount || b.amount || 0);
            let superAdminCut = 0;
            if (totalAmount > 0) {
                // Partner Earnings = Total Amount - 14 (Platform Fee)
                // Super Admin Cut = 14 + (Partner Earnings * 4%)
                const partnerEarnings = totalAmount - 14;
                superAdminCut = 14 + (partnerEarnings * 0.04);
                backendRevenue += superAdminCut;
            }
            backendBookingsList.push({
                id: b.id || b.bookingId || "BKG-BACKEND",
                user: b.guestName || b.customer || b.user || "Traveler",
                role: "traveler",
                amount: superAdminCut.toFixed(2), // Show ONLY super admin cut
                type: b.hotelId ? "Hotel" : "Holiday Package",
                date: b.bookedOn || b.createdAt || b.date || new Date().toISOString()
            });
        });
    } catch (e) {
        console.warn("Could not fetch data from backend:", e);
    }

    // 3. Define Admin Data
    const adminData = [
        {
            label: "TOTAL USERS",
            value: getTotalUsers(backendUsersCount),
            subtext: "↗ dynamic data",
            subClass: "green",
            color: "blue",
            icon: "../components/ui/users.png"
        },
        {
            label: "GROSS REVENUE",
            value: getTotalRevenue(backendRevenue),
            subtext: "dynamic revenue",
            subClass: "green",
            color: "dark-green",
            icon: "../components/ui/finance.png"
        },
        {
            label: "TOTAL BOOKINGS",
            value: getTotalBookings(backendBookingsCount),
            subtext: "dynamic bookings",
            subClass: "blue-text",
            color: "violet",
            icon: "../components/ui/operations.png"
        }
    ];

    // 4. Render Admin Stats directly (bypassing stat-cards.js)
    const statsContainer = document.getElementById("admin-stats");
    
    if (statsContainer) {
        statsContainer.innerHTML = adminData.map(stat => `
            <div class="stat-card ${stat.color || 'blue'}">
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

    // 5. Render Chart and Recent Bookings
    renderChart("admin-chart");
    
    const recentBookingsContainer = document.getElementById("admin-recent-bookings");
    if (recentBookingsContainer) {
        const rawGlobalBookings = JSON.parse(localStorage.getItem("allPlatformBookings")) || [];
        const globalBookings = rawGlobalBookings.map(b => {
            const totalAmount = Number(b.amount || 0);
            const partnerEarnings = totalAmount > 14 ? totalAmount - 14 : 0;
            const superAdminCut = totalAmount > 0 ? 14 + (partnerEarnings * 0.04) : 0;
            return {
                ...b,
                amount: superAdminCut.toFixed(2)
            };
        });
        
        // Merge localStorage and backend bookings
        const combinedBookings = [...globalBookings, ...backendBookingsList];
        
        // Deduplicate by ID
        const uniqueMap = new Map();
        combinedBookings.forEach(b => uniqueMap.set(b.id, b));
        const uniqueBookings = Array.from(uniqueMap.values());

        // Sort by date (descending) and take top 5
        const recent = uniqueBookings.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        
        let tableRows = recent.length > 0 ? recent.map(bkg => `
            <tr>
                <td>${bkg.id}</td>
                <td><strong>${bkg.user || 'Guest'}</strong><br><small style="color:#6B7280">${bkg.role || 'Traveler'}</small></td>
                <td><span style="background:#E0E7FF;color:#3730A3;padding:4px 8px;border-radius:4px;font-size:12px;">${bkg.type}</span></td>
                <td><strong>₹${bkg.amount}</strong></td>
                <td style="color:#6B7280">${new Date(bkg.date).toLocaleDateString()}</td>
            </tr>
        `).join('') : `<tr><td colspan="5" style="text-align:center;padding:20px;color:#6B7280;">No recent bookings found.</td></tr>`;

        recentBookingsContainer.innerHTML = `
            <div class="content-card" style="padding: 24px;">
                <h2 style="margin-top:0;margin-bottom:20px;font-size:18px;">Recent Bookings</h2>
                <div style="overflow-x:auto;">
                    <table style="width:100%;border-collapse:collapse;text-align:left;">
                        <thead>
                            <tr style="border-bottom:1px solid #E5E7EB;">
                                <th style="padding:12px 8px;color:#6B7280;font-weight:500;font-size:13px;">BOOKING ID</th>
                                <th style="padding:12px 8px;color:#6B7280;font-weight:500;font-size:13px;">USER</th>
                                <th style="padding:12px 8px;color:#6B7280;font-weight:500;font-size:13px;">SERVICE</th>
                                <th style="padding:12px 8px;color:#6B7280;font-weight:500;font-size:13px;">AMOUNT</th>
                                <th style="padding:12px 8px;color:#6B7280;font-weight:500;font-size:13px;">DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}
