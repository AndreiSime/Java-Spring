/*
This function is use to resize the screen by width/ height when we init the game (and when we rezize the screen).
 */
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var windowRatio = windowWidth / windowHeight;
    var gameRatio= game.config.width / game.config.height;

    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
var game;
var gameWidth=0,gameHeight=0;
window.onload = function(){
    checkRatio();
    var gameConfig = {
        type: Phaser.AUTO,
        width: gameWidth,//target
        height: gameHeight,//target
        scene: {
            preload: preload,
            create: create,
            update:update
        }
    };
    game = new Phaser.Game(gameConfig);
    resize();
    window.addEventListener("resize", resize, false);

    //document.querySelector("canvas").onclick = function(){launchFullscreen(document.documentElement)};
}
/*
Before we can use the assets we load them here.
 */
function preload(){
    if(game.config.width==1920){
        this.load.image('back','Background.png');
    }
    else if(game.config.width==1680){
        this.load.image('back2','Background2.png');
    }
    else{
        this.load.image('back3','Background3.png');
    }
    this.load.atlas('megaset', 'TextureAtlas.png', 'TextureAtlas.json');
}
var wheelNumbersContainer;
var wheelNumbersGroup;
var wheelColor='0x42aaf4';
/*
Here we draw everything.
 */
function create(){
    if(game.config.width==1920){
        var b=this.add.sprite(0,0,'back').setOrigin(0);
        b.setTint(0x4555F1);

        var atlasTexture = this.textures.get('megaset');
        var frames = atlasTexture.getFrameNames();

        var buttonCancel=this.add.sprite(122,1038,'megaset',"Button.png");
        buttonCancel.setTint(0xf858f5);
        buttonCancel.setInteractive();

        buttonCancel.on('pointerdown',function(){
            this.setFrame("ButtonApasat.png");
        });
        buttonCancel.on('pointerup',function(){
            this.setFrame("Button.png");
        });
    }
    else if(game.config.width==1680){
       var b=this.add.image(0,0,'back2').setOrigin(0);
        b.setTint(0xff0000);
    }
    else{
       b=this.add.image(0,0,'back3').setOrigin(0);
        b.setTint(0x00ff00);
    }

    //wheel Representation------------------------------------------------------------------------
    var wheelCoordinates={'x':game.config.width/2,'y':250};

    var rings=this.add.image(wheelCoordinates.x,wheelCoordinates.y,'megaset',"WheelInele.png");//add rings
    rings.setTint(wheelColor);

    wheelNumbersContainer = this.add.container(wheelCoordinates.x,wheelCoordinates.y);//initialization of container
    wheelNumbersGroup = this.add.group({ key: 'megaset',frame:'WheelPocket.png', frameQuantity: 37});//initialization if group - 37 x pockets

    //place pockets in a circle
    var circle = new Phaser.Geom.Circle(0, 0, 90);
    Phaser.Actions.PlaceOnCircle(wheelNumbersGroup.getChildren(), circle);

    //variables
    var wheelNumbersCounter=0;
    var wheelAngle=0;
    wheelNumbersGroup.children.iterate(function (child) {
        //colors for the wheel
        if(wheelNumbersCounter==7)
            child.setTint(wheelColor);
        if(wheelNumbersCounter<7) {
            if (wheelNumbersCounter % 2 == 0)
                child.setTint(0xff0000);
            else
                child.setTint(0x000000);
        }
        else if(wheelNumbersCounter>7)
            if (wheelNumbersCounter % 2 == 1)
                child.setTint(0xff0000);
            else
                child.setTint(0x000000);
        wheelNumbersCounter++;

        //wheel pockets angle
        child.angle+=90+wheelAngle; //starting pocket is in right side of the wheel
        wheelAngle+=9.73;// 360/37
        wheelNumbersContainer.add(child);//add all pockets form the group in container
    });

    var inele=this.add.image(0,0,'megaset',"WheelNumbers.png");
    inele.rotation+=0.02;//fix the rings placement
    wheelNumbersContainer.add(inele);
}
function update(){
    wheelNumbersContainer.rotation+=0.04; //rotate the container
}
/*
This function checks what's the best resolution for this screen.
 */
function checkRatio(){
    var resolution1=1920/1080;
    var resolution2=1680/1050;
    var resolution3=1280/1024;
    var windowRatio = window.innerWidth / window.innerHeight;

    if(windowRatio >= resolution1){
        gameWidth=1920;
        gameHeight=1080;
    }
    else if(windowRatio >= resolution2){
        gameWidth=1680;
        gameHeight=1050;
    }
    else{
        gameWidth=1280;
        gameHeight=1024;
    }
}

function launchFullscreen(element) {
    if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

