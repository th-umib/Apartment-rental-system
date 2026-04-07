document.addEventListener("DOMContentLoaded", () => {
  const inquiryForm = document.getElementById("inquiry-form");
  const inquiryMessage = document.getElementById("inquiry-message");

  if (!inquiryForm) return;

  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      inquiryMessage.textContent = "Please fill in all fields.";
      inquiryMessage.style.color = "red";
      return;
    }

    try {
      const response = await fetch("/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send inquiry.");
      }

      inquiryMessage.textContent = "Inquiry sent successfully.";
      inquiryMessage.style.color = "green";
      inquiryForm.reset();
    } catch (error) {
      inquiryMessage.textContent = error.message || "Something went wrong.";
      inquiryMessage.style.color = "red";
      console.error(error);
    }
  });
});