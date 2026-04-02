/* =======================================================
   LOGIN MODULE
======================================================= */
export function initLogin(users) {
    const BASE_PATH = window.location.pathname.includes("23_Xploreo") ? "/23_Xploreo" : "";

    const togglePassword = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("login-password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.innerHTML = '<img src="../components/ui/eye.svg" alt="Hide Password" style="width: 20px; height: 20px;">';
            } else {
                passwordInput.type = "password";
                togglePassword.innerHTML = '<img src="../components/ui/eye-closed.svg" alt="Show Password" style="width: 20px; height: 20px;">';
            }
        });
    }

    /* ===============================
       DYNAMIC ERROR CLEAR LOGIC
    =============================== */
    const usernameInput = document.getElementById("login-username");
    if (usernameInput) {
        usernameInput.addEventListener("input", () => clearError(usernameInput));
    }
    if (passwordInput) {
        passwordInput.addEventListener("input", () => clearError(passwordInput));
    }


    const forgotLink = document.querySelector(".forgot-link");
    if (forgotLink) {
        forgotLink.addEventListener("click", (e) => {
            e.preventDefault();
            const identifier = prompt("Enter your username or email to reset your password:");
            
            if (identifier) {
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const targetIndex = users.findIndex(u => u.username === identifier || u.email === identifier);
                
                if (targetIndex !== -1) {
                    const newPassword = prompt(`Account found for ${identifier}. Enter your new password:`);
                    if (newPassword && newPassword.trim() !== "") {
                        users[targetIndex].password = newPassword.trim();
                        localStorage.setItem("users", JSON.stringify(users));
                        alert("Password successfully reset! You can now log in.");
                    } else {
                        alert("Password reset cancelled. Cannot be blank.");
                    }
                } else {
                    alert("No account found with that username or email.");
                }
            }
        });
    }

    /* ===============================
       LOGIN HANDLER
    =============================== */
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const usernameElement = document.getElementById("login-username");
            const passwordElement = document.getElementById("login-password");

            const username = usernameElement.value.trim();
            const password = passwordElement.value;

            // Clear existing UI errors
            clearError(usernameElement);
            clearError(passwordElement);

            if (!username) {
                showError(usernameElement, "Username or Email is required.");
                return;
            }
            if (!password) {
                showError(passwordElement, "Password is required.");
                return;
            }
            
            const currentUser = users.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password
            );

            if (!currentUser) {
                showError(passwordElement, "Invalid username or password.");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = BASE_PATH + "/front_end/pages/dashboard.html";
        });
    }

    /* ===============================
       UI ERROR LOGIC
    =============================== */
    function showError(input, message) {
        input.style.borderColor = "#EF4444";
        const wrapper = input.parentElement;
        let errorEl = wrapper.nextElementSibling;
        
        if (!errorEl || !errorEl.classList.contains('login-error-msg')) {
            errorEl = document.createElement("small");
            errorEl.className = "login-error-msg";
            errorEl.style.color = "#EF4444";
            errorEl.style.fontSize = "12px";
            errorEl.style.marginTop = "4px";
            errorEl.style.display = "block";
            wrapper.parentNode.insertBefore(errorEl, wrapper.nextSibling);
        }
        errorEl.innerText = message;
    }

    function clearError(input) {
        input.style.borderColor = "";
        const wrapper = input.parentElement;
        const errorEl = wrapper.nextElementSibling;
        if (errorEl && errorEl.classList.contains('login-error-msg')) {
            errorEl.remove();
        }
    }
}

    document.addEventListener("click", function (event) {
        if (event.target.closest("#login-btn")) {
            window.location.href = BASE_PATH + "/front_end/pages/login.html";
        }
        if (event.target.closest("#signup-btn")) {
            window.location.href = BASE_PATH + "/front_end/pages/signup.html";
        }
    });