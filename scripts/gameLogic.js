import { stopTimer } from './timer.js';
import { totalFlips } from './cards.js';
import { generateConfetti } from './confetti.js';  


let gameState = {
    firstCard: null,
    secondCard: null,
    lockBoard: false,
    matchedPairs: 0
};

function disableCards() {
    gameState.firstCard.classList.add('matched');
    gameState.secondCard.classList.add('matched');
    gameState.matchedPairs++;
    resetTurn();
    isWin();
}

function unflipCards() {
    setTimeout(() => {
        gameState.firstCard.classList.remove('flipped');
        gameState.secondCard.classList.remove('flipped');
        resetTurn();
    }, 1000);
}

function resetTurn() {
    gameState.firstCard = null;
    gameState.secondCard = null;
    gameState.lockBoard = false;
}

const confettiArray = generateConfetti(100);

export function startConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    confettiArray.forEach(confetti => {
        confettiContainer.appendChild(confetti);
    });
}

function isWin() {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0 && Array.from(cards).every(card => card.classList.contains('matched'))) {
        stopTimer();
        startConfetti();
        setTimeout(() => {
            alert(`Ты нашёл все пары за ${totalFlips} ходов!`);
        }, 500);
    }
}

export { gameState, isWin, disableCards, unflipCards };
