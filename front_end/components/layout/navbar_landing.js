import { landingLinks } from "./navlinks_landing.js";

const BASE_PATH = "/23_Xploreo/front_end";

const logoPath = window.location.pathname.includes("/pages/")
    ? "../components/ui/landing/navbar-logo.png"
    : "./components/ui/landing/navbar-logo.png";

export function renderLandingNavbar() {
    const navbarHTML = `
        <header class="top-bar">
            <div class="nav-left">
                <img src="${logoPath}" class="logo" id="home-logo" style="cursor:pointer">
                <span class="brand">Xploreo</span>
            </div>
            <nav class="nav-links">
                ${landingLinks.map(link => `
                    <a href="${BASE_PATH}${link.href}">${link.label}</a>
                `).join("")}
            </nav>
            <div class="nav-right">
                <button class="login-btn" id="login-btn">Login</button>
                <button class="signup-btn" id="signup-btn">Sign Up</button>
            </div>
        </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
    attachNavbarEvents();
}

function attachNavbarEvents() {
    const logo = document.getElementById("home-logo");
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");

    if (logo) {
        logo.addEventListener("click", () => {
            window.location.href = BASE_PATH + "/index.html";
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.href = BASE_PATH + "/pages/login.html";
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            window.location.href = BASE_PATH + "/pages/signup.html";
        });
    }
}