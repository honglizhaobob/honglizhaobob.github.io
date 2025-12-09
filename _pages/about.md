---
permalink: /
title: "About"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a PhD candidate in [Computational and Applied Mathematics](https://cam.uchicago.edu/) at the University of Chicago. I received by B.A. from UC Berkeley in [Applied Math](https://math.berkeley.edu/home) and [Data Science](https://cdss.berkeley.edu/dsus) in 2021. 


## Mini-games

<style>
  .game-button-row {
    display: flex;
    gap: 1rem;
    margin: 1.5rem 0 0.5rem;
  }

  .game-toggle {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    white-space: nowrap;
  }

  .game-toggle:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  .hidden {
    display: none;
  }
</style>



<div class="game-button-row">
  <button class="game-toggle" data-target="#sudoku-section">Sudoku</button>
  <button class="game-toggle" data-target="#snake-section">Snake</button>
</div>


<div id="sudoku-section" class="game-section hidden">
<div id="sudoku-app">
  <h2>スウドク</h2>

  <div class="sudoku-controls">
    <label class="sudoku-label">
      難易度:
      <select id="sudoku-difficulty">
        <option value="easy">やさしい</option>
        <option value="medium">ふつう</option>
      </select>
    </label>
    <button id="sudoku-new">ランダム生成</button>
    <button id="sudoku-check">チェック</button>
    <button id="sudoku-clear">クリア</button>
  </div>

  <div id="sudoku-table-wrapper">
    <table id="sudoku-grid" class="sudoku-grid"></table>
  </div>

  <div id="sudoku-status" class="sudoku-status"></div>
</div>

<style>
  /* Container */
  #sudoku-app {
    max-width: 550px;
    margin: 3rem auto;
    padding: 1rem 1.25rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(10px);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  #sudoku-app h2 {
    text-align: center;
    margin: 0 0 0.75rem;
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 0.5rem;
  }

  /* Controls */
  .sudoku-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.9rem;
    font-size: 0.85rem;
  }

  .sudoku-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* Dropdown */
  .sudoku-controls select {
    font-size: 0.85rem;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.3);
    background: rgba(0,0,0,0.4);
    color: white;
  }

  /* Modern colored buttons */
  .sudoku-controls button {
    font-size: 0.85rem;
    padding: 0.35rem 1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: 500;
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
  }

  /* Button colors */
  #sudoku-new {
    background: #3b82f6; /* blue */
  }
  #sudoku-new:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
  }

  #sudoku-check {
    background: #10b981; /* green */
  }
  #sudoku-check:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(5, 150, 105, 0.4);
  }

  #sudoku-clear {
    background: #ef4444; /* red */
  }
  #sudoku-clear:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
  }

  /* Table-based Sudoku grid */
  #sudoku-table-wrapper {
    display: flex;
    justify-content: center;
  }

  .sudoku-grid {
    border-collapse: collapse;
    margin: 0 auto;
    background: #181818;
    border: 2px solid #f5f5f5;
  }

  .sudoku-grid td {
    width: 36px;
    height: 36px;
    border: 1px solid #444;
    text-align: center;
    padding: 0;
    background: #262626; /* default for editable cells */
  }

  /* 3x3 block borders */
  .sudoku-grid td.border-right-bold {
    border-right: 2px solid #f5f5f5;
  }
  .sudoku-grid td.border-bottom-bold {
    border-bottom: 2px solid #f5f5f5;
  }

  .sudoku-grid input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    text-align: center;
    font-size: 1.05rem;
    color: #f5f5f5;
  }

  .sudoku-grid input:focus {
    background: rgba(255,255,255,0.12);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4);
  }

  /* Given cells */
  .sudoku-cell-prefilled {
    background: #1b1b1b;
  }
  .sudoku-cell-prefilled input {
    font-weight: 600;
    color: #ffffff;
  }

  /* Editable cells */
  .sudoku-cell-empty {
    background: #262626;
  }

  /* Feedback */
  .sudoku-cell-error {
    background: rgba(255, 80, 80, 0.35) !important;
  }

  .sudoku-cell-correct {
    background: rgba(120, 200, 120, 0.28) !important;
  }

  /* Status text */
  .sudoku-status {
    margin-top: 0.9rem;
    min-height: 1.1rem;
    font-size: 0.85rem;
    text-align: center;
  }

  .sudoku-status.ok {
    color: #6ee7b7;
  }

  .sudoku-status.bad {
    color: #fca5a5;
  }
</style>


