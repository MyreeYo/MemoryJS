document
  .getElementById("auth-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const isSignupMode =
      document.getElementById("signup-section").style.display !== "none";
    if (isSignupMode) {
      handleSignup();
    } else {
      handleLogin();
    }
  });

document.getElementById("password").addEventListener("input", function () {
  const password = document.getElementById("password").value;
  const strengthElement = document.getElementById("password-strength");
  const strength = getPasswordStrength(password);

  strengthElement.textContent = `Force du mot de passe : ${strength.text}`;
  strengthElement.className = `password-strength ${strength.class}`;
});

document
  .getElementById("toggle-auth-mode")
  .addEventListener("click", function () {
    toggleAuthMode();
  });

function getPasswordStrength(password) {
  if (password.length < 6) {
    return { text: "Faible", class: "weak" };
  } else if (password.length >= 6 && /[\d\W]/.test(password)) {
    if (password.length > 9) {
      return { text: "Fort", class: "strong" };
    } else {
      return { text: "Moyen", class: "medium" };
    }
  } else {
    return { text: "Faible", class: "weak" };
  }
}

function handleSignup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Vos mots de passe ne correspondent pas.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email || user.name === name)) {
    alert("L'adresse e-mail ou le nom d'utilisateur ont déjà été utilisé.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Inscription réussie !");
  window.location.href = "./index.html"; // Redirection vers la page d'accueil après inscription réussie
}

function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    alert(`Bienvenue, ${user.name} !`);
    window.location.href = "./index.html"; // Redirection vers la page d'accueil après connexion réussie
  } else {
    alert("Adresse e-mail ou mot de passe incorrect.");
  }
}

function toggleAuthMode() {
  const isSignupMode =
    document.getElementById("signup-section").style.display !== "none";

  document.getElementById("signup-section").style.display = isSignupMode
    ? "none"
    : "block";
  document.getElementById("login-section").style.display = isSignupMode
    ? "block"
    : "none";
  document.getElementById("form-title").textContent = isSignupMode
    ? "Connexion"
    : "Inscription";
  document.getElementById("submit-button").textContent = isSignupMode
    ? "Se connecter"
    : "S'inscrire";
  document.getElementById("toggle-auth-mode").textContent = isSignupMode
    ? "Pas encore inscrit ? Créez un compte."
    : "Déjà inscrit ? Connectez-vous.";
}

document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    window.location.href = "./index.html"; // Redirection vers la page d'accueil si un utilisateur est déjà connecté
  }
});

document
  .getElementById("auth-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const isSignupMode =
      document.getElementById("signup-section").style.display !== "none";
    if (isSignupMode) {
      handleSignup();
    } else {
      handleLogin();
    }
  });

function handleSignup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Vos mots de passe ne correspondent pas.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email || user.name === name)) {
    alert("L'adresse e-mail ou le nom d'utilisateur ont déjà été utilisé.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Inscription réussie !");
  localStorage.setItem("loggedInUser", JSON.stringify({ name, email })); // Enregistrer l'utilisateur comme connecté
  window.location.href = "./index.html"; // Redirection vers la page d'accueil après inscription réussie
}

function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    alert(`Bienvenue, ${user.name} !`);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ name: user.name, email })
    ); // Enregistrer l'utilisateur comme connecté
    window.location.href = "./index.html"; // Redirection vers la page d'accueil après connexion réussie
  } else {
    alert("Adresse e-mail ou mot de passe incorrect.");
  }
}
