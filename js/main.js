// ===== USER MANAGEMENT SYSTEM =====
const loginModal = document.getElementById("loginModal");
const mainApp = document.getElementById("mainApp");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");
const switchLink = document.getElementById("switchLink");
const switchToLoginFromReg = document.getElementById("switchToLoginFromReg");

// Login form elements
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("rememberMe");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginSuccess = document.getElementById("loginSuccess");
const loginError = document.getElementById("loginError");
const passwordToggle = document.getElementById("passwordToggle");
const eyeIcon = document.getElementById("eyeIcon");

// Register form elements
const regNameInput = document.getElementById("regName");
const regUsernameInput = document.getElementById("regUsername");
const regEmailInput = document.getElementById("regEmail");
const regPasswordInput = document.getElementById("regPassword");
const regConfirmPasswordInput = document.getElementById("regConfirmPassword");
const backToLoginFromRegister = document.getElementById(
  "backToLoginFromRegister"
);
const regNameError = document.getElementById("regNameError");
const regUsernameError = document.getElementById("regUsernameError");
const regEmailError = document.getElementById("regEmailError");
const regUsernameWarning = document.getElementById("regUsernameWarning");
const regPasswordError = document.getElementById("regPasswordError");
const regConfirmPasswordError = document.getElementById(
  "regConfirmPasswordError"
);
const registerSuccess = document.getElementById("registerSuccess");
const regPasswordToggle = document.getElementById("regPasswordToggle");
const regConfirmPasswordToggle = document.getElementById(
  "regConfirmPasswordToggle"
);
const regEyeIcon = document.getElementById("regEyeIcon");
const regConfirmEyeIcon = document.getElementById("regConfirmEyeIcon");

// Forgot password elements
const forgotEmailInput = document.getElementById("forgotEmail");
const backToLoginFromForgot = document.getElementById("backToLoginFromForgot");
const forgotEmailError = document.getElementById("forgotEmailError");
const forgotEmailInfo = document.getElementById("forgotEmailInfo");
const forgotSuccess = document.getElementById("forgotSuccess");

// Logout elements
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

// User info elements
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnSidebar = document.getElementById("logoutBtnSidebar");
const userInfo = document.getElementById("userInfo");
const userName = document.getElementById("userName");
const userAvatar = document.getElementById("userAvatar");
const userNameSidebar = document.getElementById("userNameSidebar");
const userAvatarSidebar = document.getElementById("userAvatarSidebar");
const profileNameAvatar = document.getElementById("profileNameAvatar");

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("dapurai_token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  
  const userRes = await api.get("/profile", token);
  if (userRes.success) {
    const user = userRes.data;
    profileNameAvatar.textContent = user.name;
  }
});

// Demo credentials and user storage
let users = JSON.parse(localStorage.getItem("dapurai_users") || "[]");

// Initialize with demo users if none exist
if (users.length === 0) {
  users = [
    {
      id: 1,
      username: "user",
      password: "123",
      name: "User Demo",
      email: "user@demo.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      username: "chef",
      password: "masak",
      name: "Chef Professional",
      email: "chef@dapurai.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      username: "admin",
      password: "admin123",
      name: "Administrator",
      email: "admin@dapurai.com",
      createdAt: new Date().toISOString(),
    },
  ];
  localStorage.setItem("dapurai_users", JSON.stringify(users));
}

