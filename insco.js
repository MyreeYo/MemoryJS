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
    if (
      password.length >= 6 &&
      /\d/.test(password) &&
      /[^\w\s]/.test(password)
    ) {
      passwordStrength = "medium";
    }
    if (
      password.length >= 9 &&
      /\d/.test(password) &&
      /[^\w\s]/.test(password)
    ) {
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
    window.location.href = "./index.html";
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
      window.location.href = "./index.html";
    } else {
      alert("Invalid username or password!");
    }
  });
