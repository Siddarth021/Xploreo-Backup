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
    // App State
    appState: "/app-state",
    appStateBootstrap: "/app-state/bootstrap",

    // Auth
    login: "/auth/login",
    register: "/auth/register",
    users: "/auth/users",

    // Traveller
    traveller: "/traveller",

    // Guide
    guide: "/guide",

    // Hotels
    hotels: "/hotels",

    // Experiences
    experiences: "/experiences",

    // Plans
    plans: "/plans",

    // Trips
    trips: "/trips",

    // Location
    location: "/location",

    // Cities
    cities: "/cities",
});

export const API_SESSION_KEY = "xploreo_api_session";
