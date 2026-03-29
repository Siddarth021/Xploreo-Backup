import { landingLinks }
from "./navlinks_landing.js";

const logoPath =
    window.location.pathname.includes("/pages/")
        ? "../components/ui/landing/navbar-logo.png"
        : "./components/ui/landing/navbar-logo.png";

export function renderLandingNavbar() {

    const navbarHTML = `

        <header class="top-bar">

            <div class="nav-left">

                <img src="${logoPath}" class="logo">

                <span class="brand">
                    Xploreo
                </span>

            </div>

            <nav class="nav-links">

                ${landingLinks.map(link => `
                    <a href="${link.href}">
                        ${link.label}
                    </a>
                `).join("")}

            </nav>

            <div class="nav-right">

                <button class="login-btn">
                    Login
                </button>

                <button class="signup-btn">
                    Sign Up
                </button>

            </div>

        </header>

    `;

    document.body.insertAdjacentHTML(
        "afterbegin",
        navbarHTML
    );

}