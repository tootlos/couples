document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.querySelector('.board__input');
    const startButton = document.querySelector('.board__button');
    const mainElement = document.querySelector('.main');
    const movesCountElement = document.createElement('span');
    const timeCountElement = document.createElement('span');

    let gameState = {
        firstCard: null,
        secondCard: null,
        lockBoard: false,
        matchedPairs: 0
    };

    let totalTime = 60;
    let totalFlips = 0;
    let intervalId;
    let isGameActive = true;

    function updateStats() {
        movesCountElement.textContent = totalFlips;
        timeCountElement.textContent = totalTime;
    }

    function startTimer() {
        clearInterval(intervalId);
        updateStats();
        intervalId = setInterval(() => {
            totalTime--;
            updateStats();
            if (totalTime <= 0) {
                clearInterval(intervalId);
                isGameActive = false;
                alert("время вышло! игра окончена");
            }
        }, 1000);
    }

    function handleCardClick(card) {
        if (!isGameActive || gameState.lockBoard || card === gameState.firstCard || card.classList.contains('matched')) {
            return;
        }
        card.classList.add('flipped');
        totalFlips++;
        updateStats();
        if (!gameState.firstCard) {
            gameState.firstCard = card;
            return;
        }
        gameState.secondCard = card;
        gameState.lockBoard = true;
        if (gameState.firstCard.dataset.icon === gameState.secondCard.dataset.icon) {
            disableCards();
        } else {
            unflipCards();
        }
    }

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

    function isWin() {
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0 && Array.from(cards).every(card => card.classList.contains('matched'))) {
            clearInterval(intervalId);
            isGameActive = false;
            setTimeout(() => {
                alert(`ты нашёл все пары за ${totalFlips} ходов!`);
            }, 500);
        }
    }

    function createBoard(columns, count) {
        const template = document.getElementById('gameTableTemplate');
        if (!template) return;
        const templateContent = template.content.cloneNode(true);
        const tableElement = templateContent.querySelector('.table');
        const restartButton = templateContent.querySelector('.table__button');
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
            <div class="stats__moves">Шаги: </div>
            <div class="stats__time">Время: </div>
        `;
        statsElement.querySelector('.stats__moves').appendChild(movesCountElement);
        statsElement.querySelector('.stats__time').appendChild(timeCountElement);
        mainElement.appendChild(statsElement);
        totalTime = 60;
        totalFlips = 0;
        isGameActive = true;
        updateStats();
        startTimer();
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                clearInterval(intervalId);
                location.reload();
            });
        }
    }

    function createCard(iconName) {
        const cardTemplate = document.getElementById('cardTemplate');
        if (!cardTemplate) return document.createElement('div');
        const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
        cardElement.dataset.icon = iconName;
        const iconElement = cardElement.querySelector('.flipped-icon');
        if (iconElement) {
            iconElement.className = `flipped-icon fa fa-${iconName}`;
        }
        cardElement.addEventListener('click', () => handleCardClick(cardElement));
        return cardElement;
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

    startButton.addEventListener('click', () => {
        const inputNumber = parseInt(inputElement.value, 10);
        if (inputNumber >= 2 && inputNumber <= 6 && inputNumber % 2 === 0) {
            createBoard(inputNumber, inputNumber * inputNumber);
        } else {
            alert('Пожалуйста, введите чётное число от 2 до 6!');
            inputElement.value = "4";
        }
    });
});
