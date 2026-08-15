# Rock Paper Scissors Tutorial - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Rock Paper Scissors game and a step-by-step tutorial for kids aged 5-8, all in a single HTML file with no dependencies.

**Architecture:** Two standalone HTML files. `index.html` contains the game (HTML + inline CSS + inline JS). `tutorial.html` contains the tutorial guide with print-friendly CSS and a "Download PDF" button. No build tools, no dependencies, no server needed.

**Tech Stack:** HTML, CSS, JavaScript (all inline in single files)

---

## File Structure

| File | Responsibility |
|------|---------------|
| `index.html` | The Rock Paper Scissors game. Starts empty, built incrementally across 7 modules. |
| `tutorial.html` | The tutorial guide for parents/teachers. Styled HTML page with @media print support. |

---

### Task 1: Module 1 - "Hello, Game!" (HTML Structure)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create the base HTML with 3 emoji buttons**

Create `index.html` with the basic HTML skeleton and three buttons for rock, paper, and scissors.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock Paper Scissors</title>
</head>
<body>
    <h1>🪨 Rock Paper Scissors ✂️</h1>

    <div id="choices">
        <button id="btn-rock">🪨</button>
        <button id="btn-paper">📄</button>
        <button id="btn-scissors">✂️</button>
    </div>

    <div id="result"></div>
    <div id="score"></div>

    <div id="actions">
        <button id="btn-play-again">Play Again</button>
        <button id="btn-reset-all">Reset All</button>
    </div>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser.

Expected: You see a heading "🪨 Rock Paper Scissors ✂️" and three buttons with emojis (🪨 📄 ✂️). The buttons don't do anything yet. The "Play Again" and "Reset All" buttons are visible but do nothing.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add basic HTML structure with 3 emoji buttons"
```

---

### Task 2: Module 2 - "Make It Pretty" (CSS Styling)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add inline CSS styling**

Add a `<style>` block inside the `<head>` of `index.html`, before the closing `</head>` tag.

```html
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
            background-color: #f0f8ff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }

        h1 {
            font-size: 2.5rem;
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }

        #choices button {
            font-size: 4rem;
            padding: 20px 30px;
            margin: 10px;
            border: 4px solid #333;
            border-radius: 20px;
            background-color: #fff;
            cursor: pointer;
            transition: transform 0.1s, background-color 0.2s;
        }

        #choices button:hover {
            transform: scale(1.1);
            background-color: #fffacd;
        }

        #choices button:active {
            transform: scale(0.95);
        }

        #result {
            font-size: 2rem;
            margin: 30px 0;
            min-height: 50px;
            text-align: center;
        }

        #score {
            font-size: 1.5rem;
            margin: 20px 0;
            color: #555;
        }

        #actions {
            margin-top: 20px;
        }

        #actions button {
            font-size: 1.2rem;
            padding: 12px 24px;
            margin: 5px;
            border: 3px solid #333;
            border-radius: 12px;
            cursor: pointer;
            font-family: inherit;
        }

        #btn-play-again {
            background-color: #90ee90;
        }

        #btn-play-again:hover {
            background-color: #7ddf7d;
        }

        #btn-reset-all {
            background-color: #ffb6c1;
        }

        #btn-reset-all:hover {
            background-color: #ff9aae;
        }

        #choices {
            display: flex;
            justify-content: center;
        }
    </style>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser.

Expected: The page has a light blue background, large colorful emoji buttons that grow when you hover, a playful font, and green/pink action buttons. Everything looks kid-friendly and fun.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add playful CSS styling for kid-friendly UI"
```

---

### Task 3: Module 3 - "Pick Your Weapon" (Click Handler)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add JavaScript for player choice**

Add a `<script>` block before the closing `</body>` tag in `index.html`.

```html
    <script>
        let playerChoice = '';

        document.getElementById('btn-rock').addEventListener('click', function() {
            playerChoice = 'rock';
            document.getElementById('result').textContent = 'You picked: 🪨';
        });

        document.getElementById('btn-paper').addEventListener('click', function() {
            playerChoice = 'paper';
            document.getElementById('result').textContent = 'You picked: 📄';
        });

        document.getElementById('btn-scissors').addEventListener('click', function() {
            playerChoice = 'scissors';
            document.getElementById('result').textContent = 'You picked: ✂️';
        });
    </script>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Click each button.

