// Attends que le contenu du DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", (event) => {
  // Sélectionne l'élément d'entrée mdp et l'élément d'affichage de la force du mdp
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("passwordStrength");

  // Ajoute un EventListener pour l'entrée mdp
  passwordInput.addEventListener("input", () => {
    // Calcule la force mdp et màj affichage
    const strength = getPasswordStrength(passwordInput.value);
    displayPasswordStrength(strength);
  });

  // Fonction pour calculer la force du mot de passe
  function getPasswordStrength(password) {
    let strength = 0;
    // Incrémente force si mdp a au moins 6 caractères
    if (password.length >= 6) strength++;
    // Incrémente force si mdp a au moins 9 caractères
    if (password.length >= 9) strength++;
    // Incrémente force si mdp contient au moins un chiffre
    if (/\d/.test(password)) strength++;
    // Incrémente force si mdp contient au moins un caractère spécial
    if (/[^\w\s]/.test(password)) strength++;
    return strength;
  }

  // Affiche force mdp en fonction de sa valeur
  function displayPasswordStrength(strength) {
    switch (strength) {
      case 0:
      case 1:
        // Affiche "Weak" et applique "weak"
        passwordStrength.textContent = "Weak";
        passwordStrength.className = "weak";
        break;
      case 2:
        // Affiche "Medium" et applique CSS "medium"
        passwordStrength.textContent = "Medium";
        passwordStrength.className = "medium";
        break;
      case 3:
      case 4:
        // Affiche "Strong" et applique CSS "strong"
        passwordStrength.textContent = "Strong";
        passwordStrength.className = "strong";
        break;
    }
  }

  // Ajoute un EventListener pour soumettre formulaire inscription
  document
    .getElementById("signupForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Récupère utilisateurs existants du localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Vérifie si pseudo ou l'email existe déjà
      const userExists = users.some(
        (user) => user.username === username || user.email === email
      );
      if (userExists) {
        alert("Pseudo ou email déjà existant !");
        return;
      }

      // Force mdp
      let passwordStrength = "weak";
      if (getPasswordStrength(password) === 2) {
        passwordStrength = "medium";
      } else if (getPasswordStrength(password) >= 3) {
        passwordStrength = "strong";
      }

      // Crée un nouvel utilisateur et l'ajoute à la liste des utilisateurs
      const newUser = {
        username: username,
        email: email,
        password: password,
        passwordStrength: passwordStrength,
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Enregistre utilisateur actuel dans localStorage pour une co auto
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // Redirige vers la page d'accueil
      window.location.href = "./index.html";
    });

  // Ajoute EventListener pour soumettre formulaire co
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const loginUsername = document.getElementById("loginUsername").value;
      const loginPassword = document.getElementById("loginPassword").value;

      // Récupère les utilisateurs existants du localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Vérifie si l'utilisateur existe et si le mdp est correct
      const currentUser = users.find(
        (user) =>
          user.username === loginUsername && user.password === loginPassword
      );
      if (currentUser) {
        // Enregistre utilisateur dans localStorage et co auto
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        // Redirige page d'accueil
        window.location.href = "./index.html";
      } else {
        alert("Pseudo ou mot de passe invalide !");
      }
    });
});
