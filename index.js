const inputElement = document.querySelector('.board__input'); 
const startButton = document.querySelector('.board__button'); 
const boardElement = document.querySelector('.board');


function createBoard() {
    
    boardElement.innerHTML = '';
}


startButton.addEventListener('click', () => {

    let inputNumber = parseInt(inputElement.value, 10);


    if (inputNumber >= 2 && inputNumber <= 6 && inputNumber % 2 === 0) {
        const totalElements = inputNumber * inputNumber;
        console.log('Создаём ' + totalElements + ' элементов.');
    } else {
        inputElement.value = 4;
    }

    createBoard();
});
