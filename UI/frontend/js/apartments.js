document.addEventListener("DOMContentLoaded", () => {
  const apartmentList = document.getElementById("apartment-list");
  const searchTitleInput = document.getElementById("search-title");
  const searchCityInput = document.getElementById("search-city");
  const searchBtn = document.getElementById("search-btn");
  const resetBtn = document.getElementById("reset-btn");
  const apartmentFeedback = document.getElementById("apartment-feedback");

  let apartmentsData = [];

  function showFeedback(message, type = "success") {
    if (!apartmentFeedback) return;

    apartmentFeedback.textContent = message;
    apartmentFeedback.className = `apartment-feedback ${type}`;

    setTimeout(() => {
      if (apartmentFeedback.textContent === message) {
        apartmentFeedback.textContent = "";
        apartmentFeedback.className = "apartment-feedback";
      }
    }, 3000);
  }

  async function fetchApartments() {
    const response = await fetch("/apartments");

    if (!response.ok) {
      throw new Error("Failed to load apartments.");
    }

    return await response.json();
  }

  function getApartmentPrice(apartment) {
    return apartment.price_per_month ?? apartment.price ?? "0.00";
  }

  function getAvailability(apartment) {
    return apartment.is_available === false || apartment.isAvailable === false
      ? "Not Available"
      : "Available";
  }

  function renderApartments(apartments) {
    if (!apartmentList) return;

    if (!Array.isArray(apartments) || apartments.length === 0) {
      apartmentList.innerHTML = `
        <div class="public-empty-state">
          <h3>No apartments found</h3>
          <p>Try changing your search filters or check again later.</p>
        </div>
      `;
      return;
    }

    apartmentList.innerHTML = apartments
      .map((apartment) => {
        const availability = getAvailability(apartment);
        const isAvailable = availability === "Available";

        return `
          <article class="public-apartment-card">
            <div class="public-apartment-top">
              <span class="public-apartment-badge ${isAvailable ? "available" : "unavailable"}">
                ${availability}
              </span>
              <span class="public-apartment-price">€${getApartmentPrice(apartment)}</span>
            </div>

            <h3>${apartment.title || "Untitled Apartment"}</h3>

            <div class="public-apartment-info">
              <p><strong>City:</strong> ${apartment.city || "N/A"}</p>
              <p><strong>Address:</strong> ${apartment.address || "N/A"}</p>
            </div>

            <p class="public-apartment-desc">
              ${apartment.description || "A comfortable apartment option suitable for students, families, and professionals looking for a reliable place to stay."}
            </p>

            <div class="public-apartment-actions">
              <a class="btn btn-primary" href="bookings.html">
                Book Now
              </a>
              <a class="btn btn-secondary-outline" href="contact.html">
                Send Inquiry
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  async function loadApartments() {
    try {
      apartmentsData = await fetchApartments();
      renderApartments(apartmentsData);
    } catch (error) {
      if (apartmentList) {
        apartmentList.innerHTML = `
          <div class="public-empty-state">
            <h3>Unable to load apartments</h3>
            <p>${error.message || "Something went wrong while loading apartments."}</p>
          </div>
        `;
      }

      showFeedback(
        error.message || "Something went wrong while loading apartments.",
        "error"
      );
    }
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const titleValue = searchTitleInput ? searchTitleInput.value.trim().toLowerCase() : "";
      const cityValue = searchCityInput ? searchCityInput.value.trim().toLowerCase() : "";

      const filtered = apartmentsData.filter((apartment) => {
        const titleMatch = (apartment.title || "").toLowerCase().includes(titleValue);
        const cityMatch = (apartment.city || "").toLowerCase().includes(cityValue);

        return titleMatch && cityMatch;
      });

      renderApartments(filtered);
      showFeedback("Search completed successfully.", "success");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchTitleInput) searchTitleInput.value = "";
      if (searchCityInput) searchCityInput.value = "";

      renderApartments(apartmentsData);
      showFeedback("Filters were reset.", "success");
    });
  }

  loadApartments();
});