Expected: When you click 🪨, the text "You picked: 🪨" appears. Same for 📄 and ✂️. The text updates each time you click a different button.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add click handlers to show player choice"
```

---

### Task 4: Module 4 - "Computer Plays Too" (Random Choice)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add computer random choice logic**

Replace the existing `<script>` block in `index.html` with the updated version that includes computer choice.

```html
    <script>
        let playerChoice = '';
        let computerChoice = '';

        function getComputerChoice() {
            const options = ['rock', 'paper', 'scissors'];
            const randomIndex = Math.floor(Math.random() * 3);
            return options[randomIndex];
        }

        function getEmoji(choice) {
            if (choice === 'rock') return '🪨';
            if (choice === 'paper') return '📄';
            if (choice === 'scissors') return '✂️';
        }

        document.getElementById('btn-rock').addEventListener('click', function() {
            playerChoice = 'rock';
            computerChoice = getComputerChoice();
            document.getElementById('result').textContent =
                'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice);
        });

        document.getElementById('btn-paper').addEventListener('click', function() {
            playerChoice = 'paper';
            computerChoice = getComputerChoice();
            document.getElementById('result').textContent =
                'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice);
        });

        document.getElementById('btn-scissors').addEventListener('click', function() {
            playerChoice = 'scissors';
            computerChoice = getComputerChoice();
            document.getElementById('result').textContent =
                'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice);
        });
    </script>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Click each button multiple times.

Expected: Each click shows both your choice and the computer's choice (e.g., "You: 🪨  Computer: ✂️"). The computer's choice changes randomly each time.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add computer random choice logic"
```

---

### Task 5: Module 5 - "Who Wins?" (Win/Lose Logic)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add win/lose/tie determination**

Replace the existing `<script>` block in `index.html` with the updated version that includes winner logic.

```html
    <script>
        let playerChoice = '';
        let computerChoice = '';

        function getComputerChoice() {
            const options = ['rock', 'paper', 'scissors'];
            const randomIndex = Math.floor(Math.random() * 3);
            return options[randomIndex];
        }

        function getEmoji(choice) {
            if (choice === 'rock') return '🪨';
            if (choice === 'paper') return '📄';
            if (choice === 'scissors') return '✂️';
        }

        function getWinner(player, computer) {
            if (player === computer) return 'tie';
            if (
                (player === 'rock' && computer === 'scissors') ||
                (player === 'paper' && computer === 'rock') ||
                (player === 'scissors' && computer === 'paper')
            ) {
                return 'win';
            }
            return 'lose';
        }

        function playRound(player) {
            playerChoice = player;
            computerChoice = getComputerChoice();
            const winner = getWinner(playerChoice, computerChoice);

            let message = 'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice) + '\n\n';

            if (winner === 'win') {
                message += '🎉 You Win!';
            } else if (winner === 'lose') {
                message += '😢 You Lose!';
            } else {
                message += '🤝 It\'s a Tie!';
            }

            document.getElementById('result').textContent = message;
        }

        document.getElementById('btn-rock').addEventListener('click', function() {
            playRound('rock');
        });

        document.getElementById('btn-paper').addEventListener('click', function() {
            playRound('paper');
        });

        document.getElementById('btn-scissors').addEventListener('click', function() {
            playRound('scissors');
        });
    </script>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Click each button multiple times.

Expected: Each click shows both choices and the result:
- "🎉 You Win!" when you beat the computer
- "😢 You Lose!" when the computer beats you
- "🤝 It's a Tie!" when both pick the same

