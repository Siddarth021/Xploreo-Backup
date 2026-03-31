const BASE_PATH =
    "/23_Xploreo/front_end";

/* ===============================
   PASSWORD TOGGLE
=============================== */

const togglePassword =
    document.getElementById(
        "toggle-password"
    );

const passwordInput =
    document.getElementById(
        "login-password"
    );

if (togglePassword) {

    togglePassword.addEventListener(

        "click",

        function () {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                togglePassword.innerText =
                    "🙈";

            }

            else {

                passwordInput.type =
                    "password";

                togglePassword.innerText =
                    "👁️";

            }

        }

    );

}

/* ===============================
   LOGIN
=============================== */

const loginForm =
    document.getElementById(
        "login-form"
    );

loginForm.addEventListener(

    "submit",

    function (event) {

        event.preventDefault();

        const username =
            document
            .getElementById(
                "login-username"
            )
            .value
            .trim();

        const password =
            document
            .getElementById(
                "login-password"
            )
            .value;

        const users =
            JSON.parse(

                localStorage.getItem(
                    "users"
                )

            ) || [];

        const user =
            users.find(

                u =>

                u.username ===
                username ||

                u.email ===
                username

            );

        if (!user) {

            alert(
                "User not found"
            );

            return;

        }

        /* SAVE SESSION */

        localStorage.setItem(

            "currentUser",

            JSON.stringify(
                user
            )

        );

        redirectToDashboard(
            user.role
        );

    }

);

/* ===============================
   ROLE REDIRECT
=============================== */

function redirectToDashboard(
    role
) {

    if (
        role === "traveler"
    ) {

        window.location.href =
            BASE_PATH +
            "/pages/traveler_dashboard.html";

    }

    else if (
        role === "local guide"
    ) {

        window.location.href =
            BASE_PATH +
            "/pages/guide_dashboard.html";

    }

    else if (
        role === "service partner"
    ) {

        window.location.href =
            BASE_PATH +
            "/pages/partner_dashboard.html";

    }

}