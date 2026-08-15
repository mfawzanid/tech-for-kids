let playerChoice = '';
let computerChoice = '';
let wins = 0;
let losses = 0;
let ties = 0;
let isPlaying = false;

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

function setButtonsDisabled(disabled) {
    document.getElementById('btn-rock').disabled = disabled;
    document.getElementById('btn-paper').disabled = disabled;
    document.getElementById('btn-scissors').disabled = disabled;
}

function startCountdown(picked) {
    if (isPlaying) return;
    isPlaying = true;
    setButtonsDisabled(true);

    playerChoice = picked;
    computerChoice = getComputerChoice();

    document.getElementById('player-emoji').textContent = getEmoji(playerChoice);
    document.getElementById('computer-emoji').textContent = '';

    const centerEl = document.getElementById('center');

    centerEl.textContent = 'You picked: ' + getEmoji(playerChoice);

    setTimeout(function() {
        centerEl.textContent = '3 👊';
    }, 600);

    setTimeout(function() {
        centerEl.textContent = '2 👊';
    }, 1100);

    setTimeout(function() {
        centerEl.textContent = '1 👊';
    }, 1600);

    setTimeout(function() {
        centerEl.textContent = 'SHOOT! 👊';
    }, 2100);

    setTimeout(function() {
        showResult();
    }, 2600);
}

// ==========================================
// YOUR TURN! Fill in these 5 functions below
// ==========================================

function getWinner(player, computer) {
    // TODO: Return 'player', 'computer', or 'tie'
}

function updateScore() {
    // TODO: Show the score on the screen
}

function showResult() {
    // TODO: Reveal the computer's choice and show who won
}

function playAgain() {
    // TODO: Clear the screen so we can play again
}

function resetAll() {
    // TODO: Clear everything including the score
}

document.getElementById('btn-rock').addEventListener('click', function() {
    startCountdown('rock');
});

document.getElementById('btn-paper').addEventListener('click', function() {
    startCountdown('paper');
});

document.getElementById('btn-scissors').addEventListener('click', function() {
    startCountdown('scissors');
});

document.getElementById('btn-play-again').addEventListener('click', function() {
    playAgain();
});

document.getElementById('btn-reset-all').addEventListener('click', function() {
    resetAll();
});
