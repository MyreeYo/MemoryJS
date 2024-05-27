const cardsArray = [
  { name: "card1", img: "https://zupimages.net/up/24/22/yqrt.png" },
  { name: "card2", img: "https://zupimages.net/up/24/22/wch0.png" },
  { name: "card3", img: "https://zupimages.net/up/24/22/gxjv.png" },
  { name: "card4", img: "https://zupimages.net/up/24/22/tzbn.png" },
  { name: "card5", img: "https://zupimages.net/up/24/22/g23k.png" },
  { name: "card6", img: "https://zupimages.net/up/24/22/yazx.png" },
  { name: "card7", img: "https://zupimages.net/up/24/22/k8xn.png" },
  { name: "card8", img: "https://zupimages.net/up/24/22/y32w.png" },
  { name: "card1", img: "https://zupimages.net/up/24/22/yqrt.png" },
  { name: "card2", img: "https://zupimages.net/up/24/22/wch0.png" },
  { name: "card3", img: "https://zupimages.net/up/24/22/gxjv.png" },
  { name: "card4", img: "https://zupimages.net/up/24/22/tzbn.png" },
  { name: "card5", img: "https://zupimages.net/up/24/22/g23k.png" },
  { name: "card6", img: "https://zupimages.net/up/24/22/yazx.png" },
  { name: "card7", img: "https://zupimages.net/up/24/22/k8xn.png" },
  { name: "card8", img: "https://zupimages.net/up/24/22/y32w.png" },
];

const game = document.querySelector(".memory-game");

const createCard = (card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("memory-card");
  cardElement.dataset.name = card.name;

  const frontFace = document.createElement("img");
  frontFace.classList.add("front-face");
  frontFace.src = card.img;

  const backFace = document.createElement("img");
  backFace.classList.add("back-face");
  backFace.src = "https://zupimages.net/up/24/22/pohx.png";

  cardElement.appendChild(frontFace);
  cardElement.appendChild(backFace);

  return cardElement;
};

const initializeGame = () => {
  game.innerHTML = "";
  const shuffledCards = cardsArray.sort(() => 0.5 - Math.random());
  shuffledCards.forEach((card) => {
    const cardElement = createCard(card);
    game.appendChild(cardElement);
  });

  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
};

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const flipCard = function () {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
};

const checkForMatch = () => {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
};

const unflipCards = () => {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
};

const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    initializeGame();
  }
});
// commentaire nul
initializeGame();
