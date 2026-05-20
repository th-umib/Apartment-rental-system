if (localStorage.getItem("smartapart_admin_logged_in") !== "true") {
  window.location.href = "admin-login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "http://localhost:3000";

  const apartmentForm = document.getElementById("apartment-form");
  const apartmentsList = document.getElementById("admin-apartments-list");
  const totalApartments = document.getElementById("total-apartments");
  const aptCountLabel = document.getElementById("apt-count-label");

  const apartmentIdInput = document.getElementById("apartment-id");
  const titleInput = document.getElementById("title");
  const cityInput = document.getElementById("city");
  const addressInput = document.getElementById("address");
  const priceInput = document.getElementById("price");
  const saveApartmentBtn = document.getElementById("save-apartment-btn");
  const formSectionTitle = document.getElementById("form-section-title");

  function ensureMessageBox() {
    let box = document.getElementById("top-message-box");

    if (!box) {
      box = document.createElement("div");
      box.id = "top-message-box";
      box.className = "top-message-box";
      document.body.appendChild(box);
    }

    return box;
  }

  function showTopMessage(message, type = "success") {
    const box = ensureMessageBox();

    box.textContent = message;
    box.className = `top-message-box ${type} show`;

    setTimeout(() => {
      box.classList.remove("show");
    }, 3000);
  }

  function resetForm() {
    if (apartmentForm) apartmentForm.reset();
    if (apartmentIdInput) apartmentIdInput.value = "";
    if (saveApartmentBtn) saveApartmentBtn.textContent = "+ Add Apartment";
    if (formSectionTitle) formSectionTitle.textContent = "Add New Apartment";
  }

  async function readJsonResponse(response) {
    const text = await response.text();

    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  }

  function getPrice(apartment) {
    return (
      apartment.price_per_month ??
      apartment.price ??
      apartment.price_per_night ??
      "0.00"
    );
  }

  function renderApartments(apartments) {
    if (!apartmentsList) return;

    if (!Array.isArray(apartments) || apartments.length === 0) {
      apartmentsList.innerHTML =
        '<p style="font-size:13px; color:var(--text-muted);">No apartments loaded yet.</p>';

      if (totalApartments) totalApartments.textContent = "0";
      if (aptCountLabel) aptCountLabel.textContent = "(0 apartments)";
      return;
    }

    if (totalApartments) totalApartments.textContent = apartments.length;
    if (aptCountLabel) aptCountLabel.textContent = `(${apartments.length} apartments)`;

    apartmentsList.innerHTML = apartments
      .map((apartment) => {
        return `
          <div class="admin-item">
            <h3>${apartment.title || "Untitled Apartment"}</h3>
            <p><strong>City:</strong> ${apartment.city || "Not specified"}</p>
            <p><strong>Address:</strong> ${apartment.address || "Not specified"}</p>
            <p><strong>Price:</strong> €${getPrice(apartment)}</p>

            <div class="admin-item-actions">
              <button type="button" class="edit-btn" data-id="${apartment.id}">
                Edit
              </button>
              <button type="button" class="delete-btn" data-id="${apartment.id}">
                Delete
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const apartment = apartments.find(
          (item) => String(item.id) === String(button.dataset.id)
        );

        if (!apartment) {
          showTopMessage("Apartment could not be loaded for editing.", "error");
          return;
        }

        if (apartmentIdInput) apartmentIdInput.value = apartment.id;
        if (titleInput) titleInput.value = apartment.title || "";
        if (cityInput) cityInput.value = apartment.city || "";
        if (addressInput) addressInput.value = apartment.address || "";
        if (priceInput) priceInput.value = getPrice(apartment);

        if (saveApartmentBtn) saveApartmentBtn.textContent = "Update Apartment";
        if (formSectionTitle) formSectionTitle.textContent = "Update Apartment";

        window.scrollTo({ top: 0, behavior: "smooth" });

        showTopMessage(
          "Apartment loaded for editing. You can now update the details.",
          "success"
        );
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const apartmentId = button.dataset.id;

        if (!confirm("Are you sure you want to delete this apartment?")) {
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/apartments/${apartmentId}`, {
            method: "DELETE",
          });

          const result = await readJsonResponse(response);

          if (!response.ok) {
            throw new Error(result.message || "Failed to delete apartment.");
          }

          showTopMessage("Apartment deleted successfully.", "success");
          resetForm();
          await loadApartments();
        } catch (error) {
          showTopMessage(
            error.message || "Something went wrong while deleting the apartment.",
            "error"
          );
        }
      });
    });
  }

  async function loadApartments() {
    try {
      const response = await fetch(`${API_BASE_URL}/apartments`);

      if (!response.ok) {
        throw new Error("Failed to load apartments.");
      }

      const apartments = await response.json();
      renderApartments(apartments);
    } catch (error) {
      if (apartmentsList) {
        apartmentsList.innerHTML =
          '<p style="font-size:13px; color:var(--text-muted);">Unable to load apartments. Make sure the backend server is running.</p>';
      }

      showTopMessage(
        error.message || "Something went wrong while loading apartments.",
        "error"
      );
    }
  }

  if (apartmentForm) {
    apartmentForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const apartmentId = apartmentIdInput ? apartmentIdInput.value.trim() : "";
      const isEditing = apartmentId !== "";

      const apartmentData = {
        title: titleInput ? titleInput.value.trim() : "",
        city: cityInput ? cityInput.value.trim() : "",
        address: addressInput ? addressInput.value.trim() : "",
        price_per_month: priceInput ? Number(priceInput.value) : 0,
      };

      try {
        const response = await fetch(
          isEditing
            ? `${API_BASE_URL}/apartments/${apartmentId}`
            : `${API_BASE_URL}/apartments`,
          {
            method: isEditing ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apartmentData),
          }
        );

        const result = await readJsonResponse(response);

        if (!response.ok) {
          throw new Error(result.message || "Failed to save apartment.");
        }

        showTopMessage(
          isEditing
            ? "Apartment updated successfully."
            : "Apartment added successfully.",
          "success"
        );

        resetForm();
        await loadApartments();
      } catch (error) {
        showTopMessage(
          error.message || "Something went wrong while saving the apartment.",
          "error"
        );
      }
    });
  }

  loadApartments();
});