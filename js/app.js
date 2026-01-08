document.addEventListener("DOMContentLoaded", async () => {
  // Loading Overlay Functions
  const loadingOverlay = document.getElementById("loadingOverlay");
  const loadingText = document.getElementById("loadingText");

  function showLoading(message = "Memuat...") {
    if (loadingText) loadingText.textContent = message;
    if (loadingOverlay) loadingOverlay.classList.add("active");
  }

  function hideLoading() {
    if (loadingOverlay) loadingOverlay.classList.remove("active");
  }

  // Show loading while checking auth
  showLoading("Memuat profil Anda...");

  // 1. Check Authentication
  const token = localStorage.getItem("dapurai_token");

  if (!token) {
    hideLoading();
    window.location.href = "login.html";
    return;
  }

  // Fetch fresh user data from API
  let user = { name: "User" };
  try {
    const userRes = await api.get("/profile", token);
    if (userRes.success && userRes.data) {
      user = userRes.data;
      // Update localStorage with fresh data
      localStorage.setItem("dapurai_user", JSON.stringify(user));
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    // Fallback to localStorage if API fails
    const userStr = localStorage.getItem("dapurai_user");
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }

  // Update User Info in UI
  const userNameEls = document.querySelectorAll("#userName, #userNameSidebar");
  const userAvatarEls = document.querySelectorAll(
    "#userAvatar, #userAvatarSidebar"
  );

  userNameEls.forEach((el) => {
    el.textContent = user.name || "User";
    el.style.cursor = "pointer";
    el.onclick = () => (window.location.href = "profile.html");
  });
  userAvatarEls.forEach((el) => {
    el.textContent = (user.name || "U").charAt(0).toUpperCase();
    el.style.cursor = "pointer";
    el.onclick = () => (window.location.href = "profile.html");
  });

  // Update specific profile name avatar element if exists
  const profileNameAvatar = document.getElementById("profileNameAvatar");
  if (profileNameAvatar) {
    profileNameAvatar.textContent = user.name || "User";
    profileNameAvatar.style.cursor = "pointer";
    profileNameAvatar.onclick = () => (window.location.href = "profile.html");
  }

  // Unhide Main App
  const mainApp = document.getElementById("mainApp");
  if (mainApp) mainApp.style.display = "block";

  // Hide loading after everything is ready
  hideLoading();

  // 2. Logic for Logout
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutBtnSidebar = document.getElementById("logoutBtnSidebar");
  const logoutModal = document.getElementById("logoutModal");
  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");

  function showLogout() {
    if (logoutModal) logoutModal.style.display = "flex";
  }
  function hideLogout() {
    if (logoutModal) logoutModal.style.display = "none";
  }
  function doLogout() {
    localStorage.removeItem("dapurai_token");
    localStorage.removeItem("dapurai_user");
    window.location.href = "login.html";
  }

  if (logoutBtn) logoutBtn.addEventListener("click", showLogout);
  if (logoutBtnSidebar) logoutBtnSidebar.addEventListener("click", showLogout);
  if (confirmLogout) confirmLogout.addEventListener("click", doLogout);
  if (cancelLogout) cancelLogout.addEventListener("click", hideLogout);

  // 3. Generator Logic
  const generateBtn = document.getElementById("generateBtn");
  const ingredientsInput = document.getElementById("ingredients");
  const cuisineSelect = document.getElementById("cuisine");
  const resultSection = document.getElementById("result");
  const ingredientsListEl = document.getElementById("ingredientsList");
  const stepsEl = document.getElementById("steps");
  const recipeTitle = document.getElementById("recipeTitle");
  const metaInfo = document.getElementById("metaInfo");

  if (generateBtn) {
    generateBtn.addEventListener("click", async () => {
      const ingredients = ingredientsInput.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const category = cuisineSelect.value;

      if (ingredients.length === 0) {
        alert("Masukkan setidaknya satu bahan!");
        return;
      }

      // Show Loading Overlay
      showLoading("🍳 Sedang meracik resep spesial untuk Anda...");
      generateBtn.disabled = true;
      recipeTitle.textContent = "Sedang meracik resep...";
      stepsEl.innerHTML = "";
      ingredientsListEl.innerHTML = "";

      // Get Default Adjustment from LocalStorage
      const defaultAdj =
        localStorage.getItem("dapurai_default_adjustment") || "";

      const res = await api.post(
        "/recipe/generate",
        {
          ingredients: ingredients,
          category: category,
          adjustment: defaultAdj, // Send default adjustment note
        },
        token
      );

      generateBtn.disabled = false;
      hideLoading();

      if (res.success && res.data) {
        // Success
        recipeTitle.textContent = "Resep Kamu Siap!";
        metaInfo.textContent = "Berikut adalah resep spesial untukmu.";

        // Render Markdown
        if (typeof marked !== "undefined") {
          stepsEl.innerHTML = marked.parse(res.data);
        } else {
          stepsEl.textContent = res.data; // Fallback
        }

        // Scroll to result
        resultSection.scrollIntoView({ behavior: "smooth" });
      } else {
        alert(res.message || "Gagal generate resep. Coba lagi.");
      }
    });
  }

  // 4. Review Logic (API)
  const reviewForm = document.getElementById("reviewForm");
  const reviewList = document.getElementById("reviewList");
  const ratingValue = document.getElementById("ratingValue");
  const ratingStars = document.querySelectorAll(".rating-stars input");

  // Star rating interaction
  ratingStars.forEach((star) => {
    star.addEventListener("change", function () {
      ratingValue.textContent = `${this.value}/5`;
    });
  });

  // Helper: Create stars HTML
  function createStarRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return `<span class="star-rating">${stars}</span>`;
  }

  // Fetch Reviews
  async function loadReviews() {
    showLoading("📝 Memuat ulasan...");
    const res = await api.get("/reviews", token);
    reviewList.innerHTML = "";

    if (res.success && res.data && res.data.length > 0) {
      res.data.forEach((review) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";

        const date = new Date(review.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        reviewItem.innerHTML = `
                    <div class="review-header">
                    <div class="review-user-info">
                        <div class="review-name">${review.name}</div>
                    </div>
                    <div class="review-date">${date}</div>
                    </div>
                    <div class="review-rating">
                    ${createStarRating(review.rating)}
                    </div>
                    <div class="review-message">${review.message}</div>
                `;
        reviewList.appendChild(reviewItem);
      });
    } else {
      reviewList.innerHTML =
        '<div class="no-reviews">Belum ada ulasan. Jadilah yang pertama!</div>';
    }
    hideLoading();
  }

  // Load initial
  loadReviews();

  // Submit Review
  if (reviewForm) {
    // Pre-fill name/email if user logged in
    document.getElementById("nama").value = user.name || "";
    // document.getElementById("userEmail").value = user.email || "";

    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("nama").value;
      const message = document.getElementById("pesan").value;
      const rating =
        document.querySelector('input[name="rating"]:checked')?.value || 0;

      if (!rating || rating == 0) {
        alert("Silakan berikan rating bintang!");
        return;
      }

      showLoading("⭐ Mengirim ulasan Anda...");

      const res = await api.post(
        "/reviews",
        {
          name,
          rating: parseInt(rating),
          message,
        },
        token
      );

      hideLoading();

      if (res.success) {
        alert("Terima kasih atas ulasan Anda! ⭐");
        reviewForm.reset();
        ratingValue.textContent = "0/5";
        loadReviews();
      } else {
        alert("Gagal mengirim ulasan: " + (res.message || "Error"));
      }
    });
  }

  // Hamburger & Sidebar Logic (Ported from original to ensure functionality)
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleSidebar = document.getElementById("themeToggleSidebar");

  function toggleSidebar() {
    hamburgerMenu.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active")
      ? "hidden"
      : "";
  }

  if (hamburgerMenu) hamburgerMenu.addEventListener("click", toggleSidebar);
  if (overlay) overlay.addEventListener("click", toggleSidebar);

  // Initial Theme
  const savedTheme = localStorage.getItem("dapurai_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("dapurai_theme", newTheme);
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (themeToggleSidebar)
    themeToggleSidebar.addEventListener("click", toggleTheme);
});
