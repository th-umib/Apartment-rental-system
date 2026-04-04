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

const searchTitleInput = document.getElementById("search-title");
const searchCityInput = document.getElementById("search-city");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");

async function loadApartments() {
  try {
    const title = searchTitleInput.value.trim();
    const city = searchCityInput.value.trim();

    const params = new URLSearchParams();

    if (title) params.append("title", title);
    if (city) params.append("city", city);

    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const apartments = await response.json();

    apartmentList.innerHTML = "";

    if (apartments.length === 0) {
      apartmentList.innerHTML = "<p>No apartments found.</p>";
      return;
    }

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
    apartmentList.innerHTML = "<p>Gabim gjate ngarkimit te apartamenteve.</p>";
    console.error(error);
  }
}

apartmentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = apartmentIdInput.value;

  const apartmentData = {
    title: titleInput.value,
    city: cityInput.value,
    address: addressInput.value,
    price: priceInput.value,
    isAvailable: isAvailableInput.value === "true",
  };

  try {
    const response = await fetch(id ? `${apiUrl}/${id}` : apiUrl, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apartmentData),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert(id ? "Apartmenti u perditesua me sukses." : "Apartmenti u shtua me sukses.");

    apartmentForm.reset();
    apartmentIdInput.value = "";
    submitBtn.textContent = "Add Apartment";
    loadApartments();
  } catch (error) {
    alert("Gabim gjate ruajtjes se apartmentit.");
    console.error(error);
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
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message);
      return;
    }

    alert("Apartmenti u fshi me sukses.");
    loadApartments();
  } catch (error) {
    alert("Gabim gjate fshirjes se apartmentit.");
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  loadApartments();
});

resetBtn.addEventListener("click", () => {
  searchTitleInput.value = "";
  searchCityInput.value = "";
  loadApartments();
});

loadApartments();