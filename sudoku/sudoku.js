var firstGame = true;
var buttonPressed = null;

// https://sandiway.arizona.edu/sudoku/examples.html - Sudoku puzzles and heir solutions

var board = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------"
]

var solution = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------"
]

var boardEasy = [
    "---26-7-1",
    "68--7--9-",
    "19---45--",
    "82-1---4-",
    "--46-29--",
    "-5---3-28",
    "--93---74",
    "-4--5--36",
    "7-3-18---"
]

var boardMed = [
    "1--489--6",
    "73-----4-",
    "-----1295",
    "--712-6--",
    "5--7-3--8",
    "--6-957--",
    "9146-----",
    "-2-----37",
    "8--512--4"
]

var boardHard = [
    "-2-6-8---",
    "58---97--",
    "----4----",
    "37----5--",
    "6-------4",
    "--8----13",
    "----2----",
    "--98---36",
    "---3-6-9-"
]

var solutionEasy = [
    "435269781",
    "682571493",
    "197834562",
    "826195347",
    "374682915",
    "951743628",
    "519326874",
    "248957136",
    "763418259"
]

var solutionMed = [
    "152489376",
    "739256841",
    "468371295",
    "387124659",
    "591763428",
    "246895713",
    "914637582",
    "625948137",
    "873512964"
]

var solutionHard = [
    "123678945",
    "584239761",
    "967145328",
    "372461589",
    "691583274",
    "458792613",
    "836924157",
    "219857436",
    "745316892"
];

window.onload = function () {
    document.getElementById("easy-button").addEventListener("click", function () {
        if (firstGame) {
            firstGame = false;
            document.getElementById("submit-button").removeAttribute("style");
        } else {
            restartGame();
        }

        if (buttonPressed) {
            buttonPressed.classList.remove("button-toggled");
        }

        buttonPressed = document.getElementById("easy-button")
        buttonPressed.classList.add("button-toggled")

        
        board = boardEasy;
        solution = solutionEasy;
        setUpGame();
    })

    document.getElementById("medium-button").addEventListener("click", function () {
        if (firstGame) {
            firstGame = false;
            document.getElementById("submit-button").removeAttribute("style");
        } else {
            restartGame();
        }

        if (buttonPressed) {
            buttonPressed.classList.remove("button-toggled");
        }

        buttonPressed = document.getElementById("medium-button")
        buttonPressed.classList.add("button-toggled")

        board = boardMed;
        solution = solutionMed;
        setUpGame();
    })

    document.getElementById("hard-button").addEventListener("click", function () {
        if (firstGame) {
            firstGame = false;
            document.getElementById("submit-button").removeAttribute("style");
        } else {
            restartGame();
        }

        if (buttonPressed) {
            buttonPressed.classList.remove("button-toggled");
        }

        buttonPressed = document.getElementById("hard-button")
        buttonPressed.classList.add("button-toggled")

        board = boardHard;
        solution = solutionHard;
        setUpGame();
    })
}

function setUpGame() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let tile = document.createElement("input");
            let button = document.getElementById("submit-button")

            button.addEventListener("click", submitButtonClicked);

            tile.setAttribute('maxlength', '1');
            tile.addEventListener("keydown", inputEntered);

            tile.id = row.toString() + "-" + col.toString();
            if (board[row][col] != "-") {
                tile.value = board[row][col]
                tile.classList.add("tile-start")
                tile.setAttribute("disabled", false)
            }

            if (row == 2 || row == 5) {
                tile.classList.add("horizontal-line");
            }

            if (col == 2 || col == 5) {
                tile.classList.add("vertical-line")
            }

            tile.addEventListener("input", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function inputEntered(e) {
    const key = e.key

    const digits = "0123456789";
    if (!digits.includes(key) && key != "Backspace") {
        e.preventDefault();  
    }
}


function selectTile() {
    if (this.value == "") {
        return;
    }

    let place = this.id.split("-");
    let row = parseInt(place[0])
    let col = parseInt(place[1])

    if (solution[row][col] != this.value) {
        error += 1;
        document.getElementById("errors").innerText = error;
    }
}

function submitButtonClicked() {
    document.getElementById("submit-button").classList.add("button-clicked");

    setTimeout(() => {
        document.getElementById("submit-button").classList.remove("button-clicked");
    }, 100);

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == "-") {
                tileID = row.toString() + "-" + col.toString();
                if (solution[row][col] != document.getElementById(tileID).value) {
                    console.log("Incorrect!");
                    displayIncorrectMsg("Incorrect solution. Try again.");
                    return;
                }  
            }
        }
    }

    console.log("Correct!")
    displayCorrectMsg("Correct solution. Good job.");
}

function restartGame() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            tileID = row.toString() + "-" + col.toString();
            document.getElementById(tileID).remove();
        }
    }
}

let incorrectTimeout;
const incorrectBox = document.createElement("div");
incorrectBox.classList.add("incorrect");


function displayIncorrectMsg(msg) {
    var board = document.getElementById("board");
    incorrectBox.innerHTML = msg;

    if (document.body.contains(incorrectBox)) {
        clearTimeout(incorrectTimeout);
    } else {
        board.appendChild(incorrectBox);
    }

    incorrectTimeout = setTimeout(() => {
        incorrectBox.remove();
    }, 2000);
}

let correctTimeout;
const correctBox = document.createElement("div");
correctBox.classList.add("correct");


function displayCorrectMsg(msg) {
    var board = document.getElementById("board");
    correctBox.innerHTML = msg;

    if (document.body.contains(correctBox)) {
        clearTimeout(correctTimeout);
    } else {
        board.appendChild(correctBox);
    }

    correctTimeout = setTimeout(() => {
        correctBox.remove();
    }, 2000);
}

