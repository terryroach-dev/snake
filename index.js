const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score-value');
const highScoreDisplay = document.getElementById('high-score-value');
const startBtn = document.getElementById('start-btn');

let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let score = 0;
let highScore = localStorage.getItem("highscore");
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
    for(let i = 0; i < 100; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        squares.push(square);
        grid.appendChild(square);
    }
}
createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    squares[32].classList.remove('game-over');
    squares[32].textContent = "";
    squares[33].classList.remove('game-over');
    squares[33].textContent = "";
    squares[34].classList.remove('game-over');
    squares[34].textContent = "";
    squares[35].classList.remove('game-over');
    squares[35].textContent = "";
    squares[54].classList.remove('game-over');
    squares[54].textContent = "";
    squares[55].classList.remove('game-over');
    squares[55].textContent = "";
    squares[56].classList.remove('game-over');
    squares[56].textContent = "";
    squares[57].classList.remove('game-over');
    squares[57].textContent = "";
    clearInterval(timerId);
    currentSnake = [2,1,0];
    score = 0;
    scoreDisplay.textContent = score;
    highScoreDisplay.textContent = localStorage.getItem("highscore");
    direction = 1;
    intervalTime = 1000;
    generateApples();
    timerId = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
}

function move() {
    if((currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] + width > 100 && direction === width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    )    
        return gameOver();
    


    if(highScore !== null) {
        if(score > highScore) {
            localStorage.setItem("highscore", score);
            highScoreDisplay.textContent = localStorage.getItem("highscore");
        }
    } else {
        localStorage.setItem("highscore", score);
        highScoreDisplay.textContent = localStorage.getItem("highscore");
    }
    const tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[appleIndex].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        generateApples();
        score++;
        scoreDisplay.textContent = score
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while(squares[appleIndex].classList.contains('snake'));   
    squares[appleIndex].classList.add('apple');
}
generateApples();

function gameOver() {
    clearInterval(timerId);
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    squares[32].classList.add('game-over');
    squares[32].textContent = "G";
    squares[33].classList.add('game-over');
    squares[33].textContent = "A";
    squares[34].classList.add('game-over');
    squares[34].textContent = "M";
    squares[35].classList.add('game-over');
    squares[35].textContent = "E";
    squares[54].classList.add('game-over');
    squares[54].textContent = "O";
    squares[55].classList.add('game-over');
    squares[55].textContent = "V";
    squares[56].classList.add('game-over');
    squares[56].textContent = "E";
    squares[57].classList.add('game-over');
    squares[57].textContent = "R";
}

function control(e) {
    if(e.keyCode === 39) {
        direction = 1;
    } else if(e.keyCode === 38) {
        direction = -width;
    } else if(e.keyCode === 37) {
        direction = -1;
    } else if(e.keyCode === 40) {
        direction = width;
    }
}

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);