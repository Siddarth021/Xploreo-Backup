import { API_ENDPOINTS } from "./contracts.js";
import { apiGet, apiPost, apiPatch, apiDelete } from "./http.js";
import { storeApiSession, storeCurrentUser, toFrontendUser } from "./session.js";

/* ===================================================
   AUTH
=================================================== */
export async function loginWithApi(credentials) {
    const session = await apiPost(API_ENDPOINTS.login, credentials);

    const frontendUser = toFrontendUser({
        ...session.user,
        id: session.user.userId || session.user.id
    });

    // Store the full session including the JWT token and RBAC headers
    storeApiSession({
        token: session.token,
        headers: session.headers || {
            "x-user-id": frontendUser.id,
            "x-user-role": frontendUser.role
        },
        user: session.user
    });
    storeCurrentUser(frontendUser);

    return frontendUser;
}

export function registerWithApi(payload) {
    return apiPost(API_ENDPOINTS.register, payload);
}

export function fetchAllUsers() {
    return apiGet(API_ENDPOINTS.users);
}

export function updateUser(id, payload) {
    return apiPatch(`${API_ENDPOINTS.users}/${id}`, payload);
}

export function deleteUser(id) {
    return apiDelete(`${API_ENDPOINTS.users}/${id}`);
}

/* ===================================================
   TRAVELLER
=================================================== */
export function createTravellerProfile(payload) {
    return apiPost(API_ENDPOINTS.traveller, payload);
}

export function fetchTravellerProfile(userId) {
    return apiGet(`${API_ENDPOINTS.traveller}/${userId}`);
}

export function updateTravellerProfile(userId, payload) {
    return apiPatch(`${API_ENDPOINTS.traveller}/${userId}`, payload);
}

export function deleteTravellerProfile(userId) {
    return apiDelete(`${API_ENDPOINTS.traveller}/${userId}`);
}

/* ===================================================
   GUIDE
=================================================== */
export function fetchGuides() {
    return apiGet(API_ENDPOINTS.guide);
}

export function fetchGuide(id) {
    return apiGet(`${API_ENDPOINTS.guide}/${id}`);
}

export function createGuideProfile(payload) {
    return apiPost(API_ENDPOINTS.guide, payload);
}

export function updateGuideProfile(id, payload) {
    return apiPatch(`${API_ENDPOINTS.guide}/${id}`, payload);
}

export function deleteGuide(id) {
    return apiDelete(`${API_ENDPOINTS.guide}/${id}`);
}

/* ===================================================
   HOTELS
=================================================== */
export function fetchHotels() {
    return apiGet(API_ENDPOINTS.hotels);
}

export function fetchHotel(id) {
    return apiGet(`${API_ENDPOINTS.hotels}/${id}`);
}

export function createHotel(payload) {
    return apiPost(API_ENDPOINTS.hotels, payload);
}

export function updateHotel(id, payload) {
    return apiPatch(`${API_ENDPOINTS.hotels}/${id}`, payload);
}

export function deleteHotel(id) {
    return apiDelete(`${API_ENDPOINTS.hotels}/${id}`);
}

/* ===================================================
   EXPERIENCES
=================================================== */
export function fetchExperiences() {
    return apiGet(API_ENDPOINTS.experiences);
}

export function fetchExperience(id) {
    return apiGet(`${API_ENDPOINTS.experiences}/${id}`);
}

export function createExperience(payload) {
    return apiPost(API_ENDPOINTS.experiences, payload);
}

export function updateExperience(id, payload) {
    return apiPatch(`${API_ENDPOINTS.experiences}/${id}`, payload);
}

export function deleteExperience(id) {
    return apiDelete(`${API_ENDPOINTS.experiences}/${id}`);
}

/* ===================================================
   PLANS
=================================================== */
export async function fetchPlans(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${API_ENDPOINTS.plans}?${query}` : API_ENDPOINTS.plans;
    const response = await apiGet(url);
    return Array.isArray(response) ? response : response.data || [];
}

export function fetchPlan(id) {
    return apiGet(`${API_ENDPOINTS.plans}/${id}`);
}

export function createPlan(payload) {
    return apiPost(API_ENDPOINTS.plans, payload);
}

export function updatePlan(id, payload) {
    return apiPatch(`${API_ENDPOINTS.plans}/${id}`, payload);
}

export function deletePlan(id) {
    return apiDelete(`${API_ENDPOINTS.plans}/${id}`);
}

/* ===================================================
   TRIPS
=================================================== */
export function fetchAllTrips() {
    return apiGet(API_ENDPOINTS.trips);
}

export function fetchTripsForTraveller(travellerId) {
    return apiGet(`${API_ENDPOINTS.trips}/traveller/${encodeURIComponent(travellerId)}`);
}

export function fetchTripsForGuide(guideId) {
    return apiGet(`${API_ENDPOINTS.trips}/guide/${encodeURIComponent(guideId)}`);
}

export function fetchTrip(id) {
    return apiGet(`${API_ENDPOINTS.trips}/${id}`);
}

export function createTrip(payload) {
    return apiPost(API_ENDPOINTS.trips, payload);
}

export function updateTrip(id, payload) {
    return apiPatch(`${API_ENDPOINTS.trips}/${id}`, payload);
}

export function deleteTrip(id) {
    return apiDelete(`${API_ENDPOINTS.trips}/${id}`);
}

/* ===================================================
   LOCATION
=================================================== */
export function fetchLocations() {
    return apiGet(API_ENDPOINTS.location);
}

export function fetchLocation(id) {
    return apiGet(`${API_ENDPOINTS.location}/${id}`);
}

export function createLocation(payload) {
    return apiPost(API_ENDPOINTS.location, payload);
}

/* ===================================================
   CITIES
=================================================== */
export function fetchCities() {
    return apiGet(API_ENDPOINTS.cities);
}

export function fetchCity(id) {
    return apiGet(`${API_ENDPOINTS.cities}/${id}`);
}

export function createCity(payload) {
    return apiPost(API_ENDPOINTS.cities, payload);
}
