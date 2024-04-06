//Gives each cell an eventListener for when the user clicks on them
var cellList = document.querySelectorAll(".cell");
for(var i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener("click", setValue);
}

//This variable holds the values of each cell (empty, X, O)
var board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_']
];

//When a cell is clicked, its value will be set to the current player's value
function setValue(clickedCellEvent) {
    const clickedCell = clickedCellEvent.click;
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
}