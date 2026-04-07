document.addEventListener("DOMContentLoaded", () => {
  const homeSearchInput = document.getElementById("home-search");
  const homeSearchBtn = document.getElementById("home-search-btn");
  const navActions = document.getElementById("nav-actions");

  function goToApartmentsWithSearch() {
    if (!homeSearchInput) return;

    const value = homeSearchInput.value.trim();

    if (!value) {
      window.location.href = "apartments.html";
      return;
    }

    window.location.href = `apartments.html?title=${encodeURIComponent(value)}`;
  }

  function renderNavbarUser() {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser || !navActions) return;

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return;
    }

    const displayName = user.fullName || user.email || "User";

    navActions.innerHTML = `
      <span class="login-link">Welcome, ${displayName}</span>
      <button id="logout-btn" class="btn btn-primary" type="button">Logout</button>
    `;

    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      });
    }
  }

  if (homeSearchBtn) {
    homeSearchBtn.addEventListener("click", goToApartmentsWithSearch);
  }

  if (homeSearchInput) {
    homeSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        goToApartmentsWithSearch();
      }
    });
  }

  renderNavbarUser();
});