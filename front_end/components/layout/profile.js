export function getProfile(user){
    return `
        <div class="profile" onclick="toggleProfileMenu()">
            <span class="profile-name">${user.name}</span>
            <img src="../components/ui/profile.png" alt="user" class="profile-img"/>
            <div class="profile-dropdown hidden" id="profile-dropdown">
              <div class="dropdown-item">
                <img src="../components/ui/user.svg" class="dropdown-icon">
                <span>Profile</span>
              </div>
              <div class="dropdown-item">
                <img src="../components/ui/support.svg" class="dropdown-icon">
                <span>Support</span>
              </div>
              <hr class="dropdown-divider">
              <div class="dropdown-item logout-item" onclick="logout()">
                <img src="../components/ui/logout.svg" class="dropdown-icon">
                <span>Logout</span>
              </div>
            </div>
        </div>`;
}

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

window.logout = function () {
  localStorage.removeItem("currentUser");
  localStorage.clear();
  location.reload();
  window.location.href = "login.html";
};