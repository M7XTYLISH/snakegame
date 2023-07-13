// Game Constants and Variables
const foodSound = new Audio('./music/food.mp3');   //player collide food sound
const gameOverSound = new Audio('./music/gameover.mp3');   //game over sound
const moveSound = new Audio('./music/move.mp3');   //player move sound
const musicSound = new Audio('./music/music.mp3');   //game music sound
let board = document.getElementById("board");
let scoreDisplay = document.getElementById("score");
let inputDir = { x: 0, y: 0 };
let speed = 1;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 12, y: 12 }];
let food = { x: 6, y: 7 };


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}
// Snake Collide
function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        };
    };
    // If you bump into the wall
    if (
        snake[0].x >= 18 ||
        snake[0].x <= 0 ||
        snake[0].y >= 18 ||
        snake[0].y <= 0
    ) {
        return true;
    };
};

// Game Engine
function gameEngine() {
    musicSound.play()
    //Part 1: Updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        speed = 1;
        alert("Game Over. Press any key to play again");
        score = 0;
        speedBox.innerHTML = "Current Speed: 1";
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
    };

    // If you have eaten the food , increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
        };

        // 5s speed increment 0.3
        setTimeout(() => {
            speed += 0.5;
            console.log(speed);
            speedBox.innerHTML = "Current Speed: " + speed;
        }, 3000);

        scoreDisplay.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y,
        });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random()),
        };
    };

    // Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    };

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        };
        board.appendChild(snakeElement);
    });

    // Display the Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main Logic Starts Here
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
};

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }; // Start the Game
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            // console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "w":
            // console.log("arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "s":
            // console.log("arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "a":
            // console.log("arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "d":
            // console.log("arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    };
});