<script>
  (function () {
    const gridTable = document.getElementById("sudoku-grid");
    const statusEl = document.getElementById("sudoku-status");
    const difficultyEl = document.getElementById("sudoku-difficulty");
    const newBtn = document.getElementById("sudoku-new");
    const checkBtn = document.getElementById("sudoku-check");
    const clearBtn = document.getElementById("sudoku-clear");

    let current = null;   // { puzzle: string, solution: string }
    let inputs = [];

    /* -------- Sudoku generator -------- */

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function isSafe(board, row, col, num) {
      // Row & column
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
        if (board[i][col] === num) return false;
      }
      // 3x3 box
      const boxRow = Math.floor(row / 3) * 3;
      const boxCol = Math.floor(col / 3) * 3;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[boxRow + r][boxCol + c] === num) return false;
        }
      }
      return true;
    }

    function generateSolvedBoard() {
      const board = Array.from({ length: 9 }, () => Array(9).fill(0));

      function solveCell(row, col) {
        if (row === 9) return true;
        const nextRow = col === 8 ? row + 1 : row;
        const nextCol = col === 8 ? 0 : col + 1;

        const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of nums) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveCell(nextRow, nextCol)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }

      solveCell(0, 0);
      return board;
    }

    function makePuzzle(solutionBoard, difficulty) {
      const puzzle = solutionBoard.map(row => row.slice());
      // how many cells to remove
      let removeCount = difficulty === "medium" ? 50 : 40; // easy keeps more clues
      let removed = 0;

      while (removed < removeCount) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);
        if (puzzle[r][c] !== 0) {
          puzzle[r][c] = 0;
          removed++;
        }
      }
      return puzzle;
    }

    function boardToString(board) {
      return board.map(row => row.join("")).join("");
    }

    /* -------- UI creation & loading -------- */

    function createGrid() {
      gridTable.innerHTML = "";
      inputs = [];

      for (let r = 0; r < 9; r++) {
        const rowEl = document.createElement("tr");
        for (let c = 0; c < 9; c++) {
          const cellEl = document.createElement("td");
          if (c === 2 || c === 5) cellEl.classList.add("border-right-bold");
          if (r === 2 || r === 5) cellEl.classList.add("border-bottom-bold");

          const input = document.createElement("input");
          input.setAttribute("inputmode", "numeric");
          input.setAttribute("maxlength", "1");

          input.addEventListener("input", (e) => {
            let v = e.target.value.replace(/[^1-9]/g, "");
            e.target.value = v.slice(0, 1);
            statusEl.textContent = "";
            statusEl.className = "sudoku-status";

            cellEl.classList.remove(
              "sudoku-cell-error",
              "sudoku-cell-correct"
            );
          });

          cellEl.appendChild(input);
          rowEl.appendChild(cellEl);
          inputs.push(input);
        }
        gridTable.appendChild(rowEl);
      }
    }

    function loadPuzzle(difficulty) {
      const solvedBoard = generateSolvedBoard();
      const puzzleBoard = makePuzzle(solvedBoard, difficulty);

      current = {
        solution: boardToString(solvedBoard),
        puzzle: boardToString(puzzleBoard),
      };

      createGrid();

      const cells = gridTable.getElementsByTagName("td");

      for (let i = 0; i < 81; i++) {
        const ch = current.puzzle[i];
        const cellEl = cells[i];
        const input = inputs[i];

        cellEl.classList.remove(
          "sudoku-cell-prefilled",
          "sudoku-cell-empty",
          "sudoku-cell-error",
          "sudoku-cell-correct"
        );

        if (ch === "0") {
          input.value = "";
          input.readOnly = false;
          cellEl.classList.add("sudoku-cell-empty");
        } else {
          input.value = ch;
          input.readOnly = true;
          cellEl.classList.add("sudoku-cell-prefilled");
        }
      }

      statusEl.textContent =
        "Please input numbers from 1--9";
      statusEl.className = "sudoku-status";
    }

    function readGrid() {
      return inputs.map(inp => (inp.value === "" ? "0" : inp.value)).join("");
    }

    function clearNonPrefilled() {
      const cells = gridTable.getElementsByTagName("td");
      for (let i = 0; i < 81; i++) {
        const cellEl = cells[i];
        const input = inputs[i];

        cellEl.classList.remove("sudoku-cell-error", "sudoku-cell-correct");

        if (!cellEl.classList.contains("sudoku-cell-prefilled")) {
          input.value = "";
        }
      }
      statusEl.textContent = "";
      statusEl.className = "sudoku-status";
    }

    function checkSolution() {
      if (!current) return;
      const user = readGrid();
      const cells = gridTable.getElementsByTagName("td");
      const anyEmpty = user.includes("0");

      for (let i = 0; i < 81; i++) {
        cells[i].classList.remove("sudoku-cell-error", "sudoku-cell-correct");
      }

      let allCorrect = true;
      for (let i = 0; i < 81; i++) {
        const u = user[i];
        const s = current.solution[i];

        if (u === "0") {
          allCorrect = false;
          continue;
        }
        if (u !== s) {
          cells[i].classList.add("sudoku-cell-error");
          allCorrect = false;
        } else {
          cells[i].classList.add("sudoku-cell-correct");
        }
      }

      if (allCorrect) {
        statusEl.textContent = "クリア！よくできました！";
        statusEl.className = "sudoku-status ok";
      } else if (anyEmpty) {
        statusEl.textContent = "まだ完成していません。";
        statusEl.className = "sudoku-status bad";
      } else {
        statusEl.textContent = "どこか間違えています。";
        statusEl.className = "sudoku-status bad";
      }
    }

    newBtn.addEventListener("click", () => loadPuzzle(difficultyEl.value));
    checkBtn.addEventListener("click", checkSolution);
    clearBtn.addEventListener("click", clearNonPrefilled);

    // Initial puzzle
    loadPuzzle(difficultyEl.value);
  })();
