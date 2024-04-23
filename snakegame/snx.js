//game constants and variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("bullet-hit-metal-84818.mp3");
const gameover = new Audio(" backgroundmusic.wav");
const musicsound = new Audio("game-over-.wav");
const movesound = new Audio("gotikhyi.wav");
let speed = 7;
let lastpainttime = 0;
let score=0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }

//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}
function isCollide(snake){
   for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
        return true;
    }
    
   }
   if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
    return true;
   }
}
function gameEngine() {
     //part1:updating the snake array and food
    if(isCollide(snakeArr)){
        gameover.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("game over press any key to play again");
        snakeArr = [
            { x: 13, y: 15 }
        ]
        musicsound.play();
        score=0;
    }
   //if snake have eaten the food then relocate food
   if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    foodsound.play();
    score+=1;
    
    if(score>highscoreVal){
        highscoreVal=score;
        localStorage.setItem("highscoreBox",JSON.stringify(highscoreVal));
        highscoreBox.innerHTML="HighScore: "+ highscoreVal;
    }
    scoreBox.innerHTML="Score:"+score;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
    let a=2;
    let b=16;
    food={x:Math.round(a+ (b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
   }
   //part1:updating the snake array and food
   
   //moving the snake
   for(let i=snakeArr.length - 2;i>=0;i--){
    
    snakeArr[i+1]={...snakeArr[i]};
   }
   snakeArr[0].x +=inputDir.x;
   snakeArr[0].y +=inputDir.y;
    //part 2:Display the snake and food
    //diplay snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index === 0) {
            snakeElement.classList.add("head")
        }
        else{
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //display food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}

let highscore=localStorage.getItem("highscoreBox");
if(highscore===null){
    highscoreVal=0;
    localStorage.setItem("highscoreBox",JSON.stringify(highscoreVal));
}
else{
    highscoreVal=JSON.parse(highscore);
    highscoreBox.innerHTML="HighScore : "+highscore;
}


//main logic start
window.requestAnimationFrame(main);
window.addEventListener("keydown",function(event)  {
    inputDir = { x: 0, y: 1 }
    musicsound.play();
    const Key=event.key;
    switch (Key) {
        case "ArrowUp":
            console.log("ArrowUP");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
             break;
    }
});
