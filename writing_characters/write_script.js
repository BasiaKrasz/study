const cursor = document.querySelector(".cursor");
cursor.style.color = "lightgrey";
const opacity = setInterval(() => cursor.classList.toggle("cursor"), 500);

let tx = document.querySelector(".text");
let text1 = [...(`/*Hi! I'm Barbra. `)];

let index = 0;

const timeOut1 = () => {
    const tI = () => {

        tx.textContent += text1[index];
        index++;
        clearInterval(opacity);
        cursor.classList = ".cursor";

        if (index === text1.length) {
            clearInterval(addLetter);
            setInterval(() => cursor.classList.toggle("cursor"), 500);
        }
    };
    const addLetter = setInterval(tI, 100);
};

const pouse = setTimeout(timeOut1, 2000);

const text2 = [...(`Feel free to contact me.`)];
let i = 0;

const timeOut2 = () => {
    const t2 = () => {

        tx.textContent += text2[i];
        i++;
        clearInterval(opacity);
        cursor.classList = ".cursor";

        if (i === text2.length) {
            clearInterval(add);
        }
    };
    const add = setInterval(t2, 100);
};
const p = setTimeout(timeOut2, 6000)