import { rendertourpagehearder } from "./modules/tour-page-header.js";
import { renderinternalnavbar } from "./modules/internal-navbar.js";
import { renderinternalcontents } from "./modules/internal-contents.js";

let currentActiveTab = "pending"

export function rendertourpage(containerId,currentUser) {
    
    rendertourpagehearder("tour-page-header",currentUser);
    renderinternalnavbar("tours-internal-navbar",currentActiveTab);
    console.log("hi");
    //renderinternalsearchbar("internal-search-bar",currentUser);
    renderinternalcontents("internal-contents",currentUser,currentActiveTab);
}

const _origSwitchTab = window.switchTab;
window.switchTab = (status) => {
    const page = window.location.pathname.split("/").pop();
    if (page === "tours.html") {
        currentActiveTab = status;
        const user = JSON.parse(localStorage.getItem("currentUser"));
        rendertourpage("main", user); 
    } else if (_origSwitchTab) {
        _origSwitchTab(status);
    }
};

window.openTourModal = (tourId) => {
    const allTours = JSON.parse(localStorage.getItem("tours")) || [];
    const tour = allTours.find(t => String(t.id) === String(tourId));

    if (tour) {
        const modal = document.getElementById("tourModal");
        const body = document.getElementById("modalBody");
        console.log(tour);
        // Split itinerary string into an array
        const itinerarySteps = tour.plan_iternary
        const currentStop = tour.currentloction;
        
        body.innerHTML = `
            <div class="modal-tour-title">
                <h1 style="font-size: 24px; color: #111827; margin-bottom: 8px;">${tour.destination}</h1>
                <p style="color: #6B7280; font-size: 14px;">${tour.title}</p>
            </div>

            <div class="tour-info-grid">
                <div class="info-group"><label>Customer</label><span>${tour.customer}</span></div>
                <div class="info-group"><label>Group Size</label><span>${tour.guests} People</span></div>
                <div class="info-group"><label>Date & Time</label><span>${tour.dateTime}</span></div>
                <div class="info-group"><label>Total Price</label><span>$${tour.amount}</span></div>
            </div>

            <div class="itinerary-card" style="background: #111827; border-radius: 16px; padding: 24px; color: white;">
                <h3 style="font-size: 16px; margin-bottom: 20px; color: #f8fafc;">Itinerary Schedule</h3>
                <div class="itinerary-list" style="list-style: none; padding-left: 20px; border-left: 1px solid #333333; margin-left: 10px;">
                    ${itinerarySteps.map(step => {
                        const isDone = itinerarySteps.indexOf(step) < itinerarySteps.indexOf(currentStop);
                        const isCurrent = step === currentStop;
                        const dotColor = isCurrent ? "#3B82F6" : (isDone ? "#10B981" : "#4B5563");
                        return `
                            <div class="itinerary-item" style="position: relative; padding-bottom: 20px; font-size: 14px; color: ${isCurrent ? 'white' : '#94A3B8'}">
                                <div style="position: absolute; left: -25px; top: 5px; width: 10px; height: 10px; background: ${dotColor}; border-radius: 50%; box-shadow: 0 0 0 4px ${isCurrent ? 'rgba(59, 130, 246, 0.2)' : 'transparent'}"></div>
                                <span style="${isCurrent ? 'font-weight: 700; color: #60A5FA;' : ''}">${step.trim()}</span>
                                ${isCurrent ? '<span style="display: block; font-size: 11px; color: #60A5FA; font-weight: 500;">Current Stop</span>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        modal.style.setProperty('display', 'flex', 'important');
    }
};

// Function to update LocalStorage and refresh the UI
window.handleStatusUpdate = (tourId, newStatus) => {
    let allTours = JSON.parse(localStorage.getItem("tours"));
    const index = allTours.findIndex(t => String(t.id) === String(tourId));

    if (index !== -1) {
        allTours[index].status = newStatus;
        localStorage.setItem("tours", JSON.stringify(allTours));
        
        // Close modal and refresh the specific container
        document.getElementById("tourModal").style.display = "none";
        const user = JSON.parse(localStorage.getItem("currentUser"));
        rendertourpage("main", user); 
    }
};

window.handleTourAction = (tourId) => {
    let allTours = JSON.parse(localStorage.getItem("tours")) || [];
    const tourIndex = allTours.findIndex(t => String(t.id) === String(tourId));

    if (tourIndex !== -1) {
        const tour = allTours[tourIndex];
        const itinerary = tour.plan_iternary || [];
        
        // Find where we are right now
        const currentIndex = itinerary.indexOf(tour.currentloction);
        const nextIndex = currentIndex + 1;

        if (nextIndex < itinerary.length) {
            // Move to the next stop
            tour.currentloction = itinerary[nextIndex];
            console.log(`Moving to next stop: ${tour.currentloction}`);
        } else {
            // We reached the end of the list
            tour.status = "completed"; 
            tour.currentloction = "Trip Completion";
            console.log("Tour Finished!");
        }

        // Save and Refresh
        localStorage.setItem("tours", JSON.stringify(allTours));
        
        const user = JSON.parse(localStorage.getItem("currentUser"));
        // Re-render the 'ongoing' or 'completed' tab accordingly
        renderinternalcontents("internal-contents", user, tour.status); 
    }
};

window.closeModal = () => {
    const modal = document.getElementById("tourModal");
    if (modal) {
        modal.style.display = "none";
        document.getElementById("modalBody").innerHTML = "";
    }
};

window.addEventListener("click", (event) => {
    const modal = document.getElementById("tourModal");
    if (event.target === modal) {
        closeModal();
    }
});