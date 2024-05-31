// Tableau de cartes avec paires
const cardsArray = [
  { name: "card1", img: "https://zupimages.net/up/24/22/opkz.png" },
  { name: "card2", img: "https://zupimages.net/up/24/22/0udz.png" },
  { name: "card3", img: "https://zupimages.net/up/24/22/hxu5.png" },
  { name: "card4", img: "https://zupimages.net/up/24/22/17tv.png" },
  { name: "card5", img: "https://zupimages.net/up/24/22/01rz.png" },
  { name: "card6", img: "https://zupimages.net/up/24/22/ibwp.png" },
  { name: "card7", img: "https://zupimages.net/up/24/22/jssz.png" },
  { name: "card8", img: "https://zupimages.net/up/24/22/afon.png" },
  { name: "card1", img: "https://zupimages.net/up/24/22/opkz.png" },
  { name: "card2", img: "https://zupimages.net/up/24/22/0udz.png" },
  { name: "card3", img: "https://zupimages.net/up/24/22/hxu5.png" },
  { name: "card4", img: "https://zupimages.net/up/24/22/17tv.png" },
  { name: "card5", img: "https://zupimages.net/up/24/22/01rz.png" },
  { name: "card6", img: "https://zupimages.net/up/24/22/ibwp.png" },
  { name: "card7", img: "https://zupimages.net/up/24/22/jssz.png" },
  { name: "card8", img: "https://zupimages.net/up/24/22/afon.png" },
];

// Sélectionne l'élément du jeu de mémoire et le son de paire
const game = document.querySelector(".memory-game");
const pairSound = document.getElementById("pair-sound");

// Fonction pour créer une carte
const createCard = (card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("memory-card");
  cardElement.dataset.name = card.name;

  const frontFace = document.createElement("img");
  frontFace.classList.add("front-face");
  frontFace.src = card.img;

  const backFace = document.createElement("img");
  backFace.classList.add("back-face");
  backFace.src =
    "https://i.pinimg.com/564x/d4/e7/e5/d4e7e58055924289bbc0fba9f282c3e1.jpg";

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  return cardElement;
};

// Fonction pour initialiser le jeu
const initializeGame = () => {
  game.innerHTML = ""; // Vide le contenu du jeu
  // Mélange les cartes de manière aléatoire
  const shuffledCards = cardsArray.toSorted(() => 0.5 - Math.random());
  // Pour chaque carte, crée un élément de carte et l'ajoute au jeu
  shuffledCards.forEach((card) => {
    const cardElement = createCard(card);
    game.appendChild(cardElement);
  });

  // Ajoute un écouteur d'événements de clic à chaque carte
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
};

// Variables pour gérer l'état du jeu
let hasFlippedCard = false; // Indique si une carte a été retournée
let lockBoard = false; // Verrouille plateau pour empêcher de retourner plus de deux cartes
let firstCard, secondCard; // Réf aux deux cartes retournées
let matchedPairs = 0; // Compte le nombre de paires trouvées

// Fonction pour retourner une carte
const flipCard = function () {
  if (lockBoard) return; // Ne fait rien si le plateau est verrouillé
  if (this === firstCard) return; // Ne fait rien si la même carte est cliquée deux fois

  this.classList.add("flip"); // Ajoute flip pour retourner carte

  if (!hasFlippedCard) {
    // Si aucune carte n'a été retournée
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this; // Assigne la deuxième carte
  checkForMatch(); // Vérifie si les deux cartes correspondent
};

// Fonction pour vérifier si les deux cartes correspondent
const checkForMatch = () => {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name; // Compare les noms des cartes
  isMatch ? disableCards() : unflipCards(); // Si paire, désactive les cartes, sinon retourne les cartes
  if (isMatch) {
    pairSound.play(); // Joue le son de paire
    pairSound.volume = 0.2; // Réduit volume son paires
    matchedPairs++; // Incrémente nbr paires trouvées
  }
};

// Fonction désactiver carte ap paire
const disableCards = () => {
  firstCard.removeEventListener("click", flipCard); // Enlève EventListener clic
  secondCard.removeEventListener("click", flipCard); // Enlève EventListener clic
  resetBoard(); // Réinitialise état plateau
};

// Fonction pour retourner les cartes si pas pair
const unflipCards = () => {
  lockBoard = true; // Verrouille plateau
  setTimeout(() => {
    firstCard.classList.remove("flip"); // Retire flip
    secondCard.classList.remove("flip"); // Retire flip
    resetBoard(); // Réinitialise plateau
  }, 1500); // Attendre 1.5 secondes avant de retourner les cartes
};

// Fonction pour réinitialiser les variables état plateau
const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false]; // Réinitialise les variables
  [firstCard, secondCard] = [null, null]; // Réinitialise les cartes
};

// Ajoute EventListener pour réinitialiser jeu avec spacebar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    initializeGame();
  }
});

// Initialise je au chargmt page
initializeGame();
