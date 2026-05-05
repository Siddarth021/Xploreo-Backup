import { users } from "../data/user.js";
import { generateUniqueUserId } from "./utils/generateUserId.js";
import { saveUser } from "./modules/userStorage.js";

/* GLOBAL STATE */
let selectedRole = null;

window.togglePasswordVisibility = function (inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        btn.innerHTML = '<img src="../components/ui/eye.svg" alt="Hide Password" style="width: 20px; height: 20px;">';
    } else {
        input.type = "password";
        btn.innerHTML = '<img src="../components/ui/eye-closed.svg" alt="Show Password" style="width: 20px; height: 20px;">';
    }
};

export function initSignup() {
    /* ELEMENTS */
    const cards = document.querySelectorAll(".role-card");
    const step1NextBtn = document.querySelector(".step-1 .next-btn");
    const step2NextBtn = document.querySelector(".step-2 .next-btn");
    const backBtn = document.querySelector(".step-2 .back-btn");

    /* ROLE SELECTION */
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            cards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedRole = card.querySelector("h4").innerText;
            console.log("Selected Role:", selectedRole);
        });
    });

    /* STEP 1 → STEP 2 */
    if (step1NextBtn) {
        step1NextBtn.addEventListener("click", function () {
            if (!selectedRole) {
                alert("Please select a role first");
                return;
            }
            if (selectedRole === "Service Partner") {
                showStep("1-partner");
            } else {
                showStep(2);
            }
        });
    }

    /* STEP 1.5 (PARTNER TYPE) NAVIGATORS */
    const step1PartnerNextBtn = document.querySelector(".step1-partner-next-btn");
    const step1PartnerBackBtn = document.querySelector(".step1-partner-back-btn");

    if (step1PartnerNextBtn) {
        step1PartnerNextBtn.addEventListener("click", function () {
            // Must have selected Hotel or Experiences
            if (selectedRole === "Service Partner") {
                alert("Please choose a Service Type (Hotel or Experiences)");
                return;
            }
            showStep(2);
        });
    }

    if (step1PartnerBackBtn) {
        step1PartnerBackBtn.addEventListener("click", function () {
            selectedRole = "Service Partner"; // Reset sub-role logically
            showStep(1);
            
            // Re-select Service Partner visually
            cards.forEach(c => c.classList.remove("selected"));
            const partnerCard = Array.from(cards).find(c => c.querySelector("h4").innerText === "Service Partner");
            if (partnerCard) partnerCard.classList.add("selected");
        });
    }

    /* BACK BUTTON */
    if (backBtn) {
        backBtn.addEventListener("click", function () {
            showStep(1);
        });
    }

    /* STEP 2 SUBMIT */
    if (step2NextBtn) {
        step2NextBtn.addEventListener("click", function () {
            if (validateStep2()) {
                createUser(selectedRole);
                showRoleStep3(selectedRole);
            }
        });
    }

    /* ================================
       STEP 3 — TRAVELER
    ================================ */
    const step3BackBtn = document.querySelector(".step3-back-btn");
    const step3CompleteBtn = document.querySelector(".step3-traveler-complete-btn");

    if (step3BackBtn) {
        step3BackBtn.addEventListener("click", function () {
            showStep(2);
        });
    }

    if (step3CompleteBtn) {
        step3CompleteBtn.addEventListener("click", function () {
            if (!validateStep3()) return;
            console.log("Traveler completing signup...");
            saveTravelerPreferences();
            showStep4();
        });
    }

    /* ================================
       GUIDE STEP 3
    ================================ */
    const guideBackBtn = document.querySelector(".guide-back-btn");
    const guideCompleteBtn = document.querySelector(".guide-complete-btn");

    if (guideBackBtn) {
        guideBackBtn.addEventListener("click", function () {
            showStep(2);
        });
    }

    if (guideCompleteBtn) {
        guideCompleteBtn.addEventListener("click", function () {
            if (!validateStep3()) return;
            showStep4();
        });
    }

    /* ================================
       PARTNER STEP 3
    ================================ */
    const partnerBackBtn = document.getElementById("partner-back-btn");
    const partnerCompleteBtn = document.getElementById("partner-complete-btn");

    if (partnerBackBtn) {
        partnerBackBtn.addEventListener("click", () => showStep(2));
    }

    if (partnerCompleteBtn) {
        partnerCompleteBtn.addEventListener("click", () => {
            if (!validateStep3()) return;
            console.log("Service Partner completed signup");
            showStep4();
        });
    }

    /* STEP 4 BUTTONS */
    const step4LoginBtn = document.querySelector(".step4-login-btn");
    const step4HomeBtn = document.querySelector(".step4-home-btn");

    if (step4LoginBtn) {
        step4LoginBtn.addEventListener("click", () => {
            window.location.href = "/23_Xploreo/front_end/pages/login.html";
        });
    }

    if (step4HomeBtn) {
        step4HomeBtn.addEventListener("click", () => {
            window.location.href = "/23_Xploreo/front_end/index.html";
        });
    }
}

