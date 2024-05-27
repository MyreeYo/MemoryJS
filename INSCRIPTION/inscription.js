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
