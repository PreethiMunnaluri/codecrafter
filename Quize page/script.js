document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page refresh

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email === "test@example.com" && password === "password123") {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid email or password. Try again!");
        }
    });
});
