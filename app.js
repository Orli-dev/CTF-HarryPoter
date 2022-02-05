class CardMemory {
  constructor(cardsArray) {
    this.cardsArray = cardsArray;
    this.match = document.getElementById("match");
  }

  startGame() {
    this.cardToCheck = null;
    this.matches = 0;
    this.match.innerText = this.matches;
    this.matchesCards = [];
    this.busy = true;

    setTimeout(() => {
      this.shuffleCards();
      this.busy = false;
    }, 500);
    this.hideCards();
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
    });
  }

  winner() {
    document.getElementById("win-text").classList.add("visible");
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      card.classList.add("visible");
      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
      this.matches++;
      this.match.innerText = this.matches;
    } else {
      this.cardMisMatch(card, this.cardToCheck);
    }

    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.matchesCards.push(card1);
    this.matchesCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    if (this.matchesCards.length == this.cardsArray.length - 1) {
      this.winner();
      this.matches = 0;
      this.match.innerText = this.matches;
    }
  }

  cardMisMatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 1000);
  }
  getCardType(card) {
    return card.getElementsByClassName("pic")[0].src;
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchesCards.includes(card) &&
      card != this.cardToCheck
    );
  }

  shuffleCards() {
    for (let i = 0; i < this.cardsArray.length; i++) {
      let randI = Math.floor(Math.random() * (i * 1));
      this.cardsArray[randI].style.order = i;
      this.cardsArray[i].style.order = randI;
    }
  }
}
function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new CardMemory(cards);

  overlays.forEach((overlays) => {
    overlays.addEventListener("click", () => {
      overlays.classList.remove("visible");

      game.startGame();
    });
  });
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}
