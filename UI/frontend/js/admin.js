document.addEventListener("DOMContentLoaded", () => {
  const bookingsList =
    document.getElementById("bookings-list") ||
    document.getElementById("admin-bookings-list") ||
    document.getElementById("booking-requests");

  const totalBookings = document.getElementById("total-bookings");

  function showMessage(message, type = "error") {
    if (!bookingsList) return;

    bookingsList.innerHTML = `
      <div class="empty-state ${type}">
        <h3>${type === "error" ? "Unable to load bookings" : "No bookings found"}</h3>
        <p>${message}</p>
      </div>
    `;
  }

  function formatValue(value, fallback = "Not specified") {
    return value === null || value === undefined || value === "" ? fallback : value;
  }

  function formatPrice(value) {
    if (value === null || value === undefined || value === "") {
      return "€0.00";
    }

    return `€${Number(value).toFixed(2)}`;
  }

  function getBookingTitle(booking) {
    return (
      booking.apartment_title ||
      booking.title ||
      booking.apartment_name ||
      booking.property_title ||
      "Apartment Booking"
    );
  }

  function getCustomerName(booking) {
    return (
      booking.customer_name ||
      booking.full_name ||
      booking.name ||
      booking.client_name ||
      "Unknown customer"
    );
  }

  function getCustomerEmail(booking) {
    return booking.customer_email || booking.email || booking.client_email || "No email";
  }

  function getCustomerPhone(booking) {
    return booking.customer_phone || booking.phone || booking.client_phone || "No phone";
  }

  function getBookingDate(booking) {
    return (
      booking.booking_date ||
      booking.created_at ||
      booking.date ||
      booking.move_in_date ||
      "Not specified"
    );
  }

  function getBookingStatus(booking) {
    return booking.status || booking.booking_status || "Pending";
  }

  function createBookingCard(booking) {
    const title = getBookingTitle(booking);
    const customerName = getCustomerName(booking);
    const customerEmail = getCustomerEmail(booking);
    const customerPhone = getCustomerPhone(booking);
    const date = getBookingDate(booking);
    const status = getBookingStatus(booking);
    const price = booking.price_per_month || booking.price || booking.total_price;

    return `
      <div class="admin-item booking-card">
        <div class="admin-item-header">
          <div>
            <h3>${title}</h3>
            <p><strong>Customer:</strong> ${customerName}</p>
          </div>
          <span class="status-badge">${status}</span>
        </div>

        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Date:</strong> ${formatValue(date)}</p>
        <p><strong>Price:</strong> ${formatPrice(price)}</p>

        ${
          booking.message
            ? `<p><strong>Message:</strong> ${booking.message}</p>`
            : ""
        }
      </div>
    `;
  }

  async function loadBookings() {
    if (!bookingsList) return;

    try {
      bookingsList.innerHTML = "<p>Loading bookings...</p>";

      const response = await fetch("http://localhost:3000/bookings");

      if (!response.ok) {
        throw new Error(
          "Bookings are available only when the backend server is running."
        );
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Bookings are available only when the backend server is running."
        );
      }

      const bookings = await response.json();

      if (totalBookings) {
        totalBookings.textContent = Array.isArray(bookings) ? bookings.length : 0;
      }

      if (!Array.isArray(bookings) || bookings.length === 0) {
        showMessage("There are no booking requests yet.", "success");
        return;
      }

      bookingsList.innerHTML = bookings.map(createBookingCard).join("");
    } catch (error) {
      showMessage(
        error.message || "Something went wrong while loading bookings.",
        "error"
      );
    }
  }

  loadBookings();
});