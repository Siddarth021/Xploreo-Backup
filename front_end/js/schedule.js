import { renderinternalnavbar } from "./modules/internal-navbar.js";
import { renderCalendarView } from "./modules/schedule-calendar.js";
import { renderAvailabilityView } from "./modules/schedule-availability.js";
import { initScheduleModals } from "./modules/schedule-modals.js";

// State
let currentActiveTab = "calendar";
let state = {
    calendarDate: new Date(), // Currently viewed month
    selectedDate: new Date(), // Currently selected day
    currentUser: null
};
let scheduleData = null;

export function renderSchedulePage(containerId, currentUser) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Load data from localStorage
    scheduleData = JSON.parse(localStorage.getItem("scheduleData"));
    state.currentUser = currentUser;
    if (!scheduleData) {
        console.error("Schedule data not found in localStorage.");
        return;
    }

    // Initialize Page Skeleton
    container.innerHTML = `
        <div class="schedule-page">
            <div class="schedule-header">
                <h1 class="schedule-page-title">Schedule Management</h1>
                <p class="schedule-page-subtitle">Manage your calendar and availability</p>
            </div>
            <div id="schedule-internal-navbar" class="internal-navbar"></div>
            <div id="schedule-content"></div>
        </div>
    `;

    // Initialize Modals & Handlers
    initScheduleModals(scheduleData, () => {
        // Callback when a modal saves (usually for availability updates)
        if (currentActiveTab === "availability") {
            renderTabContent();
        } else {
            renderTabContent(); // Refresh calendar too if needed
        }
    });

    renderinternalnavbar("schedule-internal-navbar", currentActiveTab);
    renderTabContent();
}

function renderTabContent() {
    const contentArea = document.getElementById("schedule-content");
    if (!contentArea) return;

    if (currentActiveTab === "calendar") {
        renderCalendarView(contentArea, state, scheduleData, renderTabContent);
    } else if (currentActiveTab === "availability") {
        renderAvailabilityView(contentArea, scheduleData, renderTabContent);
    }
}

// Global switchTab implementation for Schedule
const _origSwitchTab = window.switchTab;
window.switchTab = (status) => {
    const page = window.location.pathname.split("/").pop();
    if (page === "schedule.html") {
        currentActiveTab = status;
        const user = JSON.parse(localStorage.getItem("currentUser")) || { id: "10001" };
        renderSchedulePage("main", user);
    } else if (_origSwitchTab) {
        _origSwitchTab(status);
    }
};
