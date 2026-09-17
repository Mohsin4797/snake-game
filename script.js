let block=document.querySelector(".block")
const startBtn=document.querySelector(".start")
const startGame=document.querySelector(".startgame")
const model=document.querySelector(".model")    
const gameOver=document.querySelector(".gameover")
const score=document.querySelector("#Score")
const highscore=document.querySelector("#Highscore")
const time=document.querySelector("#Time")

let scoreValue=0
let highscoreValue=localStorage.getItem("highscore") || 0
highscore.textContent=highscoreValue
let timeValue='00:00'
time.textContent=timeValue
let minutes=0
let seconds=0



const boxHeight=50
const boxWidth=50

const rows=Math.floor(block.clientHeight/boxHeight)
const cols=Math.floor(block.clientWidth/boxWidth)

const blocks=[]
const snake=[{
    x: 1,y: 3
}
]
const food={
    mx: Math.floor(Math.random()*rows),
    my: Math.floor(Math.random()*cols)
}
let direction="right";
let intervalId=null;

// Making box
for(let row=0;row < rows;row++)
    for(let col=0;col < cols;col++){

    let box=document.createElement("div")
    box.classList.add("box")
    block.appendChild(box)
      blocks[`${row}-${col}`] = box;
    
    
}

// food section

function render() {
        let head =null
    if(direction=="left"){
        head={x: snake[0].x, y: snake[0].y -1}
    }
    else if(direction=="right"){{
        head={x: snake[0].x, y: snake[0].y +1}
    }}
    else if(direction=="up"){
        head={x: snake[0].x -1, y: snake[0].y}
    }
    else if(direction=="down"){
        head={x: snake[0].x +1, y: snake[0].y}
    }
    if(head.x==food.mx && head.y==food.my){

        blocks[ `${food.mx}-${food.my}`].classList.remove("white")

        food.mx=Math.floor(Math.random()*rows)
        food.my=Math.floor(Math.random()*cols)
        snake.unshift(head)
        scoreValue+=10;
        score.textContent=scoreValue;
        if(scoreValue>highscoreValue){
            highscoreValue=scoreValue
            localStorage.setItem("highscore",highscoreValue)
            highscore.textContent=highscoreValue
        }
       
    }

    if(snake[0].x<0 || snake[0].x>=rows || snake[0].y<0 || snake[0].y>=cols){
        model.style.display="block"
        startGame.style.display="none"
    gameOver.style.display="block"
    timeValue='00:00'
    time.textContent=timeValue
   
    clearInterval(timeInterval)
   
    clearInterval(intervalId)
};



    snake.forEach(element => {
            blocks[ `${element.x}-${element.y}`].classList.remove("red")
    });
    snake.unshift(head)
    snake.pop()
   snake.forEach(element => {
    blocks[ `${element.x}-${element.y}`].classList.add("red")
    blocks[ `${food.mx}-${food.my}`].classList.add("white")
}
);
}
render()
//Game start section
startBtn.addEventListener("click", () => {
    intervalId=setInterval(() => {
        render()
    }, 200);
    model.style.display="none"
   
   

    timeInterval=setInterval(() => {
        let [minutes, seconds] = timeValue.split(':').map(Number);
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
        }
        
       
        timeValue = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time.textContent = timeValue;
    }, 1000);
    
  
    
});

// Game over section
gameOver.addEventListener("click", () => {
       
     intervalId=setInterval(() => {
        
        render()
    }, 200);


      timeInterval=setInterval(() => {
        let [minutes, seconds] = timeValue.split(':').map(Number);
        seconds++;
        if(seconds == 60) {
            seconds = 0;
            minutes++;
        }
        
       
        timeValue = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time.textContent = timeValue;
    }, 1000);
  
    time.textContent = timeValue;
    model.style.display="none"
    scoreValue=0
    score.textContent=scoreValue;
    snake.length=0
   
    snake.push({x: 1, y: 3})
    direction="right"
    

 
}, 1000);
   

// Direction section
addEventListener("keydown", (e) => {
   if (e.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
}

else if (e.key === "ArrowRight" && direction !== "left") {
    direction = "right";
}

else if (e.key === "ArrowUp" && direction !== "down") {
    direction = "up";
}

else if (e.key === "ArrowDown" && direction !== "up") {
    direction = "down";
}

}

)


