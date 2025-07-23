const inputElement = document.querySelector('.board__input'); 
const startButton = document.querySelector('.board__button'); 
const mainElement = document.querySelector('.main');



function createBoard(columns, count) {
  const template = document.getElementById('gameTableTemplate');
  const templateContent = template.content.cloneNode(true);
  const tableElement = templateContent.querySelector('.table');


  for (let i = 0; i < count; i++) {

    const newCard = createCard();

    tableElement.appendChild(newCard);
  }
  
  tableElement.style.display = 'grid';
  tableElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  tableElement.style.gap = '10px'; 
  
  mainElement.innerHTML = ''; 
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

function createCard() {
  const cardTemplate = document.getElementById('cardTemplate');
  const templateContent = cardTemplate.content.cloneNode(true);

  const cardElement = templateContent.querySelector('.card');

  return cardElement;
}



