import { users } from "../../data/user.js";
import { travelerWorkspaceSeed } from "../../data/travelerWorkspaceData.js";

const STORAGE_KEYS = {
    plans: "traveler_workspace_plans",
    bookings: "tours", // Points to the unified tours data
    profile: "traveler_workspace_profile",
    selectedBookingId: "traveler_selected_booking_id",
    lastTransport: "traveler_last_transport",
    travellerRole: "traveler_active_role"
};

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

export function ensureTravelerSession() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.role) {
        currentUser = users.find((user) => user.role === "traveller") || {
            id: "traveller-fallback",
            name: "Alex Rivera",
            email: "alex@gmail.com",
            username: "alex_r",
            role: "traveller"
        };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    if (!localStorage.getItem(STORAGE_KEYS.travellerRole)) {
        localStorage.setItem(STORAGE_KEYS.travellerRole, currentUser.role);
    }

    return currentUser;
}

export function isTravellerRole(user) {
    return user && user.role === "traveller";
}

export function seedTravelerWorkspace() {
    if (!localStorage.getItem(STORAGE_KEYS.plans)) {
        localStorage.setItem(STORAGE_KEYS.plans, JSON.stringify(clone(travelerWorkspaceSeed.plans)));
    }

    // Bookings are now seeded via app.js initializeData into "tours"

    if (!localStorage.getItem(STORAGE_KEYS.profile)) {
        localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(clone(travelerWorkspaceSeed.profile)));
    }
}

export function getTravelerPlans() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.plans) || "[]");
}

export function saveTravelerPlans(plans) {
    localStorage.setItem(STORAGE_KEYS.plans, JSON.stringify(plans));
}

export function getTravelerBookings() {
    const allTours = JSON.parse(localStorage.getItem("tours") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) return [];
    
    // Filter tours where this user is the customer
    return allTours.filter(t => String(t.customerId) === String(currentUser.id));
}

export function saveTravelerBookings(updatedTravelerBookings) {
    const allTours = JSON.parse(localStorage.getItem("tours") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) return;

    // Merge updated bookings back into global list
    const otherUserTours = allTours.filter(t => String(t.customerId) !== String(currentUser.id));
    const mergedTours = [...otherUserTours, ...updatedTravelerBookings];
    
    localStorage.setItem("tours", JSON.stringify(mergedTours));
}

export function getTravelerProfile() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.profile) || "{}");
}

export function saveTravelerProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

export function setSelectedBookingId(id) {
    localStorage.setItem(STORAGE_KEYS.selectedBookingId, String(id));
}

export function getSelectedBookingId() {
    const value = localStorage.getItem(STORAGE_KEYS.selectedBookingId);
    return value === null ? null : Number(value);
}

export function saveLastTransport(transport) {
    localStorage.setItem(STORAGE_KEYS.lastTransport, transport);
}

export function getLastTransport() {
    return localStorage.getItem(STORAGE_KEYS.lastTransport) || "Flight";
}

export function getTravelerWorkspaceSeed() {
    return travelerWorkspaceSeed;
}
