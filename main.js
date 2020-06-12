let originalBoard;
const humanPlayer = "0";
const computerPlayer = "X";
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
const cells = document.querySelectorAll(".cell");
startGame();

function startGame () {
    document.querySelector(".endgame").style.display = "none";
    originalBoard = Array.from(Array(9).keys());

    const buttonElement = document.querySelector("button");
    buttonElement.addEventListener("click", startGame);

    for (let i = 0; i<cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false)
    }
}

function turnClick(square) {
    if (typeof originalBoard[square.target.id] === "number") {
            turn(square.target.id, humanPlayer)
    if (!checkDraw()) turn (computerSpot(), computerPlayer);
    }
}

function turn(squareId, player) {
    originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWinner = checkWinner(originalBoard, player)
    if(gameWinner) gameOver(gameWinner);
}

function checkWinner(board, player) {
    let plays = board.reduce((accumulator, element, index) => (element === player) ? accumulator.concat(index) : accumulator, []);
    let gameWinner = null;

    for (let [index, win] of winCombinations.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)){
            gameWinner = {index: index, player: player};
            break;
        }
    }
    return gameWinner;
}

function gameOver (gameWinner) {
    for (let index of winCombinations[gameWinner.index]) {
        document.getElementById(index).style.backgroundColor = 
        gameWinner.player == humanPlayer ? "green" : "red";
    }

    for(let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false);
    }
    declareWinner(gameWinner.player == humanPlayer ? "You win!" : "You lose.")
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
    return originalBoard.filter(toSee => typeof toSee == "number");
}

function computerSpot() {
    return emptySquares()[0];
}

function checkDraw() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "transparent";
            cells[i].removeEventListener("click", turnClick, false);
        }
        declareWinner("Draw Game!")
        return true;
    }
    return false;
}