
// board:
var blockUnit = 25;
var rows = 20;
var cols = 20;
var board;
var drawingBoard;


// snake body:
var snakeX = blockUnit * 5;
var snakeY = blockUnit * 5;

// need an array to keep ADDING ontop of x length
var snakeGrowth = [];

var movementX = 0;
var movementY = 0;

// snake food:
var foodX;
var foodY;

// restrictions
var gameOver = false;
// score
var score = 0;

// redrawing canvas

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockUnit;
    board.width = cols * blockUnit;
    drawingBoard = board.getContext("2d");

    rngFood();
    rngSnake();

    document.addEventListener("keyup", movement);
    setInterval(update, 1000/15);
    //update();
    requestAnimationFrame(update);
}

/////////////////// MAIN
function update() {

    // end game if over
    if (gameOver) {
        return;
    }
    

    // canvas
    drawingBoard.fillStyle="rgb(56, 70, 75)";
    drawingBoard.fillRect(0,0, board.width,board.height); 

    // snake+apple
    drawingBoard.fillStyle="red";
    drawingBoard.fillRect(foodX,foodY, blockUnit, blockUnit);
    ateFood();
    growTail();
    matchPath();
    drawingBoard.fillStyle="cyan";
    snakeX += movementX * blockUnit;
    snakeY += movementY * blockUnit;
    drawingBoard.fillRect(snakeX, snakeY, blockUnit, blockUnit);
    snakeAte();
    updateScore()
    restrictions();
} 
/////////////////// MAIN

// must add restricitons to not go in itself
function movement(e) {
    if ((e.code == "ArrowUp" || e.code == "KeyW") && movementY != 1) {
        movementX = 0;
        movementY = -1;
    } else if ((e.code == "ArrowLeft" || e.code == "KeyA") && movementX != 1) {
        movementX = -1;
        movementY = 0;
    } else if ((e.code == "ArrowDown" || e.code == "KeyS") && movementY != -1) {
        movementX = 0;
        movementY = 1;
    } else if ((e.code == "ArrowRight" || e.code == "KeyD") && movementX != -1) {
        movementX = 1;
        movementY = 0;
    } 
}

// check if ate and replace food
function  ateFood() {
    if (snakeX == foodX && snakeY == foodY) {
        snakeGrowth.push([foodX, foodY])
        score+= 1;
        rngFood();
        }
}
// start growth from tail not head
function growTail() {
    for (let i = snakeGrowth.length-1; i > 0; i--) {
        snakeGrowth[i] = snakeGrowth[i-1];
    }
}
// match the path the head routed through
function matchPath() {
    if (snakeGrowth.length) {
        snakeGrowth[0] = [snakeX, snakeY];
    }
}

// growth drawing
function snakeAte() {
    for (let i = 0; i < snakeGrowth.length; i++) {
        drawingBoard.fillRect(snakeGrowth[i][0], snakeGrowth[i][1], blockUnit, blockUnit);
    }
}

function updateScore() {
    var scoreElement = document.getElementById("score");
    if (scoreElement) {
        scoreElement.textContent = "Score: " + score;
    }
}

function restrictions() {
    if (snakeX < 0 || snakeX > (cols * blockUnit) || snakeY < 0 || snakeY > (rows * blockUnit)) {
        gameOver = true;
        gameOverMessage("Game Over! Be careful with the walls!");
    }
    for (let i = 0; i < snakeGrowth.length; i++) {
        if (snakeX == snakeGrowth[i][0] && snakeY == snakeGrowth[i][1]) {
            gameOver = true;
            gameOverMessage("Game Over! Try not to eat yourself!");
        }
        
    }
}

// rngfood and snake spawns
function rngFood() {
    foodX = Math.floor(Math.random() * cols) * blockUnit;
    foodY = Math.floor(Math.random() * rows) * blockUnit;
}
function rngSnake() {
    snakeX = Math.floor(Math.random() * cols) * blockUnit;
    snakeY = Math.floor(Math.random() * rows) * blockUnit;
}

function gameOverMessage(msg) {
    var messageElement = document.getElementById("gameover-message");
    messageElement.textContent = msg;
    messageElement.style.display = "block";
    setTimeout(function() {
        messageElement.style.display = "none";
    }, 2000);
}
