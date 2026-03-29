const apiUrl = "/apartments";

const apartmentList = document.getElementById("apartment-list");
const apartmentForm = document.getElementById("apartment-form");
const apartmentIdInput = document.getElementById("apartment-id");
const titleInput = document.getElementById("title");
const cityInput = document.getElementById("city");
const addressInput = document.getElementById("address");
const priceInput = document.getElementById("price");
const isAvailableInput = document.getElementById("isAvailable");
const submitBtn = document.getElementById("submit-btn");

async function loadApartments() {
  try {
    const response = await fetch(apiUrl);
    const apartments = await response.json();

    apartmentList.innerHTML = "";

    apartments.forEach((apartment) => {
      const safeTitle = String(apartment.title).replace(/'/g, "\\'");
      const safeCity = String(apartment.city).replace(/'/g, "\\'");
      const safeAddress = String(apartment.address).replace(/'/g, "\\'");

      const card = document.createElement("div");
      card.classList.add("apartment-card");

      card.innerHTML = `
        <h3>${apartment.title}</h3>
        <p><strong>City:</strong> ${apartment.city}</p>
        <p><strong>Address:</strong> ${apartment.address}</p>
        <p><strong>Price:</strong> €${apartment.price}</p>
        <p><strong>Available:</strong> ${apartment.isAvailable ? "Yes" : "No"}</p>
        <div class="card-buttons">
          <button onclick="editApartment(${apartment.id}, '${safeTitle}', '${safeCity}', '${safeAddress}', ${apartment.price}, ${apartment.isAvailable})">Edit</button>
          <button onclick="deleteApartment(${apartment.id})">Delete</button>
        </div>
      `;
      apartmentList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading apartments:", error);
  }
}

apartmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = apartmentIdInput.value;

  const apartmentData = {
    title: titleInput.value,
    city: cityInput.value,
    address: addressInput.value,
    price: Number(priceInput.value),
    isAvailable: isAvailableInput.value === "true",
  };

  try {
    if (id) {
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apartmentData),
      });
      submitBtn.textContent = "Add Apartment";
    } else {
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apartmentData),
      });
    }

    apartmentForm.reset();
    apartmentIdInput.value = "";
    loadApartments();
  } catch (error) {
    console.error("Error saving apartment:", error);
  }
});

function editApartment(id, title, city, address, price, isAvailable) {
  apartmentIdInput.value = id;
  titleInput.value = title;
  cityInput.value = city;
  addressInput.value = address;
  priceInput.value = price;
  isAvailableInput.value = String(isAvailable);
  submitBtn.textContent = "Update Apartment";

  apartmentForm.scrollIntoView({ behavior: "smooth", block: "start" });
  titleInput.focus();
}

async function deleteApartment(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    loadApartments();
  } catch (error) {
    console.error("Error deleting apartment:", error);
  }
}

loadApartments();