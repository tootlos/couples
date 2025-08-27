import { updateStats } from "./createBoard.js";
import { gameState, disableCards, unflipCards } from "./gameLogic.js";

let totalFlips = 0;

function createCard(iconName) {
    const cardTemplate = document.getElementById('cardTemplate');
    if (!cardTemplate) return document.createElement('div');

    const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
    cardElement.dataset.icon = iconName;

    const iconElement = cardElement.querySelector('.flipped-icon');
    if (iconElement) {
        iconElement.className = `flipped-icon fa fa-${iconName}`;
    }

    cardElement.addEventListener('click', () => handleCardClick(cardElement, updateStats, gameState));
    return cardElement;
}

function handleCardClick(card, updateStats, gameState) {
    if (gameState.lockBoard || card === gameState.firstCard || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');

    if (!gameState.firstCard) {
        gameState.firstCard = card;
        return;
    }

    gameState.secondCard = card;
    totalFlips++;
    updateStats();
    gameState.lockBoard = true;

    if (gameState.firstCard.dataset.icon === gameState.secondCard.dataset.icon) {
        disableCards(gameState);
    } else {
        unflipCards(gameState);
    }
}

function createIconsArray(initialCount) {
    const cardsIcons = [
        "compass", "cloud", "play", "bolt", "stop",
        "cogs", "atom", "basketball-ball", "arrows",
        "angle-left", "bars", "file", "filter", "gear",
        "folder", "folder-open", "shield", "scissors", "pen-clip",
    ];

    const uniqueIconsCount = Math.min(initialCount / 2, cardsIcons.length);
    const selectedIcons = cardsIcons.slice(0, uniqueIconsCount);
    const pairedIcons = [...selectedIcons, ...selectedIcons];

    return shuffleArray(pairedIcons);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { createCard, createIconsArray, totalFlips };