/* STEP NAVIGATION */
function showStep(stepNumber) {
    document.querySelectorAll(".signup-step").forEach(step => step.classList.add("hidden"));
    document.querySelector(".step-" + stepNumber).classList.remove("hidden");
    const signupCard = document.querySelector(".signup-card");
    if (signupCard) signupCard.classList.remove("step4-active");
}

function showStep4() {
    document.querySelectorAll(".signup-step").forEach(step => step.classList.add("hidden"));

    const step4 = document.querySelector(".step-4");
    if (step4) step4.classList.remove("hidden");

    const signupCard = document.querySelector(".signup-card");
    if (signupCard) signupCard.classList.add("step4-active");

    const heroContent = document.querySelector(".signup-hero-content");
    if (heroContent) {
        heroContent.innerHTML = `
            <h1>Congratulations</h1>
            <p style="font-family: 'Pacifico', cursive; font-size: 32px; font-weight: normal; margin-top: -10px;">Start your journey</p>
        `;
    }

    const roleCapitalized = selectedRole || "Traveler";
    const usernameInput = document.getElementById("username") ? document.getElementById("username").value : "traveler_explorer";
    const usernameVal = usernameInput.trim() || "traveler_explorer";

    const subtitleEl = document.getElementById("step4-dynamic-subtitle");
    if (subtitleEl) subtitleEl.innerText = `Welcome to Xploreo! Your ${roleCapitalized.toLowerCase()} account is ready.`;

    const userEl = document.getElementById("step4-username");
    if (userEl) userEl.innerText = usernameVal;

    const roleEl = document.getElementById("step4-role");
    if (roleEl) roleEl.innerText = roleCapitalized;
}

function showError(input, message) {
    input.style.borderColor = "#FF4D4D";
    let insertAfterElement = input;
    if (input.parentElement.classList.contains('password-wrapper') || input.parentElement.classList.contains('phone-input-wrapper')) {
        insertAfterElement = input.parentElement;
    }
    let errorEl = insertAfterElement.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('validation-error-msg')) {
        errorEl = document.createElement("small");
        errorEl.className = "validation-error-msg";
        errorEl.style.color = "#FF4D4D";
        errorEl.style.fontSize = "12px";
        errorEl.style.marginTop = "4px";
        errorEl.style.display = "block";
        insertAfterElement.parentNode.insertBefore(errorEl, insertAfterElement.nextSibling);
    }
    errorEl.innerText = message;
}

function clearError(input) {
    input.style.borderColor = "";
    let checkElement = input;
    if (input.parentElement.classList.contains('password-wrapper') || input.parentElement.classList.contains('phone-input-wrapper')) {
        checkElement = input.parentElement;
    }
    let errorEl = checkElement.nextElementSibling;
    if (errorEl && errorEl.classList.contains('validation-error-msg')) {
        errorEl.remove();
    }
}

function validateStep2() {
    let isValid = true;
    let firstInvalid = null;

    const ids = ["fullName", "username", "email", "phone", "dob", "gender", "password", "confirmPassword"];
    ids.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            // Setup real-time red-state wiping upon keystroke natively
            if (!input.dataset.listenerAttached) {
                input.addEventListener("input", () => clearError(input));
                input.dataset.listenerAttached = "true";
            }
            clearError(input);
            let val = input.value.trim();
            if (!val) {
                isValid = false;
                showError(input, "This field is required");
                if (!firstInvalid) firstInvalid = input;
            }
        }
    });

    const usernameInput = document.getElementById("username");
    if (usernameInput && usernameInput.value.trim() && !/^[A-Za-z]{6,}$/.test(usernameInput.value.trim())) {
        isValid = false;
        showError(usernameInput, "Username can only contain alphabets (no numbers/special chars), min 6 characters.");
        if (!firstInvalid) firstInvalid = usernameInput;
    }

    const emailInput = document.getElementById("email");
    if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            showError(emailInput, "Please enter a valid email address (e.g., example@domain.com, .in).");
            if (!firstInvalid) firstInvalid = emailInput;
        }
    }

    const phoneInput = document.getElementById("phone");

    if (phoneInput && phoneInput.value.trim()) {
        const phoneVal = phoneInput.value
            .replace(/\s/g, '')   // remove spaces
            .replace(/-/g, '');   // remove dashes

        console.log("Phone value:", phoneVal);
        console.log("Length:", phoneVal.length);

        if (!/^\d{10}$/.test(phoneVal) || /^0{10}$/.test(phoneVal)) {
            isValid = false;
            showError(phoneInput, "Please enter a valid 10-digit phone number");
            if (!firstInvalid) firstInvalid = phoneInput;
        }
    }

    const dobInput = document.getElementById("dob");
    if (dobInput && dobInput.value.trim()) {
        const dobDate = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        if (age < 18) {
            isValid = false;
            showError(dobInput, "You must be at least 18 years old to sign up.");
            if (!firstInvalid) firstInvalid = dobInput;
        }
    }

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    if (passwordInput && confirmPasswordInput && passwordInput.value && confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        isValid = false;
        showError(confirmPasswordInput, "Passwords should match");
        if (!firstInvalid) firstInvalid = confirmPasswordInput;
    }

    if (!isValid && firstInvalid) {
        firstInvalid.focus();
    }

    return isValid;
}

