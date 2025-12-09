---
permalink: /
title: "About"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am a PhD candidate in [Computational and Applied Mathematics](https://cam.uchicago.edu/)
at the University of Chicago. I received my B.A. from UC Berkeley in
[Applied Math](https://math.berkeley.edu/home) and
[Data Science](https://cdss.berkeley.edu/dsus) in 2021.

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
  .hidden { display: none; }
</style>

<div class="game-button-row">
  <button class="game-toggle" data-target="#sudoku-section">Sudoku</button>
  <button class="game-toggle" data-target="#snake-section">Snake</button>
</div>

<!-- ============================= -->
<!-- SUDOKU GAME HTML + CSS        -->
<!-- ============================= -->

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
  .sudoku-controls select {
    font-size: 0.85rem;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.3);
    background: rgba(0,0,0,0.4);
    color: white;
  }
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
  #sudoku-new { background: #3b82f6; }
  #sudoku-new:hover { background: #2563eb; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4); }
  #sudoku-check { background: #10b981; }
  #sudoku-check:hover { background: #059669; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(5, 150, 105, 0.4); }
  #sudoku-clear { background: #ef4444; }
  #sudoku-clear:hover { background: #dc2626; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4); }

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
    background: #262626;
  }
  .border-right-bold { border-right: 2px solid #f5f5f5; }
  .border-bottom-bold { border-bottom: 2px solid #f5f5f5; }
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
  .sudoku-cell-prefilled { background: #1b1b1b; }
  .sudoku-cell-prefilled input { font-weight: 600; color: white; }
  .sudoku-cell-empty { background: #262626; }
  .sudoku-cell-error { background: rgba(255, 80, 80, 0.35) !important; }
  .sudoku-cell-correct { background: rgba(120, 200, 120, 0.28) !important; }
  .sudoku-status {
    margin-top: 0.9rem;
    min-height: 1.1rem;
    font-size: 0.85rem;
    text-align: center;
  }
  .sudoku-status.ok { color: #6ee7b7; }
  .sudoku-status.bad { color: #fca5a5; }
</style>
</div>



<!-- ============================= -->
<!-- SNAKE GAME HTML + CSS         -->
<!-- ============================= -->

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
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(10px);
  }
  #snake-app h2 {
    text-align: center;
    margin-bottom: 0.75rem;
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 0.4rem;
  }
  .snake-controls {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 0.8rem;
  }
  .snake-controls button {
    padding: 0.35rem 0.9rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: 500;
  }
  #snake-start { background: #3b82f6; }
  #snake-pause { background: #f59e0b; }
  #snake-reset { background: #ef4444; }

  #snake-canvas {
    border-radius: 6px;
    border: 2px solid #f5f5f5;
    background: radial-gradient(circle at top, #111, #000 40%, #050505);
  }
  .snake-status {
    margin-top: 0.6rem;
    min-height: 1.1rem;
    text-align: center;
    font-size: 0.85rem;
  }
  .snake-status.ok { color: #6ee7b7; }
  .snake-status.bad { color: #fca5a5; }

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
    color: white;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    .snake-mobile-controls { display: none; }
  }
</style>
</div>


<!-- ============================= -->
<!-- Load external JS for games   -->
<!-- ============================= -->

<script src="{{ '/assets/js/minigames.js' | relative_url }}"></script>
