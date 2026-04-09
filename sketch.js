let xDirectionArray = [1, 0, -1, 0];
let yDirectionArray = [0, 1, 0, -1];
let directionIndex = 0;

let twopFont; // font style

let cX = [];
let cY = [];
//length
let len = 1;
let diameter = 10;

let highScore = 0;

let foodX;
let foodY;

let foodEaten; 
let song;

let gameEnd = false;

function preload() {
  // song = loadSound("SearchingforaBody.mp3.mp3")
  // foodEaten = loadSound("649726__duskbreaker__8bit-coin-collection-2.wav") 
  
  twopFont = loadFont("PressStart2P-Regular.ttf")

}

function setup() {
  noLoop();
  frameRate(10);
  cX[0] =35;
  cY[0] =15;
  createCanvas (400, 500);
  textFont(twopFont);
// buttons use HTML to use 2P font.
plotFood();
let startButton = createButton("start game");
startButton.mouseClicked(start);
startButton.size(120, 50);
startButton.position(10, 415);
startButton.style("font-family", "Press Start 2P");
startButton.style("font-size", "18px");

let upButtonElem = createButton("W");
upButtonElem.mouseClicked(upButton);
upButtonElem.size(40, 30);
upButtonElem.position(180, 415);
upButtonElem.style("font-family", "Press Start 2P");
upButtonElem.style("font-size", "14px");

let downButtonElem = createButton("S");
downButtonElem.mouseClicked(downButton);
downButtonElem.size(40, 30);
downButtonElem.position(180, 445);
downButtonElem.style("font-family", "Press Start 2P");
downButtonElem.style("font-size", "14px");

let leftButtonElem = createButton("A");
leftButtonElem.mouseClicked(leftButton);
leftButtonElem.size(40, 30);
leftButtonElem.position(140, 445);
leftButtonElem.style("font-family", "Press Start 2P");
leftButtonElem.style("font-size", "14px");

let rightButtonElem = createButton("D");
rightButtonElem.mouseClicked(rightButton);
rightButtonElem.size(40, 30);
rightButtonElem.position(220, 445);
rightButtonElem.style("font-family", "Press Start 2P");
rightButtonElem.style("font-size", "16px");
  
let restartButton = createButton("restart");
restartButton.mouseClicked(restart);
restartButton.size(90,45);
restartButton.position(290, 420);
restartButton.style("font-family", "Press Start 2P");
restartButton.style("font-size", "11px");

}

function start(){
  // userStartAudio(); //backup 
  loop(); //start draw
  // song.loop();
  // if (!song.isPlaying()){
  // song.loop(); // overlap prevention :) 
}

}

function keyPressed() {
  let k = key.toLowerCase();
   if ((keyCode === RIGHT_ARROW || k === 'd') && directionIndex != 2) directionIndex = 0;
    else if ((keyCode === LEFT_ARROW || k === 'a') && directionIndex != 0) directionIndex = 2;
    else if ((keyCode === UP_ARROW || k === 'w' )&& directionIndex != 1) directionIndex = 3;
    else if ((keyCode === DOWN_ARROW || k === 's' )&& directionIndex != 3) directionIndex = 1;
}
function rightButton() { if (directionIndex != 2) directionIndex = 0; }
function leftButton() { if (directionIndex != 0) directionIndex = 2; }
function upButton() { if (directionIndex != 1) directionIndex = 3; }
function downButton() { if (directionIndex != 3) directionIndex = 1; }
function plotFood() {
 
  let success = false;
  while (!success) {
    let attempts = 0; 
    while (!success && attempts < 1000){
      attempts++;  
    }
    foodX = round(random(5, 399));
    foodX -= foodX % 10;
    foodX += 5;
    foodY = round(random(5, 399));
    foodY -= foodY % 10;
    foodY += 5;
    for (let i = 0; i < len; i++) {
      if (cX[i] == foodX && cY[i] == foodY) {
        success = false;
        break;
      }
      if (i == len - 1) success = true;
    }
  }
}
function restart(){
 cX =[35];
 cY =[15];
 len = 1;
  directionIndex = 0;
  gameEnd = false;
   plotFood();
  // song.stop();
  // song.loop();
   loop();
}
function caterpillar() {

  if (cX[0] == foodX && cY[0] == foodY) {
    plotFood();
    len += 1;
    // foodEaten.play();
  }

  for (let i = len - 1; i > 0; i--) {
    cX[i] = cX[i - 1];
    cY[i] = cY[i - 1];
  }
   crossOver();

 fill("green");
  for (let i = 0; i < len; i++) { 
    circle(cX[i], cY[i], diameter);
  }
}

function crossOver() {
    cX[0] += xDirectionArray[directionIndex] * 10;
  cY[0] += yDirectionArray[directionIndex] * 10;
if (cX[0] < 5 || cX[0] > 395 || cY[0] < 5 || cY[0] > 395) {
    gameEnd = true;
    // song.stop();
  //hi score here
    if ((len-1) > highScore){
      highScore = (len- 1);
    }
    noLoop();
    return;
}
  if (cX[0] > 5 && cX[0] < 395 && cY[0] > 5 && cY[0] < 395 && len > 1) {
    for (let i = 1; i < len; i++) {
      if (cX[0] == cX[i] && cY[0] == cY[i]) {
        gameEnd = true;
        // song.stop(); 
        noLoop();
    }
   }
  }
}

function draw() {
  // text("", width / 2, height / 2 - 50);
  background("black");
  textAlign (LEFT,BASELINE);
  textFont(twopFont);
  if (!gameEnd) {
    caterpillar();
  }
  // caterpillar();
  fill("red");
  circle(foodX, foodY, 10);

  fill("rgb(233,233,126)");
  rect(0, 400, 400, 100);
  textSize(15);
  stroke("black");
  fill("black");
  text("score = " + (len - 1), 30, 499);
  text("Highscore =" + highScore, 200,499)
 
  if (gameEnd) {
    // len = 1
    textSize(34);
    fill("red");
    stroke("black");
    textAlign(CENTER, CENTER);
    text("GAME OVER!", width / 2, height / 2 - 50);
  }
}
