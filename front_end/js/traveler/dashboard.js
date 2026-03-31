document.addEventListener("DOMContentLoaded", () => {
    // Search Tabs functionality
    const searchTabs = document.querySelectorAll(".search-tab");
    
    searchTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active classes
            searchTabs.forEach(t => t.classList.remove("active"));
            
            // Add active to clicked
            tab.classList.add("active");
            
            // Currently only the flights panel exists in UI layout
            // In a full app, we would query the data-tab and swap the active panel
            const tabName = tab.getAttribute("data-tab");
            console.log(`Switched search mode to: ${tabName}`);
        });
    });

    // Toggle button for Trip Type inside Flights
    const toggleBtns = document.querySelectorAll(".toggle-btn");
    toggleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            toggleBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
        });
    });

    // Heart Button Interactions
    const heartBtns = document.querySelectorAll(".heart-btn, .heart-btn-circle");
    heartBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const svg = btn.querySelector("svg");
            
            // simple toggle logic
            if (btn.style.color === "rgb(239, 68, 68)") {
                btn.style.color = "#9CA3AF";
                svg.style.fill = "none";
            } else {
                btn.style.color = "#EF4444";
                svg.style.fill = "#EF4444";
            }
        });
    });
});
