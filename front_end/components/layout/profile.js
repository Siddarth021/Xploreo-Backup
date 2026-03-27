export function getProfile(user){
    return `
        <div class="profile">
            <img src="../components/ui/profile.png" alt="user" class="profile-img"/>
            <span class="profile-name">${user.name}</span>

            <div class="profile-dropdown hidden">
                <p>${user.name}</p>
                <ol>
                    <li>Profile</li>
                    <li>Support</li>
                </ol>
                <button onclick="logout()">Logout</button>
            </div>
        </div>
    `;
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
  window.location.href = "index.html";
};