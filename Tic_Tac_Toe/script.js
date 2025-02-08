const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the board
function initializeBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  status.textContent = "Player X's Turn";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] === "") {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWinner()) {
      status.textContent = `Player ${currentPlayer} Wins! 🎉`;
      triggerConfetti(); // Trigger confetti animation
      endGame();
    } else if (gameState.every((cell) => cell !== "")) {
      status.textContent = "It's a Draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
}

// Check for winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => gameState[index] === currentPlayer);
  });
}

// End game
function endGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.removeEventListener("click", handleCellClick));
}

// Trigger confetti
function triggerConfetti() {
  const duration = 2 * 1000; // 2 seconds
  const end = Date.now() + duration;

  const colors = ["#ff0000", "#ffcc00", "#00ff00", "#0066ff", "#9900ff"];

  (function frame() {
    canvasConfetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    canvasConfetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Reset game
resetButton.addEventListener("click", initializeBoard);

// Start the game
initializeBoard();