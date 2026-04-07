const bookingList = document.getElementById("booking-list");

async function loadBookings() {
  try {
    const response = await fetch("/bookings");
    const bookings = await response.json();

    bookingList.innerHTML = "";

    if (!bookings.length) {
      bookingList.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    bookings.forEach((booking) => {
      const card = document.createElement("div");
      card.className = "card apartment-card";

      card.innerHTML = `
        <div class="apartment-content">
          <h3>${booking.apartment_title}</h3>
          <p><strong>User:</strong> ${booking.user_name}</p>
          <p><strong>Visit Date:</strong> ${new Date(booking.visit_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${booking.status}</p>
          <p><strong>Notes:</strong> ${booking.notes || "-"}</p>

          <div class="form-actions" style="margin-top: 12px;">
            <button class="btn btn-primary" onclick="updateBookingStatus(${booking.id}, 'approved')">Approve</button>
            <button class="btn btn-secondary-outline" onclick="updateBookingStatus(${booking.id}, 'pending')">Pending</button>
          </div>
        </div>
      `;

      bookingList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading bookings:", error);
    bookingList.innerHTML = "<p>Failed to load bookings.</p>";
  }
}

async function updateBookingStatus(id, status) {
  try {
    const response = await fetch(`/bookings/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update booking status");
    }

    loadBookings();
  } catch (error) {
    console.error("Error updating booking:", error);
    alert("Failed to update booking status.");
  }
}

loadBookings();