// get DOM
const newGameButton = document.getElementById("newgame");
const squares = [...document.querySelectorAll(".item")];
const wrap = document.getElementById("wrap");

// global scope
const indexBombs = [];
const sumTab = new Array(64);

// first viev
if (indexBombs.length == 0) {
    wrap.style.display = "none";
};

const randomBomb = () => {

    // cleaning the game
    squares.forEach(item => {
        item.textContent = "";
        item.style.backgroundColor = 'lightgray';
    });
    indexBombs.length = 0;
    const normalNumbers = [];
    const edgeLeftNumbers = [];
    const edgeRightNumbers = [];
    sumTab.fill(0, 0, 64);
    wrap.style.display = "block";

    // generating bombs
    squares.forEach((_, index) => {
        squares[index].classList.remove("bomb", "nobomb", "flag");
    });
    while (indexBombs.length < 8) {
        let random = (Math.floor((Math.random() * 65)));
        if (!indexBombs.includes(random)) {
            indexBombs.push(random)
        }
    };
    // divide for 3 cases
    indexBombs.forEach((item) => {
        if (item % 8 == 0) {
            edgeRightNumbers.push(item);
        } else if (item % 8 == 7) {
            edgeLeftNumbers.push(item);
        } else {
            normalNumbers.push(item)
        }
    });

    // 1 case
    normalNumbers.forEach((item) => {

        let indexAdd = [1, -1, 7, -7, 8, -8, 9, -9];

        indexAdd.forEach((i) => {
            let c = item + i;
            if (c >= 0 && c <= 63) {
                sumTab[c] += 1
            }
        });
    });
    // 2 case
    edgeLeftNumbers.forEach((item) => {

        let indexAdd = [-1, 7, -9, 8, -8];

        indexAdd.forEach((i) => {
            let c = item + i;
            if (c >= 0 && c <= 63) {
                sumTab[c] += 1
            }
        });
    });
    // 3 case
    edgeRightNumbers.forEach((item) => {

        let indexAdd = [1, 9, -7, 8, -8];

        indexAdd.forEach((i) => {
            let c = item + i;
            if (c >= 0 && c <= 63) {
                sumTab[c] += 1
            }
        });
    });
};

newGameButton.onclick = randomBomb;

// game

const checkBomb = (e) => {
    let square = e.target;

    let divNumber = parseInt(e.target.id);

    if (indexBombs.includes(divNumber) && square.classList.length < 2) {

        console.log(indexBombs);
        indexBombs.forEach(item => {
            squares[item].classList.add("bomb")
        });
        if (square.classList.length < 3) {
            square.style.backgroundColor = "rgb(231, 6, 6)"
        }

    } else {
        if (square.classList.length < 2) {
            square.classList.add("nobomb");
            let text = sumTab[divNumber];
            if (text != 0) {
                square.textContent = text;
            }
        }
    }
};

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", checkBomb);
    squares[i].addEventListener("contextmenu", function (e) {
        e.preventDefault();
        if (e.target.classList.length < 2) {
            e.target.classList.add("flag")
        } else {
            e.target.classList.remove("flag")
        }
    }, false);
};