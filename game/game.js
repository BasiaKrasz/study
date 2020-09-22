// Projekt wykonany w ramach zadania kursu "Programowanie w JavaScript"
// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const gameSumary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
};
const game = {
    playerHand: "",
    compHand: "",
};

/* hands choice */

const hands = document.querySelectorAll(`.select img`);

function selectHand() {

    hands.forEach((hand) => {
        hand.style.boxShadow = ""
    });

    this.style.boxShadow = `0 0 2px 5px red`;
    console.log(this.dataset);
    game.playerHand = this.dataset.option;

};

hands.forEach(hand => hand.addEventListener("click", selectHand));

/* computer choice */

function selectCompHand() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;

};

const btn = document.querySelector("button");
const winner = document.querySelector(`[data-summary="who-win"]`);
const compChoice = document.querySelector(`[data-summary="ai-choice"]`);
const yourChoice = document.querySelector(`[data-summary="your-choice"]`);
gameSumary.numbers = document.querySelector(`.numbers span`);
const nambersOfWin = document.querySelector(`.wins span`);
const nambersOfDraws = document.querySelector(`.draws span`);
const nambersOfLosses = document.querySelector(`.losses span`);

/* check wins */
const checkResult = function (p, c) {
    winner.textContent = '';
    if (p === c) {
        winner.textContent += 'Remis';
        winner.style.color = "gray";
        nambersOfDraws.textContent++;

    } else if ((p === "kamień" && c === "nożyczki") || (p === "papier" && c === "kamień") || (p === "nożyczki" && c === "papier")) {
        winner.textContent = 'Wygrałeś';
        winner.style.color = "green";
        nambersOfWin.textContent++;

    } else {
        winner.textContent = 'Przegrałeś';
        winner.style.color = "red";
        nambersOfLosses.textContent++;
    }
};

btn.addEventListener("click", () => {

    if (!game.playerHand) {
        return alert("Wybierz dłoń");
    };
    game.compHand = selectCompHand();
    compChoice.textContent = game.compHand;
    yourChoice.textContent = game.playerHand;
    gameSumary.numbers.textContent++;

    checkResult(game.playerHand, game.compHand);
});