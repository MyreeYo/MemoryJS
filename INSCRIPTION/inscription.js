document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
    } else {
      alert("Inscription réussie !");
      // Vous pouvez ajouter du code ici pour envoyer les données du formulaire à un serveur
    }
  });

document.getElementById("password").addEventListener("input", function () {
  const password = document.getElementById("password").value;
  const strengthElement = document.getElementById("password-strength");
  const strength = getPasswordStrength(password);

  strengthElement.textContent = `Force du mot de passe : ${strength.text}`;
  strengthElement.className = `password-strength ${strength.class}`;
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
