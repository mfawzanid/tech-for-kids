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
    document.getElementById('sky').classList.remove('bounce', 'shake');

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
    document.getElementById('feedback').className = '';
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
        '⭐ Score: ' + correctAnswers + '   •   Tries: ' + wrongAnswers;
}

function showFeedback(isCorrect) {
    // TODO: Show a happy or try-again message
    const feedbackEl = document.getElementById('feedback');
    const sky = document.getElementById('sky');

    if (isCorrect) {
        feedbackEl.textContent = '🎉 Great job!';
        feedbackEl.className = 'correct';
        sky.classList.add('bounce');
    } else {
        feedbackEl.textContent = 'Almost! The answer is ' + starCount + '. Try the next one!';
        feedbackEl.className = 'wrong';
        sky.classList.add('shake');
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
