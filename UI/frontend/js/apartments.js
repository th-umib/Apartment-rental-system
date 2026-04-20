document.addEventListener("DOMContentLoaded", () => {
  const apartmentForm = document.getElementById("apartment-form");
  const apartmentIdInput = document.getElementById("apartment-id");
  const apartmentList = document.getElementById("apartment-list");
  const submitBtn = document.getElementById("submit-btn");
  const searchTitleInput = document.getElementById("search-title");
  const searchCityInput = document.getElementById("search-city");
  const searchBtn = document.getElementById("search-btn");
  const resetBtn = document.getElementById("reset-btn");

  let apartmentsData = [];

  async function fetchApartments() {
    const response = await fetch("/apartments");

    if (!response.ok) {
      throw new Error("Failed to load apartments.");
    }

    return await response.json();
  }

  function renderApartments(apartments) {
    if (!apartmentList) return;

    if (!Array.isArray(apartments) || apartments.length === 0) {
      apartmentList.innerHTML = "<p>No apartments available yet.</p>";
      return;
    }

    apartmentList.innerHTML = apartments
      .map(
        (apartment) => `
          <div class="card apartment-card-modern">
            <h3>${apartment.title || "Untitled Apartment"}</h3>
            <p><strong>City:</strong> ${apartment.city || "N/A"}</p>
            <p><strong>Address:</strong> ${apartment.address || "N/A"}</p>
            <p><strong>Price:</strong> ${apartment.price_per_month ?? apartment.price ?? 0} €</p>
            <p><strong>Availability:</strong> ${
              apartment.is_available === false || apartment.isAvailable === false
                ? "Not Available"
                : "Available"
            }</p>

            <div style="margin-top: 12px; display: flex; gap: 10px;">
              <button class="btn btn-primary edit-btn" data-id="${apartment.id}">Edit</button>
              <button class="btn btn-secondary-outline delete-btn" data-id="${apartment.id}">Delete</button>
            </div>
          </div>
        `
      )
      .join("");

    attachCardActions();
  }

  function attachCardActions() {
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.id);
        const apartment = apartmentsData.find((item) => item.id === id);

        if (!apartment) return;

        apartmentIdInput.value = apartment.id;
        document.getElementById("title").value = apartment.title || "";
        document.getElementById("city").value = apartment.city || "";
        document.getElementById("address").value = apartment.address || "";
        document.getElementById("price").value =
          apartment.price_per_month ?? apartment.price ?? "";
        document.getElementById("isAvailable").value =
          apartment.is_available === false || apartment.isAvailable === false
            ? "false"
            : "true";

        submitBtn.textContent = "Update Apartment";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const id = Number(button.dataset.id);

        if (!confirm("Are you sure you want to delete this apartment?")) {
          return;
        }

        try {
          const response = await fetch(`/apartments/${id}`, {
            method: "DELETE"
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to delete apartment.");
          }

          await loadApartments();
        } catch (error) {
          console.error("Delete apartment error:", error);
          alert(error.message || "Something went wrong while deleting the apartment.");
        }
      });
    });
  }

  async function loadApartments() {
    try {
      apartmentsData = await fetchApartments();
      renderApartments(apartmentsData);
    } catch (error) {
      console.error("Load apartments error:", error);
      if (apartmentList) {
        apartmentList.innerHTML = `<p>${error.message || "Something went wrong while loading apartments."}</p>`;
      }
    }
  }

  if (apartmentForm) {
    apartmentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = apartmentIdInput.value.trim();
      const title = document.getElementById("title").value.trim();
      const city = document.getElementById("city").value.trim();
      const address = document.getElementById("address").value.trim();
      const price = document.getElementById("price").value.trim();
      const isAvailable = document.getElementById("isAvailable").value === "true";

      if (!title || !city || !address || !price) {
        alert("Please fill in all required fields.");
        return;
      }

      if (isNaN(price) || Number(price) <= 0) {
        alert("Price must be a valid positive number.");
        return;
      }

      const payload = {
        title,
        city,
        address,
        price: Number(price),
        isAvailable
      };

      try {
        let response;

        if (id) {
          response = await fetch(`/apartments/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
        } else {
          response = await fetch("/apartments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to save apartment.");
        }

        apartmentForm.reset();
        apartmentIdInput.value = "";
        submitBtn.textContent = "Save Apartment";

        await loadApartments();
      } catch (error) {
        console.error("Save apartment error:", error);
        alert(error.message || "Something went wrong while saving the apartment.");
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const titleValue = searchTitleInput.value.trim().toLowerCase();
      const cityValue = searchCityInput.value.trim().toLowerCase();

      const filtered = apartmentsData.filter((apartment) => {
        const titleMatch = (apartment.title || "").toLowerCase().includes(titleValue);
        const cityMatch = (apartment.city || "").toLowerCase().includes(cityValue);
        return titleMatch && cityMatch;
      });

      renderApartments(filtered);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      searchTitleInput.value = "";
      searchCityInput.value = "";
      renderApartments(apartmentsData);
    });
  }

  loadApartments();
});