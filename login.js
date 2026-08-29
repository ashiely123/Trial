// ELEMENTS

const loginFormContainer = document.querySelector(".login-form");
const signupFormContainer = document.querySelector(".signup-form");

const loginForm = loginFormContainer.querySelector("form");
const signupForm = signupFormContainer.querySelector("form");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// SWITCH TO SIGN UP

showSignup.addEventListener("click", function (event) {
    event.preventDefault();

    loginFormContainer.classList.add("hidden");
    signupFormContainer.classList.add("active");
});

// SWITCH TO LOGIN

showLogin.addEventListener("click", function (event) {
    event.preventDefault();

    signupFormContainer.classList.remove("active");
    loginFormContainer.classList.remove("hidden");
});


// SIGN UP

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = signupForm.querySelectorAll(
        'input[type="text"], input[type="password"]'
    );

    const username = inputs[0].value.trim();
    const password = inputs[1].value;

    // Get existing accounts
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Check if username already exists
    const existingAccount = accounts.find(
        account => account.username.toLowerCase() === username.toLowerCase()
    );

    if (existingAccount) {
        alert("Username already exists. Please choose another username.");
        return;
    }

    // Create new account
    const newAccount = {
        username: username,
        password: password
    };

    // Add new account
    accounts.push(newAccount);

    // Save all accounts
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Account created successfully!");

    // Clear signup form
    signupForm.reset();

    // Go back to login
    signupFormContainer.classList.remove("active");
    loginFormContainer.classList.remove("hidden");
});


// LOGIN


loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = loginForm.querySelectorAll(
        'input[type="text"], input[type="password"]'
    );

    const username = inputs[0].value.trim();
    const password = inputs[1].value;

    // Get saved accounts
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Find matching account
    const account = accounts.find(
        account =>
            account.username.toLowerCase() === username.toLowerCase() &&
            account.password === password
    );

    if (account) {

        // Save currently logged-in user
        localStorage.setItem("loggedInUser", account.username);

        alert("Login successful!");

        // Open home page
        window.location.href = "home.html";

    } else {

        alert("Incorrect username or password.");

    }
});
