// Non-Technical Admin - Travel Packages Data
export const nontechAdminData = {
    plans: [
        {
            id: "PKG-001",
            name: "Himalayan Trek Adventure",
            description: "An exhilarating trek through the majestic Himalayan trails with stunning mountain views, campfire nights, and guided nature walks.",
            price: 18999,
            duration: "5 Days / 4 Nights",
            destination: "Manali, Himachal Pradesh",
            category: "Adventure",
            features: ["Professional trek guide", "Camping gear included", "Meals (breakfast & dinner)", "First-aid support", "Transport from base camp"],
            status: "available",
            createdAt: "2025-11-15T10:30:00Z"
        },
        {
            id: "PKG-002",
            name: "Bali Getaway Package",
            description: "A tropical escape to beautiful Bali with beach resorts, temple visits, and a taste of Balinese culture and cuisine.",
            price: 54999,
            duration: "7 Days / 6 Nights",
            destination: "Bali, Indonesia",
            category: "International",
            features: ["Return flights", "Beach resort stay", "Daily breakfast", "Temple & culture tour", "Spa session", "Airport transfers"],
            status: "available",
            createdAt: "2025-10-01T14:00:00Z"
        },
        {
            id: "PKG-003",
            name: "Europe Tour Package",
            description: "Explore the best of Europe — visit Paris, Switzerland, and Rome with guided tours, luxury stays, and unforgettable experiences.",
            price: 149999,
            duration: "12 Days / 11 Nights",
            destination: "Paris, Zurich, Rome",
            category: "International",
            features: ["Return flights", "4-star hotel stays", "All meals included", "City tours with guide", "Schengen visa assistance", "Travel insurance", "Local transport"],
            status: "available",
            createdAt: "2025-09-20T09:00:00Z"
        },
        {
            id: "PKG-004",
            name: "Desert Safari Experience",
            description: "Feel the thrill of sand dunes with camel rides, desert camping under the stars, and traditional Rajasthani folk performances.",
            price: 12499,
            duration: "3 Days / 2 Nights",
            destination: "Jaisalmer, Rajasthan",
            category: "Adventure",
            features: ["Camel safari ride", "Desert camp stay", "Traditional dinner", "Folk dance show", "Jeep dune bashing", "Sunset viewpoint"],
            status: "available",
            createdAt: "2025-12-05T11:15:00Z"
        },
        {
            id: "PKG-005",
            name: "Kerala Backwaters Retreat",
            description: "A peaceful houseboat cruise through the serene Kerala backwaters with Ayurvedic spa, local cuisine, and lush green landscapes.",
            price: 22999,
            duration: "4 Days / 3 Nights",
            destination: "Alleppey, Kerala",
            category: "Family",
            features: ["Houseboat stay", "All meals included", "Ayurvedic spa session", "Village walk tour", "Fishing experience", "Airport pickup & drop"],
            status: "unavailable",
            createdAt: "2025-08-10T16:45:00Z"
        }
    ],
    recentActivity: [
        { id: 1, action: "Package created", detail: "\"Himalayan Trek Adventure\" was added", user: "Arjun Mehta", timestamp: "2026-05-02T14:30:00Z", type: "create" },
        { id: 2, action: "Package updated", detail: "\"Bali Getaway Package\" price changed to ₹54,999", user: "Arjun Mehta", timestamp: "2026-05-02T12:15:00Z", type: "update" },
        { id: 3, action: "Package paused", detail: "\"Kerala Backwaters Retreat\" set to Unavailable", user: "Arjun Mehta", timestamp: "2026-05-01T18:00:00Z", type: "status" },
        { id: 4, action: "New booking", detail: "Anjali Sharma booked Europe Tour Package", user: "System", timestamp: "2026-05-01T16:42:00Z", type: "booking" },
        { id: 5, action: "Package created", detail: "\"Desert Safari Experience\" was added", user: "Arjun Mehta", timestamp: "2026-04-30T10:00:00Z", type: "create" },
        { id: 6, action: "New booking", detail: "Meera Iyer booked Bali Getaway Package", user: "System", timestamp: "2026-04-29T09:20:00Z", type: "booking" },
        { id: 7, action: "Package updated", detail: "\"Europe Tour Package\" features updated", user: "Arjun Mehta", timestamp: "2026-04-28T15:30:00Z", type: "update" },
        { id: 8, action: "New booking", detail: "Vikram Singh booked Himalayan Trek Adventure", user: "System", timestamp: "2026-04-27T11:10:00Z", type: "booking" }
    ]
};
