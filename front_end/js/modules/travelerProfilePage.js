import {
    ensureTravelerSession,
    getTravelerBookings,
    getTravelerPlans,
    getTravelerProfile,
    saveTravelerProfile,
    seedTravelerWorkspace
} from "../utils/travelerWorkspaceState.js";
import { validateProfile } from "../utils/travelerWorkspaceValidators.js";
import {
    createEmptyState,
    renderFieldError,
    showWorkspaceToast
} from "./travelerWorkspaceUI.js";

export function initTravelerProfilePage(containerId) {
    const container = document.getElementById(containerId);
    const user = ensureTravelerSession();

    if (!container) {
        return;
    }

    seedTravelerWorkspace();

    const state = {
        editing: false,
        errors: {}
    };

    function render() {
        const profile = getTravelerProfile();
        const plans = getTravelerPlans();
        const bookings = getTravelerBookings();
        const initials = profile.fullName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("") || "TR";
        const destinations = bookings.slice(0, 3).map((booking) => ({
            title: booking.destination,
            image: booking.coverImage
        }));

        container.innerHTML = `
            <main class="traveler-workspace traveler-profile-page">
                <section class="traveler-profile-hero traveler-card">
                    <div class="traveler-profile-banner"></div>
                    <div class="traveler-profile-top">
                        <div class="traveler-profile-avatar">${initials}</div>
                        <div class="traveler-profile-meta">
                            <h1>${profile.fullName}</h1>
                            <p>${profile.email} • ${profile.location}</p>
                        </div>
                        <div class="inline-actions">
                            <button type="button" class="ghost-btn" id="toggle-profile-edit">${state.editing ? "Close editor" : "Edit profile"}</button>
                            <a class="traveler-link-chip" href="./traveller_bookings.html">My bookings</a>
                        </div>
                    </div>
                    <div class="traveler-stat-grid">
                        <article><span>Reputation</span><strong>${profile.reputation}</strong><small>12 trips completed</small></article>
                        <article><span>Traveller rating</span><strong>4.7 / 5</strong><small>Based on guides and partners</small></article>
                        <article><span>Total trips</span><strong>${profile.countries} countries</strong><small>${profile.totalTrips} continents explored</small></article>
                    </div>
                </section>

                <section class="traveler-grid traveler-grid-profile">
                    <div class="traveler-stack">
                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>Personal information</h2>
                                    <p>Traveller-only details kept in local storage.</p>
                                </div>
                            </div>
                            ${state.editing ? renderEditForm(profile) : renderProfileReadOnly(profile)}
                        </div>

                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>About me</h2>
                                    <p>Short traveller bio</p>
                                </div>
                            </div>
                            <p class="traveler-long-copy">${profile.bio}</p>
                        </div>

                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>Saved destinations</h2>
                                    <p>Built from your current traveller bookings.</p>
                                </div>
                                <a class="traveler-link-chip" href="./traveller_trip-planning.html">View all plans</a>
                            </div>
                            <div class="saved-destination-grid">
                                ${destinations.length ? destinations.map((destination) => `
                                    <article class="saved-destination-card" style="background-image:url('${destination.image}')">
                                        <div class="saved-destination-overlay">
                                            <strong>${destination.title}</strong>
                                        </div>
                                    </article>
                                `).join("") : createEmptyState("No destinations yet", "As bookings are added, saved destinations will appear here.", "Saved destinations")}
                            </div>
                        </div>
                    </div>

                    <aside class="traveler-side-stack">
                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>Hobbies & interests</h2>
                                    <p>Traveller preference tags</p>
                                </div>
                            </div>
                            <div class="chip-group">
                                ${profile.hobbies.map((hobby) => `<span class="tag-chip">${hobby}</span>`).join("")}
                            </div>
                        </div>

                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>Travel preferences</h2>
                                    <p>Quick reference for future bookings</p>
                                </div>
                            </div>
                            <div class="preference-list">
                                <div><span>Transport</span><strong>${profile.preferences.transport}</strong></div>
                                <div><span>Accommodation</span><strong>${profile.preferences.stay}</strong></div>
                                <div><span>Budget range</span><strong>${profile.preferences.budget}</strong></div>
                                <div><span>Activity style</span><strong>${profile.preferences.activityStyle}</strong></div>
                            </div>
                        </div>

                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>Security & settings</h2>
                                    <p>Role-aware toggles for traveller UI only</p>
                                </div>
                            </div>
                            <div class="security-toggle-list">
                                <label class="toggle-row">
                                    <span>Two-factor authentication</span>
                                    <input type="checkbox" data-security-toggle="twoFactorAuth" ${profile.security.twoFactorAuth ? "checked" : ""}>
                                </label>
                                <label class="toggle-row">
                                    <span>Email notifications</span>
                                    <input type="checkbox" data-security-toggle="emailNotifications" ${profile.security.emailNotifications ? "checked" : ""}>
                                </label>
                                <label class="toggle-row">
                                    <span>Public profile</span>
                                    <input type="checkbox" data-security-toggle="publicProfile" ${profile.security.publicProfile ? "checked" : ""}>
                                </label>
                            </div>
                            <button type="button" class="danger-btn" id="deactivate-profile-btn">Deactivate account</button>
                        </div>

                        <div class="traveler-card">
                            <div class="traveler-card-header">
                                <div>
                                    <h2>Traveller activity</h2>
                                    <p>Saved plans and bookings at a glance</p>
                                </div>
                            </div>
                            <div class="preference-list">
                                <div><span>Saved plans</span><strong>${plans.length}</strong></div>
                                <div><span>Active bookings</span><strong>${bookings.filter((booking) => booking.status === "Confirmed").length}</strong></div>
                                <div><span>Completed trips</span><strong>${bookings.filter((booking) => booking.status === "Completed").length}</strong></div>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
        `;

        bindEvents();
    }

    function renderProfileReadOnly(profile) {
        return `
            <div class="profile-details-grid">
                <div><span>Full name</span><strong>${profile.fullName}</strong></div>
                <div><span>Email address</span><strong>${profile.email}</strong></div>
                <div><span>Phone number</span><strong>${profile.phone}</strong></div>
                <div><span>Home location</span><strong>${profile.location}</strong></div>
                <div><span>Preferred language</span><strong>${profile.language}</strong></div>
                <div><span>Gender</span><strong>${profile.gender}</strong></div>
                <div><span>Date of birth</span><strong>${profile.dob}</strong></div>
            </div>
        `;
    }

    function renderEditForm(profile) {
        return `
            <form id="profile-edit-form" class="traveler-form-grid" novalidate>
                <label>
                    <span>Full name</span>
                    <input type="text" name="fullName" value="${profile.fullName}">
                    ${renderFieldError(state.errors, "fullName")}
                </label>
                <label>
                    <span>Email address</span>
                    <input type="email" name="email" value="${profile.email}">
                    ${renderFieldError(state.errors, "email")}
                </label>
                <label>
                    <span>Phone number</span>
                    <input type="text" name="phone" value="${profile.phone}">
                    ${renderFieldError(state.errors, "phone")}
                </label>
                <label>
                    <span>Home location</span>
                    <input type="text" name="location" value="${profile.location}">
                    ${renderFieldError(state.errors, "location")}
                </label>
                <label>
                    <span>Preferred language</span>
                    <input type="text" name="language" value="${profile.language}">
                </label>
                <label>
                    <span>Gender</span>
                    <input type="text" name="gender" value="${profile.gender}">
                </label>
                <label class="traveler-form-span-full">
                    <span>About me</span>
                    <textarea name="bio" rows="5">${profile.bio}</textarea>
                    ${renderFieldError(state.errors, "bio")}
                </label>
                <div class="traveler-form-actions traveler-form-span-full">
                    <button type="submit" class="solid-btn">Save profile</button>
                    <button type="button" class="ghost-btn" id="cancel-profile-edit">Cancel</button>
                </div>
            </form>
        `;
    }

    function bindEvents() {
        container.querySelector("#toggle-profile-edit")?.addEventListener("click", () => {
            state.editing = !state.editing;
            state.errors = {};
            render();
        });

        container.querySelector("#cancel-profile-edit")?.addEventListener("click", () => {
            state.editing = false;
            state.errors = {};
            render();
        });

        container.querySelector("#profile-edit-form")?.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const profile = getTravelerProfile();
            const payload = {
                ...profile,
                fullName: form.elements.fullName.value.trim(),
                email: form.elements.email.value.trim(),
                phone: form.elements.phone.value.trim(),
                location: form.elements.location.value.trim(),
                language: form.elements.language.value.trim(),
                gender: form.elements.gender.value.trim(),
                bio: form.elements.bio.value.trim()
            };

            const errors = validateProfile(payload);
            state.errors = errors;

            if (Object.keys(errors).length) {
                showWorkspaceToast("Please correct the profile form.", "error");
                render();
                return;
            }

            saveTravelerProfile(payload);
            state.editing = false;
            state.errors = {};
            showWorkspaceToast("Profile updated.");
            render();
        });

        container.querySelectorAll("[data-security-toggle]").forEach((toggle) => {
            toggle.addEventListener("change", () => {
                const profile = getTravelerProfile();
                profile.security[toggle.dataset.securityToggle] = toggle.checked;
                saveTravelerProfile(profile);
                showWorkspaceToast("Security settings updated.");
            });
        });

        container.querySelector("#deactivate-profile-btn")?.addEventListener("click", () => {
            showWorkspaceToast("Mock mode only: account deactivation has been safely blocked.", "error");
        });
    }

    render();
}
