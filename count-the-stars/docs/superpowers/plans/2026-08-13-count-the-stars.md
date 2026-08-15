# Count the Stars Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a "Count the Stars" counting game for kids aged 5-8, plus a step-by-step printable tutorial, with no build tools or dependencies.

**Architecture:** Three standalone files. `index.html` holds the game UI and all inline CSS. `game.js` holds the game logic: pre-built helper functions plus 5 TODO functions kids fill in. `tutorial.html` is a print-friendly guide for parents/teachers. No server, no bundler, no dependencies.

**Tech Stack:** HTML, CSS, JavaScript (static files, open directly in a browser)

---

## File Structure

| File | Responsibility |
|------|---------------|
| `index.html` | The game UI: night-sky background, star field, answer buttons, feedback, score, action buttons. All CSS inline. |
| `game.js` | Game logic. Helpers pre-built; 5 TODO functions (`newRound`, `checkAnswer`, `updateScore`, `showFeedback`, `resetGame`) ship with working solutions so the game runs out of the box. |
| `tutorial.html` | Printable tutorial for parents/teachers with 5 modules, styled with `@media print` support. |

---

### Task 1: Create `index.html` (game UI + inline CSS)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the full HTML file**

Create `index.html` with the complete structure and inline CSS.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Count the Stars</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
            background: linear-gradient(to bottom, #0b1026, #1b2a6b, #2b3d8f);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: #fff;
        }

        h1 {
            font-size: 2.5rem;
            color: #ffe066;
            margin-bottom: 20px;
            text-align: center;
        }

        #sky {
            font-size: 4rem;
            letter-spacing: 0.2em;
            line-height: 1.4;
            text-align: center;
            min-height: 140px;
            width: 100%;
            max-width: 560px;
            background: rgba(255, 255, 255, 0.06);
            border: 3px dashed rgba(255, 255, 255, 0.4);
            border-radius: 24px;
            padding: 20px;
            margin-bottom: 25px;
            word-break: break-word;
        }

        #answers {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: 20px;
        }

        #answers button {
            font-size: 2rem;
            font-family: inherit;
            padding: 15px 30px;
            border: 4px solid #fff;
            border-radius: 16px;
            background-color: #fff;
            color: #1b2a6b;
            cursor: pointer;
            transition: transform 0.1s;
            min-width: 70px;
        }

        #answers button:hover {
            transform: scale(1.1);
        }

        #answers button.correct {
            background-color: #90ee90;
            border-color: #90ee90;
        }

        #feedback {
            font-size: 1.8rem;
            min-height: 50px;
            margin-bottom: 15px;
            text-align: center;
        }

        #score {
            font-size: 1.5rem;
            margin-bottom: 20px;
            color: #ffe066;
        }

        #actions button {
            font-size: 1.2rem;
            font-family: inherit;
            padding: 12px 24px;
            margin: 5px;
            border: 3px solid #fff;
            border-radius: 12px;
            cursor: pointer;
        }

        #btn-next {
            background-color: #90ee90;
        }

        #btn-next:hover {
            background-color: #7ddf7d;
        }

        #btn-reset {
            background-color: #ffb6c1;
        }

        #btn-reset:hover {
            background-color: #ff9aae;
        }
    </style>
</head>
<body>
    <h1>⭐ Count the Stars! ⭐</h1>

    <div id="sky"></div>

    <div id="answers"></div>

    <div id="feedback"></div>
    <div id="score"></div>

    <div id="actions">
        <button id="btn-next">Next Star</button>
        <button id="btn-reset">Reset</button>
    </div>

    <script src="game.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Expected: a night-sky gradient background, the title "⭐ Count the Stars! ⭐", an empty dashed sky box, and two buttons ("Next Star" and "Reset"). Nothing works yet (no stars, no answers) because `game.js` doesn't exist.

---

### Task 2: Create `game.js` (helpers + 5 TODO functions, fully working)

**Files:**
- Create: `game.js`

- [ ] **Step 1: Write the full game logic file**

Create `game.js` with pre-built helpers, event wiring, and the 5 TODO functions. Note: each TODO function ships with its working solution already filled in (matching the `rock-paper-scissors` convention), so the game runs out of the box.

