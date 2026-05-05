
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


    const usernameInput = document.getElementById("login-username");
    if (usernameInput) {
        usernameInput.addEventListener("input", () => clearError(usernameInput));
    }
    if (passwordInput) {
        passwordInput.addEventListener("input", () => clearError(passwordInput));
    }


    const forgotLink = document.querySelector(".forgot-link");
    const modal = document.getElementById("forgot-password-modal");
    const closeModal = document.getElementById("close-forgot-modal");
    
    const step1 = document.getElementById("forgot-step-1");
    const step2 = document.getElementById("forgot-step-2");
    const step3 = document.getElementById("forgot-step-3");
    
    const identifierInput = document.getElementById("forgot-identifier");
    const verifyBtn = document.getElementById("forgot-verify-btn");
    const error1 = document.getElementById("forgot-error-1");
    
    const newPasswordInput = document.getElementById("forgot-new-password");
    const resetBtn = document.getElementById("forgot-reset-btn");
    const error2 = document.getElementById("forgot-error-2");
    
    const closeBtn = document.getElementById("forgot-close-btn");

    let targetUserIndex = -1;

    if (forgotLink && modal) {
        forgotLink.addEventListener("click", (e) => {
            e.preventDefault();
            // Reset modal state
            step1.classList.remove("hidden");
            step2.classList.add("hidden");
            step3.classList.add("hidden");
            identifierInput.value = "";
            newPasswordInput.value = "";
            error1.style.display = "none";
            error2.style.display = "none";
            targetUserIndex = -1;
            
            modal.classList.remove("hidden");
        });

        const hideModal = () => modal.classList.add("hidden");
        closeModal.addEventListener("click", hideModal);
        closeBtn.addEventListener("click", hideModal);
        
        verifyBtn.addEventListener("click", () => {
            const identifier = identifierInput.value.trim();
            if (!identifier) {
                error1.innerText = "Please enter a username or email.";
                error1.style.display = "block";
                return;
            }

            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            const allUsers = [...users, ...storedUsers];
            
            targetUserIndex = storedUsers.findIndex(u => u.username === identifier || u.email === identifier);
            
            if (targetUserIndex !== -1) {
                error1.style.display = "none";
                step1.classList.add("hidden");
                step2.classList.remove("hidden");
            } else {
                // Check if they are a mock data user (read-only for password resets)
                const isMockUser = users.find(u => u.username === identifier || u.email === identifier);
                if (isMockUser) {
                    error1.innerText = "Cannot reset password for default demo users.";
                } else {
                    error1.innerText = "No account found with that username or email.";
                }
                error1.style.display = "block";
            }
        });

        resetBtn.addEventListener("click", () => {
            const newPassword = newPasswordInput.value.trim();
            if (!newPassword) {
                error2.innerText = "Password cannot be blank.";
                error2.style.display = "block";
                return;
            }
            if (newPassword.length < 6) {
                error2.innerText = "Password must be at least 6 characters.";
                error2.style.display = "block";
                return;
            }

            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            if (targetUserIndex !== -1 && storedUsers[targetUserIndex]) {
                storedUsers[targetUserIndex].password = newPassword;
                localStorage.setItem("users", JSON.stringify(storedUsers));
                
                error2.style.display = "none";
                step2.classList.add("hidden");
                step3.classList.remove("hidden");
            }
        });
    }

   
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
            
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            const allUsers = [...users, ...storedUsers];

            const currentUser = allUsers.find(u => 
                (u.username === username || u.email === username) && 
                u.password === password
            );

            if (!currentUser) {
                showError(passwordElement, "Invalid username or password.");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            if (currentUser.role === "traveller") {
                window.location.href = BASE_PATH + "/front_end/pages/traveller_dashboard.html";
            } else {
                window.location.href = BASE_PATH + "/front_end/pages/dashboard.html";
            }
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