Test all 9 combinations to make sure the logic is correct.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add win/lose/tie logic with result messages"
```

---

### Task 6: Module 6 - "Keep Score" (Score Tracking)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add score variables and display**

Replace the existing `<script>` block in `index.html` with the updated version that includes score tracking.

```html
    <script>
        let playerChoice = '';
        let computerChoice = '';
        let wins = 0;
        let losses = 0;
        let ties = 0;

        function getComputerChoice() {
            const options = ['rock', 'paper', 'scissors'];
            const randomIndex = Math.floor(Math.random() * 3);
            return options[randomIndex];
        }

        function getEmoji(choice) {
            if (choice === 'rock') return '🪨';
            if (choice === 'paper') return '📄';
            if (choice === 'scissors') return '✂️';
        }

        function getWinner(player, computer) {
            if (player === computer) return 'tie';
            if (
                (player === 'rock' && computer === 'scissors') ||
                (player === 'paper' && computer === 'rock') ||
                (player === 'scissors' && computer === 'paper')
            ) {
                return 'win';
            }
            return 'lose';
        }

        function updateScore() {
            document.getElementById('score').textContent =
                'Wins: ' + wins + ' | Losses: ' + losses + ' | Ties: ' + ties;
        }

        function playRound(player) {
            playerChoice = player;
            computerChoice = getComputerChoice();
            const winner = getWinner(playerChoice, computerChoice);

            if (winner === 'win') {
                wins++;
            } else if (winner === 'lose') {
                losses++;
            } else {
                ties++;
            }

            updateScore();

            let message = 'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice) + '\n\n';

            if (winner === 'win') {
                message += '🎉 You Win!';
            } else if (winner === 'lose') {
                message += '😢 You Lose!';
            } else {
                message += '🤝 It\'s a Tie!';
            }

            document.getElementById('result').textContent = message;
        }

        document.getElementById('btn-rock').addEventListener('click', function() {
            playRound('rock');
        });

        document.getElementById('btn-paper').addEventListener('click', function() {
            playRound('paper');
        });

        document.getElementById('btn-scissors').addEventListener('click', function() {
            playRound('scissors');
        });
    </script>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Play several rounds.

Expected: The score display updates after each round (e.g., "Wins: 2 | Losses: 1 | Ties: 1"). The score persists across rounds.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add cumulative score tracking"
```

---

### Task 7: Module 7 - "Play Again!" (Reset Buttons)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Play Again and Reset All functionality**

Replace the existing `<script>` block in `index.html` with the updated version that includes reset buttons.

```html
    <script>
        let playerChoice = '';
        let computerChoice = '';
        let wins = 0;
        let losses = 0;
        let ties = 0;

        function getComputerChoice() {
            const options = ['rock', 'paper', 'scissors'];
            const randomIndex = Math.floor(Math.random() * 3);
            return options[randomIndex];
        }

        function getEmoji(choice) {
            if (choice === 'rock') return '🪨';
            if (choice === 'paper') return '📄';
            if (choice === 'scissors') return '✂️';
        }

        function getWinner(player, computer) {
            if (player === computer) return 'tie';
            if (
                (player === 'rock' && computer === 'scissors') ||
                (player === 'paper' && computer === 'rock') ||
                (player === 'scissors' && computer === 'paper')
            ) {
                return 'win';
            }
            return 'lose';
        }

        function updateScore() {
            document.getElementById('score').textContent =
                'Wins: ' + wins + ' | Losses: ' + losses + ' | Ties: ' + ties;
        }

        function playRound(player) {
            playerChoice = player;
            computerChoice = getComputerChoice();
            const winner = getWinner(playerChoice, computerChoice);

            if (winner === 'win') {
                wins++;
            } else if (winner === 'lose') {
                losses++;
            } else {
                ties++;
            }

            updateScore();

            let message = 'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice) + '\n\n';

            if (winner === 'win') {
                message += '🎉 You Win!';
            } else if (winner === 'lose') {
                message += '😢 You Lose!';
            } else {
                message += '🤝 It\'s a Tie!';
            }

            document.getElementById('result').textContent = message;
        }

        function playAgain() {
            document.getElementById('result').textContent = '';
        }

        function resetAll() {
            wins = 0;
            losses = 0;
            ties = 0;
            document.getElementById('result').textContent = '';
            updateScore();
        }

        document.getElementById('btn-rock').addEventListener('click', function() {
            playRound('rock');
        });

        document.getElementById('btn-paper').addEventListener('click', function() {
            playRound('paper');
        });

        document.getElementById('btn-scissors').addEventListener('click', function() {
            playRound('scissors');
        });

        document.getElementById('btn-play-again').addEventListener('click', function() {
            playAgain();
        });

        document.getElementById('btn-reset-all').addEventListener('click', function() {
            resetAll();
        });
    </script>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Play several rounds, then test both buttons.

