# Tic-Tac-Toe Game

This is a simple Tic-Tac-Toe game built using HTML, CSS, and JavaScript. It includes two gameplay modes: multiplayer (two players) and single-player against the computer.

## Demo
https://diecethan.github.io/tictactoe/

## How to Play
**Multiplayer Mode:**
* Players take turns clicking on an empty cell to mark their symbol (X or O).
* The first player to get three marks in a row (vertically, horizontally, or diagonally) wins.
* If all cells are filled and no player has three marks in a row, the game ends in a draw.

**Single-Player Mode:**
* You play as X, and the computer plays as O.
* The game follows the same rules as multiplayer mode.

## Game Logic Overview
* The game board is represented as a 2D array, where each cell can hold either '_', 'X', or 'O'.
* Players alternate turns, and the game checks for wins or ties after each move.
* The computer randomly selects from available cells in single-player mode.

## Future Improvements
* Implement a difficulty setting for the computer opponent.
* Add animations.
  * Drawing moves made.
  * Winning/Tying animation.
