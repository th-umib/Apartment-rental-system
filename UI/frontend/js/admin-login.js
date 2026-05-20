document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("admin-login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  function showLoginMessage(message, type = "error") {
    let box = document.getElementById("login-message");

    if (!box) {
      box = document.createElement("div");
      box.id = "login-message";
      box.style.marginTop = "14px";
      box.style.fontWeight = "700";
      loginForm.appendChild(box);
    }

    box.textContent = message;
    box.style.color = type === "success" ? "#0f7a35" : "#dc2626";
  }

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";

    if (email === "tringa.hyseni@umib.net" && password === "12345678") {
      localStorage.setItem("smartapart_admin_logged_in", "true");
      localStorage.setItem("smartapart_admin_email", email);

      showLoginMessage("Login successful. Redirecting to dashboard...", "success");

      setTimeout(() => {
        window.location.href = "admin.html";
      }, 500);

      return;
    }

    showLoginMessage("Invalid email or password. Please try again.", "error");
  });
});