```js
let starCount = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let isAnswered = false;

function getRandomStarCount() {
    return Math.floor(Math.random() * 10) + 1;
}

function makeAnswerOptions(correct) {
    const options = [correct];
    while (options.length < 4) {
        const candidate = getRandomStarCount();
        if (options.indexOf(candidate) === -1) {
            options.push(candidate);
        }
    }
    return options;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function makeStars(count) {
    let stars = '';
    for (let i = 0; i < count; i++) {
        stars += '⭐';
    }
    return stars;
}

function highlightCorrectAnswer() {
    const buttons = document.getElementById('answers').children;
    for (let i = 0; i < buttons.length; i++) {
        if (Number(buttons[i].textContent) === starCount) {
            buttons[i].classList.add('correct');
        }
    }
}

// ==========================================
// YOUR TURN! Fill in these 5 functions below
// ==========================================

function newRound() {
    // TODO: Show a new set of stars and 4 answer buttons
    starCount = getRandomStarCount();
    document.getElementById('sky').textContent = makeStars(starCount);

    const options = shuffle(makeAnswerOptions(starCount));
    const answersEl = document.getElementById('answers');
    answersEl.textContent = '';

    for (let i = 0; i < options.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = options[i];
        btn.addEventListener('click', function() {
            checkAnswer(options[i]);
        });
        answersEl.appendChild(btn);
    }

    document.getElementById('feedback').textContent = '';
    isAnswered = false;
}

function checkAnswer(picked) {
    // TODO: Check if the answer is right and update the score
    if (isAnswered) return;
    isAnswered = true;

    if (picked === starCount) {
        correctAnswers++;
        showFeedback(true);
    } else {
        wrongAnswers++;
        showFeedback(false);
    }
    updateScore();
}

function updateScore() {
    // TODO: Show the score on the screen
    document.getElementById('score').textContent =
        'Correct: ' + correctAnswers + ' | Wrong: ' + wrongAnswers;
}

function showFeedback(isCorrect) {
    // TODO: Show a happy or try-again message
    if (isCorrect) {
        document.getElementById('feedback').textContent = '🎉 Great job!';
    } else {
        document.getElementById('feedback').textContent =
            '🤔 Count again! The answer is ' + starCount + '!';
        highlightCorrectAnswer();
    }
}

function resetGame() {
    // TODO: Reset the scores and start a new round
    correctAnswers = 0;
    wrongAnswers = 0;
    updateScore();
    newRound();
}

document.getElementById('btn-next').addEventListener('click', function() {
    newRound();
});

document.getElementById('btn-reset').addEventListener('click', function() {
    resetGame();
});

newRound();
```

- [ ] **Step 2: Open in browser and verify the full game**

Open `index.html` in a browser. Expected:

- Stars (1-10) appear in the sky box, plus 4 answer buttons.
- Clicking the correct number shows "🎉 Great job!" and `Correct` goes up.
- Clicking a wrong number shows "🤔 Count again! The answer is N!", highlights the correct button green, and `Wrong` goes up.
- "Next Star" loads a new round and keeps the score.
- "Reset" zeroes both counts and starts a fresh round.
- You can only answer once per round (buttons ignore further clicks until "Next Star").

---

### Task 3: Create `tutorial.html` (printable guide, 5 modules)

**Files:**
- Create: `tutorial.html`

- [ ] **Step 1: Write the full tutorial file**

