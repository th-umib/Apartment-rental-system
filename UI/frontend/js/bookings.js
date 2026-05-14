document.addEventListener("DOMContentLoaded", () => {
  const bookingList =
    document.getElementById("booking-list") ||
    document.getElementById("bookings-list") ||
    document.getElementById("admin-bookings-list") ||
    document.getElementById("booking-requests");

  const totalBookings = document.getElementById("total-bookings");

  const demoBookings = [
    {
      apartment_title: "Modern Apartment in Mitrovica",
      user_name: "Arta Krasniqi",
      visit_date: "2026-05-20",
      status: "Pending",
      phone: "+383 44 123 456",
      message: "Interested in visiting the apartment this week.",
    },
    {
      apartment_title: "Cozy Studio Apartment",
      user_name: "Dion Berisha",
      visit_date: "2026-05-22",
      status: "Approved",
      phone: "+383 49 555 222",
      message: "Looking for a student apartment near the university.",
    },
    {
      apartment_title: "Family Apartment",
      user_name: "Elira Hoxha",
      visit_date: "2026-05-25",
      status: "Pending",
      phone: "+383 45 987 654",
      message: "Would like more details about monthly payment options.",
    },
  ];

  function renderBookings(bookings) {
    if (!bookingList) return;

    if (totalBookings) {
      totalBookings.textContent = bookings.length;
    }

    if (!Array.isArray(bookings) || bookings.length === 0) {
      bookingList.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookingList.innerHTML = "";

    bookings.forEach((booking) => {
      const card = document.createElement("div");
      card.className = "apartment-card";

      const apartmentTitle =
        booking.apartment_title ||
        booking.title ||
        booking.apartment_name ||
        "Apartment Booking";

      const userName =
        booking.user_name ||
        booking.customer_name ||
        booking.full_name ||
        booking.name ||
        "Unknown user";

      const visitDate =
        booking.visit_date ||
        booking.booking_date ||
        booking.created_at ||
        "Not specified";

      const status = booking.status || "Pending";
      const phone = booking.phone || booking.customer_phone || "Not specified";
      const message =
        booking.message || "No additional message was provided.";

      card.innerHTML = `
        <div class="apartment-content">
          <h3>${apartmentTitle}</h3>
          <p><strong>User:</strong> ${userName}</p>
          <p><strong>Visit Date:</strong> ${visitDate}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p>${message}</p>
        </div>
      `;

      bookingList.appendChild(card);
    });
  }

  async function loadBookings() {
    if (!bookingList) return;

    try {
      bookingList.innerHTML = "<p>Loading bookings...</p>";

      const response = await fetch("http://localhost:3000/bookings");

      if (!response.ok) {
        throw new Error("Backend is not available.");
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend did not return JSON.");
      }

      const bookings = await response.json();

      if (!Array.isArray(bookings) || bookings.length === 0) {
        renderBookings(demoBookings);
        return;
      }

      renderBookings(bookings);
    } catch (error) {
      renderBookings(demoBookings);
    }
  }

  loadBookings();
});