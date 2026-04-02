export function getLedgerData() {
    // 1. Fetch from database
    const storedLedger = JSON.parse(localStorage.getItem("ledger")) || [];

    // 2. Return real data if it exists, otherwise return the fallback design data
    if (storedLedger.length > 0) {
        return storedLedger;
    } 
    
    return [
        { 
            id: "98421", traveler: "Elena Moretti", initials: "EM", tier: "Premium Member", 
            avatarColor: "avatar-light-blue", service: "Venice Gondola Private Tour", 
            serviceTier: "Luxe Tier", date: "Oct 24, 2024", guide: "Marco Polo", 
            guideInitials: "MP", status: "CONFIRMED", statusClass: "status-confirmed" 
        },
        { 
            id: "98420", traveler: "James Smith", initials: "JS", tier: "Corporate", 
            avatarColor: "avatar-light-blue", service: "Kyoto Temple Hike", 
            serviceTier: "Full Day", date: "Oct 24, 2024", guide: "Yuki Tanaka", 
            guideInitials: "YT", status: "ONGOING", statusClass: "status-ongoing" 
        }
    ];
}