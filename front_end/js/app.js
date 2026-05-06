import { renderNavbar } from "../components/layout/navbar.js";
import { bindProfileActions } from "../components/layout/profile.js";
import { renderPageContent } from "./renderpages.js?v=phase3-ticket-support";
import { initLogin } from "./login.js";
import { initSignup } from "./signup.js";
import { getCurrentUser } from "./api/session.js";
import { renderLandingNavbar } from "../components/layout/navbar_landing.js";

async function initApp() {
  try {
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

    renderNavbar(currentUser);
    bindProfileActions();
    await renderPageContent(currentUser);
  } catch (error) {
    console.error("App initialization failed:", error);
  }
}

if (document.readyState !== "loading") {
  void initApp();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    void initApp();
  });
}
