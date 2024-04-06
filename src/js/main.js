var currentPlayer = "X"; //make this randomized

//Adds an eventListener to each cell
const cellList = document.getElementsByClassName("cell");
for(var i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener("click", setValue);
}

//This variable holds the values of each cell (empty, X, O)
var board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
];

//When a cell is clicked, its value will be set to the current player's value
function setValue(clickEvent) {
    const clickedCell = clickEvent.target;
    const clickedCellIndex = clickedCell.getAttribute("data-index");
    //console.log(clickedCellIndex);

    const clickedCellRow = Math.floor(clickedCellIndex / 3);
    const clickedCellCol = clickedCellIndex % 3;
    //console.log(clickedCellRow);
    //console.log(clickedCellCol);

    if(board[clickedCellRow][clickedCellCol] == "_") {
        board[clickedCellRow][clickedCellCol] = currentPlayer;
    }
    //console.log(board[clickedCellRow][clickedCellCol]);

    /* TODO: Setting the board to also show the value...Next turn...figure out more later :) */
}

//Checks if either player has won and returns the value of the winning player
function gameOverCheck() {
    //Checks for a horizontal win
    for(var i = 0; i < 3; i++) {
        if(board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] != "_") {
            return board[i][0];
        }
    }

    //Checks for a vertical win
    for(var i = 0; i < 3; i++) {
        if(board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] != "_") {
            return board[0][i];
        }
    }

    //Checks for a diagonal win
    if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != "_") {
        return board[0][0];
    }
    
    if(board[0][2] == board[1][1] && board[0][0] == board[2][0] && board[0][2] != "_") {
        return board[0][2];
    }
}