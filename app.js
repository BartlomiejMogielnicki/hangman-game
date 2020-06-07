const lines = document.querySelectorAll('.line');
const correct = document.getElementById('correct-letter');
const incorrect = document.getElementById('incorrect-letter');
const message = document.getElementById('message-container');
const popup = document.getElementById('popup-container');
const popupMsg = document.getElementById('popup-message');
const playAgainBtn = document.getElementById('popup-btn');

// Random password from given array
const passwordArr = ['programming', 'javascript', 'html', 'computer'];
let password = passwordArr[Math.floor(Math.random() * passwordArr.length)]

// Define empty arrays for letters
const correctLetters = [];
const incorrectLetters = [];

// Show incorrect letters
const showIncorrect = () => {
    incorrect.innerHTML = `<p>Incorrect letters:</p><span>${incorrectLetters}</span>`
}

// Show password
const showPassword = () => {
    correct.innerHTML = `${password.split('').map(letter => 
    `<span>${correctLetters.includes(letter) ? letter : ''}
    </span>`).join('')}`;

    // Check win
    if (correct.innerText.length === password.length) {
        popupMsg.textContent = "You win!";
        popup.style.display = 'flex';
    }
    showIncorrect();
}

// Show message
const showMessage = () => {
    message.classList.add('showMsg')

    setTimeout(() => {
        message.classList.remove('showMsg')
    }, 2000);
}

// Check lose
const checkLose = () => {
    if (incorrectLetters.length === lines.length) {
        popupMsg.textContent = "You lose!";
        popup.style.display = 'flex';
    }
}

// Incorrect update
const incorrectUpdate = (letter) => {
    if (incorrectLetters.includes(letter)) {
        message.textContent = 'You tried this letter before.';
        showMessage();
    } else {
        incorrectLetters.push(letter);

        // Show next line
        const errors = incorrectLetters.length;
        lines.forEach((line, index) => {
            if (index < errors) {
                line.style.display = "block";
            } else {
                line.style.display = "none";
            }
        })
    }
    checkLose();
}

// Type letters
document.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (password.includes(e.key) && !correctLetters.includes(e.key)) {
            correctLetters.push(e.key);
        } else if (password.includes(e.key) && correctLetters.includes(e.key)) {
            message.textContent = 'You tried this letter before.';
            showMessage();
        } else if (!password.includes(e.key)) {
            incorrectUpdate(e.key);
        }
    }
    showPassword();
})

// Play again button - restart game
playAgainBtn.addEventListener('click', () => {
    password = passwordArr[Math.floor(Math.random() * passwordArr.length)]
    correctLetters.splice(0);
    incorrectLetters.splice(0);
    showPassword();
    popup.style.display = 'none';
    lines.forEach(line => {
        line.style.display = "none";
    })
})

showPassword();