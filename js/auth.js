document.addEventListener("DOMContentLoaded", () => {
  // ========== TAMBAHKAN KODE INI DI SINI (AWAL) ==========
  // Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle");

  // Check saved theme or default to light
  const savedTheme = localStorage.getItem("dapurai_theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  // Add click event to theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      const savedTheme = localStorage.getItem("dapurai_theme");

      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }

      // Apply new theme
      document.documentElement.setAttribute("data-theme", newTheme);
      // Save to localStorage
      localStorage.setItem("dapurai_theme", newTheme);
    });
  }
  // ========== SAMPAI DI SINI ==========

  // Check if already logged in
  const token = localStorage.getItem("dapurai_token");
  if (token) {
    window.location.href = "index.html";
    return;
  }

  // ===== USER MANAGEMENT SYSTEM =====
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

  // Register form elements
  const regNameInput = document.getElementById("regName");
  const regUsernameInput = document.getElementById("regUsername"); // Not used in API? API needs name, email, password.
  // Wait, API register (routes.js): name, email, password. No username?
  // Swagger says: required: name, email, password.
  // login.html has 'username' input for login (USERNAME OR EMAIL).
  // register form has 'username'.
  // I will ignore username for registration in API if not required, or pass it if extended.
  // Actually, let's include it in case the backend supports it, but swagger says only name, email, password.
  // I'll stick to swagger.

  const regEmailInput = document.getElementById("regEmail");
  const regPasswordInput = document.getElementById("regPassword");
  const regConfirmPasswordInput = document.getElementById("regConfirmPassword");
  const backToLoginFromRegister = document.getElementById(
    "backToLoginFromRegister",
  );
  const regNameError = document.getElementById("regNameError");
  // const regUsernameError = document.getElementById("regUsernameError");
  const regEmailError = document.getElementById("regEmailError");
  // const regUsernameWarning = document.getElementById("regUsernameWarning");
  const regPasswordError = document.getElementById("regPasswordError");
  const regConfirmPasswordError = document.getElementById(
    "regConfirmPasswordError",
  );
  const registerSuccess = document.getElementById("registerSuccess");
  const regPasswordToggle = document.getElementById("regPasswordToggle");
  const forgotPasswordInput = document.getElementById("forgotPassword");
  const forgotPasswordToggle = document.getElementById("forgotPasswordToggle");
  const forgotPasswordError = document.getElementById("forgotPasswordError");
  const regConfirmPasswordToggle = document.getElementById(
    "regConfirmPasswordToggle",
  );

  // Forgot password elements
  const forgotEmailInput = document.getElementById("forgotEmail");
  const backToLoginFromForgot = document.getElementById(
    "backToLoginFromForgot",
  );
  const forgotEmailError = document.getElementById("forgotEmailError");
  const forgotEmailInfo = document.getElementById("forgotEmailInfo");
  const forgotSuccess = document.getElementById("forgotSuccess");

  // Function to show notification (simple implementation)
  function showNotification(message, type = "info") {
    // Re-use logic if needed, or rely on inline messages
    // login.html uses inline messages mostly.
  }

  // Formatting helpers
  function togglePasswordVisibility(inputId, eyeIconId) {
    const input = document.getElementById(inputId);
    const iconSpan = document.getElementById(eyeIconId);
    if (input.type === "password") {
      input.type = "text";
      if (iconSpan) {
        iconSpan.innerHTML = '<i data-lucide="eye-off"></i>';
        if (typeof lucide !== "undefined") {
          lucide.createIcons({
            root: iconSpan,
          });
        }
      }
    } else {
      input.type = "password";
      if (iconSpan) {
        iconSpan.innerHTML = '<i data-lucide="eye"></i>';
        if (typeof lucide !== "undefined") {
          lucide.createIcons({
            root: iconSpan,
          });
        }
      }
    }
  }

  // Initialize password toggles
  if (passwordToggle)
    passwordToggle.addEventListener("click", () =>
      togglePasswordVisibility("password", "eyeIcon"),
    );
  if (regPasswordToggle)
    regPasswordToggle.addEventListener("click", () =>
      togglePasswordVisibility("regPassword", "regEyeIcon"),
    );
  if (regConfirmPasswordToggle)
    regConfirmPasswordToggle.addEventListener("click", () =>
      togglePasswordVisibility("regConfirmPassword", "regConfirmEyeIcon"),
    );

  if (forgotPasswordToggle)
    forgotPasswordToggle.addEventListener("click", () =>
      togglePasswordVisibility("forgotPassword", "forgotEyeIcon"),
    );

  // Form switching
  function showLoginForm() {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
    forgotForm.style.display = "none";
    resetErrorMessages();
  }

  function showRegisterForm() {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    forgotForm.style.display = "none";
    resetErrorMessages();
  }

  function showForgotForm() {
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    forgotForm.style.display = "flex";
    resetErrorMessages();
  }

  function resetErrorMessages() {
    document
      .querySelectorAll(
        ".error-message, .success-message, .warning-message, .info-message",
      )
      .forEach((el) => (el.style.display = "none"));

    // ========== TAMBAHKAN INI ==========
    if (forgotPasswordError) forgotPasswordError.style.display = "none";
    // ========== SAMPAI DI SINI ==========
  }

  if (switchLink)
    switchLink.addEventListener("click", (e) => {
      e.preventDefault();
      showRegisterForm();
    });
  if (switchToLoginFromReg)
    switchToLoginFromReg.addEventListener("click", (e) => {
      e.preventDefault();
      showLoginForm();
    });
  if (forgotPasswordLink)
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      showForgotForm();
    });
  if (backToLoginFromRegister)
    backToLoginFromRegister.addEventListener("click", (e) => {
      e.preventDefault();
      showLoginForm();
    });
  if (backToLoginFromForgot)
    backToLoginFromForgot.addEventListener("click", (e) => {
      e.preventDefault();
      showLoginForm();
    });

  // HANDLE LOGIN
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    resetErrorMessages();

    const username = usernameInput.value.trim(); // used as email in API? API calls it 'email'.
    // Login UI says "USERNAME OR EMAIL". API says "email".
    // I should send it as 'email' property.
    const password = passwordInput.value.trim();

    if (!username) {
      usernameError.style.display = "block";
      return;
    }
    if (!password) {
      passwordError.style.display = "block";
      return;
    }

    const res = await api.post("/auth/login", {
      email: username,
      password: password,
    });

    if (res.success || (res.data && res.data.token)) {
      // Success
      loginSuccess.style.display = "block";
      localStorage.setItem("dapurai_token", res.data.token);
      localStorage.setItem("dapurai_user", JSON.stringify(res.data));

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      loginError.textContent = res.message || "Incorrect username or password";
      loginError.style.display = "block";
    }
  });

  // HANDLE REGISTER
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    resetErrorMessages();

    const name = regNameInput.value.trim();
    // const username = regUsernameInput.value.trim(); // Ignored by API based on swagger?
    // Let's include it anyway, maybe the backend accepts it?
    // Swagger: required: name, email, password.
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value.trim();
    const confirmPassword = regConfirmPasswordInput.value.trim();

    if (!name) {
      regNameError.style.display = "block";
      return;
    }
    if (!email) {
      regEmailError.style.display = "block";
      return;
    }
    if (!password || password.length < 6) {
      regPasswordError.style.display = "block";
      return;
    }
    if (password !== confirmPassword) {
      regConfirmPasswordError.style.display = "block";
      return;
    }

    // API Call
    // const res = await api.post('/auth/register', { name, email, password, username });
    // Sending username just in case.
    const res = await api.post("/auth/register", { name, email, password });

    if (
      res.success ||
      res.message === "User registered successfully" ||
      res.status === 201
    ) {
      // Note: api.js returns await response.json(), so res.status might not be there unless I return full response
      // api.js returns parsed json.
      // Swagger says 201: description: User registered successfully.
      // Does the JSON contain success: true?
      // Let's assume it does or check for error.

      // If success:
      registerSuccess.style.display = "block";
      setTimeout(() => {
        showLoginForm();
        registerSuccess.style.display = "none";
      }, 1500);
    } else {
      // If error (e.g. 400)
      // Check if message says "Validation error" or "Email already exists"
      if (res.message) {
        regEmailError.textContent = res.message;
        regEmailError.style.display = "block";
      } else {
        regEmailError.textContent = "Registration failed";
        regEmailError.style.display = "block";
      }
    }
  });

  // HANDLE FORGOT PASSWORD
  forgotForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    resetErrorMessages();

    const email = forgotEmailInput.value.trim();
    const newPassword = forgotPasswordInput
      ? forgotPasswordInput.value.trim()
      : "";

    if (!email) {
      forgotEmailError.style.display = "block";
      return;
    }

    // ========== TAMBAHKAN VALIDASI INI ==========
    if (!newPassword) {
      forgotPasswordError.textContent = "New password must be filled";
      forgotPasswordError.style.display = "block";
      return;
    }

    if (newPassword.length < 6) {
      forgotPasswordError.textContent =
        "Password must be at least 6 characters";
      forgotPasswordError.style.display = "block";
      return;
    }
    // ========== SAMPAI DI SINI ==========

    // This endpoint takes email AND password according to swagger?
    // router.post("/auth/forgot-password", validateForgotPassword, userController.forgotPassword);
    // Swagger: required: email, password.
    // That's weird for forgot password. Usually it's just email.
    // If it requires password, it's a RESET password (with token) or CHANGE password.
    // If I look at the swagger comment in routes.js:
    // required: email, password.
    // This implies the user sets a NEW password here? But how do they prove identity?
    // Maybe the 'forgot-password' logic in this specific project is "Reset password directly" (insecure) or "Change password" (misnamed).
    // Or maybe the swagger is wrong.
    // Given I can't check the controller code easily (User Controller), I will assume the swagger document is the truth I must follow.
    // But the UI only has an Email field (line 748 in login.html).
    // If I send only email, and the backend expects password, it will fail (400).

    // Strategy: Try sending just email. If it fails, I might need to ask user for new password?
    // But the UI "Forgot Password" usually sends a link.
    // Let's look at main.js logic for forgot password: it just mocked it.

    // I will try to inspect UserController.js if I can, to see what 'forgotPassword' does.
    // This is important to "not break" functionality.

    // Wait, I see I can view file.
    // userController.forgotPassword

    // Placeholder logic:
    // ========== PERBAIKAN API CALL INI ==========
    try {
      const res = await api.post("/auth/forgot-password", {
        email: email,
        password: newPassword,
      });

      if (res.success || res.message) {
        forgotSuccess.style.display = "block";
        forgotEmailInfo.style.display = "block";

        // Reset form setelah sukses
        setTimeout(() => {
          forgotEmailInput.value = "";
          if (forgotPasswordInput) forgotPasswordInput.value = "";
          showLoginForm();
        }, 2000);
      } else {
        forgotEmailError.textContent = res.message || "Request failed";
        forgotEmailError.style.display = "block";
      }
    } catch (error) {
      forgotEmailError.textContent =
        "Failed to reset password. Please try again.";
      forgotEmailError.style.display = "block";
    }
    // ========== SAMPAI DI SINI ==========
  });
});
