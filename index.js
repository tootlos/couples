document.addEventListener('DOMContentLoaded', function() {

  const inputElement = document.querySelector('.board__input'); 
  const startButton = document.querySelector('.board__button'); 
  const mainElement = document.querySelector('.main');

  function createBoard(columns, count) {
    const template = document.getElementById('gameTableTemplate');
    const templateContent = template.content.cloneNode(true);
    const tableElement = templateContent.querySelector('.table');

    while (tableElement.firstChild) {
      tableElement.removeChild(tableElement.firstChild);
    }

    const icons = createIconsArray(count); 

    icons.forEach(icon => {
      const newCard = createCard(icon); 
      tableElement.append(newCard);
    });
    
    tableElement.style.display = 'grid';
    tableElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    tableElement.style.gap = '10px'; 
    
    while (mainElement.firstChild) {
      mainElement.removeChild(mainElement.firstChild);
    }
    mainElement.appendChild(templateContent);

    const restartButton = document.querySelector('.table__button');
    restartButton.addEventListener('click', () => {
      location.reload(); 
    });
  }

  startButton.addEventListener('click', () => {
    const inputNumber = parseInt(inputElement.value, 10);
    
    if (inputNumber >= 2 && inputNumber <= 6 && inputNumber % 2 === 0) {
      const count = inputNumber * inputNumber;
      createBoard(inputNumber, count);
    } else {
      alert('Введите чётное число от 2 до 6!');
      inputElement.value = "4";
    }
  });
  
  function shuffleArray(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      currentIndex--;
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }

    return array;
  }

  function createCard(iconName) {
    const cardTemplate = document.getElementById('cardTemplate');
    const templateContent = cardTemplate.content.cloneNode(true);
    const cardElement = templateContent.querySelector('.card');
    
    const iconElement = document.createElement('i');
    iconElement.className = `fa fa-${iconName}`;
    cardElement.appendChild(iconElement);

    const flippedElement = cardElement.querySelector('#flippedIcon');
    if (flippedElement) {
      flippedElement.classList.add(`fa-${iconName}`);
    }
    
    return cardElement;
  }

  function createIconsArray(initialCount) {
    const cardsIcons = [
      "compass", "cloud", "play", "bolt", "stop",
      "cogs", "atom", "basketball-ball", "arrows",
      "angle-left", "bars", "file", "filter", "gear",
      "folder", "folder-open", "shield", "scissors", "pen-clip",
    ];

    let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
    
    function dublicateElements(array) {
      const dublicatedArray = [];
      array.forEach(item => {
        dublicatedArray.push(item, item); 
      });
      return dublicatedArray;
    }

    let doubleCards = dublicateElements(cards);
    return shuffleArray(doubleCards);
  }
});
