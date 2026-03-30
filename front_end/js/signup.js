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

    const step1 =
        document.querySelector(
            ".step-1"
        );

    const step2 =
        document.querySelector(
            ".step-2"
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

                // if (
                //     validateStep2()
                // ) {

                    createUser(
                        selectedRole
                    );

                    alert(
                        "Step 2 completed successfully"
                    );

                    showRoleStep3(selectedRole);

                // }

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



/* VALIDATION */

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



/* SAVE USER */

function createUser(role) {

    /* GET FORM VALUES */

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



    /* MERGE EXISTING USERS */

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



    /* GENERATE UNIQUE ID */

    const newId =
        generateUniqueUserId(
            allUsers
        );



    /* CREATE USER OBJECT */

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



    /* SAVE TO STORAGE */

    saveUser(
        newUser
    );



    console.log(
        "User Saved:",
        newUser
    );

}

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