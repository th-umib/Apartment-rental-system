fetch("/apartments")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("apartment-list");

    data.forEach(apartment => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${apartment.title}</h3>
        <p>City: ${apartment.city}</p>
        <p>Address: ${apartment.address}</p>
        <p>Price per night: €${apartment.pricePerNight}</p>
        <p>Available: ${apartment.isAvailable}</p>
      `;
      container.appendChild(div);
    });
  });