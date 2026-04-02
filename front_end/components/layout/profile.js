export function getProfile(user) {
    // 1. Route the user to the correct profile page based on their role
    let profileLink = 'profile.html'; // Default fallback
    let supportLink = 'support.html';
    
    if (user) {
        if (user.role === 'traveller') {
            profileLink = 'traveller_profile.html';
            supportLink = 'traveller_support.html';
        } else if (user.role === 'hotel') {
            profileLink = 'hotelprofile.html';
        } else if (user.role === 'superadmin') {
            profileLink = 'adminProfile.html'; // <-- Routes superadmin to the new page
        } else if (user.role === 'experience' || user.role === 'guide' || user.role === 'techadmin') {
            profileLink = 'profile.html';
        }
    }

    // 2. Hide Support specifically for techadmin and superadmin
    const supportItem = (user && user.role !== 'techadmin' && user.role !== 'superadmin') ? `
              <div class="dropdown-item" onclick="window.location.href='${supportLink}'">
                <img src="../components/ui/support.svg" class="dropdown-icon">
                <span>Support</span>
              </div>
    ` : '';

    // 3. Render the dropdown (Profile is now back for everyone)
    return `
        <div class="profile" onclick="toggleProfileMenu()">
            <span class="profile-name">${user ? user.name : 'User'}</span>
            <img src="../components/ui/profile.png" alt="user" class="profile-img"/>
            <div class="profile-dropdown hidden" id="profile-dropdown">
              
              <div class="dropdown-item" onclick="window.location.href='${profileLink}'">
                <img src="../components/ui/user.svg" class="dropdown-icon">
                <span>Profile</span>
              </div>
              
              ${supportItem}
              
              <hr class="dropdown-divider">
              <div class="dropdown-item logout-item" onclick="logout()">
                <img src="../components/ui/logout.svg" class="dropdown-icon">
                <span>Logout</span>
              </div>
            </div>
        </div>`;
}

// Handle opening/closing the dropdown
window.addEventListener("click", function (e) {
    const profile = document.querySelector(".profile");
    const dropdown = document.querySelector(".profile-dropdown");

    if (!profile || !dropdown) return;

    if (profile.contains(e.target)) {
        dropdown.classList.toggle("hidden");
    } else {
        dropdown.classList.add("hidden");
    }
});

// Handle Logout
window.logout = function () {
  localStorage.removeItem("currentUser");
  localStorage.clear();
  window.location.href = "login.html";
};
