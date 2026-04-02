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
        },
        {
            id: "plan-santorini",
            origin: "Bengaluru",
            destination: "Santorini",
            departure: "2026-07-04",
            duration: 7,
            transport: "Private Car",
            budget: 185000,
            notes: "Focus on cliffside stays, beach clubs, and a sunset cruise.",
            status: "Confirmed"
        }
    ],
    bookings: [
        {
            id: 48291,
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
            guide: "Kenji Sato",
            activities: [
                "Fushimi Inari shrine walk",
                "Tea ceremony in Gion",
                "Historic district food trail"
            ],
            itinerary: [
                {
                    day: "Day 1",
                    title: "Arrival and Check-in",
                    detail: "Private airport transfer and an easy evening around the Kamo river."
                },
                {
                    day: "Day 2",
                    title: "Fushimi Inari and Tea Ceremony",
                    detail: "Morning shrine visit followed by a hosted tea ceremony in Gion."
                },
                {
                    day: "Day 3",
                    title: "Old Kyoto Walk",
                    detail: "Guided walk through Ninenzaka, Sannenzaka, and local craft stores."
                }
            ],
            paymentBreakdown: {
                flights: 142000,
                stay: 210000,
                activities: 98000,
                guide: 52000
            },
            documents: [
                { id: "doc-flight", title: "Flight Ticket", status: "Ready" },
                { id: "doc-transfer", title: "Airport Transfer", status: "Ready" },
                { id: "doc-hotel", title: "Hotel Voucher", status: "Ready" },
                { id: "doc-activity", title: "Activity Tickets", status: "Ready" }
            ]
        },
        {
            id: 39210,
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
            guide: "Niko Petros",
            activities: [
                "Oia sunset cruise",
                "Winery tasting",
                "Island photography walk"
            ],
            itinerary: [
                {
                    day: "Day 1",
                    title: "Arrival in Oia",
                    detail: "Hotel check-in and a casual sunset walk through the village."
                },
                {
                    day: "Day 2",
                    title: "Catamaran Cruise",
                    detail: "Aegean cruise with dinner and sunset views from the water."
                }
            ],
            paymentBreakdown: {
                flights: 110000,
                stay: 145000,
                activities: 56000,
                guide: 34000
            },
            documents: [
                { id: "doc-flight-2", title: "Flight Ticket", status: "Ready" },
                { id: "doc-hotel-2", title: "Hotel Voucher", status: "Ready" }
            ]
        },
        {
            id: 22981,
            title: "Swiss Alps Adventure",
            destination: "Zermatt, Switzerland",
            startDate: "2025-12-15",
            endDate: "2025-12-22",
            travellers: 2,
            duration: 7,
            status: "Completed",
            year: "2025",
            amount: 689000,
            coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200",
            transport: "Swiss Air LX154",
            accommodation: "Matterhorn Peak Lodge",
            guide: "Elena Fischer",
            activities: [
                "Scenic train transfer",
                "Snow trail expedition"
            ],
            itinerary: [
                {
                    day: "Day 1",
                    title: "Zurich to Zermatt",
                    detail: "Train transfer and check-in with mountain views."
                }
            ],
            paymentBreakdown: {
                flights: 205000,
                stay: 274000,
                activities: 136000,
                guide: 74000
            },
            documents: [
                { id: "doc-expired-1", title: "Tickets Archive", status: "Expired" }
            ]
        }
    ],
    profile: {
        fullName: "Alex Rivera",
        email: "alex@gmail.com",
        phone: "+91 90000 12345",
        location: "Hyderabad, India",
        language: "English (US)",
        gender: "Male",
        dob: "2006-08-01",
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
            {
                id: "flt-jal",
                carrier: "Japan Airlines",
                route: "HYD to KIX",
                departureTime: "10:30 AM",
                arrivalTime: "3:45 PM",
                meta: "Direct flight • Economy",
                price: 84000
            },
            {
                id: "flt-ana",
                carrier: "ANA All Nippon",
                route: "BLR to KIX",
                departureTime: "09:15 AM",
                arrivalTime: "5:00 PM",
                meta: "1 stop • Economy",
                price: 62000
            }
        ],
        Train: [
            {
                id: "trn-shin",
                carrier: "Shinkansen Combo",
                route: "Tokyo to Kyoto",
                departureTime: "08:10 AM",
                arrivalTime: "10:28 AM",
                meta: "Reserved seat • Scenic route",
                price: 18000
            }
        ],
        Bus: [
            {
                id: "bus-night",
                carrier: "Skyline Coach",
                route: "Osaka to Kyoto",
                departureTime: "07:00 AM",
                arrivalTime: "08:20 AM",
                meta: "Budget friendly",
                price: 4500
            }
        ],
        "Private Car": [
            {
                id: "car-premium",
                carrier: "Executive Chauffeur",
                route: "Airport to hotel",
                departureTime: "Flexible",
                arrivalTime: "On request",
                meta: "Premium comfort",
                price: 18000
            }
        ]
    }
};
