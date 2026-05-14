document.addEventListener("DOMContentLoaded", () => {
  const apartmentsList =
    document.getElementById("apartments-list") ||
    document.getElementById("admin-apartments-list") ||
    document.getElementById("apartment-list");

  const totalApartments = document.getElementById("total-apartments");

  const demoApartments = [
    {
      title: "Modern Apartment in Mitrovica",
      city: "Mitrovica",
      address: "Rruga Mbretëresha Teutë",
      price_per_month: 350,
      description:
        "A modern and comfortable apartment located near the city center, suitable for students and families.",
    },
    {
      title: "Cozy Studio Apartment",
      city: "Mitrovica",
      address: "Near University Area",
      price_per_month: 250,
      description:
        "A practical studio apartment with a clean layout, ideal for students and young professionals.",
    },
    {
      title: "Family Apartment",
      city: "Vushtrri",
      address: "Main Street",
      price_per_month: 420,
      description:
        "A spacious apartment designed for family living, with easy access to daily services.",
    },
  ];

  function formatPrice(value) {
    if (value === null || value === undefined || value === "") {
      return "€0.00";
    }

    return `€${Number(value).toFixed(2)}`;
  }

  function createApartmentCard(apartment) {
    const title = apartment.title || "Untitled Apartment";
    const city = apartment.city || "Not specified";
    const address = apartment.address || "Not specified";
    const price = apartment.price_per_month || apartment.price || 0;
    const description =
      apartment.description || "A comfortable apartment listed on SmartApart.";

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

  function renderApartments(apartments) {
    if (!apartmentsList) return;

    if (totalApartments) {
      totalApartments.textContent = apartments.length;
    }

    apartmentsList.innerHTML = apartments.map(createApartmentCard).join("");
  }

  async function loadApartments() {
    if (!apartmentsList) return;

    try {
      apartmentsList.innerHTML = "<p>Loading apartments...</p>";

      const response = await fetch("http://localhost:3000/apartments");

      if (!response.ok) {
        throw new Error("Backend is not available.");
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend did not return JSON.");
      }

      const apartments = await response.json();

      if (!Array.isArray(apartments) || apartments.length === 0) {
        renderApartments(demoApartments);
        return;
      }

      renderApartments(apartments);
    } catch (error) {
      renderApartments(demoApartments);
    }
  }

  loadApartments();
});