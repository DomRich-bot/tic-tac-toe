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

const Board = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const board = document.getElementById("container");
  const getGameBoard = () => gameBoard;
  const update = (index, value) => {
    gameBoard[index] = value;
  };

  function checkForWin(array) {
    for (let i = 0; i < GameControl.winningConditions.length; i++) {
      const [a, b, c] = GameControl.winningConditions[i];
      if (array[a] && array[a] === array[b] && array[a] === array[c]) {
        return true;
      }
    }
    return false;
  }

  function checkForTie(array) {
    return array.every((cell) => cell !== "");
  }

  board.addEventListener("click", function (e) {
    if (GameControl.gameOver) {
      return;
    }
    if (e.target === board) {
      return;
    }
    if (e.target.innerText != "X" && e.target.innerText != "O") {
      let index = parseInt(e.target.id);
      update(index, GameControl.getActivePlayer().mark);
      e.target.innerText = GameControl.getActivePlayer().mark;
      console.log(gameBoard);
    }
    if (checkForWin(gameBoard)) {
      GameControl.gameOver = true;
      alert(`Game Over ${GameControl.getActivePlayer().name} won`);
      console.log(GameControl.getActivePlayer().name);
    } else if (checkForTie(gameBoard)) {
      GameControl.gameOver = true;
      alert("It's a Tie!");
    }
    GameControl.switchPlayerTurn();
  });

  const restart = () => {
    GameControl.gameOver = false;
    let cells = document.querySelectorAll(".cell");
    cells.innerText = "";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
  };

  return { getGameBoard, restart };
})();
