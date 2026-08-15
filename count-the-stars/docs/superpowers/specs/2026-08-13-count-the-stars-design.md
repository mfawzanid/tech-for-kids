# Count the Stars - Design Document

## Overview

A counting game for kids aged 5-8. The screen shows a "night sky" filled with a random number of stars (1-10); the child counts the stars and picks the correct number from 4 answer buttons. Built as a coding tutorial following the same educational pattern as the sibling `rock-paper-scissors` project.

## Target Audience

- **Primary users:** Kids aged 5-8 years old
- **Facilitators:** Parents or teachers who guide the coding process
- **Skill level:** No prior coding experience required

## Tech Stack

- **Format:** Static HTML + CSS + JavaScript, no build tools
- **Visuals:** Emoji-based (⭐), night-sky gradient background
- **Platform:** Web browser (works on any device, no installation needed)
- **Dependencies:** None - pure HTML/CSS/JS

## Project Structure

```
count-the-stars/
├── index.html          ← The game (HTML structure + inline CSS)
├── game.js             ← The game logic (starter code + 5 TODO functions)
└── tutorial.html       ← The tutorial guide for parents/teachers (with PDF export)
```

## Game Features

### Core Gameplay

1. On load, a random number of stars (1-10) appears in the sky area as ⭐ emojis.
2. Four answer buttons appear: the correct count plus 3 unique wrong numbers, shuffled.
3. The child clicks an answer.
4. Correct: "🎉 Great job!" message + correct score increases.
5. Wrong: "🤔 Count again! The answer is N!" message + the correct button is highlighted green + wrong score increases.
6. "Next Star" loads a fresh round. "Reset" zeroes both counts and starts a new round.

### Score System

- **Correct** count and **Wrong** count, both persist across rounds.
- **Score display:** `Correct: 4 | Wrong: 1`
- **Next Star button:** loads a new round, keeps the score.
- **Reset button:** zeroes both counts and starts a fresh round.

### Visual Design

- Night-sky gradient background (dark blue to indigo), white text.
- Big, tappable answer buttons with white background and dark text.
- Correct answer highlighted green when the child gets it wrong.
- Gold title and score for a fun, warm feel.

### Screen Layout

```
┌──────────────────────────────┐
│   ⭐ Count the Stars! ⭐       │  ← Title
├──────────────────────────────┤
│                              │
│      ⭐ ⭐ ⭐ ⭐ ⭐ ⭐          │  ← Sky (random 1-10 stars)
│                              │
│   [3]  [6]  [9]  [5]         │  ← 4 answer buttons
│                              │
│   🎉 Great job!               │  ← Feedback
│                              │
│   Correct: 4 | Wrong: 1      │  ← Score
│                              │
│   [Next Star]  [Reset]       │  ← Action buttons
└──────────────────────────────┘
```

## game.js Breakdown

### Pre-built helper functions (already working)

| Function | Purpose |
|----------|---------|
| `getRandomStarCount()` | Returns a random number 1-10 |
| `makeAnswerOptions(correct)` | Returns 4 unique numbers (correct + 3 wrong) |
| `shuffle(array)` | Shuffles an array (Fisher-Yates) |
| `makeStars(count)` | Returns a string of `count` ⭐ emojis |
| `highlightCorrectAnswer()` | Highlights the correct answer button green |

### TODO functions (kids fill in)

| Function | Purpose |
|----------|---------|
| `newRound()` | Generate star count, render stars, build shuffled answer buttons |
| `checkAnswer(picked)` | Compare the pick to `starCount`, update score + feedback |
| `updateScore()` | Display "Correct: X \| Wrong: Y" |
| `showFeedback(isCorrect)` | Show celebration or try-again message (and highlight) |
| `resetGame()` | Zero both counts and start a fresh round |

## Error Handling & Edge Cases

- **Double-click prevention:** `isAnswered` flag stops multiple answers per round.
- **Unique answer options:** `makeAnswerOptions` ensures no duplicate wrong numbers.
- **Clean reset:** `resetGame()` zeroes scores and re-runs `newRound()`.

## Tutorial Document (tutorial.html)

### Format

- Standalone HTML page with styled content and print-friendly `@media print` CSS.
- "Download PDF" button that triggers `window.print()`.
- No external dependencies.

### Content Structure

Five modules, one per TODO function, each containing:

1. **Goal:** What we're building in this module
2. **What to Add:** Code snippet for the function
3. **Explain to Kids:** Simple talking points and analogies
4. **Try It!:** What to test and verify
5. **Challenge:** Fun optional extension

## Success Criteria

- Kids can build a working "Count the Stars" game by following the tutorial.
- Each module is completable in 10-15 minutes.
- The game is fun and engaging for 5-8 year olds.
- Parents/teachers can easily explain the concepts.
- The tutorial can be exported as a PDF for offline use.
- The game works on any modern web browser without setup.

## Future Considerations (Out of Scope)

- Sound effects
- Animated twinkling stars
- Multiple difficulty levels (e.g., up to 20)
- A "count by twos/fives" mode
- Leaderboards or badges
