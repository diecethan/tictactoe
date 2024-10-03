//Runs this function when the DOM is fully loaded or when the Restart Button is clicked
document.addEventListener("DOMContentLoaded", setup);
document.querySelector(".restartButton").addEventListener("click", setup);
var currentPlayer, gameRun, board, compBoard;
var xScore = 0;
var oScore = 0;
var multiplayer = true;
function setup() {
    /* Randomizes who starts the game if the score is tied.
     * Otherwise, the starting turn is given to losing player. */
    if(xScore == oScore) {
        currentPlayer = (Math.round(Math.random()) == 1) ? 'X' : 'O';
    } else {
        currentPlayer = xScore > oScore ? 'O' : 'X';
    }
    
    gameRun = true;

    //Sets the text for these sections (current turn & player scores)
    document.querySelector(".currentPlayer").textContent = "Current Player: " + currentPlayer;
    document.querySelector(".xScore").textContent = "Player X Score: " + xScore;
    document.querySelector(".oScore").textContent = "Player O Score: " + oScore;

    //Sets all the cells to blank and resets the board variable
    const cellList = document.getElementsByClassName("cell");
    for(var i = 0; i < cellList.length; i++) {
        cellList[i].style.backgroundImage = "none";
    }

    board = [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
    ];
    compBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];


    if(!multiplayer && currentPlayer == 'O') {
        computerSelect();
    }
}

//Resets the score and board & switches the game mode whenever the gameModeButton is clicked
document.querySelector(".gameModeButton").addEventListener("click", gameMode);
function gameMode() {
    multiplayer = !multiplayer;
    document.querySelector(".gameModeButton").textContent = multiplayer ? "Play Computer" : "Play Multiplayer";
    
    xScore = 0;
    oScore = 0;
    
    setup();
}

//This function runs whenever a cell is clicked.
const cellList = document.getElementsByClassName("cell");
for(var i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener("click", setValue);
}
function setValue(clickEvent) {
    const clickedCell = clickEvent.target;
    const clickedCellIndex = clickedCell.getAttribute("data-index");
    const clickedCellRow = Math.floor(clickedCellIndex / 3);
    const clickedCellCol = clickedCellIndex % 3;

    if((multiplayer || currentPlayer == 'X') && gameRun) {
        if(board[clickedCellRow][clickedCellCol] == '_' && gameRun) {
            board[clickedCellRow][clickedCellCol] = currentPlayer;
            clickedCell.style.backgroundImage = currentPlayer == 'X' ? 'url(images/x.png)' : 'url(images/o.png)';
            
            currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
            document.querySelector(".currentPlayer").textContent = "Current Player: " + currentPlayer;
        }

        var gameOver = gameOverCheck();
        if(typeof(gameOver) != "number" && gameRun) {
            if(gameOver == 'O') {
                document.querySelector(".oScore").textContent = "Player O Score: " + ++oScore;
            } else {
                document.querySelector(".xScore").textContent = "Player X Score: " + ++xScore;
            }

            document.querySelector(".currentPlayer").textContent = "Player " + gameOver + " Wins!";
            gameRun = false;
        }
        else if(gameOver == 0 && gameRun) {
            document.querySelector(".currentPlayer").textContent = "Tie Game!";
            gameRun = false;
        }
    }

    if(!multiplayer && gameRun && currentPlayer != 'X') {
        compBoard = compBoard.filter((num) => num != clickedCellIndex);
        computerSelect();
    }
}

//This function randomly selects a cell for the computer to play
function computerSelect() {
    const randCellNum = compBoard[Math.floor(Math.random() * compBoard.length)];
    compBoard = compBoard.filter((num) => num != randCellNum);

    const cellToChange = cellList[randCellNum];
    const clickedCellRow = Math.floor(randCellNum / 3);
    const clickedCellCol = randCellNum % 3;

    board[clickedCellRow][clickedCellCol] = currentPlayer;
    cellToChange.style.backgroundImage = 'url(images/o.png)';

    gameOver = gameOverCheck();
    if(typeof(gameOver) != "number" && gameRun) {
        document.querySelector(".oScore").textContent = "Player O Score: " + ++oScore;
        document.querySelector(".currentPlayer").textContent = "Player " + gameOver + " Wins!";
        gameRun = false;
    }
    else if(gameOver == 0 && gameRun) {
        document.querySelector(".currentPlayer").textContent = "Tie Game!";
        gameRun = false;
    } else {
        currentPlayer = 'X';
        document.querySelector(".currentPlayer").textContent = "Current Player: " + currentPlayer;
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
    
    if(board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != '_') {
        return board[0][2];
    }

    //Returns if there are still empty cells (0 means there is a tie; 1+ means to keep playing)
    var blankSpaces = 0;
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
            if(board[i][j] == '_') {
                blankSpaces++;
            }
        }
    }
    return blankSpaces;
}
