const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startGameBtn = document.getElementById("startGameBtn");
const scoreElement = document.getElementById("score");

canvas.width = 400;
canvas.height = 400;

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 20;
let dy = 0;
let score = 0;
let gameLoop;

function clearCanvas() {
    ctx.fillStyle = "#ecf0f1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = "#27ae60";
        ctx.fillRect(part.x, part.y, 20, 20);
        ctx.strokeStyle = "#2c3e50";
        ctx.strokeRect(part.x, part.y, 20, 20);
    });
}

function drawFood() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x, food.y, 20, 20);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
    snake.forEach(part => {
        if (part.x === food.x && part.y === food.y) generateFood();
    });
}

function checkCollision() {
    const head = snake[0];

    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(part => part.x === head.x && part.y === head.y)
    ) {
        clearInterval(gameLoop);
        alert("Game Over! Your score was: " + score);
        resetGame();
    }
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = 20;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    startGame();
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (keyPressed === 37 && !goingRight) {
        dx = -20;
        dy = 0;
    } else if (keyPressed === 38 && !goingDown) {
        dx = 0;
        dy = -20;
    } else if (keyPressed === 39 && !goingLeft) {
        dx = 20;
        dy = 0;
    } else if (keyPressed === 40 && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

function game() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
}

function startGame() {
    generateFood();
    gameLoop = setInterval(game, 100);
}

startGameBtn.addEventListener("click", startGame);
document.addEventListener("keydown", changeDirection);
