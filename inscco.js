// Ajoute un gestionnaire d'événements à l'élément avec l'ID "auth-form" lorsqu'il est soumis.
document
  .getElementById("auth-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre et de rafraîchir la page.

    // Vérifie si le mode d'authentification est celui de l'inscription.
    const isSignupMode =
      document.getElementById("signup-section").style.display !== "none";

    // Si le mode est l'inscription, appelle la fonction handleSignup(), sinon appelle handleLogin().
    if (isSignupMode) {
      handleSignup();
    } else {
      handleLogin();
    }
  });

// Ajoute un gestionnaire d'événements à l'élément avec l'ID "password" lorsqu'une saisie est effectuée.
document.getElementById("password").addEventListener("input", function () {
  const password = document.getElementById("password").value; // Récupère la valeur du champ de mot de passe.
  const strengthElement = document.getElementById("password-strength"); // Récupère l'élément d'affichage de la force du mot de passe.
  const strength = getPasswordStrength(password); // Appelle la fonction pour évaluer la force du mot de passe.

  // Met à jour le texte et la classe CSS de l'élément d'affichage de la force du mot de passe.
  strengthElement.textContent = `Force du mot de passe : ${strength.text}`;
  strengthElement.className = `password-strength ${strength.class}`;
});

// Ajoute un gestionnaire d'événements à l'élément avec l'ID "toggle-auth-mode" lorsqu'il est cliqué.
document
  .getElementById("toggle-auth-mode")
  .addEventListener("click", function () {
    toggleAuthMode(); // Appelle la fonction pour basculer entre les modes d'authentification.
  });

// Fonction qui évalue la force du mot de passe en fonction de sa longueur et de son contenu.
function getPasswordStrength(password) {
  if (password.length < 6) {
    // Si le mot de passe est trop court...
    return { text: "Faible", class: "weak" }; // ...il est considéré comme faible.
  } else if (password.length >= 6 && /[\d\W]/.test(password)) {
    // Si le mot de passe contient des chiffres ou des caractères spéciaux...
    if (password.length > 9) {
      // ...et s'il est assez long...
      return { text: "Fort", class: "strong" }; // ...il est considéré comme fort.
    } else {
      // Sinon...
      return { text: "Moyen", class: "medium" }; // ...il est considéré comme de force moyenne.
    }
  } else {
    // Si le mot de passe ne répond à aucun des critères ci-dessus...
    return { text: "Faible", class: "weak" }; // ...il est considéré comme faible.
  }
}

// Fonction appelée lors de la soumission du formulaire d'inscription.
function handleSignup() {
  // Récupère les valeurs des champs de nom, d'email, de mot de passe et de confirmation du mot de passe.
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Vérifie si les mots de passe saisis correspondent.
  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  // Récupère les utilisateurs enregistrés depuis le stockage local ou initialise un tableau vide.
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Vérifie si l'email ou le nom d'utilisateur est déjà utilisé par un utilisateur existant.
  if (users.some((user) => user.email === email || user.name === name)) {
    alert("L'adresse e-mail ou le nom d'utilisateur est déjà utilisé.");
    return;
  }

  // Ajoute le nouvel utilisateur à la liste des utilisateurs et la sauvegarde dans le stockage local.
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  // Affiche un message de succès et bascule vers le mode de connexion.
  alert("Inscription réussie !");
  toggleAuthMode();
}

// Fonction appelée lors de la soumission du formulaire de connexion.
function handleLogin() {
  // Récupère les valeurs des champs d'email et de mot de passe.
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Récupère les utilisateurs enregistrés depuis le stockage local ou initialise un tableau vide.
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Vérifie si un utilisateur correspond aux informations de connexion fournies.
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  // Affiche un message de bienvenue si l'utilisateur est trouvé, sinon affiche un message d'erreur.
  if (user) {
    alert(`Bienvenue, ${user.name} !`);
  } else {
    alert("Adresse e-mail ou mot de passe incorrect.");
  }
}

// Fonction pour basculer entre le mode d'inscription et le mode de connexion.
function toggleAuthMode() {
  const isSignupMode =
    document.getElementById("signup-section").style.display !== "none";

  // Change la visibilité des sections de formulaire en fonction du mode actuel.
  document.getElementById("signup-section").style.display = isSignupMode
    ? "none"
    : "block";
  document.getElementById("login-section").style.display = isSignupMode
    ? "block"
    : "none";

  // Change le texte du titre du formulaire et du bouton de soumission en fonction du mode actuel.
  document.getElementById("form-title").textContent = isSignupMode
    ? "Connexion"
    : "Inscription";
  document.getElementById("submit-button").textContent = isSignupMode
    ? "Se connecter"
    : "S'inscrire";

  // Change le texte du lien pour basculer entre les modes d'authentification.
  document.getElementById("toggle-auth-mode").textContent = isSignupMode
    ? "Pas encore inscrit ? Créez un compte"
    : "Déjà inscrit ? Connectez-vous";
}
