document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("admin-login-form");
  const emailInput = document.getElementById("admin-email");
  const passwordInput = document.getElementById("admin-password");
  const messageBox = document.getElementById("admin-login-message");

  const ADMIN_EMAIL = "tringa.hyseni@umib.net";
  const ADMIN_PASSWORD = "12345678";

  function showMessage(message, type = "error") {
    if (!messageBox) return;

    messageBox.textContent = message;
    messageBox.className = `admin-login-message ${type}`;
  }

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("smartapart_admin_logged_in", "true");
      showMessage("Login successful. Redirecting to admin panel...", "success");

      setTimeout(() => {
        window.location.href = "admin.html";
      }, 700);

      return;
    }

    showMessage("Invalid email or password. Please try again.", "error");
  });
});