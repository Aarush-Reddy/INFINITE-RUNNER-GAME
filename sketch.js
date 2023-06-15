var rocket, rocketImg;
var space, spaceImg;
var star, starImg, starGroup;
var asteroid, asteroidImg, asteroidGroup;
var score = 0;
var gamestate = "play";
var speed = 3;

function preload()
{
    spaceImg = loadImage("space.png");
    rocketImg = loadImage("rocket.png");
    starImg = loadImage("star.png");
    asteroidImg = loadImage("asteroid.png");
}

function setup() 
{
    createCanvas (500,700);

    space = createSprite(200,200, 500);
    space.addImage("space", spaceImg);
    space.velocityY = 3;

    rocket = createSprite(240,600,40,60);
    rocket.addImage("rocket", rocketImg);
    rocket.scale = 0.2;

    starGroup = new Group();
    asteroidGroup = new Group();
}

function draw() 
{
    background("black")

    if (gamestate == "play")
    {
        gamePlay();
    }

    else 
    {
        rocket.destroy();
        space.velocityY = 0;
        starGroup.destroyEach();
        asteroidGroup.destroyEach();
        space.destroy();

        textSize(30);
        text("Score: " + score, 150,350);
        text("Press spacebar to restart", 75, 475);

        if (keyCode == 32)
        {
            gamestate = "play";

            score = 0;
            speed = 3;

            space = createSprite(200,200);
            space.addImage("space", spaceImg);
            space.velocityY = speed;

            rocket = createSprite(240,600,40,60);
            rocket.addImage("rocket", rocketImg);
            rocket.scale = 0.2;
            
            gamePlay();
        }
        
    } 
    

    drawSprites();

    }
    
function spawnStars()
{
    star = createSprite(200,-50,30,30);
    star.addImage("star", starImg);
    star.velocityY = speed;
    star.scale = 0.04;
    star.x = Math.round(random(50,450));
    starGroup.add(star);
    star.lifetime = 280;
}

function spawnAsteroids()
{
    asteroid = createSprite(200,-50,100,100);
    asteroid.addImage("asteroid", asteroidImg);
    asteroid.velocityY = speed;
    asteroid.scale = 0.2;
    asteroid.x = Math.round(random(50,450));
    asteroidGroup.add(asteroid);
    asteroid.lifetime = 280;
}

function gamePlay()
{ 
    

    if (space.y>400)
    {
        space.y = space.y/2.5;
    }  
    
    if (keyDown(RIGHT_ARROW))
    {
        rocket.x += 5;
    }
    if (keyDown(LEFT_ARROW))
    {
        rocket.x -= 5;
    }
        
    if (frameCount % 100 == 0)
    {
        spawnStars();
    }
    
    if(starGroup.isTouching(rocket))
    {
        starGroup.destroyEach();
        score++;
        speed += 0.2;
        space.velocityY = speed;
    }
        
    if (frameCount % 80 == 0)
    {
        spawnAsteroids();
    }

    if (asteroidGroup.isTouching(rocket))
    {
        gamestate = "end";
    } 
    
    if (rocket.x > 465)
    {
        rocket.x = 465;
    }
    
    if (rocket.x < 35)
    {
        rocket.x = 35;
    } 
}