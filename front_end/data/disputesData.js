export function getDisputesData() {
    // 1. Fetch active disputes from the database
    const storedDisputes = JSON.parse(localStorage.getItem("disputes")) || [];

    // 2. Return real data if available, otherwise use the design template
    if (storedDisputes.length > 0) {
        return storedDisputes;
    }

    return [
        {
            caseId: "4412",
            bookingRef: "97001",
            issueMain: "Partner No-Show Claim",
            issueSub: "Traveler documentation<br>provided via website",
            severityClass: "severity-critical",
            severityText: "CRITICAL",
            dotClass: "dot-red",
            flowStatus: "Open Inquiry"
        },
        {
            caseId: "4410",
            bookingRef: "97055",
            issueMain: "Vehicle Logistics Quality",
            issueSub: "Reported AC failure<br>during desert excursion",
            severityClass: "severity-standard",
            severityText: "STANDARD",
            dotClass: "dot-yellow",
            flowStatus: "Gathering Evidence"
        }
    ];
}