export const opsData = [
    { 
        label: "New Registrations", value: "1,284", 
        subtext: "Past 30 days activity", color: "blue",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233182ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='8.5' cy='7' r='4'%3E%3C/circle%3E%3Cline x1='20' y1='8' x2='20' y2='14'%3E%3C/line%3E%3Cline x1='23' y1='11' x2='17' y2='11'%3E%3C/line%3E%3C/svg%3E",
        trend: "+12.0%", subClass: "trend-up"
    },
    { 
        label: "Verification Queue", value: "42", 
        subtext: "Awaiting admin review", color: "dark-green",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2338a169' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'%3E%3C/path%3E%3Crect x='8' y='2' width='8' height='4' rx='1' ry='1'%3E%3C/rect%3E%3Ccircle cx='12' cy='14' r='4'%3E%3C/circle%3E%3Cpolyline points='12 12 12 14 14 14'%3E%3C/polyline%3E%3C/svg%3E",
        trend: "URGENT", subClass: "badge-urgent"
    },
    { 
        label: "Avg Response Time", value: "4.2h", 
        subtext: "Resolution efficiency rate", color: "violet",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233182ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E"
    },
    { 
        label: "Partner Satisfaction", value: "94%", 
        subtext: "Quarterly survey data", color: "orange",
        icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233182ce' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolygon points='12 8 13.09 10.26 15.5 10.61 13.75 12.32 14.17 14.74 12 13.6 9.83 14.74 10.25 12.32 8.5 10.61 10.91 10.26 12 8'%3E%3C/polygon%3E%3C/svg%3E",
        trend: "★★★★☆", subClass: "stars"
    }
];

export const userStatusStyles = {
    "Active": { color: "#1e8e3e", bg: "#e6f4ea" },
    "Pending": { color: "#d97706", bg: "#fef3c7" },
    "Inactive": { color: "#e53e3e", bg: "#fff5f5" }
};

export const partnerStatusStyles = {
    "Verified": { color: "#1e8e3e", bg: "#e6f4ea" },
    "Under Review": { color: "#d97706", bg: "#fef3c7" },
    "Unverified": { color: "#e53e3e", bg: "#fff5f5" }
};

export const activityIcons = {
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    alert: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
};

// Initial state data (we export this so users.js can clone it)
export const initialUsersData = [
    { 
        id: "#AM-0922", name: "Elena Vance", email: "elena.v@example.com",
        role: "Traveler", avatarBg: "#2b6cb0", initials: "EV", status: "Active", joined: "Oct 12, 2023",
        activity: [ { type: "check", bg: "#e6f4ea", color: "#1e8e3e", title: "Booked: Amalfi Coastal Escape", time: "2 hours ago • Booking #3849" } ],
        summary: { spent: "₹1.85L", trips: "8" }
    },
    { 
        id: "#AM-0923", name: "Julian Black", email: "j.black@company.org",
        role: "Guide", avatarBg: "#e2e8f0", initials: "JB", status: "Pending", joined: "Nov 04, 2023",
        activity: [ { type: "alert", bg: "#fff7ed", color: "#d97706", title: "Submitted KYC Documents", time: "1 day ago • Awaiting Review" } ],
        summary: { spent: "₹0", trips: "0" }
    },
    { 
        id: "#AM-0924", name: "Marcus Thorne", email: "m.thorne@global.com",
        role: "Traveler", avatarBg: "#2d3748", initials: "MT", status: "Active", joined: "Dec 15, 2023",
        activity: [ { type: "star", bg: "#fffaf0", color: "#d97706", title: "Left a 5-star review", time: "3 hours ago • Experience: Kyoto Hike" } ],
        summary: { spent: "₹4.2L", trips: "12" }
    }
];

export const initialPartnersData = [
    {
        id: "#PRT-01", name: "Luxe Mediterraneo", location: "Santorini, Greece", initials: "LM",
        type: "BOUTIQUE HOTEL", typeColor: "#3182ce", typeBg: "#ebf8ff", rating: "4.9",
        status: "Verified", joined: "Mar 12, 2021", revenue: 85
    },
    {
        id: "#PRT-02", name: "Alpine Treks Ltd", location: "Zermatt, Switzerland", initials: "AT",
        type: "TOUR OPERATOR", typeColor: "#2f855a", typeBg: "#f0fff4", rating: "4.7",
        status: "Under Review", joined: "Jun 30, 2022", revenue: 40
    },
    {
        id: "#PRT-03", name: "Grand Tours Global", location: "London, UK", initials: "GT",
        type: "TRANSPORT", typeColor: "#805ad5", typeBg: "#faf5ff", rating: "4.2",
        status: "Verified", joined: "Jan 15, 2020", revenue: 95
    }
];