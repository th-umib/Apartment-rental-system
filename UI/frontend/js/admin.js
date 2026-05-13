if (localStorage.getItem("smartapart_admin_logged_in") !== "true") {
  window.location.href = "/admin-login";
}

document.addEventListener("DOMContentLoaded", () => {
  const apartmentForm = document.getElementById("apartment-form");
  const apartmentsList = document.getElementById("admin-apartments-list");
  const totalApartments = document.getElementById("total-apartments");

  const apartmentIdInput = document.getElementById("apartment-id");
  const titleInput = document.getElementById("title");
  const cityInput = document.getElementById("city");
  const addressInput = document.getElementById("address");
  const priceInput = document.getElementById("price");
  const saveApartmentBtn = document.getElementById("save-apartment-btn");

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
    if (saveApartmentBtn) saveApartmentBtn.textContent = "Add Apartment";
  }

  async function loadApartments() {
    try {
      const response = await fetch("http://localhost:3000/apartments");
      const apartments = await response.json();

      if (!response.ok) {
        throw new Error("Failed to load apartments.");
      }

      if (totalApartments) {
        totalApartments.textContent = Array.isArray(apartments)
          ? apartments.length
          : 0;
      }

      if (!apartmentsList) return;

      if (!Array.isArray(apartments) || apartments.length === 0) {
        apartmentsList.innerHTML = "<p>No apartments loaded yet.</p>";
        return;
      }

      apartmentsList.innerHTML = apartments
        .map(
          (apartment) => `
            <div class="admin-item">
              <h3>${apartment.title || "Untitled Apartment"}</h3>
              <p><strong>City:</strong> ${apartment.city || "Not specified"}</p>
              <p><strong>Address:</strong> ${apartment.address || "Not specified"}</p>
              <p><strong>Price:</strong> €${apartment.price_per_month ?? "0.00"}</p>

              <div class="admin-item-actions">
                <button type="button" class="edit-btn" data-id="${apartment.id}">
                  Edit
                </button>
                <button type="button" class="delete-btn" data-id="${apartment.id}">
                  Delete
                </button>
              </div>
            </div>
          `
        )
        .join("");

      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

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
          if (priceInput) priceInput.value = apartment.price_per_month || "";
          if (saveApartmentBtn) saveApartmentBtn.textContent = "Update Apartment";

          window.scrollTo({ top: 0, behavior: "smooth" });

          setTimeout(() => {
            showTopMessage(
              "Apartment loaded for editing. You can now update the details.",
              "success"
            );
          }, 300);
        });
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();

          const apartmentId = button.dataset.id;

          try {
            const response = await fetch(
              `http://localhost:3000/apartments/${apartmentId}`,
              {
                method: "DELETE",
              }
            );

            let result = {};
            const text = await response.text();

            try {
              result = text ? JSON.parse(text) : {};
            } catch {
              result = {};
            }

            if (!response.ok) {
              throw new Error(result.message || "Failed to delete apartment.");
            }

            showTopMessage("Apartment deleted successfully.", "success");
            resetForm();
            loadApartments();
          } catch (error) {
            showTopMessage(
              error.message ||
                "Something went wrong while deleting the apartment.",
              "error"
            );
          }
        });
      });
    } catch (error) {
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
            ? `http://localhost:3000/apartments/${apartmentId}`
            : "http://localhost:3000/apartments",
          {
            method: isEditing ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apartmentData),
          }
        );

        let result = {};
        const text = await response.text();

        try {
          result = text ? JSON.parse(text) : {};
        } catch {
          result = {};
        }

        if (!response.ok) {
          throw new Error(result.message || "Failed to save apartment.");
        }

        if (isEditing) {
          showTopMessage("Apartment updated successfully.", "success");
        } else {
          showTopMessage("Apartment added successfully.", "success");
        }

        resetForm();
        loadApartments();
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