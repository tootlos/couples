export function generateConfetti(num) {
    // Массив цветов для конфетти
    const colors = ['d13447', 'ffbf00', '263672']; 

    // Пустой массив для готовых конфетти
    const confettiArray = []; // 

    // Цикл, который повторяет действия num раз
    for (let i = 0; i < num; i++) { 

        // Метод createElement создает HTML-элемент, 
        // тег которого указывается строкой аргументом, 
        // а ссылка на готовый элемент сохраняется в переменную confetti
        const confetti = document.createElement('div'); 

        // Заполняем около-рандомные стили для элемента конфетти
        confetti.style.position = 'absolute';
        confetti.style.width = `${Math.random() * 20}px`;
        confetti.style.height = `${Math.random() * 10}px`;
        confetti.style.backgroundColor = `#${colors[Math.floor(Math.random() * colors.length)]}`;
        confetti.style.top = '-10%';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.opacity = `${Math.random() + 0.1}`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `moveDown ease-in-out ${((Math.random() + 0.2) * 10)}s infinite`;

        // Вставляем готовый элемент конфетти в массив
        confettiArray.push(confetti); 
    }
    // Возвращаем готовый массив конфетти.
    return confettiArray; 
}