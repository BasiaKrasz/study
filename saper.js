// get DOM
const newGameButton = document.getElementById("newgame");
const square = [...document.querySelectorAll(".item")];
const wrap = document.getElementById("wrap");

// global scope
const indexBombs = [];
const sumaTab = [];

// first viev
if (indexBombs.length == 0) {
    wrap.style.display = "none";
};


const randomBomb = () => {

    // cleaning the game
    square.forEach(item => item.textContent = "");
    indexBombs.length = 0;
    const normalNumbers = [];
    const edgeLeftNumbers = [];
    const edgeRightNumbers = [];
    sumaTab.length = 65;
    sumaTab.fill(0, 0, 65);
    wrap.style.display = "block";

    // generating bombs
    square.forEach((item, index) => {
        square[index].classList.remove("bomb", "nobomb");
    });
    while (indexBombs.length < 8) {
        let random = (Math.floor((Math.random() * 65)));
        if (indexBombs.indexOf(random) === -1) {
            indexBombs.push(random)
        }
    };

    console.log(indexBombs);

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
                sumaTab[c] += 1
            }
        });
    });
    // 2 case
    edgeLeftNumbers.forEach((item) => {

        let indexAdd = [-1, 7, -9, 8, -8];

        indexAdd.forEach((i) => {
            let c = item + i;
            if (c >= 0 && c <= 63) {
                sumaTab[c] += 1
            }
        });
    });
    // 3 case
    edgeRightNumbers.forEach((item) => {

        let indexAdd = [1, 9, -7, 8, -8];

        indexAdd.forEach((i) => {
            let c = item + i;
            if (c >= 0 && c <= 63) {
                sumaTab[c] += 1
            }
        });
    });
    console.log(sumaTab);
};
newGameButton.onclick = randomBomb;

// game

for (let i = 0; i < square.length; i++) {
    const checkBomb = (e) => {
        let divNumber = e.target.id;
        if (indexBombs.includes(parseInt(divNumber))) {
            e.target.classList.toggle("bomb");

        } else {
            e.target.classList.toggle("nobomb");
            let text = sumaTab[divNumber];
            if (text != 0) {
                e.target.textContent = text;
            }
        }
        console.log(e.target);
    };
    square[i].addEventListener("click", checkBomb);
};