Expected:
- "Play Again" clears the result message but keeps the score
- "Reset All" clears the result message AND resets score to "Wins: 0 | Losses: 0 | Ties: 0"

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Play Again and Reset All buttons"
```

---

### Task 8: Tutorial HTML Page

**Files:**
- Create: `tutorial.html`

- [ ] **Step 1: Create the tutorial HTML page with all 7 modules**

Create `tutorial.html` with the full tutorial content, styled for both screen and print.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rock Paper Scissors - Tutorial</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }

        h1 {
            font-size: 2.5rem;
            color: #ff6b6b;
            text-align: center;
            margin-bottom: 10px;
        }

        .subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 40px;
        }

        h2 {
            font-size: 1.8rem;
            color: #4ecdc4;
            margin-top: 40px;
            margin-bottom: 15px;
            border-bottom: 3px solid #4ecdc4;
            padding-bottom: 5px;
        }

        h3 {
            font-size: 1.3rem;
            color: #555;
            margin-top: 20px;
            margin-bottom: 10px;
        }

        p {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }

        .goal {
            background-color: #fff3cd;
            border-left: 5px solid #ffc107;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }

        .explain {
            background-color: #d1ecf1;
            border-left: 5px solid #17a2b8;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }

        .try-it {
            background-color: #d4edda;
            border-left: 5px solid #28a745;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }

        .challenge {
            background-color: #f8d7da;
            border-left: 5px solid #dc3545;
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }

        pre {
            background-color: #f8f9fa;
            border: 2px solid #dee2e6;
            border-radius: 8px;
            padding: 15px;
            overflow-x: auto;
            margin: 15px 0;
            font-size: 0.95rem;
        }

        code {
            font-family: 'Courier New', monospace;
        }

        .download-btn {
            display: block;
            width: 200px;
            margin: 30px auto;
            padding: 15px 30px;
            font-size: 1.3rem;
            font-family: inherit;
            background-color: #4ecdc4;
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            text-align: center;
        }

        .download-btn:hover {
            background-color: #45b7aa;
        }

        ul, ol {
            margin-left: 30px;
            margin-bottom: 15px;
        }

        li {
            margin-bottom: 8px;
            font-size: 1.1rem;
        }

        .module {
            page-break-inside: avoid;
            margin-bottom: 40px;
        }

        @media print {
            body {
                max-width: 100%;
                padding: 0;
            }

            .download-btn {
                display: none;
            }

            h1 {
                font-size: 2rem;
            }

            h2 {
                page-break-before: always;
                font-size: 1.5rem;
            }

            h2:first-of-type {
                page-break-before: auto;
            }

            pre {
                font-size: 0.85rem;
                border-width: 1px;
            }

            .goal, .explain, .try-it, .challenge {
                border-left-width: 3px;
            }

            .module {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <h1>🪨 Rock Paper Scissors ✂️</h1>
    <p class="subtitle">A Coding Tutorial for Kids (Ages 5-8)</p>

    <button class="download-btn" onclick="window.print()">📄 Download PDF</button>

    <p>Welcome! In this tutorial, you and your child will build a Rock Paper Scissors game together. No coding experience needed — just follow along step by step!</p>

    <p><strong>What you need:</strong></p>
    <ul>
        <li>A computer with a web browser (Chrome, Firefox, Safari, etc.)</li>
        <li>A text editor (Notepad on Windows, TextEdit on Mac, or any code editor)</li>
        <li>About 1.5 - 2 hours total (can be split across multiple sessions)</li>
    </ul>

    <div class="module">
        <h2>Module 1: Hello, Game!</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Create a webpage with three big emoji buttons.
        </div>

        <h3>What to Add</h3>
        <p>Open your text editor and create a new file called <code>index.html</code>. Copy this code:</p>

        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Rock Paper Scissors&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;🪨 Rock Paper Scissors ✂️&lt;/h1&gt;

    &lt;div id="choices"&gt;
        &lt;button id="btn-rock"&gt;🪨&lt;/button&gt;
        &lt;button id="btn-paper"&gt;📄&lt;/button&gt;
        &lt;button id="btn-scissors"&gt;✂️&lt;/button&gt;
    &lt;/div&gt;

    &lt;div id="result"&gt;&lt;/div&gt;
    &lt;div id="score"&gt;&lt;/div&gt;

    &lt;div id="actions"&gt;
        &lt;button id="btn-play-again"&gt;Play Again&lt;/button&gt;
        &lt;button id="btn-reset-all"&gt;Reset All&lt;/button&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

        <p>Save the file, then double-click it to open in your browser.</p>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "HTML is like giving instructions to the computer. We're telling it: 'Show a title, then show three buttons with emojis.' The computer reads our instructions and shows us the page!"
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Open the file in your browser. You should see a heading and three emoji buttons. They don't do anything yet — that's okay!
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you add a fourth button with a different emoji? What happens?
        </div>
    </div>

    <div class="module">
        <h2>Module 2: Make It Pretty</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Add colors and styles to make the game look fun!
        </div>

        <h3>What to Add</h3>
        <p>Inside the <code>&lt;head&gt;</code> section, right before <code>&lt;/head&gt;</code>, add this:</p>

        <pre><code>&lt;style&gt;
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif;
        background-color: #f0f8ff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
    }

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 30px;
        text-align: center;
    }

    #choices button {
        font-size: 4rem;
        padding: 20px 30px;
        margin: 10px;
        border: 4px solid #333;
        border-radius: 20px;
        background-color: #fff;
        cursor: pointer;
        transition: transform 0.1s, background-color 0.2s;
    }

    #choices button:hover {
        transform: scale(1.1);
        background-color: #fffacd;
    }

    #choices button:active {
        transform: scale(0.95);
    }

    #result {
        font-size: 2rem;
        margin: 30px 0;
        min-height: 50px;
        text-align: center;
    }

    #score {
        font-size: 1.5rem;
        margin: 20px 0;
        color: #555;
    }

    #actions {
        margin-top: 20px;
    }

    #actions button {
        font-size: 1.2rem;
        padding: 12px 24px;
        margin: 5px;
        border: 3px solid #333;
        border-radius: 12px;
        cursor: pointer;
        font-family: inherit;
    }

    #btn-play-again {
        background-color: #90ee90;
    }

    #btn-play-again:hover {
        background-color: #7ddf7d;
    }

    #btn-reset-all {
        background-color: #ffb6c1;
    }

    #btn-reset-all:hover {
        background-color: #ff9aae;
    }

    #choices {
        display: flex;
        justify-content: center;
    }
&lt;/style&gt;</code></pre>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "CSS is like decorating! We're telling the computer: 'Make the buttons big and round, give them a fun background color, and make them grow when we hover over them!' It's like picking out clothes for your webpage."
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Refresh the page in your browser. The buttons should now be big, colorful, and grow when you hover over them!
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you change the background color from <code>#f0f8ff</code> to a different color? Try <code>#ffe4e1</code> (pink) or <code>#f0fff0</code> (mint).
        </div>
    </div>

    <div class="module">
        <h2>Module 3: Pick Your Weapon</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Make the buttons do something when you click them!
        </div>

        <h3>What to Add</h3>
        <p>Right before <code>&lt;/body&gt;</code>, add this:</p>

        <pre><code>&lt;script&gt;
    let playerChoice = '';

    document.getElementById('btn-rock').addEventListener('click', function() {
        playerChoice = 'rock';
        document.getElementById('result').textContent = 'You picked: 🪨';
    });

    document.getElementById('btn-paper').addEventListener('click', function() {
        playerChoice = 'paper';
        document.getElementById('result').textContent = 'You picked: 📄';
    });

    document.getElementById('btn-scissors').addEventListener('click', function() {
        playerChoice = 'scissors';
        document.getElementById('result').textContent = 'You picked: ✂️';
    });
&lt;/script&gt;</code></pre>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "JavaScript is like giving the buttons a brain! We're telling each button: 'When someone clicks you, remember what they picked and show it on the screen.' A variable is like a box — we put the player's choice in a box called <code>playerChoice</code> so we can use it later."
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Refresh the page and click each button. You should see "You picked: 🪨" (or 📄 or ✂️) appear on the screen!
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you change the message to say something different? Like "Great choice! You picked: 🪨"
        </div>
    </div>

    <div class="module">
        <h2>Module 4: Computer Plays Too</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Make the computer pick rock, paper, or scissors randomly!
        </div>

        <h3>What to Add</h3>
        <p>Replace the entire <code>&lt;script&gt;</code> section with this:</p>

        <pre><code>&lt;script&gt;
    let playerChoice = '';
    let computerChoice = '';

    function getComputerChoice() {
        const options = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return options[randomIndex];
    }

    function getEmoji(choice) {
        if (choice === 'rock') return '🪨';
        if (choice === 'paper') return '📄';
        if (choice === 'scissors') return '✂️';
    }

    document.getElementById('btn-rock').addEventListener('click', function() {
        playerChoice = 'rock';
        computerChoice = getComputerChoice();
        document.getElementById('result').textContent =
            'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice);
    });

    document.getElementById('btn-paper').addEventListener('click', function() {
        playerChoice = 'paper';
        computerChoice = getComputerChoice();
        document.getElementById('result').textContent =
            'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice);
    });

    document.getElementById('btn-scissors').addEventListener('click', function() {
        playerChoice = 'scissors';
        computerChoice = getComputerChoice();
        document.getElementById('result').textContent =
            'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice);
    });
&lt;/script&gt;</code></pre>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "Now the computer gets to play too! We give it a list of choices — rock, paper, scissors — and it picks one randomly. It's like closing your eyes and pointing at one! <code>Math.random()</code> is like rolling a dice, but instead of 1-6, it picks from our list."
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Refresh and click the buttons multiple times. You should see both your choice and the computer's choice. The computer picks differently each time!
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you add a fourth option like "lizard" or "spock" to the computer's choices? What happens?
        </div>
    </div>

    <div class="module">
        <h2>Module 5: Who Wins?</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Figure out who wins each round!
        </div>

        <h3>What to Add</h3>
        <p>Replace the entire <code>&lt;script&gt;</code> section with this:</p>

        <pre><code>&lt;script&gt;
    let playerChoice = '';
    let computerChoice = '';

    function getComputerChoice() {
        const options = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return options[randomIndex];
    }

    function getEmoji(choice) {
        if (choice === 'rock') return '🪨';
        if (choice === 'paper') return '📄';
        if (choice === 'scissors') return '✂️';
    }

    function getWinner(player, computer) {
        if (player === computer) return 'tie';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }

    function playRound(player) {
        playerChoice = player;
        computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        let message = 'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice) + '\n\n';

        if (winner === 'win') {
            message += '🎉 You Win!';
        } else if (winner === 'lose') {
            message += '😢 You Lose!';
        } else {
            message += '🤝 It\'s a Tie!';
        }

        document.getElementById('result').textContent = message;
    }

    document.getElementById('btn-rock').addEventListener('click', function() {
        playRound('rock');
    });

    document.getElementById('btn-paper').addEventListener('click', function() {
        playRound('paper');
    });

    document.getElementById('btn-scissors').addEventListener('click', function() {
        playRound('scissors');
    });
&lt;/script&gt;</code></pre>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "Now we teach the game the rules! Rock beats scissors (rock breaks scissors). Scissors beats paper (scissors cuts paper). Paper beats rock (paper covers rock). If both pick the same, it's a tie! We use <code>if</code> statements to check each rule."
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Play several rounds. Try to get a win, a loss, and a tie. Do the results make sense?
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you change the win message to something funnier? Like "🎉 You're awesome!"
        </div>
    </div>

    <div class="module">
        <h2>Module 6: Keep Score</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Track how many times you win, lose, and tie!
        </div>

        <h3>What to Add</h3>
        <p>Replace the entire <code>&lt;script&gt;</code> section with this:</p>

        <pre><code>&lt;script&gt;
    let playerChoice = '';
    let computerChoice = '';
    let wins = 0;
    let losses = 0;
    let ties = 0;

    function getComputerChoice() {
        const options = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return options[randomIndex];
    }

    function getEmoji(choice) {
        if (choice === 'rock') return '🪨';
        if (choice === 'paper') return '📄';
        if (choice === 'scissors') return '✂️';
    }

    function getWinner(player, computer) {
        if (player === computer) return 'tie';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }

    function updateScore() {
        document.getElementById('score').textContent =
            'Wins: ' + wins + ' | Losses: ' + losses + ' | Ties: ' + ties;
    }

    function playRound(player) {
        playerChoice = player;
        computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        if (winner === 'win') {
            wins++;
        } else if (winner === 'lose') {
            losses++;
        } else {
            ties++;
        }

        updateScore();

        let message = 'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice) + '\n\n';

        if (winner === 'win') {
            message += '🎉 You Win!';
        } else if (winner === 'lose') {
            message += '😢 You Lose!';
        } else {
            message += '🤝 It\'s a Tie!';
        }

        document.getElementById('result').textContent = message;
    }

    document.getElementById('btn-rock').addEventListener('click', function() {
        playRound('rock');
    });

    document.getElementById('btn-paper').addEventListener('click', function() {
        playRound('paper');
    });

    document.getElementById('btn-scissors').addEventListener('click', function() {
        playRound('scissors');
    });
&lt;/script&gt;</code></pre>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "Now we're keeping score! We have three boxes (variables) called <code>wins</code>, <code>losses</code>, and <code>ties</code>. Every time something happens, we add 1 to the right box. Then we show all three boxes on the screen so you can see how you're doing!"
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Play several rounds. Watch the score update after each round. The score stays even when you play again!
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you add a new score for "Total Games Played"? (Hint: it's wins + losses + ties!)
        </div>
    </div>

    <div class="module">
        <h2>Module 7: Play Again!</h2>

        <div class="goal">
            <strong>🎯 Goal:</strong> Add buttons to play another round or start fresh!
        </div>

        <h3>What to Add</h3>
        <p>Replace the entire <code>&lt;script&gt;</code> section with this:</p>

        <pre><code>&lt;script&gt;
    let playerChoice = '';
    let computerChoice = '';
    let wins = 0;
    let losses = 0;
    let ties = 0;

    function getComputerChoice() {
        const options = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return options[randomIndex];
    }

    function getEmoji(choice) {
        if (choice === 'rock') return '🪨';
        if (choice === 'paper') return '📄';
        if (choice === 'scissors') return '✂️';
    }

    function getWinner(player, computer) {
        if (player === computer) return 'tie';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }

    function updateScore() {
        document.getElementById('score').textContent =
            'Wins: ' + wins + ' | Losses: ' + losses + ' | Ties: ' + ties;
    }

    function playRound(player) {
        playerChoice = player;
        computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        if (winner === 'win') {
            wins++;
        } else if (winner === 'lose') {
            losses++;
        } else {
            ties++;
        }

        updateScore();

        let message = 'You: ' + getEmoji(playerChoice) + '  Computer: ' + getEmoji(computerChoice) + '\n\n';

        if (winner === 'win') {
            message += '🎉 You Win!';
        } else if (winner === 'lose') {
            message += '😢 You Lose!';
        } else {
            message += '🤝 It\'s a Tie!';
        }

        document.getElementById('result').textContent = message;
    }

    function playAgain() {
        document.getElementById('result').textContent = '';
    }

    function resetAll() {
        wins = 0;
        losses = 0;
        ties = 0;
        document.getElementById('result').textContent = '';
        updateScore();
    }

    document.getElementById('btn-rock').addEventListener('click', function() {
        playRound('rock');
    });

    document.getElementById('btn-paper').addEventListener('click', function() {
        playRound('paper');
    });

    document.getElementById('btn-scissors').addEventListener('click', function() {
        playRound('scissors');
    });

    document.getElementById('btn-play-again').addEventListener('click', function() {
        playAgain();
    });

    document.getElementById('btn-reset-all').addEventListener('click', function() {
        resetAll();
    });
&lt;/script&gt;</code></pre>

        <div class="explain">
            <strong>💡 Explain to Kids:</strong> "We made two new functions! <code>playAgain()</code> just clears the message so you can play another round — but your score stays! <code>resetAll()</code> clears everything, including the score. It's like starting a brand new game!"
        </div>

        <div class="try-it">
            <strong>✅ Try It!</strong> Play a few rounds, then click "Play Again" — the message clears but the score stays. Now click "Reset All" — everything goes back to zero!
        </div>

        <div class="challenge">
            <strong>🌟 Challenge:</strong> Can you add a third button that says "Show Score" and makes the score bigger for a few seconds?
        </div>
    </div>

    <h2>🎉 Congratulations!</h2>
    <p>You built a complete Rock Paper Scissors game! You learned:</p>
    <ul>
        <li><strong>HTML</strong> — how to create buttons and structure a webpage</li>
        <li><strong>CSS</strong> — how to make things look fun and colorful</li>
        <li><strong>JavaScript</strong> — how to make buttons respond to clicks, use variables, and make decisions</li>
    </ul>

    <p>Keep experimenting! Change colors, add sounds, make new games. The possibilities are endless! 🚀</p>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `tutorial.html` in a browser.

Expected: A styled tutorial page with all 7 modules, colorful sections (Goal, Explain, Try It, Challenge), code snippets, and a "Download PDF" button at the top.

- [ ] **Step 3: Test PDF export**

Click the "Download PDF" button in the browser.

Expected: The browser's print dialog opens. The print preview shows a clean layout with page breaks between modules and the "Download PDF" button hidden. Save as PDF to verify.

- [ ] **Step 4: Commit**

```bash
git add tutorial.html
git commit -m "feat: add tutorial HTML page with print support"
```

---

### Task 9: Final Verification

**Files:**
- Verify: `index.html`
- Verify: `tutorial.html`

- [ ] **Step 1: Test the complete game**

Open `index.html` in a browser and play through the entire game.

Verify:
- Three emoji buttons work (🪨 📄 ✂️)
- Computer makes random choices
- Win/lose/tie messages display correctly
- Score updates and persists across rounds
- "Play Again" clears the round but keeps the score
- "Reset All" clears everything
- Visual design is kid-friendly (big buttons, bright colors, playful font)

- [ ] **Step 2: Test the tutorial**

Open `tutorial.html` in a browser.

Verify:
- All 7 modules are present and readable
- Code snippets are formatted correctly
- Colored sections (Goal, Explain, Try It, Challenge) display properly
- "Download PDF" button triggers print dialog
- Print preview shows clean layout with page breaks

- [ ] **Step 3: Test on multiple browsers (optional)**

Open both files in Chrome, Firefox, and Safari (if available) to verify cross-browser compatibility.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: final verification complete"
```
