# Rock Paper Scissors Tutorial - Design Document

## Overview

A step-by-step coding tutorial for building a Rock Paper Scissors game, designed for kids aged 5-8 with guidance from parents or teachers. The tutorial uses a single HTML file approach with emoji-based visuals, requiring no external dependencies or setup.

## Target Audience

- **Primary users:** Kids aged 5-8 years old
- **Facilitators:** Parents or teachers who guide the coding process
- **Skill level:** No prior coding experience required

## Tech Stack

- **Format:** Single HTML file with inline CSS and JavaScript
- **Visuals:** Emoji-based (🪨 📄 ✂️)
- **Platform:** Web browser (works on any device, no installation needed)
- **Dependencies:** None - pure HTML/CSS/JS

## Project Structure

```
rock-paper-scissors/
├── index.html          ← The game (single file, all modules build into this)
└── tutorial.html       ← The tutorial guide for parents/teachers (with PDF export)
```

## Tutorial Structure

### Module Breakdown

| Module | Title | What Kids Build | Concepts Learned |
|--------|-------|----------------|-----------------|
| 1 | "Hello, Game!" | A webpage with 3 emoji buttons | HTML basics, buttons |
| 2 | "Make It Pretty" | Colorful buttons, big emojis, fun layout | CSS basics (colors, sizes, fonts) |
| 3 | "Pick Your Weapon" | Click a button → your choice appears | JavaScript events, variables |
| 4 | "Computer Plays Too" | Computer randomly picks rock/paper/scissors | Random numbers, if/else |
| 5 | "Who Wins?" | Game shows winner with a message | Comparison logic, conditions |
| 6 | "Keep Score" | Score counter tracks wins/losses | Counters, updating text |
| 7 | "Play Again!" | Two buttons: Play Again (keeps score) and Reset All (clears score) | Functions, reset logic |

### Module Design Principles

- Each module takes approximately 10-15 minutes
- Each module starts with what was built in the previous module
- Each module ends with something playable or visible
- Uses simple language that parents/teachers can explain to kids
- Includes "Try It!" sections for testing
- Includes fun challenge questions at the end

## Game Features

### Core Gameplay

1. Three big emoji buttons for choices (🪨 📄 ✂️)
2. Player clicks a button to make their choice
3. Computer randomly selects rock, paper, or scissors
4. Both choices are displayed on screen
5. Game compares choices and determines winner
6. Result is shown with fun emoji messages:
   - Win: "You Win! 🎉"
   - Lose: "You Lose! 😢"
   - Tie: "It's a Tie! 🤝"

### Score System

- **Cumulative scoring:** Wins, losses, and ties persist across rounds
- **Score display:** "Wins: 3 | Losses: 1 | Ties: 2"
- **Play Again button:** Resets the current round but keeps the score
- **Reset All button:** Resets both the round and the score back to 0-0

### Visual Design

- Big emoji buttons (easy to click for small fingers)
- Bright, playful colors
- Large, readable text
- Simple, clear feedback messages
- Score prominently displayed

### Screen Layout

```
┌─────────────────────────────┐
│   🪨 ROCK PAPER SCISSORS ✂️ │  ← Title
├─────────────────────────────┤
│                             │
│   You: 🪨    Computer: ✂️   │  ← Choices shown
│                             │
│   🎉 You Win!               │  ← Result message
│                             │
│   Wins: 3 | Losses: 1 | Ties: 2  │  ← Score
│                             │
│   [🪨]  [📄]  [✂️]         │  ← Choice buttons
│                             │
│   [Play Again]  [Reset All] │  ← Action buttons
└─────────────────────────────┘
```

## Error Handling & Edge Cases

- **Double-click prevention:** Buttons disabled briefly after clicking to prevent weird states
- **No invalid inputs:** Only 3 choices possible, so no bad data
- **Clear visual feedback:** Always show what both player and computer picked before showing result
- **Score validation:** Score never goes negative, starts at 0, only goes up

## Tutorial Document (tutorial.html)

### Format

- Standalone HTML page with styled content
- Print-friendly CSS using `@media print`
- "Download PDF" button that triggers `window.print()`
- No external dependencies

### Content Structure

Each module in the tutorial includes:

1. **Goal:** What we're building in this module
2. **What to Add:** Code snippet with the new code highlighted
3. **Explain to Kids:** Simple talking points and analogies for parents/teachers
4. **Try It!:** What to test and verify
5. **Challenge:** Fun optional extension (e.g., "Can you change the emoji to something else?")

### Print/PDF Features

- Clean layout optimized for printing
- Code snippets formatted for readability
- Page breaks between modules
- "Download PDF" button hidden in print view
- Header/footer with page numbers

## Success Criteria

- Kids can build a working Rock Paper Scissors game by following the tutorial
- Each module is completable in 10-15 minutes
- The game is fun and engaging for 5-8 year olds
- Parents/teachers can easily explain the concepts
- The tutorial can be exported as a PDF for offline use
- The game works on any modern web browser without setup

## Future Considerations (Out of Scope)

- Multiplayer mode (two players instead of vs computer)
- Sound effects
- Animations
- Multiple rounds/tournaments
- Leaderboards
- Different themes/skins
