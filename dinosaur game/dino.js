
//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//Dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;



let dino = {
    x : dinoX,
    y : dinoY,
    width : dinoWidth,
    height : dinoHeight
}
//cactus
let cactusarray = []

let cactus1width = 34;
let cactus2width = 69;
let cactus3width = 102;

let cactusHeight= 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics or someting
let isJumping = false;
let velocity = 0;
let gravity = 0.5;
let velocityX = -8;
let gameOver = false;
let score = 0;


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth
    scorsus = document.getElementById("score")

    context = board.getContext("2d"); //used for drawing on the board

    //fdkajlföl
    //context.fillStyle="red";
    //context.fillRect(dino.x, dino.y, dino.width, dino.height)
    dinoImg = new Image();
    dinoImg.src = "./img/cat.png";
    dinoImg.onload = function (){
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./img/cat2.png";
    cactus2Img = new Image();
    cactus2Img.src = "./img/cat2.png";
    cactus3Img = new Image();
    cactus3Img.src = "./img/cat2.png";



    requestAnimationFrame(update);
    jump()
    setInterval(placecactus, 1000);
    setInterval(scoremaker, 1000);


}
function scoremaker() {
    if (!gameOver) {
        score += 1;
        scorsus.innerText = 'Score: ' + score;
        if (localStorage.getItem("highscore")) {
            if (parseInt(localStorage.getItem("highscore")) < score){
                localStorage.setItem("highscore", score)
            }
        } else {
            localStorage.setItem("highscore", score)
        }
        document.getElementById("highscore").innerText = 'Highscore: ' + localStorage.getItem("highscore")
    }
}
function update() {
    if (gameOver) {
        return;
    }



    //jump
    context.clearRect(0, 0, boardWidth, boardHeight); // Clear the canvas

    if (isJumping) {
        dino.y += velocity;
        velocity += gravity;

        // Check if dino lands back on the ground
        if (dino.y > boardHeight - dinoHeight) {
            dino.y = boardHeight - dinoHeight;
            isJumping = false;
        }
    }
    //dino
    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i=0; i < cactusarray.length; i++) {
        let cactus = cactusarray[i]
        cactus.x += velocityX
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height)

        if (detectCollision(cactus, dino)){
            gameOver = true;
        }
    }


    requestAnimationFrame(update);
}

function jump() {
    if (gameOver) {
        return;
    }


    addEventListener("keydown", (event) => {
        if (!isJumping) {
            isJumping = true;
            velocity = -10; // Initial upward velocity
        }

        if (gameOver) {
            resetGame()
        }
    });
}


//gay mode
// mid mode
//lunatic
//gay score ienfügen
//music
function placecactus(){
    if (gameOver) {
        return;
    }
    let cactus= {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }

    let chance = Math.random();

    if (chance > .70) { // 30% chance for cactus 3
        cactus.img = cactus3Img
        cactus.width = cactus3width
        cactusarray.push(cactus)
    }
    else if (chance > .50) { // 50 % chance cactus 2
        cactus.img = cactus2Img
        cactus.width = cactus2width
        cactusarray.push(cactus)
    }
    else if (chance > .30) { // 70 % chance cactus 1
        cactus.img = cactus1Img
        cactus.width = cactus1width
        cactusarray.push(cactus)
    }

    if (cactusarray.length > 5) {
        cactusarray.shift();
    }

}

function detectCollision(a, b){
    return         a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function resetGame() {
    // Reset all game variables to their initial states
    gameOver = false;
    score = 0;
    dino.y = boardHeight - dinoHeight;
    cactusarray = [];
    velocity = 0;
    isJumping = false;

    // Restart the game loop
    requestAnimationFrame(update);
}