const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  registerMessage.textContent = "";

  if (!fullName || !email || !password) {
    registerMessage.textContent = "Please fill in all fields.";
    registerMessage.style.color = "#d64040";
    return;
  }

  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await response.json();

    registerMessage.textContent = data.message;

    if (response.ok) {
      registerMessage.style.color = "#15b878";

      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    } else {
      registerMessage.style.color = "#d64040";
    }
  } catch (error) {
    registerMessage.textContent = "Server error during registration.";
    registerMessage.style.color = "#d64040";
    console.error(error);
  }
});