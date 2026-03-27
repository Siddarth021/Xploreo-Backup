export function getProfile(user){
    return `
        <div class="profile" onclick="toggleProfileMenu()">
            <span class="profile-name">${user.name}</span>
            <img src="../components/ui/profile.png" alt="user" class="profile-img"/>
            <div class="profile-dropdown hidden" id="profile-dropdown">
              <div class="dropdown-item">
                <img src="../assets/icons/user.svg" class="dropdown-icon">
                <span>Profile</span>
              </div>
              <div class="dropdown-item">
                <img src="../assets/icons/support.svg" class="dropdown-icon">
                <span>Support</span>
              </div>
              <hr class="dropdown-divider">
              <div class="dropdown-item logout-item" onclick="handleLogout()">
                <img src="../assets/icons/logout-red.svg" class="dropdown-icon">
                <span>Logout</span>
              </div>
            </div>
        </div>`;

        
}

window.toggleProfileMenu = function () {
  const menu = document.getElementById("profileDropdown");
  menu.classList.toggle("hidden");
};

window.logout = function () {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
};