</script>
</div>


<div id="snake-section" class="game-section hidden">
<div id="snake-app">
  <h2>スネークゲーム</h2>

  <div class="snake-controls">
    <button id="snake-start">スタート</button>
    <button id="snake-pause">一時停止</button>
    <button id="snake-reset">リセット</button>
    <span class="snake-score">スコア: <span id="snake-score-value">0</span></span>
  </div>

  <div id="snake-canvas-wrapper">
    <canvas id="snake-canvas" width="320" height="320"></canvas>
  </div>

  <div class="snake-mobile-controls">
    <button data-dir="up">▲</button>
    <div class="snake-mobile-middle">
      <button data-dir="left">◀</button>
      <button data-dir="right">▶</button>
    </div>
    <button data-dir="down">▼</button>
  </div>

  <div id="snake-status" class="snake-status"></div>
</div>

<style>
  #snake-app {
    max-width: 500px;
    margin: 2rem auto;
    padding: 1rem 1.25rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(10px);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  #snake-app h2 {
    text-align: center;
    margin: 0 0 0.75rem;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 0.4rem;
  }

  .snake-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    font-size: 0.85rem;
  }

  .snake-controls button {
    font-size: 0.85rem;
    padding: 0.35rem 0.9rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: 500;
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
  }

  #snake-start {
    background: #3b82f6;
  }
  #snake-start:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
  }

  #snake-pause {
    background: #f59e0b;
  }
  #snake-pause:hover {
    background: #d97706;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(217, 119, 6, 0.4);
  }

  #snake-reset {
    background: #ef4444;
  }
  #snake-reset:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
  }

  .snake-score {
    margin-left: 0.5rem;
    font-size: 0.85rem;
  }

  #snake-canvas-wrapper {
    display: flex;
    justify-content: center;
  }

  #snake-canvas {
    border-radius: 6px;
    border: 2px solid #f5f5f5;
    background: radial-gradient(circle at top, #111 0, #000 50%, #050505 100%);
  }

  .snake-status {
    margin-top: 0.6rem;
    min-height: 1.1rem;
    font-size: 0.85rem;
    text-align: center;
  }

  .snake-status.ok {
    color: #6ee7b7;
  }

  .snake-status.bad {
    color: #fca5a5;
  }

  /* Mobile D-pad */
  .snake-mobile-controls {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }

  .snake-mobile-middle {
    display: flex;
    gap: 0.3rem;
  }

  .snake-mobile-controls button {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.3);
    background: rgba(0,0,0,0.5);
    color: #f5f5f5;
    cursor: pointer;
    font-size: 1rem;
  }

  .snake-mobile-controls button:active {
    background: rgba(255,255,255,0.12);
  }

  @media (min-width: 768px) {
    .snake-mobile-controls {
      display: none; /* hide D-pad on larger screens */
    }
  }
</style>

