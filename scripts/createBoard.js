import { createCard, createIconsArray } from './cards.js';
import { startTimer, totalTime } from './timer.js';
import { totalFlips, } from './cards.js';
// import { gameState } from './gameLogic.js';

let movesCountElement, timeCountElement;

export function updateStats() {
    movesCountElement.textContent = totalFlips;
    timeCountElement.textContent = totalTime;
}

export function createBoard(columns, count) {
    const template = document.getElementById('gameTableTemplate');
    if (!template) return;

    const templateContent = template.content.cloneNode(true);
    const tableElement = templateContent.querySelector('.table');
    const restartButton = templateContent.querySelector('.table__button');
    const mainElement = document.querySelector('.main');

    tableElement.innerHTML = '';
    tableElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const icons = createIconsArray(count);
    icons.forEach(icon => {
        tableElement.appendChild(createCard(icon));
    });

    mainElement.innerHTML = '';
    mainElement.appendChild(templateContent);

    const statsElement = document.createElement('div');
    statsElement.classList.add('stats');
    statsElement.innerHTML = `
        <div class="stats__moves">Шаги: <span id="movesCount"></span></div>
        <div class="stats__time">Время: <span id="timeCount"></span></div>
    `;

    mainElement.appendChild(statsElement);

    movesCountElement = document.getElementById('movesCount');
    timeCountElement = document.getElementById('timeCount');




    startTimer(updateStats);

    if (restartButton) {
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }
}

