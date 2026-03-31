import { users }
from "../data/user.js";

import { generateUniqueUserId }
from "./utils/generateUserId.js"

import { saveUser }
from "./modules/userStorage.js"


/* GLOBAL STATE */

let selectedRole = null;

document.addEventListener(
"DOMContentLoaded",

function () {

    /* ELEMENTS */

    const cards =
        document.querySelectorAll(
            ".role-card"
        );

    const step1NextBtn =
        document.querySelector(
            ".step-1 .next-btn"
        );

    const step2NextBtn =
        document.querySelector(
            ".step-2 .next-btn"
        );

    const backBtn =
        document.querySelector(
            ".step-2 .back-btn"
        );


    /* ROLE SELECTION */

    cards.forEach(
        function (card) {

            card.addEventListener(
                "click",

                function () {

                    cards.forEach(
                        c =>
                        c.classList.remove(
                            "selected"
                        )
                    );

                    card.classList.add(
                        "selected"
                    );

                    selectedRole =
                        card.querySelector(
                            "h4"
                        ).innerText;

                    console.log(
                        "Selected Role:",
                        selectedRole
                    );

                }

            );

        }

    );


    /* STEP 1 → STEP 2 */

    if (step1NextBtn) {

        step1NextBtn.addEventListener(
            "click",

            function () {

                if (!selectedRole) {

                    alert(
                        "Please select a role first"
                    );

                    return;

                }

                showStep(2);

            }

        );

    }


    /* BACK BUTTON */

    if (backBtn) {

        backBtn.addEventListener(
            "click",

            function () {

                showStep(1);

            }

        );

    }


    /* STEP 2 SUBMIT */

    if (step2NextBtn) {

        step2NextBtn.addEventListener(
            "click",

            function () {

                // keep validation (as you requested)

                // if (validateStep2()) {

                    createUser(
                        selectedRole
                    );

                    alert(
                        "Step 2 completed successfully"
                    );

                    showRoleStep3(
                        selectedRole
                    );

                // }

            }

        );

    }


    /* ================================
       STEP 3 — TRAVELER
    ================================ */

    const step3Traveler =
        document.querySelector(
            ".step-3-traveler"
        );

    const step3BackBtn =
        document.querySelector(
            ".step3-back-btn"
        );

    const step3CompleteBtn =
        document.querySelector(
            ".step3-traveler-complete-btn"
        );


    if (step3BackBtn) {

        step3BackBtn.addEventListener(
            "click",

            function () {

                showStep(2);

            }

        );

    }


    if (step3CompleteBtn) {

        step3CompleteBtn.addEventListener(
            "click",

            function () {

                console.log(
                    "Traveler completing signup..."
                );

                saveTravelerPreferences();

                alert(
                    "Traveler signup completed!"
                );

                redirectToDashboard();

            }

        );

    }


    /* ================================
       GUIDE STEP 3
    ================================ */

    const guideBackBtn =
        document.querySelector(
            ".guide-back-btn"
        );

    const guideCompleteBtn =
        document.querySelector(
            ".guide-complete-btn"
        );

    if (guideBackBtn) {

        guideBackBtn.addEventListener(
            "click",

            function () {

                showStep(2);

            }

        );

    }

    if (guideCompleteBtn) {

        guideCompleteBtn.addEventListener(
            "click",

            function () {

                alert(
                    "Guide signup completed!"
                );

                redirectToDashboard();

            }

        );

    }


    /* ================================
       PARTNER STEP 3
    ================================ */

    const partnerBackBtn =
        document.getElementById(
            "partner-back-btn"
        );

    const partnerCompleteBtn =
        document.getElementById(
            "partner-complete-btn"
        );

    if (partnerBackBtn) {

        partnerBackBtn.addEventListener(
            "click",

            () => {

                showStep(2);

            }

        );

    }

    if (partnerCompleteBtn) {

        partnerCompleteBtn.addEventListener(
            "click",

            () => {

                console.log(
                    "Service Partner completed signup"
                );

                alert(
                    "Signup Completed!"
                );

                redirectToDashboard();

            }

        );

    }

}

);



