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

const game = document.querySelector(".memory-game");
const pairSound = document.getElementById("pair-sound");

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

const initializeGame = () => {
  game.innerHTML = "";
  const shuffledCards = cardsArray.toSorted(() => 0.5 - Math.random());
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
let matchedPairs = 0;

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
  if (isMatch) {
    pairSound.play();
    matchedPairs++;
  }
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

initializeGame();
