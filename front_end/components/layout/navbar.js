import { getNavLinks } from "./navlinks.js";
import { getProfile } from "./profile.js";
import { getNotification } from "./notification.js";

export function renderNavbar(user) {
  const navbar = `
    <nav class="navbar">
      <div class="navbar-left">
      <div class="logo">
        <img src="logo.png" alt="Xploreo Logo" style="height: 30px;"> 
        <span>Xploreo</span>
      </div>
      
      </div>
      <div class="navbar-center">
        ${getNavLinks(user.role)}
      </div>
      <div class="navbar-right">
        ${getNotification()}
        ${getProfile(user)}
      </div>
    </nav>
  `;
  document.getElementById("navbar").innerHTML = navbar;
}