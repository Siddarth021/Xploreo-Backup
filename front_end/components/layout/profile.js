export function getProfile(user){
    return `
        <div class="profile" onclick="toggleProfileMenu()">
            <img src="../components/ui/profile.png" alt="user" class="profile-img"/>
            <span class="profile-name">${user.name}</span>
            <div id="profileDropdown" class="profile-dropdown hidden">
            <p>${user.name}</p>
            <ol>
             <li>Profile</li>
             <li>Support</li>
            </ol>
            <button onclick="logout()">Logout</button>
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