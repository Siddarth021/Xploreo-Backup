import {
    generateOtp,
    showOtpModal,
    validateOtp
}
from "./modules/otp.js";

let generatedOtp = null;

document.addEventListener(
    "DOMContentLoaded",
    function () {

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

        const nextBtn =
            document.querySelector(
                ".step-1 .next-btn"
            );

        const backBtn =
            document.querySelector(
                ".step-2 .back-btn"
            );

        let selectedRole =
            null;

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

                    }
                );

            }
        );

        nextBtn.addEventListener(
            "click",
            function () {

                if (!selectedRole) {

                    alert(
                        "Please select a role first"
                    );

                    return;

                }

                step1.classList.add(
                    "hidden"
                );

                step2.classList.remove(
                    "hidden"
                );

            }
        );

        backBtn.addEventListener(
            "click",
            function () {

                step2.classList.add(
                    "hidden"
                );

                step1.classList.remove(
                    "hidden"
                );

            }
        );

    }
);

function showStep(stepNumber) {

    document.querySelectorAll(".signup-step")
        .forEach(step => step.classList.add("hidden"));

    document.querySelector(".step-" + stepNumber)
        .classList.remove("hidden");

    const percent = stepNumber * 25;

    document.querySelectorAll(".progress-fill")
        .forEach(bar => {
            bar.style.width = percent + "%";
        });

}


function validateUsername(username) {

    const regex = /^[A-Za-z]{6,}$/;

    return regex.test(username);

}

function validateUsername(username) {

    const regex = /^[A-Za-z]{6,}$/;

    return regex.test(username);

}

function validateUsername(username) {

    const regex = /^[A-Za-z]{6,}$/;

    return regex.test(username);

}

function validateEmail(email) {

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

function validatePasswordMatch(p1, p2) {

    return p1 === p2;

}

function validateStep2() {

    const fullName =
        document.querySelector(
            "#fullName"
        ).value.trim();

    const username =
        document.querySelector(
            "#username"
        ).value.trim();

    const email =
        document.querySelector(
            "#email"
        ).value.trim();

    const phone =
        document.querySelector(
            "#phone"
        ).value.trim();

    const password =
        document.querySelector(
            "#password"
        ).value;

    const confirmPassword =
        document.querySelector(
            "#confirmPassword"
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
        !validateUsername(username)
    ) {

        alert(
            "Username must contain only letters and be at least 6 characters"
        );

        return false;

    }

    if (
        !validateEmail(email)
    ) {

        alert(
            "Invalid email address"
        );

        return false;

    }

    if (
        !validatePhone(phone)
    ) {

        alert(
            "Enter valid Indian mobile number"
        );

        return false;

    }

    if (
        !validatePasswordMatch(
            password,
            confirmPassword
        )
    ) {

        alert(
            "Passwords do not match"
        );

        return false;

    }

    return true;

}

function openOtpModal() {

    document
        .querySelector(
            ".otp-modal"
        )
        .classList.remove(
            "hidden"
        );

}

document
.querySelector(
    ".next-btn"
)
.addEventListener(
    "click",
    function () {

        if (
            validateStep2()
        ) {

            openOtpModal();

        }

    }
);