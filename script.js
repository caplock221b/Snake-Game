const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.height *= 2;

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

for(let i=1; i<=12; i++){
    c.beginPath();
    c.moveTo(0, i * (canvas.height/12));
    c.lineTo(canvas.width, i * (canvas.height/12));
    c.lineWidth = 1;
    c.strokeStyle = '#c7ffde';
    c.stroke();

    c.beginPath();
    c.moveTo(i * (canvas.width/12), 0);
    c.lineTo(i * (canvas.width/12), canvas.height);
    c.lineWidth = 1;
    c.strokeStyle = '#c7ffde';
    c.stroke();
}

// Definition of one unit
let unit = canvas.width/12;

let xco = [];
let yco = [];

for(let i=0; i<12; i++){
    xco.push(i*unit);
    yco.push(i*unit);
}

let snake = [];
snake[0] = {x: xco[5], y: yco[0]};
snake[1] = {x: xco[6], y: yco[0]};

let food = {
    x: xco[randomIntFromRange(0, 11)],
    y: yco[randomIntFromRange(0, 11)]
}

let score = 0;
const divScore = document.getElementById('score');

let direction = 'left';
document.addEventListener('keydown', detectMovement);
function detectMovement(e){
    if(e.keyCode == 37 && direction!='right'){
        direction = 'left';
    }
    if(e.keyCode == 38 && direction!='down'){
        direction = 'up';
    }
    if(e.keyCode == 39 && direction!='left'){
        direction = 'right';
    }
    if(e.keyCode == 40 && direction!='up'){
        direction = 'down';
    }
}

let snakeX, snakeY;

function collision(head, array){
    for(let i=0; i<array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y)
            return true;
    }
    return false;
}

function draw(){
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=1; i<=12; i++){
        c.beginPath();
        c.moveTo(0, i * (canvas.height/12));
        c.lineTo(canvas.width, i * (canvas.height/12));
        c.lineWidth = 1;
        c.strokeStyle = '#c7ffde';
        c.stroke();
    
        c.beginPath();
        c.moveTo(i * (canvas.width/12), 0);
        c.lineTo(i * (canvas.width/12), canvas.height);
        c.lineWidth = 1;
        c.strokeStyle = '#c7ffde';
        c.stroke();
    }

    // Draw snake
    for(let i=0; i<snake.length; i++){
        c.beginPath();
        c.fillStyle = i == 0 ? '#7de2d1' : 'red';
        c.fillRect(snake[i].x, snake[i].y, unit, unit);
        c.strokeStyle = 'black';
        c.strokeRect(snake[i].x, snake[i].y, unit, unit);
        c.closePath();
    }

    // Draw food
    c.fillStyle = 'yellow';
    c.beginPath();
    c.arc(food.x+(unit/2), food.y+(unit/2), unit/4, 0, Math.PI*2, false);
    c.fill();
    c.closePath();

    // Old Head position
    snakeX = snake[0].x;
    snakeY = snake[0].y;
    
    // Determine the direction in which the snake travels
    if(direction == 'left')
        snakeX -= unit;
    if(direction == 'up')
        snakeY -= unit;
    if(direction == 'right')
        snakeX += unit;
    if(direction == 'down')
        snakeY += unit;
    
    // Snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++; // Increment score
        food = { // Generate new food
            x: xco[randomIntFromRange(0, 11)],
            y: yco[randomIntFromRange(0, 11)]
        }
    }
    else{
        snake.pop();
    }
        
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Game Over
    if(snakeX < 0 || snakeX > canvas.width-unit || snakeY < 0 || snakeY > canvas.height-unit || collision(newHead, snake)){
        clearInterval(game);
    }
    snake.unshift(newHead);
    
    divScore.innerHTML = `SCORE : ${score}`;
}
// Call draw function every 200 ms
let game = setInterval(draw, 200);