/* STEP NAVIGATION */

function showStep(stepNumber) {

    document
        .querySelectorAll(
            ".signup-step"
        )
        .forEach(
            step =>
            step.classList.add(
                "hidden"
            )
        );

    document
        .querySelector(
            ".step-" + stepNumber
        )
        .classList.remove(
            "hidden"
        );

}



/* VALIDATION — unchanged */

function validateStep2() {

    const fullName =
        document
        .getElementById(
            "fullName"
        ).value.trim();

    const username =
        document
        .getElementById(
            "username"
        ).value.trim();

    const email =
        document
        .getElementById(
            "email"
        ).value.trim();

    const phone =
        document
        .getElementById(
            "phone"
        ).value.trim();

    const password =
        document
        .getElementById(
            "password"
        ).value;

    const confirmPassword =
        document
        .getElementById(
            "confirmPassword"
        ).value;


    if (
        !fullName ||
        !username ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
    ) {

        alert(
            "All fields are required"
        );

        return false;

    }

    if (
        !/^[A-Za-z]{6,}$/
        .test(username)
    ) {

        alert(
            "Username must contain only letters and be at least 6 characters"
        );

        return false;

    }

    if (
        password !==
        confirmPassword
    ) {

        alert(
            "Passwords do not match"
        );

        return false;

    }

    return true;

}



/* SAVE USER — unchanged */

function createUser(role) {

    const name =
        document
        .getElementById(
            "fullName"
        ).value.trim();

    const username =
        document
        .getElementById(
            "username"
        ).value.trim();

    const email =
        document
        .getElementById(
            "email"
        ).value.trim();

    const phone =
        document
        .getElementById(
            "phone"
        ).value.trim();


    const storedUsers =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];


    const allUsers =
        [
            ...users,
            ...storedUsers
        ];


    const newId =
        generateUniqueUserId(
            allUsers
        );


    const newUser = {

        id: newId,

        name: name,

        username: username,

        email: email,

        phone: phone,

        role: role.toLowerCase(),

        profilePic: "",

        status: "active"

    };


    saveUser(
        newUser
    );


    console.log(
        "User Saved:",
        newUser
    );

}



/* ROLE STEP 3 ROUTING — unchanged */

function showRoleStep3(role) {

    document
        .querySelectorAll(
            ".signup-step"
        )
        .forEach(
            step =>
            step.classList.add(
                "hidden"
            )
        );

    if (role === "Traveler") {

        document
            .querySelector(
                ".step-3-traveler"
            )
            .classList.remove(
                "hidden"
            );

    }

    else if (role === "Local Guide") {

        document
            .querySelector(
                ".step-3-guide"
            )
            .classList.remove(
                "hidden"
            );

    }

    else if (role === "Service Partner") {

        document
            .querySelector(
                ".step-3-partner"
            )
            .classList.remove(
                "hidden"
            );

    }

}



/* TRAVELER PREFERENCES — unchanged */

function saveTravelerPreferences() {

    const interests =
        [];

    document
        .querySelectorAll(
            ".step3-traveler-interest-card input:checked"
        )
        .forEach(
            checkbox => {

                interests.push(
                    checkbox.parentElement.innerText.trim()
                );

            }
        );

    console.log(
        "Traveler Preferences:",
        interests
    );

}


function redirectToDashboard() {

    const user =
        JSON.parse(

            localStorage.getItem(
                "currentUser"
            )

        );

    if (!user) return;

    if (user.role === "traveler") {

        window.location.href =
            "/pages/traveler_dashboard.html";

    }

    else if (user.role === "local guide") {

        window.location.href =
            "/pages/guide_dashboard.html";

    }

    else if (user.role === "service partner") {

        window.location.href =
            "/pages/partner_dashboard.html";

    }

}