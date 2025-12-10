// assets/js/minigames.js

document.addEventListener("DOMContentLoaded", function () {

  // =======================
  //       SUDOKU GAME
  // =======================
  (function () {
    const gridTable = document.getElementById("sudoku-grid");
    const statusEl = document.getElementById("sudoku-status");
    const difficultyEl = document.getElementById("sudoku-difficulty");
    const newBtn = document.getElementById("sudoku-new");
    const checkBtn = document.getElementById("sudoku-check");
    const clearBtn = document.getElementById("sudoku-clear");

    // If we're not on the About page, quietly exit
    if (!gridTable || !statusEl || !difficultyEl) return;

    let current = null;   // { puzzle: string, solution: string }
    let inputs = [];

    // -------- Sudoku generator --------

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

    // -------- UI creation & loading --------

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

      statusEl.textContent = "Please input numbers from 1--9";
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

    newBtn && newBtn.addEventListener("click", () => loadPuzzle(difficultyEl.value));
    checkBtn && checkBtn.addEventListener("click", checkSolution);
    clearBtn && clearBtn.addEventListener("click", clearNonPrefilled);

    // Initial puzzle
    loadPuzzle(difficultyEl.value);
  })();

  // =======================
  //       SNAKE GAME
  // =======================
  (function () {
    const canvas = document.getElementById("snake-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    function drawRoundedRect(ctxLocal, x, y, w, h, r) {
      if (typeof ctxLocal.roundRect === "function") {
        ctxLocal.roundRect(x, y, w, h, r);
      } else {
        ctxLocal.rect(x, y, w, h);
      }
    }

    function initGame() {
      snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
      ];
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };
      score = 0;
      if (scoreEl) scoreEl.textContent = String(score);
      gameOver = false;
      running = false;
      if (statusEl) {
        statusEl.textContent = "スタートを押してゲーム開始。WASDで操作。";
        statusEl.className = "snake-status";
      }
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
      drawRoundedRect(
        ctx,
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
        drawRoundedRect(
          ctx,
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
        if (scoreEl) scoreEl.textContent = String(score);
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
      if (statusEl) {
        statusEl.textContent = "ゲームオーバー！";
        statusEl.className = "snake-status bad";
      }
    }

    function endGameOutsideOfWall() {
      gameOver = true;
      running = false;
      clearInterval(tickId);
      if (statusEl) {
        statusEl.textContent = "ドン！";
        statusEl.className = "snake-status bad";
      }
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
      if (statusEl) {
        statusEl.textContent = "プレイ中。。。";
        statusEl.className = "snake-status ok";
      }
      clearInterval(tickId);
      tickId = setInterval(step, 110); // game speed
    }

    function togglePause() {
      if (gameOver) return;
      running = !running;
      if (!statusEl) return;
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

    startBtn && startBtn.addEventListener("click", startGame);
    pauseBtn && pauseBtn.addEventListener("click", togglePause);
    resetBtn && resetBtn.addEventListener("click", resetGame);

    // initial
    initGame();
  })();

  // =======================
  //   GAME SECTION TOGGLE
  // =======================
  (function () {
    const buttons = document.querySelectorAll(".game-toggle");
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = document.querySelector(btn.dataset.target);
        if (target) {
          target.classList.toggle("hidden");
        }
      });
    });
  })();

  // =======================
  //   MONTE CARLO TRADER
  // =======================
  (function () {
    const app = document.getElementById("mc-trader-app");
    if (!app) return; // not on About page

    const priceEl   = document.getElementById("mc-price");
    const stepEl    = document.getElementById("mc-step");
    const posEl     = document.getElementById("mc-position");
    const cashEl    = document.getElementById("mc-cash");
    const equityEl  = document.getElementById("mc-equity");
    const statusEl  = document.getElementById("mc-status");

    const buyBtn    = document.getElementById("mc-buy");
    const sellBtn   = document.getElementById("mc-sell");
    const holdBtn   = document.getElementById("mc-hold");
    const resetBtn  = document.getElementById("mc-reset");

    const chartCanvas = document.getElementById("mc-chart");
    const chartCtx    = chartCanvas ? chartCanvas.getContext("2d") : null;

    const maxSteps = 252;
    const S0 = 100;

    // Diffusion part (GBM-like)
    const mu = 0.05;      // annual drift
    const sigma = 0.2;    // annual vol
    const dt = 1.0 / 252; // one "day" per step in model time

    // Jump part (Merton jump–diffusion)
    const lambdaJ = 1.0;    // expected number of jumps per year
    const muJ     = -0.02;  // mean of log jump size
    const sigmaJ  = 0.20;   // vol of log jump size

    // Precompute E[J - 1] to adjust drift
    const EJ = Math.exp(muJ + 0.5 * sigmaJ * sigmaJ);
    const EJminus1 = EJ - 1.0;

    let step, price, cash, position, gameOver;
    let priceHistory = [];

    function randnBoxMuller() {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    // One-step jump–diffusion evolution
    function nextPrice(S) {
      // diffusion part
      const z = randnBoxMuller();
      const driftDiff = (mu - 0.5 * sigma * sigma - lambdaJ * EJminus1) * dt;
      const diff      = sigma * Math.sqrt(dt) * z;
      let Snew        = S * Math.exp(driftDiff + diff);

      // jump part (at most one jump per step for simplicity)
      const pJump = lambdaJ * dt;
      if (Math.random() < pJump) {
        const zJ = randnBoxMuller();
        const logJ = muJ + sigmaJ * zJ;
        const J = Math.exp(logJ); // multiplicative jump
        Snew *= J;
      }

      return Math.max(1, Snew);
    }

    function fmtMoney(x) {
      return (x < 0 ? "-$" : "$") + Math.abs(x).toFixed(2);
    }

    function drawChart() {
      if (!chartCtx || !chartCanvas || priceHistory.length === 0) return;

      const ctx = chartCtx;
      const w = chartCanvas.width;
      const h = chartCanvas.height;

      ctx.clearRect(0, 0, w, h);

      const paddingLeft = 35;
      const paddingRight = 10;
      const paddingTop = 10;
      const paddingBottom = 20;

      const n = priceHistory.length;
      if (n === 0) return;

      let minP = Math.min.apply(null, priceHistory);
      let maxP = Math.max.apply(null, priceHistory);
      if (minP === maxP) {
        minP *= 0.95;
        maxP *= 1.05;
      } else {
        const margin = 0.05 * (maxP - minP);
        minP -= margin;
        maxP += margin;
      }

      const x0 = paddingLeft;
      const x1 = w - paddingRight;
      const y0 = h - paddingBottom;
      const y1 = paddingTop;

      // Axes
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;

      // y-axis
      ctx.beginPath();
      ctx.moveTo(x0, y1);
      ctx.lineTo(x0, y0);
      ctx.stroke();

      // x-axis
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y0);
      ctx.stroke();

      // optional horizontal mid-line
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.setLineDash([4, 4]);
      const midYVal = (minP + maxP) / 2;
      const midY = y0 - (midYVal - minP) / (maxP - minP) * (y0 - y1);
      ctx.beginPath();
      ctx.moveTo(x0, midY);
      ctx.lineTo(x1, midY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Price path
      ctx.save();
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 2;

      for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0 : i / (n - 1);
        const x = x0 + t * (x1 - x0);
        const p = priceHistory[i];
        const y = y0 - (p - minP) / (maxP - minP) * (y0 - y1);

        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Mark last point
      const lastP = priceHistory[n - 1];
      const tLast = n === 1 ? 0 : (n - 1) / (n - 1);
      const xLast = x0 + tLast * (x1 - x0);
      const yLast = y0 - (lastP - minP) / (maxP - minP) * (y0 - y1);

      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.arc(xLast, yLast, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

    function updateUI(message, className) {
      if (stepEl)   stepEl.textContent   = `${step} / ${maxSteps}`;
      if (priceEl)  priceEl.textContent  = `$${price.toFixed(2)}`;
      if (posEl)    posEl.textContent    = position.toString();
      if (cashEl)   cashEl.textContent   = fmtMoney(cash);
      if (equityEl) {
        const equity = cash + position * price;
        equityEl.textContent = fmtMoney(equity);
      }

      if (message !== undefined && statusEl) {
        statusEl.textContent = message;
        statusEl.className = "mc-status" + (className ? " " + className : "");
      }

      drawChart();
    }

    function doStepAfterAction() {
      if (gameOver) return;

      step += 1;
      price = nextPrice(price);
      priceHistory.push(price);

      if (step >= maxSteps) {
        gameOver = true;
        const equity = cash + position * price;
        const msg =
          equity > 0
            ? `Horizon reached. Final equity ${fmtMoney(equity)}!`
            : `Horizon reached. Final equity ${fmtMoney(equity)}.`;
        updateUI(msg, equity > 0 ? "ok" : "bad");
      } else {
        updateUI("Next day. Jumps may occur — trade carefully.");
      }
    }

    function buyOne() {
      if (gameOver) return;
      cash -= price;
      position += 1;
      doStepAfterAction();
    }

    function sellOne() {
      if (gameOver) return;
      cash += price;
      position -= 1;
      doStepAfterAction();
    }

    function hold() {
      if (gameOver) return;
      doStepAfterAction();
    }

    function resetGame() {
      step = 0;
      price = S0;
      cash = 0;
      position = 0;
      gameOver = false;
      priceHistory = [price];
      updateUI(
        "Trade the underlying under a jump–diffusion model."
      );
    }

    buyBtn   && buyBtn.addEventListener("click", buyOne);
    sellBtn  && sellBtn.addEventListener("click", sellOne);
    holdBtn  && holdBtn.addEventListener("click", hold);
    resetBtn && resetBtn.addEventListener("click", resetGame);

    // initial
    resetGame();
  })();

   
});
