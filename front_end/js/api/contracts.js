export const APP_ROLES = Object.freeze({
  PARTNER: "PARTNER",
  TRAVELLER_ACTOR: "TRAVELLER",
  ADMIN: "ADMIN",
  TECH_ADMIN: "TECH_ADMIN",
  EXPERIENCE_PARTNER: "EXPERIENCE_PARTNER",
  SUPERADMIN: "superadmin",
  TRAVELLER: "traveller",
  GUIDE: "guide",
  TECHADMIN: "techadmin",
  NONTECHADMIN: "nontechadmin",
  HOTEL: "hotel",
  EXPERIENCE: "experience",
});

export const API_ENDPOINTS = Object.freeze({
  // Auth
  login: "/auth/login",
  register: "/auth/register",
  users: "/auth/users",

  // Traveller
  traveller: "/traveller",

  // Guide
  guide: "/guide",
  guideRequests: "/guide-requests",

  // Hotels
  hotels: "/hotels",
  bookings: "/bookings",
  partnerBookings: "/partners/bookings",

  // Experiences
  experiences: "/experiences",
  experienceBookings: "/experience-bookings",

  // Plans
  plans: "/plans",

  // Trips
  trips: "/trips",

  // Support tickets
  tickets: "/tickets",

  // Schedule
  schedule: "/schedule",

  // Location
  location: "/location",

  // Cities
  cities: "/cities",
});

export const API_SESSION_KEY = "xploreo_api_session";
