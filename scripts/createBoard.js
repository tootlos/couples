import { createCard, createIconsArray } from './cards.js';
import { startTimer, totalTime } from './timer.js';
import { totalFlips } from './cards.js';

let movesCountElement, timeCountElement;

export function updateStats() {

    if (movesCountElement) {
        movesCountElement.textContent = totalFlips;
    }
    if (timeCountElement) {
        timeCountElement.textContent = totalTime;
    }
}

export function createBoard(columns, count) {
    const template = document.getElementById('gameTableTemplate');
    if (!template) return;

    const templateContent = template.content.cloneNode(true);
    const tableElement = templateContent.querySelector('.table');

    const restartButton = templateContent.querySelector('.board__button'); 
    const mainElement = document.querySelector('.main');


    mainElement.innerHTML = ''; 

    tableElement.innerHTML = '';
    tableElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    const icons = createIconsArray(count);
    icons.forEach(icon => {
        tableElement.appendChild(createCard(icon));
    });

    mainElement.appendChild(templateContent);


    const statsElement = document.createElement('div');
    statsElement.classList.add('state'); 
    statsElement.innerHTML = `
        <h1>Пары</h1>
        <p class="state__moves">Шаги: <span class="moves-count">0</span></p>
        <p class="state__time">Время: <span class="time-count">60</span> сек</p>
    `;

    mainElement.prepend(statsElement); 

   
    movesCountElement = statsElement.querySelector('.moves-count');
    timeCountElement = statsElement.querySelector('.time-count');

    startTimer(updateStats);

    if (restartButton) {
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }
}