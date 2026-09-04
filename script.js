let block=document.querySelector(".block")
const startBtn=document.querySelector(".start")
const startGame=document.querySelector(".startgame")
const model=document.querySelector(".model")    
const gameOver=document.querySelector(".gameover")
const score=document.querySelector(".Score")






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


for(let row=0;row < rows;row++)
    for(let col=0;col < cols;col++){

    let box=document.createElement("div")
    box.classList.add("box")
    block.appendChild(box)
    // blocks.push(block)
      blocks[`${row}-${col}`] = box;
    box.textContent=`${row}-${col}`
    
}

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
       
    }

    if(snake[0].x<0 || snake[0].x>=rows || snake[0].y<0 || snake[0].y>=cols){
        model.style.display="block"
        startGame.style.display="none"
    gameOver.style.display="block"
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

startBtn.addEventListener("click", () => {
    intervalId=setInterval(() => {
        render()
    }, 200);
    model.style.display="none"
})

gameOver.addEventListener("click", () => {
     intervalId=setInterval(() => {
        render()
    }, 200);
    model.style.display="none"
    snake.length=0
    snake.push({x: 1, y: 3})
    direction="right"

})

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


