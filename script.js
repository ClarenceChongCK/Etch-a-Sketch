const container = document.querySelector(".container");
const body = document.querySelector("body");

let mouseDown = false;
let gridsize = 16;
let squareWidth = 480 / gridsize;
let rgbCountdown = 10;

makeGrid();

body.addEventListener("mouseup", () => {
    mouseDown = false;
});

body.addEventListener("mousedown", () => {
    mouseDown = true;
});

function random(number){
    return Math.floor(Math.random()*number);;
}

function makeGrid() {
    for(let i = 0; i < gridsize; i++) {
        const rectangle = document.createElement("div");
        rectangle.style.display = "flex";
        for(let j = 0; j < gridsize; j++) {
            const square = document.createElement("div");
            square.setAttribute("repeat", "false");
            rectangle.appendChild(square);
            square.style.width = `${squareWidth}px`;
            square.addEventListener("mousedown", () => {
                if(square.getAttribute("repeat") == "false") {
                    square.setAttribute("repeat", "true");
                    mouseDown = true;
                    square.style.backgroundColor = rgbColor();
                }
            });
            square.addEventListener("mousemove", () => {
                if(mouseDown && square.getAttribute("repeat") == "false") {
                    square.setAttribute("repeat", "true");
                    square.style.backgroundColor = rgbColor();
                }
            });
            square.addEventListener("mouseup", () => {
                mouseDown = false;
            });
        }
        container.appendChild(rectangle);
    }
}

function resizing() {
    let size = prompt("What size is your sketch pad?", "16");
    gridsize = size;
    squareWidth = 480 / gridsize;
    clear();
    makeGrid();
}

function clear() {
    container.innerHTML = "";
}

function reset() {
    clear();
    makeGrid();
    rgbCountdown = 10;
}

function rgbColor() {
    if (rgbCountdown <= 0) {
        return 'rgb(0, 0, 0)';
    } else {
        let temp = 'rgb('+ random(255) * rgbCountdown / 10 
        +','+random(255) * rgbCountdown / 10+','
        +random(255) * rgbCountdown / 10+')';
        rgbCountdown--;
        return temp;
    }
}

