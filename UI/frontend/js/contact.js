const inquiryList = document.getElementById("inquiry-list");

async function loadInquiries() {
  try {
    const response = await fetch("/inquiries");
    const inquiries = await response.json();

    inquiryList.innerHTML = "";

    if (!inquiries.length) {
      inquiryList.innerHTML = "<p>No inquiries found.</p>";
      return;
    }

    inquiries.forEach((inquiry) => {
      const card = document.createElement("div");
      card.className = "card apartment-card";

      card.innerHTML = `
        <div class="apartment-content">
          <h3>${inquiry.apartment_title}</h3>
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Message:</strong> ${inquiry.message}</p>
        </div>
      `;

      inquiryList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading inquiries:", error);
    inquiryList.innerHTML = "<p>Failed to load inquiries.</p>";
  }
}

loadInquiries();