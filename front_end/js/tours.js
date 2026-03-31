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

window.switchTab = (status) => {
    currentActiveTab = status;
    const user = JSON.parse(localStorage.getItem("currentUser"));
    rendertourpage("main", user); 
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
        body.innerHTML = `
            <div class="modal-tour-title">
                <h1>${tour.destination}</h1>
            </div>

            <div class="tour-info-grid">
                <div class="info-group"><label>Customer</label><span>${tour.customer}</span></div>
                <div class="info-group"><label>Group Size</label><span>${tour.guests} People</span></div>
                <div class="info-group"><label>Date & Time</label><span>${tour.dateTime}</span></div>
                <div class="info-group"><label>Total Price</label><span>$${tour.amount}</span></div>
            </div>

            <div class="itinerary-card">
                <h3>Itinerary Schedule</h3>
                <div class="timeline">
                    ${itinerarySteps.map(step => `
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-content">${step.trim()}</div>
                        </div>
                    `).join('')}
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