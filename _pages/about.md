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
[Data Science](https://cdss.berkeley.edu/dsus) in 2021.[^courses]


## Teaching

<style>
/* Section header */
.uni-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #c5dcc4ff;
  margin: 1.5rem 0 0.6rem 0;
  border-left: 4px solid #0ea5e9;
  padding-left: 0.6rem;
}

/* Grid layout */
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Base card style */
.course-card {
  --accent: #0ea5e9;          /* default accent, can be overridden per card */
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 14px 16px 12px 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease,
              background 0.18s ease;
  position: relative;
}

/* colorful top accent bar */
.course-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  border-top: 3px solid var(--accent);
  pointer-events: none;
}

/* Hover effect */
.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(15,23,42,0.16);
  border-color: var(--accent);
  background: #f8fafc;
}

/* Card text */
.course-name {
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}

.course-sem {
  color: #475569;
  font-size: 0.85rem;
  font-style: italic;
}

.course-desc {
  margin-top: 6px;
  color: #475569;
  font-size: 0.85rem;
}

/* Buttons / resource links */
.course-actions {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.course-btn {
  font-size: 0.78rem;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid rgba(148,163,184,0.8);
  background: #ffffff;
  color: #0f172a;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease,
              transform 0.15s ease;
}

.course-btn:hover {
  background: #e0f2fe;
  border-color: #0284c7;
  color: #0f172a;
  transform: translateY(-1px);
}

/* subtle variant that uses the card accent color */
.course-btn.accent {
  border-color: var(--accent);
  color: #0f172a;
}
.course-btn.accent:hover {
  background: rgba(14,165,233,0.06);
}

/* Color variants for cards */
.card-blue    { --accent: #0ea5e9; }
.card-emerald { --accent: #10b981; }
.card-amber   { --accent: #f59e0b; }
.card-violet  { --accent: #8b5cf6; }
.card-rose    { --accent: #fb7185; }

/* Make links inside descriptions look nice */
.course-card a {
  color: #0284c7;
  text-decoration: none;
}
.course-card a:hover {
  text-decoration: underline;
}
</style>

<div class="uni-title">The University of Chicago</div>

<div class="course-grid">

  <div class="course-card card-blue">
    <div class="course-name">STAT 31015: Convex Optimization</div>
    <div class="course-sem">Wi25</div>
  </div>

  <div class="course-card card-emerald">
    <div class="course-name">STAT 37830: Computing with Python</div>
    <div class="course-sem">Au24, Au25</div>
  </div>

  <div class="course-card card-amber">
    <div class="course-name">CAAM 31020: Nonlinear Optimization</div>
    <div class="course-sem">Wi24, Wi26</div>
  </div>

  <div class="course-card card-violet">
    <div class="course-name">MATH 21100: Numerical Analysis</div>
    <div class="course-sem">Au23, Sp23, Sp24, Sp25</div>
    <div class="course-actions">
      <a class="course-btn accent" href="../files/teaching/uchicago/2023/math21100/Math221_Solutions.pdf" target="_blank">
        Solutions
      </a>
      <a class="course-btn" href="../files/teaching/uchicago/2023/math21100/Math211_Disc.pdf" target="_blank">
        Worksheets
      </a>
    </div>
  </div>

  <div class="course-card card-rose">
    <div class="course-name">STAT 31100: Numerical PDEs</div>
    <div class="course-sem">Wi23</div>
    <div class="course-actions">
      <a class="course-btn accent" href="../files/teaching/uchicago/2023/stat31100/matlab_intro.pdf" target="_blank">
        MATLAB intro
      </a>
      <a class="course-btn" href="../files/teaching/uchicago/2023/stat31100/adv2d.m" target="_blank">
        adv2d.m
      </a>
      <a class="course-btn" href="../files/teaching/uchicago/2023/stat31100/laplacian2d.m" target="_blank">
        laplacian2d.m
      </a>
    </div>
  </div>

  <div class="course-card card-blue">
    <div class="course-name">STAT 31120: Numerical SDEs</div>
    <div class="course-sem">Au22, Wi21</div>
    <div class="course-actions">
      <a class="course-btn accent" href="https://github.com/honglizhaobob/Winter21Autumn22Stat31120" target="_blank">
        Solutions (GitHub)
      </a>
    </div>
  </div>

  <div class="course-card card-emerald">
    <div class="course-name">CMSC 25300: Foundations of Machine Learning</div>
    <div class="course-sem">Au22</div>
  </div>

</div>

<div class="uni-title">University of California, Berkeley</div>

<div class="course-grid">

  <div class="course-card card-violet">
    <div class="course-name">DATA 198: Applied Data Science Research</div>
    <div class="course-sem">Sp21</div>
    <div class="course-actions">
      <a class="course-btn accent" href="https://ds-modules.github.io/DATA198-SP21.github.io/sp21/" target="_blank">
        Course site
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2021/DATA198/covid19_vacc_prog.pdf" target="_blank">
        EDA slide
      </a>
    </div>
  </div>

  <div class="course-card card-amber">
    <div class="course-name">MATH 128B: Advanced Numerical Analysis</div>
    <div class="course-sem">Sp21</div>
    <div class="course-actions">
      <a class="course-btn accent" href="https://github.com/honglizhaobob/Sp21Math128B" target="_blank">
        Solutions (GitHub)
      </a>
    </div>
  </div>

  <div class="course-card card-blue">
    <div class="course-name">MATH 104: Real Analysis</div>
    <div class="course-sem">Sp21, Fa20, Sp20</div>
  </div>

  <div class="course-card card-emerald">
    <div class="course-name">CS 61A: Structure and Interpretation of Computer Programs</div>
    <div class="course-sem">Fa20</div>
  </div>

  <div class="course-card card-rose">
    <div class="course-name">CS 61B: Data Structures</div>
    <div class="course-sem">Su20</div>
    <div class="course-actions">
      <a class="course-btn accent" href="https://cs61bl.org/su20/" target="_blank">
        Course site
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2020/cs61b-sortingalgs.pdf" target="_blank">
        Sorting I
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2020/cs61b-sortingalgs2.pdf" target="_blank">
        Sorting II
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2020/cs61b-binarysearchtrees.pdf" target="_blank">
        Binary trees
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2020/cs61b-mst.pdf" target="_blank">
        Min span trees
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2020/cs61b-tries.pdf" target="_blank">
        K-d trees
      </a>
      <a class="course-btn" href="../files/teaching/berkeley/2020/cs61b-hash.pdf" target="_blank">
        Heaps and hash
      </a>
    </div>
  </div>

  <div class="course-card card-amber">
    <div class="course-name">Student Learning Center</div>
    <div class="course-sem">Sp21</div>
    <div class="course-actions">
      <a class="course-btn" href="https://math.berkeley.edu/courses/choosing/lowerdivcourses" target="_blank">
        Courses covered
      </a>
    </div>
  </div>

</div>



[^courses]: You can find a full accounting of my undergraduate courses and awards [here](/files/html/calclasses.html).


---

<div id="minigames-wrapper" class="collapsed">
  <button id="minigames-toggle" class="minigames-header">
    ▼ Interactive Content 
  </button>

  <div id="minigames-content" class="hidden">
    {% include minigames.html %}
  </div>
</div>

<script src="{{ '/assets/js/minigames-toggle.js' | relative_url }}"></script>






