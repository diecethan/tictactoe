//This variable holds the values of each cell (empty, X, O)
var board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
];

//Runs this function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setup);
var currentPlayer, xScore, oScore, gameRun;
function setup() {
    currentPlayer = (Math.round(Math.random()) == 1) ? 'X' : 'O';
    xScore = 0;
    oScore = 0;
    gameRun = true;

    document.querySelector(".currentPlayer").textContent = "Current Player: " + currentPlayer;
    document.querySelector(".xScore").textContent = "Player X Score: 0";
    document.querySelector(".oScore").textContent = "Player O Score: 0";
}

//Adds an eventListener to each cell
const cellList = document.getElementsByClassName("cell");
for(var i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener("click", setValue);
}

//When a cell is clicked, its value will be set to the current player's value
function setValue(clickEvent) {
    const clickedCell = clickEvent.target;
    const clickedCellIndex = clickedCell.getAttribute("data-index");

    const clickedCellRow = Math.floor(clickedCellIndex / 3);
    const clickedCellCol = clickedCellIndex % 3;

    if(board[clickedCellRow][clickedCellCol] == '_' && gameRun) {
        board[clickedCellRow][clickedCellCol] = currentPlayer;
        clickedCell.style.backgroundImage = currentPlayer === 'X' ? 'url(images/x.png)' : 'url(images/o.png)';
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.querySelector(".currentPlayer").textContent = "Current Player: " + currentPlayer;
    }

    var gameOver = gameOverCheck();
    if(gameOver != '_') {
        document.querySelector(".winner").textContent = "Player " + gameOver + " Wins!";
        gameRun = false;

        
    }
}

//Checks if either player has won and returns the value of the winning player
function gameOverCheck() {
    //Checks for a horizontal win
    for(var i = 0; i < 3; i++) {
        if(board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] != '_') {
            return board[i][0];
        }
    }

    //Checks for a vertical win
    for(var i = 0; i < 3; i++) {
        if(board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] != '_') {
            return board[0][i];
        }
    }

    //Checks for a diagonal win
    if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != '_') {
        return board[0][0];
    }
    
    if(board[0][2] == board[1][1] && board[0][0] == board[2][0] && board[0][2] != '_') {
        return board[0][2];
    }

    return '_';
}

function restartGame() {

}