import { API_ENDPOINTS } from "./contracts.js";
import { apiGet, apiPost } from "./http.js";
import { storeApiSession, storeCurrentUser, toFrontendUser } from "./session.js";

export async function loginWithApi(credentials) {
    const session = await apiPost(API_ENDPOINTS.login, credentials);
    const frontendUser = toFrontendUser({
        ...session.user,
        id: session.user.id || session.user.userId
    });

    storeApiSession({
        token: session.token,
        headers: session.headers,
        user: session.user
    });
    storeCurrentUser(frontendUser);

    return frontendUser;
}

export function registerWithApi(payload) {
    return apiPost(API_ENDPOINTS.register, payload);
}

export function fetchHotels() {
    return apiGet(API_ENDPOINTS.hotels);
}

export function fetchExperiences() {
    return apiGet(API_ENDPOINTS.experiences);
}

export async function fetchPlans() {
    const response = await apiGet(API_ENDPOINTS.plans);
    return Array.isArray(response) ? response : response.data || [];
}

export function fetchTripsForTraveller(travellerId) {
    return apiGet(`${API_ENDPOINTS.trips}/traveller/${encodeURIComponent(travellerId)}`);
}

export function fetchTripsForGuide(guideId) {
    return apiGet(`${API_ENDPOINTS.trips}/guide/${encodeURIComponent(guideId)}`);
}

export function fetchAllTrips() {
    return apiGet(API_ENDPOINTS.trips);
}
