const score = document.querySelector('.score');                 
const start = document.querySelector('.start_sence'); 
const gameArea = document.querySelector('.gameArea');

start.addEventListener('click',start2);

let player = { speed : 5,score :0} ;
let keys = {ArrowUp : false, ArrowDown :false, ArrowLeft: false, Arrowright: false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    keys[e.key] = true;

}

function keyUp(e){
    keys[e.key] = false;
}

function iscollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}
function movelines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item) {
        if(item.y >=700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}
function endGame(){
    player.start2 = false;
    start.classList.remove('hide');
    start.innerHTML = "Game Over <br> Your final score is "+player.score + "  <br>Press here to restart the game";
}
function moveenemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item) {
        
        if(iscollide(car,item)){
            endGame();
        }

        if(item.y >=700){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}
function gamePlay(){
    let car= document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if(player.start2){
        movelines();
        moveenemy(car);
        if(keys.ArrowUp && player.y > 95) {player.y -= player.speed};
        if(keys.ArrowDown  && player.y < (road.bottom - 110)) {player.y += player.speed};
        if(keys.ArrowLeft && player.x > 0) {player.x -= player.speed};
        if(keys.ArrowRight && player.x < (road.width-69) ) {player.x += player.speed};

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
    window.requestAnimationFrame(gamePlay);
    player.score++;
    let ps = player.score - 1;
    score.innerHTML = "Score: "+ps;
    }
}

function start2(){
    start.classList.add('hide');
    gameArea.innerHTML = "";
    player.start2 = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    for(x=0; x<5; x++){
      let r_line = document.createElement('div');
      r_line.setAttribute('class','lines');
      r_line.y = (x*150);
      r_line.style.top = (x*150) + "px";
      gameArea.appendChild(r_line);
    }
    
    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        //you can use your car image as the enemy car image
        // enemyCar.style.backgroundImage = "";
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
      }
}