// Function to show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${
            type === "success"
              ? "var(--success)"
              : type === "error"
              ? "var(--error)"
              : type === "warning"
              ? "var(--warning)"
              : "var(--accent)"
          };
          color: white;
          padding: 15px 20px;
          border-radius: 10px;
          box-shadow: var(--shadow);
          z-index: 1001;
          animation: slideInRight 0.3s ease;
          font-weight: 600;
          max-width: 300px;
          display: flex;
          align-items: center;
          gap: 10px;
        `;

  notification.innerHTML = `
          <span style="font-size: 20px;">${
            type === "success"
              ? "✅"
              : type === "error"
              ? "❌"
              : type === "warning"
              ? "⚠️"
              : "ℹ️"
          }</span>
          <span>${message}</span>
        `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Function to toggle password visibility
function togglePasswordVisibility(inputId, eyeIconId) {
  const passwordInput = document.getElementById(inputId);
  const eyeIcon = document.getElementById(eyeIconId);

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.textContent = "👁️‍🗨️"; // Open eye
  } else {
    passwordInput.type = "password";
    eyeIcon.textContent = "👁️"; // Closed eye
  }
}

// Initialize password toggles
passwordToggle.addEventListener("click", function () {
  togglePasswordVisibility("password", "eyeIcon");
});

regPasswordToggle.addEventListener("click", function () {
  togglePasswordVisibility("regPassword", "regEyeIcon");
});

regConfirmPasswordToggle.addEventListener("click", function () {
  togglePasswordVisibility("regConfirmPassword", "regConfirmEyeIcon");
});

// Function to show login form
function showLoginForm() {
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
  forgotForm.style.display = "none";
  resetErrorMessages();
}

// Function to show register form
function showRegisterForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
  forgotForm.style.display = "none";
  resetErrorMessages();
}

// Function to show forgot password form
function showForgotForm() {
  loginForm.style.display = "none";
  registerForm.style.display = "none";
  forgotForm.style.display = "flex";
  resetErrorMessages();
}

// Reset all error messages
function resetErrorMessages() {
  // Login errors
  usernameError.style.display = "none";
  passwordError.style.display = "none";
  loginSuccess.style.display = "none";
  loginError.style.display = "none";

  // Register errors
  regNameError.style.display = "none";
  regUsernameError.style.display = "none";
  regEmailError.style.display = "none";
  regUsernameWarning.style.display = "none";
  regPasswordError.style.display = "none";
  regConfirmPasswordError.style.display = "none";
  registerSuccess.style.display = "none";

  // Forgot password errors
  forgotEmailError.style.display = "none";
  forgotEmailInfo.style.display = "none";
  forgotSuccess.style.display = "none";
}

// Check if user is already logged in
function checkLoginStatus() {
  const loggedInUser = localStorage.getItem("dapurai_loggedInUser");
  if (loggedInUser) {
    showMainApp(JSON.parse(loggedInUser));
  }
}

// Show main application
function showMainApp(user) {
  loginModal.style.display = "none";
  mainApp.style.display = "block";

  // Update user info
  userName.textContent = user.name;
  userNameSidebar.textContent = user.name;
  userAvatar.textContent = user.avatar || user.name.charAt(0).toUpperCase();
  userAvatarSidebar.textContent =
    user.avatar || user.name.charAt(0).toUpperCase();

  // Set email in form
  document.getElementById("userEmail").value = user.email || "";
  document.getElementById("nama").value = user.name;

  // Apply saved theme
  initializeTheme();

  // Show welcome message
  showNotification(`Selamat datang, ${user.name}!`, "success");
}

// Handle login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const rememberMe = rememberMeCheckbox.checked;

  // Reset error messages
  resetErrorMessages();

  let isValid = true;

  // Validate username
  if (!username) {
    usernameError.style.display = "block";
    isValid = false;
  }

  // Validate password
  if (!password) {
    passwordError.style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  // Check credentials
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    // Login successful
    loginSuccess.style.display = "block";

    // Save login status
    localStorage.setItem("dapurai_loggedInUser", JSON.stringify(user));

    // Save remember me preference
    if (rememberMe) {
      localStorage.setItem("dapurai_rememberMe", "true");
      localStorage.setItem("dapurai_lastUsername", username);
    } else {
      localStorage.removeItem("dapurai_rememberMe");
      localStorage.removeItem("dapurai_lastUsername");
    }

    // Show main app after delay
    setTimeout(() => {
      showMainApp(user);
    }, 1000);
  } else {
    // Login failed
    loginError.style.display = "block";
  }
});

// Handle register form submission
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = regNameInput.value.trim();
  const username = regUsernameInput.value.trim();
  const email = regEmailInput.value.trim();
  const password = regPasswordInput.value.trim();
  const confirmPassword = regConfirmPasswordInput.value.trim();

  // Reset error messages
  resetErrorMessages();

  let isValid = true;

  // Validate name
  if (!name) {
    regNameError.style.display = "block";
    isValid = false;
  }

  // Validate username
  if (!username) {
    regUsernameError.style.display = "block";
    isValid = false;
  } else if (users.find((u) => u.username === username)) {
    regUsernameWarning.style.display = "block";
    isValid = false;
  }

  // Validate email
  if (!email) {
    regEmailError.style.display = "block";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    regEmailError.textContent = "Email tidak valid";
    regEmailError.style.display = "block";
    isValid = false;
  }

  // Validate password
  if (!password || password.length < 6) {
    regPasswordError.style.display = "block";
    isValid = false;
  }

  // Validate confirm password
  if (password !== confirmPassword) {
    regConfirmPasswordError.style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  // Create new user
  const newUser = {
    id: Date.now(),
    username: username,
    password: password,
    name: name,
    email: email,
    createdAt: new Date().toISOString(),
  };

  // Add user to storage
  users.push(newUser);
  localStorage.setItem("dapurai_users", JSON.stringify(users));

  // Show success message
  registerSuccess.style.display = "block";

  // Auto login after registration
  setTimeout(() => {
    localStorage.setItem("dapurai_loggedInUser", JSON.stringify(newUser));
    showMainApp(newUser);
  }, 1500);
});

// Handle forgot password form submission
forgotForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = forgotEmailInput.value.trim();

  // Reset error messages
  resetErrorMessages();

  let isValid = true;

  // Validate email
  if (!email) {
    forgotEmailError.style.display = "block";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    forgotEmailError.textContent = "Email tidak valid";
    forgotEmailError.style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  // Check if email exists
  const user = users.find((u) => u.email === email);

  if (user) {
    // Show success message
    forgotEmailInfo.style.display = "block";
    forgotSuccess.style.display = "block";

    // Simulate sending reset email
    setTimeout(() => {
      showLoginForm();
      showNotification(
        `Link reset password telah dikirim ke ${email}. Untuk demo, password telah direset ke "password123".`,
        "info"
      );

      // Reset password for demo (in real app, this would be handled by email verification)
      user.password = "password123";
      localStorage.setItem("dapurai_users", JSON.stringify(users));
    }, 1000);
  } else {
    forgotEmailError.textContent = "Email tidak terdaftar";
    forgotEmailError.style.display = "block";
  }
});

// Handle form switching
switchLink.addEventListener("click", function (e) {
  e.preventDefault();
  showRegisterForm();
});

// Handle switch from register to login
switchToLoginFromReg.addEventListener("click", function (e) {
  e.preventDefault();
  showLoginForm();
});

// Forgot password link
forgotPasswordLink.addEventListener("click", function (e) {
  e.preventDefault();
  showForgotForm();
});

// Back to login links
backToLoginFromRegister.addEventListener("click", function (e) {
  e.preventDefault();
  showLoginForm();
});

backToLoginFromForgot.addEventListener("click", function (e) {
  e.preventDefault();
  showLoginForm();
});

// Show logout confirmation modal
function showLogoutConfirmation() {
  logoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Hide logout confirmation modal
function hideLogoutConfirmation() {
  logoutModal.classList.remove("active");
  document.body.style.overflow = "";
}

// Handle logout
function handleLogout() {
  const currentUser = JSON.parse(
    localStorage.getItem("dapurai_loggedInUser") || "{}"
  );

  // Remove login status
  localStorage.removeItem("dapurai_loggedInUser");

  // Hide main app and show login modal
  mainApp.style.display = "none";
  loginModal.style.display = "flex";

  // Reset forms and switch to login
  showLoginForm();
  loginForm.reset();
  registerForm.reset();
  forgotForm.reset();
  resetErrorMessages();

  // Reset password fields to hidden
  passwordInput.type = "password";
  eyeIcon.textContent = "👁️";
  regPasswordInput.type = "password";
  regEyeIcon.textContent = "👁️";
  regConfirmPasswordInput.type = "password";
  regConfirmEyeIcon.textContent = "👁️";

  // Hide logout modal
  hideLogoutConfirmation();

  // Close sidebar if open
  if (sidebar.classList.contains("active")) {
    toggleSidebar();
  }

  // Show logout notification
  showNotification(`Sampai jumpa, ${currentUser.name || "User"}!`, "info");
}

// Event listeners for logout buttons
logoutBtn.addEventListener("click", showLogoutConfirmation);
logoutBtnSidebar.addEventListener("click", showLogoutConfirmation);

// Event listeners for logout modal
cancelLogout.addEventListener("click", hideLogoutConfirmation);
confirmLogout.addEventListener("click", handleLogout);

// Close logout modal when clicking outside
logoutModal.addEventListener("click", function (e) {
  if (e.target === logoutModal) {
    hideLogoutConfirmation();
  }
});

// ===== EXISTING APPLICATION CODE =====
const generateBtn = document.getElementById("generateBtn");
const tryBtn = document.getElementById("tryBtn");
const ingredientsInput = document.getElementById("ingredients");
const recipeTitle = document.getElementById("recipeTitle");
const metaInfo = document.getElementById("metaInfo");
const ingredientsList = document.getElementById("ingredientsList");
const stepsEl = document.getElementById("steps");
const shareBtn = document.getElementById("shareBtn");
const clearBtn = document.getElementById("clearBtn");
const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");
const ratingValue = document.getElementById("ratingValue");

const homeLink = document.getElementById("homeLink");
const homeLinkSidebar = document.getElementById("homeLinkSidebar");

// Hamburger menu elements
const hamburgerMenu = document.querySelector(".hamburger-menu");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

// Theme toggle elements
const themeToggle = document.getElementById("themeToggle");
const themeToggleSidebar = document.getElementById("themeToggleSidebar");

// Fungsi untuk toggle theme
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("dapurai_theme", newTheme);
}

// Fungsi untuk mengatur tema awal
function initializeTheme() {
  const savedTheme = localStorage.getItem("dapurai_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
}

// Event listener untuk toggle theme
themeToggle.addEventListener("click", toggleTheme);
themeToggleSidebar.addEventListener("click", toggleTheme);

// Fungsi untuk toggle sidebar
function toggleSidebar() {
  hamburgerMenu.classList.toggle("active");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = sidebar.classList.contains("active")
    ? "hidden"
    : "";
}

// Event listener untuk hamburger menu
hamburgerMenu.addEventListener("click", toggleSidebar);

// Event listener untuk overlay
overlay.addEventListener("click", toggleSidebar);

// Event listener untuk link di sidebar
sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleSidebar();
  });
});

// Fungsi untuk scroll ke home
function scrollToHome() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Event listener untuk home links
homeLink.addEventListener("click", function (e) {
  e.preventDefault();
  scrollToHome();
});

homeLinkSidebar.addEventListener("click", function (e) {
  e.preventDefault();
  scrollToHome();
  toggleSidebar();
});

// Rating stars interaction
const ratingStars = document.querySelectorAll(".rating-stars input");
ratingStars.forEach((star) => {
  star.addEventListener("change", function () {
    ratingValue.textContent = `${this.value}/5`;
  });
});

// Fungsi untuk membuat bintang rating
function createStarRating(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  return `<span class="star-rating">${stars}</span>`;
}

// Fungsi untuk memuat ulasan dari localStorage
function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem("dapurai_reviews") || "[]");
  } catch (e) {
    return [];
  }
}

// Fungsi untuk menyimpan ulasan ke localStorage
function saveReviews(reviews) {
  localStorage.setItem("dapurai_reviews", JSON.stringify(reviews));
}

// Fungsi untuk menampilkan ulasan
function displayReviews() {
  const reviews = loadReviews();
  reviewList.innerHTML = "";

  if (reviews.length === 0) {
    reviewList.innerHTML =
      '<div class="no-reviews">Belum ada ulasan. Jadilah yang pertama memberikan ulasan!</div>';
    return;
  }

  // Urutkan ulasan dari yang terbaru
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  reviews.forEach((review) => {
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    const date = new Date(review.date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    reviewItem.innerHTML = `
            <div class="review-header">
              <div class="review-user-info">
                <div class="review-name">${review.name}</div>
                <div class="review-email">${review.email}</div>
              </div>
              <div class="review-date">${date}</div>
            </div>
            <div class="review-rating">
              ${createStarRating(review.rating || 0)}
            </div>
            <div class="review-message">${review.message}</div>
          `;

    reviewList.appendChild(reviewItem);
  });
}

// Fungsi untuk menangani pengiriman ulasan
function handleReviewSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("nama").value;
  const email =
    document.getElementById("userEmail").value || "user@example.com";
  const message = document.getElementById("pesan").value;
  const rating =
    document.querySelector('input[name="rating"]:checked')?.value || 0;

  if (!rating || rating == 0) {
    showNotification(
      "Silakan berikan rating dengan memilih bintang terlebih dahulu!",
      "warning"
    );
    return;
  }

  const newReview = {
    name,
    email,
    rating: parseInt(rating),
    message,
    date: new Date().toISOString(),
  };

  const reviews = loadReviews();
  reviews.push(newReview);
  saveReviews(reviews);

  // Reset form
  reviewForm.reset();
  ratingValue.textContent = "0/5";

  // Reset stars
  ratingStars.forEach((star) => (star.checked = false));

  // Tampilkan ulasan terbaru
  displayReviews();

  // Tampilkan pesan sukses
  showNotification(
    "Terima kasih! Ulasan Anda telah berhasil dikirim. ⭐",
    "success"
  );
}

function normalizeList(text) {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function estimateTime(count) {
  return 10 + count * 3;
}

function estimateCalories(count) {
  return Math.max(120, Math.round(count * 170));
}

function makeRecipe(ings, cuisine) {
  const main = ings[0] || "Beragam bahan";
  const suffix = ["Gurih", "Pedas", "Lezat", "Simple", "Istimewa", "Rumahan"];
  const name = `${main.charAt(0).toUpperCase() + main.slice(1)} ${
    suffix[Math.floor(Math.random() * suffix.length)]
  }`;

  const time = estimateTime(ings.length);
  const cal = estimateCalories(ings.length);
  const ingredientsHtml = ings
    .map((i) => `<div class="ing">${i}</div>`)
    .join("");

  const steps = [];
  steps.push(`Siapkan semua bahan: ${ings.join(", ")}.`);
  if (ings.includes("telur"))
    steps.push("Kocok telur jika diperlukan, lalu goreng/masak sesuai resep.");
  if (ings.includes("nasi"))
    steps.push("Panaskan nasi, lalu tumis bersama bumbu.");
  steps.push(
    "Masak semua bahan dengan api sedang hingga matang dan bumbu meresap."
  );
  steps.push("Cicipi dan sesuaikan garam atau gula. Sajikan hangat.");

  return { name, time, cal, ingredientsHtml, steps };
}

function showRecipe(obj) {
  recipeTitle.textContent = obj.name;
  metaInfo.innerHTML = `Estimasi waktu: <strong>${obj.time} menit</strong> · Perkiraan kalori: <strong>${obj.cal} kkal</strong>`;
  ingredientsList.innerHTML = obj.ingredientsHtml;
  stepsEl.innerHTML = `<ol>${obj.steps
    .map((s) => `<li style="margin-bottom:6px">${s}</li>`)
    .join("")}</ol>`;

  // Scroll ke bagian ingredients
  setTimeout(() => {
    document.getElementById("result").scrollIntoView({ behavior: "smooth" });
  }, 100);
}

generateBtn.addEventListener("click", () => {
  const text = ingredientsInput.value;
  const cuisine = document.getElementById("cuisine").value;
  const ings = normalizeList(text);
  if (ings.length === 0) {
    showNotification(
      "Masukkan minimal satu bahan. Contoh: telur, nasi, ayam",
      "warning"
    );
    return;
  }
  const recipe = makeRecipe(ings, cuisine);
  showRecipe(recipe);
});

tryBtn.addEventListener("click", () => {
  document.getElementById("generator").scrollIntoView({ behavior: "smooth" });
});

clearBtn.addEventListener("click", () => {
  ingredientsInput.value = "";
  recipeTitle.textContent = "Hasil resep akan muncul di sini";
  metaInfo.textContent = "Masukkan bahan lalu klik Generate.";
  ingredientsList.innerHTML = "";
  stepsEl.innerHTML = "";
});

// Fungsi untuk berbagi resep
function shareRecipe() {
  const title = recipeTitle.textContent;
  const meta = metaInfo.textContent;
  const ingredients = Array.from(ingredientsList.querySelectorAll(".ing"))
    .map((el) => el.textContent)
    .join(", ");
  const steps = stepsEl.textContent;

  if (!title || title.startsWith("Hasil")) {
    showNotification(
      "Tidak ada resep untuk dibagikan. Silakan generate resep terlebih dahulu.",
      "warning"
    );
    return;
  }

  // Membuat konten yang akan dibagikan
  const shareContent = `
