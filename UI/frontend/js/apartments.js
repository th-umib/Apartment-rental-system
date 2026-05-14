document.addEventListener("DOMContentLoaded", () => {
  const apartmentsList =
    document.getElementById("apartments-list") ||
    document.getElementById("admin-apartments-list") ||
    document.getElementById("apartment-list");

  const totalApartments = document.getElementById("total-apartments");

  function showMessage(title, message, type = "error") {
    if (!apartmentsList) return;

    apartmentsList.innerHTML = `
      <div class="empty-state ${type}">
        <h3>${title}</h3>
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

  function createApartmentCard(apartment) {
    const title = apartment.title || apartment.name || "Untitled Apartment";
    const city = apartment.city || "Not specified";
    const address = apartment.address || "Not specified";
    const price = apartment.price_per_month || apartment.price || 0;
    const description =
      apartment.description ||
      "A comfortable apartment listed on SmartApart.";

    return `
      <div class="apartment-card">
        <div class="apartment-content">
          <h3>${title}</h3>
          <p>${description}</p>

          <div class="apartment-meta">
            <span><strong>City:</strong> ${city}</span>
            <span><strong>Address:</strong> ${address}</span>
            <span><strong>Price:</strong> ${formatPrice(price)}</span>
          </div>

          <a href="bookings.html" class="primary-btn">Book Apartment</a>
        </div>
      </div>
    `;
  }

  async function loadApartments() {
    if (!apartmentsList) return;

    try {
      apartmentsList.innerHTML = "<p>Loading apartments...</p>";

      const response = await fetch("http://localhost:3000/apartments");

      if (!response.ok) {
        throw new Error(
          "Apartments are available only when the backend server is running."
        );
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Apartments are available only when the backend server is running."
        );
      }

      const apartments = await response.json();

      if (totalApartments) {
        totalApartments.textContent = Array.isArray(apartments)
          ? apartments.length
          : 0;
      }

      if (!Array.isArray(apartments) || apartments.length === 0) {
        showMessage(
          "No apartments found",
          "There are no apartments available at the moment.",
          "success"
        );
        return;
      }

      apartmentsList.innerHTML = apartments.map(createApartmentCard).join("");
    } catch (error) {
      showMessage(
        "Unable to load apartments",
        error.message || "Something went wrong while loading apartments.",
        "error"
      );
    }
  }

  loadApartments();
});