Create `tutorial.html` with the full tutorial content, styled for screen and print (with a "Download PDF" button).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Count the Stars - Tutorial</title>
    <style>
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            padding: 40px 24px 60px;
        }

        .page {
            max-width: 780px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 4px 16px rgba(43, 61, 143, 0.12);
            padding: 56px 48px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 32px;
            border-bottom: 3px dashed #e2e8f0;
        }

        .header-emoji { font-size: 3.5rem; line-height: 1; margin-bottom: 12px; }

        .header h1 {
            font-size: 2.4rem;
            color: #4338ca;
            margin-bottom: 8px;
        }

        .header .subtitle {
            color: #64748b;
            font-size: 1.1rem;
            margin-bottom: 20px;
        }

        .badges {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 24px;
        }

        .badge {
            display: inline-block;
            font-size: 0.85rem;
            font-weight: 600;
            padding: 6px 16px;
            border-radius: 99px;
            background: #eef2ff;
            color: #4338ca;
        }

        .download-btn {
            display: inline-block;
            font-size: 1.05rem;
            font-weight: 600;
            padding: 12px 28px;
            background: #4338ca;
            color: #fff;
            border: none;
            border-radius: 99px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(67, 56, 202, 0.3);
        }

        .intro { margin-bottom: 24px; }
        .intro p { margin-bottom: 14px; }
        .intro ul { list-style: none; padding-left: 0; margin-bottom: 14px; }
        .intro li { padding-left: 28px; position: relative; margin-bottom: 8px; }
        .intro li::before { content: '⭐'; position: absolute; left: 0; }

        .module {
            margin-bottom: 40px;
            padding-top: 28px;
            border-top: 2px solid #e2e8f0;
        }

        h2 {
            font-size: 1.6rem;
            color: #4338ca;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        h2 .step-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #4338ca;
            color: #fff;
            font-size: 1rem;
            flex-shrink: 0;
        }

        .goal, .explain, .try-it, .challenge {
            position: relative;
            padding: 16px 18px 16px 50px;
            margin: 16px 0;
            border-radius: 12px;
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .goal::before, .explain::before, .try-it::before, .challenge::before {
            position: absolute;
            left: 14px;
            top: 16px;
            font-size: 1.3rem;
        }

        .goal { background: #eff6ff; border: 2px solid #3b82f6; }
        .goal::before { content: '🎯'; }

        .explain { background: #fffbeb; border: 2px solid #f59e0b; }
        .explain::before { content: '💡'; }

        .try-it { background: #f0fdfa; border: 2px solid #14b8a6; }
        .try-it::before { content: '✅'; }

        .challenge { background: #f5f3ff; border: 2px solid #8b5cf6; }
        .challenge::before { content: '🌟'; }

        pre {
            background: #1e293b;
            border-radius: 12px;
            padding: 18px 20px;
            margin: 16px 0;
            overflow-x: auto;
            font-size: 0.85rem;
            line-height: 1.6;
        }

        code { font-family: 'Courier New', monospace; color: #f8fafc; }

        .congrats {
            margin-top: 40px;
            padding: 32px;
            background: linear-gradient(135deg, #f0fdfa, #eff6ff);
            border: 2px dashed #14b8a6;
            border-radius: 12px;
            text-align: center;
        }

        .congrats h2 { justify-content: center; color: #0d9488; }
        .congrats ul { display: inline-block; text-align: left; list-style: none; padding: 0; }
        .congrats li { padding-left: 24px; position: relative; font-weight: 500; margin-bottom: 6px; }
        .congrats li::before { content: '✨'; position: absolute; left: 0; }

        @media print {
            @page { size: A4; margin: 16mm; }
            body { background: #fff; padding: 0; }
            .page { max-width: 100%; box-shadow: none; border-radius: 0; padding: 0; }
            .download-btn { display: none !important; }
            h2 { page-break-after: avoid; }
            pre, .goal, .explain, .try-it, .challenge { page-break-inside: avoid; }
            .module { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="page">

        <div class="header">
            <div class="header-emoji">⭐</div>
            <h1>Count the Stars</h1>
            <p class="subtitle">A Coding Tutorial for Kids (Ages 5-8)</p>
            <div class="badges">
                <span class="badge">⏱ ~45 minutes</span>
                <span class="badge">📘 JavaScript</span>
                <span class="badge">👶 Ages 5-8</span>
            </div>
            <button class="download-btn" onclick="window.print()">📄 Download PDF</button>
        </div>

        <div class="intro">
            <p>Welcome! In this tutorial, you and your child will build a <strong>Count the Stars</strong> game together. The game shows a sky full of stars, your child counts them, and picks the right number from 4 answer buttons!</p>

            <p>We've already prepared everything that makes the game <em>look</em> and <em>feel</em> complete: the colors, the star field, the buttons, and all the wiring between them. Open <code>game.js</code> and you'll find the starter code waiting with <strong>5 TODO functions</strong> — these are the game's brain, and that's what you'll build:</p>

            <ul>
                <li><strong>newRound()</strong> — shows a fresh set of stars and answer buttons</li>
                <li><strong>checkAnswer()</strong> — decides if the answer is right</li>
                <li><strong>updateScore()</strong> — shows the score on screen</li>
                <li><strong>showFeedback()</strong> — shows a happy or try-again message</li>
                <li><strong>resetGame()</strong> — resets everything back to zero</li>
            </ul>

            <p><strong>And these helper functions are already built:</strong></p>
            <ul>
                <li><code>getRandomStarCount()</code> → picks a random number from 1 to 10</li>
                <li><code>makeAnswerOptions()</code> → makes 4 answer numbers (1 right + 3 wrong)</li>
                <li><code>shuffle()</code> → mixes the answers into a random order</li>
                <li><code>makeStars()</code> → turns a number into star emojis (3 → ⭐⭐⭐)</li>
                <li><code>highlightCorrectAnswer()</code> → colors the right answer green</li>
            </ul>

            <p><strong>What you need:</strong> a computer with a web browser and a text editor (Notepad, TextEdit, or any code editor). You'll need two files: <code>index.html</code> (already done) and <code>game.js</code> (the one you'll edit).</p>
        </div>

        <div class="module">
            <h2><span class="step-num">1</span> newRound()</h2>
            <div class="goal"><strong>Goal:</strong> Show a new set of stars and 4 answer buttons!</div>
            <p>Find the <code>newRound</code> function in <code>game.js</code>. Replace the <code>TODO</code> with this code:</p>
<pre><code>function newRound() {
    starCount = getRandomStarCount();
    document.getElementById('sky').textContent = makeStars(starCount);

    const options = shuffle(makeAnswerOptions(starCount));
    const answersEl = document.getElementById('answers');
    answersEl.textContent = '';

    for (let i = 0; i &lt; options.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = options[i];
        btn.addEventListener('click', function() {
            checkAnswer(options[i]);
        });
        answersEl.appendChild(btn);
    }

    document.getElementById('feedback').textContent = '';
    isAnswered = false;
}</code></pre>
            <div class="explain"><strong>Explain to Kids:</strong> "This function starts a new round! First it picks a secret number of stars and puts that many ⭐ on the screen. Then it makes 4 answer buttons and mixes them up so the right answer isn't always in the same spot. Each button knows to call <code>checkAnswer()</code> when clicked."</div>
            <div class="try-it"><strong>Try It!</strong> Refresh the page. Stars appear, and so do 4 number buttons. Click "Next Star" and watch the stars and buttons change!</div>
            <div class="challenge"><strong>Challenge:</strong> Can you make the stars bigger by changing the number <code>4rem</code> in <code>index.html</code>?</div>
        </div>

        <div class="module">
            <h2><span class="step-num">2</span> checkAnswer()</h2>
            <div class="goal"><strong>Goal:</strong> Decide if the answer is right!</div>
            <p>Find the <code>checkAnswer</code> function. Replace the <code>TODO</code> with this:</p>
<pre><code>function checkAnswer(picked) {
    if (isAnswered) return;
    isAnswered = true;

    if (picked === starCount) {
        correctAnswers++;
        showFeedback(true);
    } else {
        wrongAnswers++;
        showFeedback(false);
    }
    updateScore();
}</code></pre>
            <div class="explain"><strong>Explain to Kids:</strong> "When you click a button, this function compares your number to the secret <code>starCount</code>. If they match, we add 1 to <code>correctAnswers</code>. If not, we add 1 to <code>wrongAnswers</code>. The <code>isAnswered</code> flag makes sure you only get one try per round!"</div>
            <div class="try-it"><strong>Try It!</strong> Click the right answer — nothing breaks! The game won't show a message yet because we need <code>showFeedback()</code> and <code>updateScore()</code>.</div>
            <div class="challenge"><strong>Challenge:</strong> What is the <code>===</code> symbol doing? How is it different from <code>=</code>?</div>
        </div>

        <div class="module">
            <h2><span class="step-num">3</span> updateScore()</h2>
            <div class="goal"><strong>Goal:</strong> Show the score on the screen!</div>
            <p>Find the <code>updateScore</code> function. Replace the <code>TODO</code> with this:</p>
<pre><code>function updateScore() {
    document.getElementById('score').textContent =
        'Correct: ' + correctAnswers + ' | Wrong: ' + wrongAnswers;
}</code></pre>
            <div class="explain"><strong>Explain to Kids:</strong> "This function writes the score on the screen. It takes the two boxes (<code>correctAnswers</code> and <code>wrongAnswers</code>) and shows them with a <code>|</code> in the middle, like 'Correct: 4 | Wrong: 1'."</div>
            <div class="try-it"><strong>Try It!</strong> The score text is ready to display. It will start updating once <code>checkAnswer()</code> and <code>showFeedback()</code> are both in place.</div>
            <div class="challenge"><strong>Challenge:</strong> Can you change the word "Correct" to "Right" and "Wrong" to "Oops"?</div>
        </div>

        <div class="module">
            <h2><span class="step-num">4</span> showFeedback()</h2>
            <div class="goal"><strong>Goal:</strong> Show a happy or try-again message!</div>
            <p>Find the <code>showFeedback</code> function. Replace the <code>TODO</code> with this:</p>
<pre><code>function showFeedback(isCorrect) {
    if (isCorrect) {
        document.getElementById('feedback').textContent = '🎉 Great job!';
    } else {
        document.getElementById('feedback').textContent =
            '🤔 Count again! The answer is ' + starCount + '!';
        highlightCorrectAnswer();
    }
}</code></pre>
            <div class="explain"><strong>Explain to Kids:</strong> "This function celebrates or helps! If you got it right, it shows '🎉 Great job!'. If not, it shows the correct answer and turns that button green with <code>highlightCorrectAnswer()</code> so you can see which one it was."</div>
            <div class="try-it"><strong>Try It!</strong> NOW the game works! Answer right and wrong, and watch the message and score update. The right button lights up green when you miss!</div>
            <div class="challenge"><strong>Challenge:</strong> Can you change the happy message to "🎉 You're a star!"?</div>
        </div>

        <div class="module">
            <h2><span class="step-num">5</span> resetGame()</h2>
            <div class="goal"><strong>Goal:</strong> Reset the scores and start a fresh game!</div>
            <p>Find the <code>resetGame</code> function. Replace the <code>TODO</code> with this:</p>
<pre><code>function resetGame() {
    correctAnswers = 0;
    wrongAnswers = 0;
    updateScore();
    newRound();
}</code></pre>
            <div class="explain"><strong>Explain to Kids:</strong> "This is like pressing the reset button on a video game! It sets both scores back to zero, shows the new score, and starts a brand new round with <code>newRound()</code>."</div>
            <div class="try-it"><strong>Try It!</strong> Play a few rounds to build a score, then click "Reset" — everything goes back to zero and a fresh round begins!</div>
            <div class="challenge"><strong>Challenge:</strong> Can you add a message that says "Let's start over!" when the game resets?</div>
        </div>

        <div class="congrats">
            <h2>🎉 Congratulations!</h2>
            <p>You built a complete Count the Stars game by filling in just 5 functions! You learned:</p>
            <ul>
                <li><strong>newRound()</strong> — how to build new game content</li>
                <li><strong>checkAnswer()</strong> — how to compare numbers with <code>if</code>/<code>else</code></li>
                <li><strong>updateScore()</strong> — how to update text on the page</li>
                <li><strong>showFeedback()</strong> — how to give fun feedback</li>
                <li><strong>resetGame()</strong> — how to reset everything to the start</li>
            </ul>
            <p>Keep experimenting! Change colors, add sounds, make new games.<br>The possibilities are endless! 🚀</p>
        </div>

    </div>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `tutorial.html` in a browser. Expected: a styled tutorial with a header, badges, "Download PDF" button, intro, and 5 modules each with Goal / code / Explain / Try It / Challenge, plus a congrats section.

- [ ] **Step 3: Test PDF export**

Click "Download PDF". Expected: the print dialog opens, showing a clean layout with the button hidden and modules kept together across pages.

---

### Task 4: Final verification

**Files:**
- Verify: `index.html`
- Verify: `game.js`
- Verify: `tutorial.html`

- [ ] **Step 1: Test the complete game**

Open `index.html` in a browser and verify:

- 1-10 stars appear in the sky, plus 4 answer buttons (1 correct + 3 unique wrong).
- Correct answer → "🎉 Great job!", `Correct` increments.
- Wrong answer → "🤔 Count again! The answer is N!", correct button highlights green, `Wrong` increments.
- Only one answer per round; further clicks are ignored until "Next Star".
- "Next Star" loads a new round, keeping the score.
- "Reset" zeroes both counts and starts a fresh round.

- [ ] **Step 2: Test the tutorial**

Open `tutorial.html`, confirm all 5 modules render, code snippets display, and the "Download PDF" button triggers the print dialog.

- [ ] **Step 3: Test in multiple browsers (optional)**

Open both `index.html` and `tutorial.html` in Chrome, Firefox, and Safari to confirm consistent rendering.

---

## Notes

- There is no test framework or build step for this project (static files, matching `rock-paper-scissors`). Verification is manual browser testing as described above.
- The directory is not currently a git repo. If version control is desired, run `git init` before starting and commit after each task.