🍳 RESEP DAPUR AI 🍳

${title}
${meta}

🧂 Bahan-bahan:
${ingredients}

📝 Langkah-langkah:
${steps}

✨ Dibuat dengan DapurAI - Generator Resep Pintar
🔗 https://dapurai.example.com
        `;

  // Cek apakah Web Share API tersedia
  if (navigator.share) {
    // Gunakan Web Share API jika tersedia
    navigator
      .share({
        title: `Resep: ${title}`,
        text: shareContent,
        url: window.location.href,
      })
      .then(() => {
        showNotification("Resep berhasil dibagikan!", "success");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
        copyToClipboard(shareContent);
      });
  } else {
    // Fallback: salin ke clipboard
    copyToClipboard(shareContent);
  }
}

// Fungsi untuk menyalin teks ke clipboard
function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Tampilkan notifikasi sukses
      showNotification("Resep berhasil disalin ke clipboard! 📋", "success");
    })
    .catch((err) => {
      console.error("Gagal menyalin: ", err);
      // Fallback untuk browser lama
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        showNotification("Resep berhasil disalin ke clipboard! 📋", "success");
      } catch (err) {
        showNotification("Gagal membagikan resep. Silakan coba lagi.", "error");
      }
      document.body.removeChild(textArea);
    });
}

// Event listener untuk tombol share
shareBtn.addEventListener("click", shareRecipe);

ingredientsInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateBtn.click();
});

// Event listener untuk form ulasan
reviewForm.addEventListener("submit", handleReviewSubmit);

// Tampilkan ulasan saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
  displayReviews();
  showLoginForm(); // Show login form by default

  // Check if remember me was set
  const rememberMe = localStorage.getItem("dapurai_rememberMe");
  const lastUsername = localStorage.getItem("dapurai_lastUsername");

  if (rememberMe === "true" && lastUsername) {
    usernameInput.value = lastUsername;
    rememberMeCheckbox.checked = true;
  }
});

document
  .querySelectorAll("button,input,select")
  .forEach((el) =>
    el.addEventListener(
      "focus",
      () => (el.style.outline = "2px solid rgba(248, 88, 168, 0.2)")
    )
  );
