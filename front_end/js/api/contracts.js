export const APP_ROLES = Object.freeze({
    SUPERADMIN: "superadmin",
    TRAVELLER: "traveller",
    GUIDE: "guide",
    TECHADMIN: "techadmin",
    NONTECHADMIN: "nontechadmin",
    HOTEL: "hotel",
    EXPERIENCE: "experience"
});

export const API_ENDPOINTS = Object.freeze({
    appState: "/app-state",
    appStateBootstrap: "/app-state/bootstrap",
    login: "/auth/login",
    register: "/auth/register",
    users: "/auth/users",
    hotels: "/hotels",
    experiences: "/experiences",
    plans: "/plans",
    trips: "/trips"
});

export const API_SESSION_KEY = "xploreo_api_session";
