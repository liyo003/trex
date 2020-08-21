var trex;
var PLAY=1;
var END=0;
var gameState=PLAY;
var count=0;
var gameOver,restart;

function preload(){
  treximage=loadAnimation("trex1.png","trex3.png","trex4.png");
     groundimage=loadImage("ground2.png")
      cloudimage=loadImage("cloud.png")
  obstacle1image=loadImage("obstacle1.png")
  obstacle2image=loadImage("obstacle2.png")
  obstacle3image=loadImage("obstacle3.png")
  obstacle4image=loadImage("obstacle4.png")
  obstacle5image=loadImage("obstacle5.png")
  obstacle6image=loadImage("obstacle6.png")
   gameOverimage=loadImage("gameOver.png")
    restartimage=loadImage("restart.png")
  trexc=loadAnimation("trex_collided.png")
  
}

function setup() {
  createCanvas(600, 200);
 trex=createSprite(100,180,30,30)
  trex.addAnimation("abc",treximage)
  trex.scale=0.4
  trex.addAnimation("collide",trexc)
  ground=createSprite(300,185,600,20)
  ground.velocityX=-5;
  ground.x=ground.width/2;
  ground.addImage("ground",groundimage)
  invisibleground=createSprite(300,190,600,5)
 invisibleground.visible=false;
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
  gameOver=createSprite(300,130);
  gameOver.addImage(gameOverimage)
  gameOver.visible=false;
  gameOver.scale=0.5;

  restart=createSprite(300,100);
  restart.addImage(restartimage)
  restart.visible=false;
  restart.scale=0.5;
  
}

function draw() {
  background("white");
  text("score "+count,500,50)
 if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 168.7){
      trex.velocityY = -12 ;
      
      
    }
  console.log(trex.y)
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnclouds();
  
    //spawn obstacles
    spawnobstacles();
    
    //End the game when trex is touching the obstacle
    if(obstacleGroup.isTouching(trex)){
      gameState = END;
     
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collide",trexc);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleground);
  
drawSprites();
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("abc",treximage)
  
  count = 0;
  
}
function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,100,40,10);
    cloud.y = random(50,100);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloudGroup.add(cloud)
    
     //assign lifetime to the variable
    cloud.lifetime = 205;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnobstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX = -6;
   obstacleGroup.add(obstacle)
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1image);
        break;
        case 2:obstacle.addImage(obstacle2image);
        break;
        case 3:obstacle.addImage(obstacle3image);
        break;
        case 4:obstacle.addImage(obstacle4image);
        break;
        case 5:obstacle.addImage(obstacle5image);
        break;
        case 6:obstacle.addImage(obstacle6image);
        break;
        default:break;
    }
console.log(rand)    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 205;
    
  }
}
