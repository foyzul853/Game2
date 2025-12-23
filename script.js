const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;
let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
let food = {};
let score = 0;
let gameInterval;

function randomPosition() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return {x, y};
}

function placeFood() {
    food = randomPosition();
}

function draw() {
    // Clear canvas
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = "#ffe066";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = "#ff6f61";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function moveSnake() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Wrap around edges
    if (head.x >= canvasSize) head.x = 0;
    if (head.x < 0) head.x = canvasSize - gridSize;
    if (head.y >= canvasSize) head.y = 0;
    if (head.y < 0) head.y = canvasSize - gridSize;

    // Check collision with self
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            clearInterval(gameInterval);
            alert(`Game Over! Final Score: ${score}`);
            return;
        }
    }

    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        placeFood();
    } else {
        snake.pop();
    }
}

function gameLoop() {
    moveSnake();
    draw();
}

document.addEventListener("keydown", e => {
    switch(e.key) {
        case "ArrowUp": if(direction.y === 0){direction = {x:0, y:-gridSize}} break;
        case "ArrowDown": if(direction.y === 0){direction = {x:0, y:gridSize}} break;
        case "ArrowLeft": if(direction.x === 0){direction = {x:-gridSize, y:0}} break;
        case "ArrowRight": if(direction.x === 0){direction = {x:gridSize, y:0}} break;
    }
});

function restartGame() {
    clearInterval(gameInterval);
    snake = [{x: 200, y: 200}];
    direction = {x: 0, y: 0};
    score = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    placeFood();
    gameInterval = setInterval(gameLoop, 100);
}

// Start game
placeFood();
gameInterval = setInterval(gameLoop, 100);
document.getElementById("restart").addEventListener("click", restartGame);
