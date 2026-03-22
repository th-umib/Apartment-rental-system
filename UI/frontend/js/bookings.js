fetch("/bookings")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("booking-list");

    data.forEach(booking => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>Booking ID: ${booking.id}</p>
        <p>User ID: ${booking.userId}</p>
        <p>Apartment ID: ${booking.apartmentId}</p>
        <p>Status: ${booking.status}</p>
      `;
      container.appendChild(div);
    });
  });