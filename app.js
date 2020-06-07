const line = document.querySelectorAll('.line');
const correct = document.getElementById('correct-letter');
const incorrect = document.getElementById('incorrect-letter');
const message = document.getElementById('message-container');
const popup = document.getElementById('popup-container');
const popupMsg = document.getElementById('popup-message');
const playAgainBtn = document.getElementById('popup-btn');

// Choose password
const passwordArr = ['programming', 'javascript', 'html', 'computer'];
const password = passwordArr[Math.floor(Math.random() * passwordArr.length)]

const correctLetters = [];
const incorrectLetters = [];


// Check win
const checkWin = () => {
    if (correctLetters.length === password.length) {
        popupMsg.textContent = "You win!";
        popup.style.display = 'flex';
    }
}

// Show incorrect letters
const showIncorrect = () => {
    incorrect.innerHTML = `<p>Incorrect letters:</p><span>${incorrectLetters}</span>`
}

// Show password
const showPassword = () => {
    correct.innerHTML = `${password.split('').map(letter => 
    `<span>${correctLetters.includes(letter) ? letter : ''}
    </span>`).join('')}`;

    checkWin();
    showIncorrect();
}

showPassword();

// Show message
const showMessage = () => {
    message.classList.add('showMsg')

    setTimeout(() => {
        message.classList.remove('showMsg')
    }, 2000);
}

// Incorrect update
const incorrectUpdate = (letter) =>
    incorrectLetters.push(letter);

const errors = incorrectLetters.length;


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