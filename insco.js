document.addEventListener("DOMContentLoaded", (event) => {
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("passwordStrength");

  passwordInput.addEventListener("input", () => {
    const strength = getPasswordStrength(passwordInput.value);
    displayPasswordStrength(strength);
  });

  function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 9) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^\w\s]/.test(password)) strength++;
    return strength;
  }

  function displayPasswordStrength(strength) {
    switch (strength) {
      case 0:
      case 1:
        passwordStrength.textContent = "Weak";
        passwordStrength.className = "weak";
        break;
      case 2:
        passwordStrength.textContent = "Medium";
        passwordStrength.className = "medium";
        break;
      case 3:
      case 4:
        passwordStrength.textContent = "Strong";
        passwordStrength.className = "strong";
        break;
    }
  }

  document
    .getElementById("signupForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Check if username or email already exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some(
        (user) => user.username === username || user.email === email
      );
      if (userExists) {
        alert("Username or email already exists!");
        return;
      }

      // Check password strength
      let passwordStrength = "weak";
      if (getPasswordStrength(password) === 2) {
        passwordStrength = "medium";
      } else if (getPasswordStrength(password) >= 3) {
        passwordStrength = "strong";
      }

      // Save user to localStorage
      const newUser = {
        username: username,
        email: email,
        password: password,
        passwordStrength: passwordStrength,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Automatically login user
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // Redirect to homepage
      window.location.href = "homepage.html";
    });

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const loginUsername = document.getElementById("loginUsername").value;
      const loginPassword = document.getElementById("loginPassword").value;

      // Check if user exists and password is correct
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = users.find(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      );
      if (currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = "homepage.html";
      } else {
        alert("Invalid username or password!");
      }
    });
});
