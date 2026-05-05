import { bootstrapAppState, getAppStateValue } from "./api/appState.js";
import { renderNavbar } from "../components/layout/navbar.js";
import { renderPageContent } from "./renderpages.js";
import { initLogin } from "./login.js";
import { initSignup } from "./signup.js";
import { getCurrentUser } from "./api/session.js";
import { renderLandingNavbar } from "../components/layout/navbar_landing.js";

function buildProfileBridge(currentUser) {
    const allUsers = getAppStateValue("users", []);
    const baseProfile = getAppStateValue("profileData", {});
    const userSync = allUsers.find((user) => String(user.id) === String(currentUser?.id));

    if (!userSync) {
        return baseProfile;
    }

    return {
        ...baseProfile,
        firstName: (userSync.name || "").split(" ")[0] || baseProfile.firstName,
        lastName: (userSync.name || "").split(" ").slice(1).join(" ") || baseProfile.lastName,
        email: userSync.email || baseProfile.email,
        phone: userSync.phone || userSync.phno || baseProfile.phone,
        role: userSync.role || baseProfile.role
    };
}

document.addEventListener("DOMContentLoaded", () => {
    void (async () => {
        const path = window.location.pathname.split("/").pop() || "index.html";
        if (path === "login.html") {
            renderLandingNavbar();
            initLogin();
            return;
        }

        if (path === "signup.html") {
            renderLandingNavbar();
            initSignup();
            return;
        }

        if (path === "index.html") {
            renderLandingNavbar();
            return;
        }

        const currentUser = getCurrentUser();

        if (!currentUser) {
            window.location.href = "./login.html";
            return;
        }

        await bootstrapAppState();

        localStorage.setItem("profileData", JSON.stringify(buildProfileBridge(currentUser)));

        renderNavbar(currentUser);
        renderPageContent(currentUser);
    })();
});