<script>
  (function () {
    const canvas = document.getElementById("snake-canvas");
    const ctx = canvas.getContext("2d");
    const statusEl = document.getElementById("snake-status");
    const scoreEl = document.getElementById("snake-score-value");
    const startBtn = document.getElementById("snake-start");
    const pauseBtn = document.getElementById("snake-pause");
    const resetBtn = document.getElementById("snake-reset");
    const mobileButtons = document.querySelectorAll(".snake-mobile-controls button");

    const tileSize = 16;
    const tilesX = canvas.width / tileSize;
    const tilesY = canvas.height / tileSize;

    let snake, direction, nextDirection, food, score, tickId, running, gameOver;

    function initGame() {
      snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
      ];
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };
      score = 0;
      scoreEl.textContent = score;
      gameOver = false;
      running = false;
      statusEl.textContent = "スタートを押してゲーム開始。WASDで操作。";
      statusEl.className = "snake-status";
      placeFood();
      draw();
    }

    function placeFood() {
      while (true) {
        const fx = Math.floor(Math.random() * tilesX);
        const fy = Math.floor(Math.random() * tilesY);
        const onSnake = snake.some(seg => seg.x === fx && seg.y === fy);
        if (!onSnake) {
          food = { x: fx, y: fy };
          break;
        }
      }
    }

    function draw() {
      // background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // grid (subtle)
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= tilesX; x++) {
        ctx.beginPath();
        ctx.moveTo(x * tileSize, 0);
        ctx.lineTo(x * tileSize, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= tilesY; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * tileSize);
        ctx.lineTo(canvas.width, y * tileSize);
        ctx.stroke();
      }
      ctx.restore();

      // food
      ctx.save();
      ctx.fillStyle = "#f97316"; // orange
      ctx.beginPath();
      ctx.roundRect(
        food.x * tileSize + 2,
        food.y * tileSize + 2,
        tileSize - 4,
        tileSize - 4,
        4
      );
      ctx.fill();
      ctx.restore();

      // snake
      snake.forEach((seg, idx) => {
        const isHead = idx === 0;
        ctx.save();
        ctx.fillStyle = isHead ? "#22c55e" : "#4ade80";
        ctx.beginPath();
        ctx.roundRect(
          seg.x * tileSize + 1,
          seg.y * tileSize + 1,
          tileSize - 2,
          tileSize - 2,
          isHead ? 5 : 3
        );
        ctx.fill();
        ctx.restore();
      });
    }

    function step() {
      if (!running || gameOver) return;

      direction = nextDirection;

      const head = snake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
      };

      // wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= tilesX ||
        newHead.y < 0 ||
        newHead.y >= tilesY
      ) {
        endGameOutsideOfWall();
        return;
      }

      // self collision
      if (snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        endGame();
        return;
      }

      snake.unshift(newHead);

      // food
      if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreEl.textContent = score;
        placeFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function endGame() {
      gameOver = true;
      running = false;
      clearInterval(tickId);
      statusEl.textContent = "ゲームオーバー！";
      statusEl.className = "snake-status bad";
    }

    function endGameOutsideOfWall() {
      gameOver = true;
      running = false;
      clearInterval(tickId);
      statusEl.textContent = "ドン！";
      statusEl.className = "snake-status bad";
    }

    function setDirection(dx, dy) {
      // prevent 180-degree turns
      if (!running && !gameOver) running = true;
      if (dx === -direction.x && dy === -direction.y) return;
      nextDirection = { x: dx, y: dy };
    }

    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setDirection(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          setDirection(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          setDirection(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setDirection(1, 0);
          break;
        case " ":
          togglePause();
          break;
      }
    });

    // Mobile controls
    mobileButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const dir = btn.getAttribute("data-dir");
        if (dir === "up") setDirection(0, -1);
        if (dir === "down") setDirection(0, 1);
        if (dir === "left") setDirection(-1, 0);
        if (dir === "right") setDirection(1, 0);
      });
    });

    function startGame() {
      if (running && !gameOver) return;
      if (gameOver) {
        initGame();
      }
      running = true;
      statusEl.textContent = "プレイ中。。。";
      statusEl.className = "snake-status ok";
      clearInterval(tickId);
      tickId = setInterval(step, 110); // game speed
    }

    function togglePause() {
      if (gameOver) return;
      running = !running;
      if (running) {
        statusEl.textContent = "プレイ中。。。";
        statusEl.className = "snake-status ok";
      } else {
        statusEl.textContent = "一時停止中";
        statusEl.className = "snake-status";
      }
    }

    function resetGame() {
      clearInterval(tickId);
      initGame();
    }

    startBtn.addEventListener("click", startGame);
    pauseBtn.addEventListener("click", togglePause);
    resetBtn.addEventListener("click", resetGame);

    // initial
    initGame();
  })();
</script>
</div>


<script>
document.querySelectorAll(".game-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    target.classList.toggle("hidden");
  });
});
</script>