function validateStep3() {
    let isValid = true;
    let firstInvalid = null;
    let container = null;

    if (selectedRole === "Traveler") {
        container = document.querySelector(".step-3-traveler");
    } else if (selectedRole === "Local Guide") {
        container = document.querySelector(".step-3-guide");
    } else if (selectedRole === "Service Partner" || selectedRole === "Hotel" || selectedRole === "Experiences") {
        container = document.querySelector(".step-3-partner");
    }

    if (!container) return false;

    const inputs = container.querySelectorAll("input:not([type='file']):not([type='time']):not([type='checkbox']):not([type='radio']), select, textarea");

    inputs.forEach(input => {
        clearError(input);

        // Skip the optional Preferred Destination Types input
        if (input.placeholder && input.placeholder.includes("Coastal")) {
            return;
        }

        const val = input.value.trim();

        if (!val || val.startsWith("Select ")) {
            isValid = false;
            showError(input, "This field is required");
            if (!firstInvalid) firstInvalid = input;
        }
    });

    if (!isValid && firstInvalid) {
        firstInvalid.focus();
    }

    return isValid;
}

/* SAVE USER */
function createUser(role) {
    const name = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...users, ...storedUsers];
    const newId = generateUniqueUserId(allUsers);

    const roleMap = {
        "Traveler": "traveller",
        "Local Guide": "guide",
        "Service Partner": "service_partner",
        "Hotel": "hotel",
        "Experiences": "experience"
    };

    const newUser = {
        id: newId,
        name: name,
        username: username,
        email: email,
        phone: phone,
        password: password, // Save real password natively instead of dropping it
        role: roleMap[role] || "traveller",
        profilePic: "",
        status: "active"
    };

    saveUser(newUser);
    console.log("User Saved:", newUser);
}

/* ROLE STEP 3 ROUTING */
function showRoleStep3(role) {
    document.querySelectorAll(".signup-step").forEach(step => step.classList.add("hidden"));

    const signupCard = document.querySelector(".signup-card");
    if (signupCard) signupCard.classList.remove("step4-active");

    if (role === "Traveler") {
        document.querySelector(".step-3-traveler").classList.remove("hidden");
    } else if (role === "Local Guide") {
        document.querySelector(".step-3-guide").classList.remove("hidden");
    } else if (role === "Service Partner" || role === "Hotel" || role === "Experiences") {
        document.querySelector(".step-3-partner").classList.remove("hidden");
    }
}

/* TRAVELER PREFERENCES */
function saveTravelerPreferences() {
    const interests = [];
    document.querySelectorAll(".step3-traveler-interest-card input:checked").forEach(checkbox => {
        interests.push(checkbox.parentElement.innerText.trim());
    });
    
    const homeLocation = document.getElementById("homeLocation") ? document.getElementById("homeLocation").value.trim() : "";
    const language = document.getElementById("prefLanguage") ? document.getElementById("prefLanguage").value.trim() : "";
    const activityStyle = document.getElementById("activityStyle") ? document.getElementById("activityStyle").value : "";
    const budgetRange = document.getElementById("budgetRange") ? document.getElementById("budgetRange").value : "";
    const transportPref = document.getElementById("transportPref") ? document.getElementById("transportPref").value : "";
    const accommodationPref = document.getElementById("accommodationPref") ? document.getElementById("accommodationPref").value : "";
    const bio = document.getElementById("bio") ? document.getElementById("bio").value.trim() : "";

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob") ? document.getElementById("dob").value : "";
    const gender = document.getElementById("gender") ? document.getElementById("gender").value : "";

    const travelerProfile = {
        fullName: name,
        email: email,
        phone: phone,
        location: homeLocation,
        language: language || "English (US)",
        gender: gender,
        dob: dob,
        bio: bio,
        reputation: "New Explorer",
        level: 1,
        totalTrips: 0,
        countries: 0,
        preferences: {
            transport: transportPref,
            stay: accommodationPref,
            budget: budgetRange,
            activityStyle: activityStyle
        },
        hobbies: interests,
        security: {
            twoFactorAuth: false,
            emailNotifications: true,
            publicProfile: true
        }
    };

    localStorage.setItem("traveler_workspace_profile", JSON.stringify(travelerProfile));
    console.log("Traveler Preferences & Profile Saved:", travelerProfile);
}

function redirectToDashboard() {
    // Left empty: User gets sent to login explicitly at step 4 interface
    const BASE_PATH = window.location.pathname.includes("23_Xploreo") ? "/23_Xploreo" : "";
    window.location.href = BASE_PATH + "/pages/login.html";
}