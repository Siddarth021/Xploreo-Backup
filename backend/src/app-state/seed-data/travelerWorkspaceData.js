export const travelerWorkspaceSeed = {
    plans: [
        {
            id: "plan-kyoto",
            origin: "Hyderabad",
            destination: "Kyoto",
            departure: "2026-10-12",
            duration: 5,
            transport: "Flight",
            budget: 120000,
            notes: "Temple trail, tea ceremony, and a relaxed final evening in Gion.",
            status: "Draft"
        }
    ],
    bookings: [
        {
            id: "48291",
            title: "Kyoto Cultural Escape",
            destination: "Kyoto, Japan",
            startDate: "2026-10-12",
            endDate: "2026-10-17",
            travellers: 2,
            duration: 5,
            status: "Confirmed",
            year: "2026",
            amount: 502000,
            coverImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=1200",
            transport: "Japan Airlines JL008",
            accommodation: "Ritz-Carlton Kyoto",
            guide: "Sreekar",
            activities: [
                "Fushimi Inari shrine walk",
                "Tea ceremony in Gion",
                "Historic district food trail"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival", detail: "Check-in at Ritz-Carlton Kyoto." },
                { day: "Day 2", title: "Fushimi Inari", detail: "Morning shrine visit." }
            ],
            paymentBreakdown: { flights: 142000, stay: 210000, activities: 98000, guide: 52000 },
            documents: [{ id: "doc-flight", title: "Flight Ticket", status: "Ready" }]
        },
        {
            id: "39210",
            title: "Santorini Sunset Retreat",
            destination: "Santorini, Greece",
            startDate: "2026-07-04",
            endDate: "2026-07-11",
            travellers: 2,
            duration: 7,
            status: "Confirmed",
            year: "2026",
            amount: 345000,
            coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200",
            transport: "Aegean Airlines A3 342",
            accommodation: "Caldera Horizon Suites",
            guide: "Sreekar",
            activities: [
                "Oia sunset cruise",
                "Winery tasting",
                "Island photography walk"
            ],
            itinerary: [
                { day: "Day 1", title: "Arrival", detail: "Check-in at Caldera Horizon Suites." }
            ],
            paymentBreakdown: { flights: 110000, stay: 145000, activities: 56000, guide: 34000 },
            documents: [{ id: "doc-hotel-2", title: "Hotel Voucher", status: "Ready" }]
        }
    ],
    profile: {
        fullName: "Anjali Sharma",
        email: "anjali@xploreo.com",
        phone: "+91 91234 56780",
        location: "Hyderabad, India",
        language: "English (US)",
        gender: "Female",
        dob: "2000-09-21",
        bio: "Avid explorer and landscape photographer. I love finding off-the-beaten-path destinations and local culinary gems across Asia and the Mediterranean.",
        reputation: "Explorer Status",
        level: 4,
        totalTrips: 8,
        countries: 8,
        preferences: {
            transport: "Business Class / Trains",
            stay: "Boutique Hotels / Villas",
            budget: "Premium (₹50k - ₹100k / day)",
            activityStyle: "Cultural / Nature / Arts"
        },
        hobbies: ["Hiking", "Photography", "Food exploration", "Adventure travel", "Scuba Diving", "History"],
        security: {
            twoFactorAuth: true,
            emailNotifications: true,
            publicProfile: false
        }
    },
    transportOptions: {
        Flight: [
            { id: "flt-jal", carrier: "Japan Airlines", route: "HYD to KIX", price: 84000 }
        ]
    }
};
