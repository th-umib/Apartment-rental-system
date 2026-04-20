document.addEventListener("DOMContentLoaded", () => {
  const apartmentForm = document.getElementById("apartment-form");
  const apartmentMessage = document.getElementById("apartment-message");
  const apartmentsList = document.getElementById("admin-apartments-list");
  const totalApartments = document.getElementById("total-apartments");

  function showMessage(message, type = "error") {
    if (!apartmentMessage) return;
    apartmentMessage.textContent = message;
    apartmentMessage.style.color = type === "success" ? "green" : "red";
  }

  async function fetchApartments() {
    const response = await fetch("/apartments");

    if (!response.ok) {
      throw new Error("Failed to load apartments.");
    }

    return await response.json();
  }

  function renderApartments(apartments) {
    if (!apartmentsList) return;

    if (!Array.isArray(apartments) || apartments.length === 0) {
      apartmentsList.innerHTML = "<p>No apartments loaded yet.</p>";
      return;
    }

    apartmentsList.innerHTML = apartments
      .map(
        (apartment) => `
          <div class="admin-item" style="border:1px solid #ddd; padding:12px; border-radius:10px; margin-bottom:12px;">
            <h3>${apartment.title || "Untitled Apartment"}</h3>
            <p><strong>Description:</strong> ${apartment.description || "N/A"}</p>
            <p><strong>City:</strong> ${apartment.city || "N/A"}</p>
            <p><strong>Address:</strong> ${apartment.address || "N/A"}</p>
            <p><strong>Price per month:</strong> ${apartment.price_per_month ?? 0} €</p>
            <p><strong>Bedrooms:</strong> ${apartment.bedrooms ?? 0}</p>
            <p><strong>Bathrooms:</strong> ${apartment.bathrooms ?? 0}</p>
            <p><strong>Availability:</strong> ${
              apartment.is_available === false || apartment.isAvailable === false
                ? "Not Available"
                : "Available"
            }</p>
          </div>
        `
      )
      .join("");
  }

  async function loadApartments() {
    try {
      const apartments = await fetchApartments();

      if (totalApartments) {
        totalApartments.textContent = Array.isArray(apartments) ? apartments.length : 0;
      }

      renderApartments(apartments);
    } catch (error) {
      console.error("Load apartments error:", error);
      showMessage(error.message || "Something went wrong while loading apartments.");
    }
  }

  if (!apartmentForm) return;

  apartmentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title")?.value.trim();
    const description = document.getElementById("description")?.value.trim();
    const city = document.getElementById("city")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const price_per_month = document.getElementById("price_per_month")?.value.trim();
    const bedrooms = document.getElementById("bedrooms")?.value.trim();
    const bathrooms = document.getElementById("bathrooms")?.value.trim();

    if (!title || !description || !city || !address || !price_per_month || !bedrooms || !bathrooms) {
      showMessage("Please fill in all required fields.");
      return;
    }

    if (
      isNaN(price_per_month) || Number(price_per_month) <= 0 ||
      isNaN(bedrooms) || Number(bedrooms) < 0 ||
      isNaN(bathrooms) || Number(bathrooms) < 0
    ) {
      showMessage("Please enter valid numeric values.");
      return;
    }

    try {
      const response = await fetch("/apartments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          city,
          address,
          price_per_month: Number(price_per_month),
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add apartment.");
      }

      showMessage("Apartment added successfully.", "success");
      apartmentForm.reset();
      loadApartments();
    } catch (error) {
      console.error("Create apartment error:", error);
      showMessage(error.message || "Something went wrong while creating the apartment.");
    }
  });

  loadApartments();
});