// Initialize players and game conditions
const GameControl = (() => {
  let gameOver = false;
  const showPlayer = document.querySelector(".turn");
  const player1 = "Player One";
  const player2 = "Player Two";
  const players = [
    { name: player1, mark: "X" },
    { name: player2, mark: "O" },
  ];
  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    showPlayer.innerText = `${getActivePlayer().name}'s Turn`;
  };
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { getActivePlayer, switchPlayerTurn, winningConditions, gameOver };
})();

// Initialize board and track player moves
const Board = (() => {
  let winMessage = document.querySelector(".win-message");
  let popup = document.querySelector(".modal");
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const board = document.getElementById("container");
  const getGameBoard = () => gameBoard;
  const update = (index, value) => {
    gameBoard[index] = value;
  };
  // function loops board array and checks if winning conditions met
  function checkForWin(array) {
    for (let i = 0; i < GameControl.winningConditions.length; i++) {
      const [a, b, c] = GameControl.winningConditions[i];
      if (array[a] && array[a] === array[b] && array[a] === array[c]) {
        return true;
      }
    }
    return false;
  }
  // function checks for full array
  function checkForTie(array) {
    return array.every((cell) => cell !== "");
  }

  board.addEventListener("click", function (e) {
    // Stop if game is over
    if (GameControl.gameOver) {
      return;
    }
    // Ignore board clicks
    if (e.target === board) {
      return;
    }
    // Checks if cell is full before executing and updating DOM and array
    if (e.target.innerText != "X" && e.target.innerText != "O") {
      let index = parseInt(e.target.id);
      update(index, GameControl.getActivePlayer().mark);
      e.target.innerText = GameControl.getActivePlayer().mark;
    }
    // Check for win and display win/restart
    if (checkForWin(gameBoard)) {
      GameControl.gameOver = true;
      popup.removeAttribute("style");
      winMessage.innerText = `Game Over ${
        GameControl.getActivePlayer().name
      } won`;
      // Check for tie and display message/restart
    } else if (checkForTie(gameBoard)) {
      GameControl.gameOver = true;
      popup.removeAttribute("style");
      winMessage.innerText = "It's a Tie!";
    }
    // Switch turn after executing
    GameControl.switchPlayerTurn();
  });
  const restart = () => {
    GameControl.gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    popup.setAttribute("style", "display:none");
    board.innerHTML = `<div class="cell" id="0"></div>
    <div class="cell" id="1"></div>
    <div class="cell" id="2"></div>
    <div class="cell" id="3"></div>
    <div class="cell" id="4"></div>
    <div class="cell" id="5"></div>
    <div class="cell" id="6"></div>
    <div class="cell" id="7"></div>
    <div class="cell" id="8"></div>`;
  };

  return { getGameBoard, restart };
})();

let resetButton = document.querySelector(".restart");
resetButton.addEventListener("click", function () {
  console.log("Hello");
  Board.restart();
});
