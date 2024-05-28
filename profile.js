document.addEventListener("DOMContentLoaded", function () {
  const profileImageInput = document.getElementById("profile-image");
  const previewImage = document.getElementById("preview-image");
  const usernameInput = document.getElementById("username");
  const saveButton = document.getElementById("save-btn");

  // Chargement des données depuis localStorage
  loadProfileData();

  // Écouteur d'événement pour le changement d'image de profil
  profileImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        previewImage.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Écouteur d'événement pour le clic sur le bouton "Sauvegarder"
  saveButton.addEventListener("click", function () {
    saveProfileData();
  });

  // Fonction pour charger les données du profil depuis localStorage
  function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem("profile")) || {};
    if (profileData.image) {
      previewImage.src = profileData.image;
    }
    if (profileData.username) {
      usernameInput.value = profileData.username;
    }
  }

  // Fonction pour sauvegarder les données du profil dans localStorage
  function saveProfileData() {
    const profileData = {
      image: previewImage.src,
      username: usernameInput.value,
    };
    localStorage.setItem("profile", JSON.stringify(profileData));
    // Mise à jour de l'affichage après la sauvegarde
    alert("Profil sauvegardé avec succès !");
  }
});
