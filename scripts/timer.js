
let totalTime = 60;
let intervalId;


function startTimer(updateStats) {
    clearInterval(intervalId);
    updateStats();
    intervalId = setInterval(() => {
        totalTime--;
        updateStats();
        if (totalTime <= 0) {
            clearInterval(intervalId);
            alert("Время вышло! Игра окончена");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
}

export { totalTime, startTimer, stopTimer };
