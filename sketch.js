var balloon, backgroundImage;
var balloonImage2,balloonImage3;


function preload(){
backgroundImage = loadImage("images/Hot Air Ballon-01.png");
balloonImage2 = loadAnimation("images/Hot Air Ballon-02.png");
//balloonImage3 = loadAnimation("imagesHot Air Ballon-03.png")



}
function setup() {
  database = firebase.database();
  createCanvas(1400,700);
  balloon = createSprite(200, 450, 50, 50);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  

  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value", readPosition,showError);
}

function draw() {
  background(backgroundImage);
  fill("black"); 
  text("Use arrow keys to move Hot Air Balloon",100,139);
  
  
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10
    //balloon.addAnimation("hotAirBalloon",balloonImage3);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10;
    updateHeight(0,-10);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10;
  }

  
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x':height.x + x ,
    'y':height.y + y  
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function readPosition(){
  position = database.ref();
  balloon.position.x = x;
  balloon.position.y = y;
}


function showError(){
  console.log("Error in writing to the database");
}

