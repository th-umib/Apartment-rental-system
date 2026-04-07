const loginForm = document.getElementById("login-form");
const messageElement = document.getElementById("message");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  messageElement.textContent = "";

  if (!email || !password) {
    messageElement.textContent = "Please fill in all fields.";
    messageElement.style.color = "#d64040";
    return;
  }

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    messageElement.textContent = data.message;

    if (response.ok) {
      messageElement.style.color = "#15b878";

      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      messageElement.style.color = "#d64040";
    }
  } catch (error) {
    messageElement.textContent = "Server error during login.";
    messageElement.style.color = "#d64040";
    console.error(error);
  }
});