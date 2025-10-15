// Page Elements
const signupPage = document.getElementById("signup-page");
const loginPage = document.getElementById("login-page");
const forgotPasswordPage = document.getElementById("forgot-password-page");

const goToLogin = document.getElementById("go-to-login");
const goToSignup = document.getElementById("go-to-signup");
const forgotPassword = document.getElementById("forgot-password");
const backToLogin = document.getElementById("back-to-login");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const forgotPasswordForm = document.getElementById("forgot-password-form");

// Switch to Login Page
goToLogin.addEventListener("click", () => {
    switchPage(loginPage);
});

// Switch to Signup Page
goToSignup.addEventListener("click", () => {
    switchPage(signupPage);
});

// Switch to Forgot Password Page
forgotPassword.addEventListener("click", () => {
    switchPage(forgotPasswordPage);
});

// Back to Login Page
backToLogin.addEventListener("click", () => {
    switchPage(loginPage);
});

// Form Handling
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const mobile = document.getElementById("signup-mobile").value;
    const password = document.getElementById("signup-password").value;

    // Save user data (You can replace this with a database/API call)
    localStorage.setItem(email, JSON.stringify({ username, mobile, password }));
    alert("Signup successful! Please login.");
    switchPage(loginPage);
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Retrieve user data
    const userData = JSON.parse(localStorage.getItem(email));
    if (userData && userData.password === password) {
        alert("Login successful!");
        // Redirect to a new page
        window.location.href = "../index1.html"; // Replace with your dashboard
    } else {
        alert("Invalid email or password!");
    }
});

forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-email").value;

    if (localStorage.getItem(email)) {
        alert("Password reset link sent to your email!");
    } else {
        alert("Email not found!");
    }
});

// Utility to Switch Pages
function switchPage(pageToShow) {
    document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
    pageToShow.classList.add("active");
}
