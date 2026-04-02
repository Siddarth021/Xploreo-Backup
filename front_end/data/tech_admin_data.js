export const techAdminData = {
    tickets: [
        {
            id: "TICK-1001",
            userId: "20001",
            userName: "Anjali Sharma",
            userRole: "traveller",
            subject: "Booking Cancellation Refund",
            description: "I cancelled my trip to Goa, but haven't received the refund yet. It's been 5 days.",
            status: "pending",
            priority: "high",
            category: "Finance",
            createdAt: "2026-03-28T10:30:00Z"
        },
        {
            id: "TICK-1002",
            userId: "10001",
            userName: "Sreekar",
            userRole: "guide",
            subject: "Profile Verification Stuck",
            description: "My new certification upload is stuck in 'pending' for over 48 hours.",
            status: "in-progress",
            priority: "medium",
            category: "Profile",
            createdAt: "2026-03-30T14:45:00Z"
        },
        {
            id: "TICK-1003",
            userId: "30001",
            userName: "Rohit Das",
            userRole: "service_partner",
            subject: "API Integration Error",
            description: "Receiving 500 errors when trying to sync hotel availability via API.",
            status: "pending",
            priority: "critical",
            category: "Technical",
            createdAt: "2026-04-01T09:15:00Z"
        },
        {
            id: "TICK-1004",
            userId: "20002",
            userName: "Meera Iyer",
            userRole: "traveller",
            subject: "Login Issue",
            description: "Cannot reset password. The reset link expires immediately.",
            status: "resolved",
            priority: "high",
            category: "Access",
            createdAt: "2026-03-25T11:20:00Z",
            resolvedAt: "2026-03-26T10:00:00Z"
        }
    ],
    systemLogs: [
        {
            id: "LOG-5001",
            type: "error",
            source: "AuthService",
            message: "Failed to generate JWT for user 20001. Secret key mismatch.",
            timestamp: "2026-04-02T08:30:05Z"
        },
        {
            id: "LOG-5002",
            type: "warning",
            source: "PaymentGateway",
            message: "Latent response from Stripe API (2.5s). Threshold exceeded.",
            timestamp: "2026-04-02T09:12:44Z"
        },
        {
            id: "LOG-5003",
            type: "info",
            source: "System",
            message: "Weekly backup completed successfully. Total size: 1.2GB.",
            timestamp: "2026-04-01T00:00:00Z"
        }
    ],
    userActivity: [
        {
            id: "ACT-9001",
            userId: "10001",
            userName: "Sreekar",
            action: "Updated Tour: 'Hyderabad Heritage Walk'",
            timestamp: "2026-04-02T09:30:00Z"
        },
        {
            id: "ACT-9002",
            userId: "20001",
            userName: "Anjali Sharma",
            action: "Booked Experience: 'Culinary Tour of Banjara Hills'",
            timestamp: "2026-04-02T09:15:00Z"
        },
        {
            id: "ACT-9003",
            userId: "00001",
            userName: "Rahul Varma",
            action: "Approved Partner: 'Goa Beach Resort'",
            timestamp: "2026-04-02T08:45:00Z"
        }
    ],
    stats: {
        totalTickets: 156,
        pendingTickets: 42,
        systemUptime: "99.98%",
        activeUsers: 1245
    }
};
