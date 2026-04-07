const apartmentList = document.getElementById("apartment-list");
const apartmentForm = document.getElementById("apartment-form");
const apartmentIdInput = document.getElementById("apartment-id");
const titleInput = document.getElementById("title");
const cityInput = document.getElementById("city");
const addressInput = document.getElementById("address");
const priceInput = document.getElementById("price");
const isAvailableInput = document.getElementById("isAvailable");
const submitBtn = document.getElementById("submit-btn");

const searchTitleInput = document.getElementById("search-title");
const searchCityInput = document.getElementById("search-city");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");

let apartmentsData = [];

async function loadApartments() {
  try {
    const response = await fetch("/apartments");
    const data = await response.json();

    apartmentsData = Array.isArray(data) ? data : [];
    renderApartments(apartmentsData);
  } catch (error) {
    console.error("Error loading apartments:", error);
    apartmentList.innerHTML = "<p>Failed to load apartments.</p>";
  }
}

function renderApartments(apartments) {
  apartmentList.innerHTML = "";

  if (!apartments.length) {
    apartmentList.innerHTML = "<p>No apartments found.</p>";
    return;
  }

  apartments.forEach((apartment) => {
    const card = document.createElement("div");
    card.className = "card apartment-card";

    card.innerHTML = `
      <div class="apartment-content">
        <h3>${apartment.title}</h3>
        <p><strong>City:</strong> ${apartment.city}</p>
        <p><strong>Address:</strong> ${apartment.address || "-"}</p>
        <p><strong>Price:</strong> €${apartment.price_per_month}</p>
        <p><strong>Status:</strong> ${apartment.is_available ? "Available" : "Not Available"}</p>

        <div class="form-actions" style="margin-top: 12px;">
          <button class="btn btn-primary edit-btn" data-id="${apartment.id}">Edit</button>
          <button class="btn btn-secondary-outline delete-btn" data-id="${apartment.id}">Delete</button>
        </div>
      </div>
    `;

    apartmentList.appendChild(card);
  });

  attachCardEvents();
}

function attachCardEvents() {
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const apartment = apartmentsData.find((a) => a.id === id);

      if (!apartment) return;

      apartmentIdInput.value = apartment.id;
      titleInput.value = apartment.title || "";
      cityInput.value = apartment.city || "";
      addressInput.value = apartment.address || "";
      priceInput.value = apartment.price_per_month || "";
      isAvailableInput.value = apartment.is_available ? "true" : "false";

      submitBtn.textContent = "Update Apartment";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = Number(button.dataset.id);
      const confirmed = confirm("Are you sure you want to delete this apartment?");

      if (!confirmed) return;

      try {
        const response = await fetch(`/apartments/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete apartment");
        }

        await loadApartments();
      } catch (error) {
        console.error("Error deleting apartment:", error);
        alert("Failed to delete apartment.");
      }
    });
  });
}

apartmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = apartmentIdInput.value.trim();

  const payload = {
    title: titleInput.value.trim(),
    description: "Apartment added from frontend form",
    city: cityInput.value.trim(),
    address: addressInput.value.trim(),
    price_per_month: Number(priceInput.value),
    bedrooms: 1,
    bathrooms: 1,
    size_m2: 50,
    image_url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    is_available: isAvailableInput.value === "true",
    created_by: 1,
  };

  try {
    const url = id ? `/apartments/${id}` : "/apartments";
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert(data.message || "Something went wrong.");
      return;
    }

    apartmentForm.reset();
    apartmentIdInput.value = "";
    submitBtn.textContent = "Save Apartment";

    await loadApartments();
  } catch (error) {
    console.error("Error saving apartment:", error);
    alert("Failed to save apartment.");
  }
});

searchBtn.addEventListener("click", () => {
  const titleValue = searchTitleInput.value.trim().toLowerCase();
  const cityValue = searchCityInput.value.trim().toLowerCase();

  const filtered = apartmentsData.filter((apartment) => {
    const matchesTitle = apartment.title.toLowerCase().includes(titleValue);
    const matchesCity = apartment.city.toLowerCase().includes(cityValue);
    return matchesTitle && matchesCity;
  });

  renderApartments(filtered);
});

resetBtn.addEventListener("click", () => {
  searchTitleInput.value = "";
  searchCityInput.value = "";
  renderApartments(apartmentsData);
});

loadApartments();