alert("admin.js loaded");
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

  function ensureMessageStyles() {
    if (document.getElementById("top-message-style")) return;

    const style = document.createElement("style");
    style.id = "top-message-style";
    style.textContent = `
      #top-message-box {
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 280px;
        max-width: 380px;
        padding: 14px 18px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        z-index: 99999;
        display: none;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }

      #top-message-box.show {
        display: block;
        opacity: 1;
        transform: translateY(0);
      }

      #top-message-box.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }

      #top-message-box.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
    `;
    document.head.appendChild(style);
  }

  function ensureMessageBox() {
    let box = document.getElementById("top-message-box");

    if (!box) {
      box = document.createElement("div");
      box.id = "top-message-box";
      document.body.appendChild(box);
    }

    return box;
  }

  ensureMessageStyles();
  const topMessageBox = ensureMessageBox();

  function showTopMessage(message, type = "success") {
    if (!topMessageBox) {
      alert(message);
      return;
    }

    topMessageBox.textContent = message;
    topMessageBox.className = `show ${type}`;

    setTimeout(() => {
      topMessageBox.className = "";
      topMessageBox.textContent = "";
      topMessageBox.style.display = "none";
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
        totalApartments.textContent = Array.isArray(apartments) ? apartments.length : 0;
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
              <h3>${apartment.title}</h3>
              <p><strong>City:</strong> ${apartment.city}</p>
              <p><strong>Address:</strong> ${apartment.address}</p>
              <p><strong>Price:</strong> €${apartment.price}</p>
              <div class="admin-item-actions">
                <button class="edit-btn" data-id="${apartment.id}">Edit</button>
                <button class="delete-btn" data-id="${apartment.id}">Delete</button>
              </div>
            </div>
          `
        )
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
          if (titleInput) titleInput.value = apartment.title;
          if (cityInput) cityInput.value = apartment.city;
          if (addressInput) addressInput.value = apartment.address;
          if (priceInput) priceInput.value = apartment.price;
          if (saveApartmentBtn) saveApartmentBtn.textContent = "Update Apartment";

          showTopMessage("Apartment loaded for editing.", "success");
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async () => {
          const apartmentId = button.dataset.id;

          try {
            const response = await fetch(`http://localhost:3000/apartments/${apartmentId}`, {
              method: "DELETE",
            });

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
              error.message || "Something went wrong while deleting the apartment.",
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
        price: priceInput ? Number(priceInput.value) : 0,
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