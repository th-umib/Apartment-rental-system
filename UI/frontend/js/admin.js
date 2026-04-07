async function loadApartments() {
  apartmentsListEl.innerHTML = "<p>Loading apartments...</p>";

  const apartments = await fetchData("/apartments");

  if (!Array.isArray(apartments) || apartments.length === 0) {
    apartmentsListEl.innerHTML = "<p>No apartments found.</p>";
    scrollToSection(apartmentsSection);
    return;
  }

  apartmentsListEl.innerHTML = apartments
    .map((apartment) => {
      return `
        <div class="admin-card">
          <h3>${apartment.title || "Untitled Apartment"}</h3>
          <p><strong>ID:</strong> ${apartment.id ?? "N/A"}</p>
          <p><strong>City:</strong> ${apartment.city || apartment.location || "No city"}</p>
          <p><strong>Address:</strong> ${apartment.address || "No address"}</p>
          <p><strong>Price:</strong> €${apartment.price_per_month ?? apartment.price ?? "N/A"}</p>
          <p><strong>Bedrooms:</strong> ${apartment.bedrooms ?? apartment.rooms ?? "N/A"}</p>
          <p><strong>Description:</strong> ${apartment.description || "No description available."}</p>
        </div>
      `;
    })
    .join("");

  scrollToSection(apartmentsSection);
}