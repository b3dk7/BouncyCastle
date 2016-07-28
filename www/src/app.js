


var game = new Phaser.Game(800, 450, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
//var Swipe = require('phaser-swipe');



/*

  //scaling options
    // set up input max pointers
  game.input.maxPointers = 1;
  // set up stage disable visibility change
  game.stage.disableVisibilityChange = true;
  // Set up the scaling method used by the ScaleManager
  // Valid values for scaleMode are:
  // * EXACT_FIT
  // * NO_SCALE
  // * SHOW_ALL
  // * RESIZE
  // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // If you wish to align your game in the middle of the page then you can
  // set this value to true. It will place a re-calculated margin-left
  // pixel value onto the canvas element which is updated on orientation /
  // resizing events. It doesn't care about any other DOM element that may
  // be on the page, it literally just sets the margin.
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  // Force the orientation in landscape or portrait.
  // * Set first to true to force landscape. 
  // * Set second to true to force portrait.
  game.scale.forceOrientation(true, false);
  // Sets the callback that will be called when the window resize event
  // occurs, or if set the parent container changes dimensions. Use this 
  // to handle responsive game layout options. Note that the callback will
  // only be called if the ScaleManager.scaleMode is set to RESIZE.
  game.scale.setResizeCallback(this.gameResized, this);
  // Set screen size automatically based on the scaleMode. This is only
  // needed if ScaleMode is not set to RESIZE.
  game.scale.updateLayout(true);
  // Re-calculate scale mode and update screen size. This only applies if
  // ScaleMode is not set to RESIZE.
  game.scale.refresh();

*/
function preload() {
  game.load.image('sky', 'asset/sky1.png');
  game.load.spritesheet('dude', 'asset/baddie.png', 32, 32);
  game.load.spritesheet('dude2', 'asset/baddie2.png', 32, 32);
  game.load.image('ground', 'asset/platform1.png');
}
var player;
var player2;
var players;
var cursors;
var platforms;
var keyW;
var keyA;
var keyS;
var keyS;
var playerUp = 80;
var playerDown = 300;
var playerLeft = -300;
var playerRight = 300;
var playerSpeed = 300;

function create(){
  //this.swipe = new Swipe(this.game, yourmodel);
  //this.swipe = new Swipe(this.game);
  //scaling options  SHOW_ALL or EXACT_FIT
  game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
  //have the game centered horizontally 
  game.scale.pageAlignHorizontally = true; 
  game.scale.pageAlignVertically = true;
  //screen size will be set automatically 
  game.scale.setScreenSize(true);
  
  // physice
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // background image
  game.add.sprite(0, 0, 'sky');

  
  // the platforms group
  platforms = game.add.group();
  // give objects physics
  platforms.enableBody = true;

  //platforms
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  
  
  players=game.add.group()

  player = game.add.sprite((game.world.width*0.6), 80, 'dude');
  player2 = game.add.sprite((game.world.width*0.5), 80, 'dude2');
  players.add(player2);
  players.add(player);
  
  game.physics.arcade.enable(players);
  player.body.bounce.y = player2.body.bounce.y = 1;
  player.body.bounce.x = player2.body.bounce.x = 0.5;
  player.body.gravity.y= player2.body.gravity.y = 350;

  
  //players.body.gravity.y = 350;
  
  
  //creating cursor instance
  cursors = game.input.keyboard.createCursorKeys();

  
  //our two animations walking left and right.
  player.animations.add('left', [0,1], 10, true);
  player.animations.add('right', [2,3], 10, true);
  player.animations.add('down', [4,5], 10, true);
  player.animations.add('up', [6], 10, true);
  

  //game.input.mouse.capture = true;
  game.input.onDown.add(doSomething);

    

  
}
function update() {


  //collisions  
  game.physics.arcade.collide(players, platforms);
  game.physics.arcade.collide(players);
  
  
  

  
}

function jump() {
    // Add a vertical velocity to the bird
    player.body.velocity.y = -300;
}


  function doSomething() {
    if(player.body.velocity.x>0){
      player.body.velocity.x = -300;
    }
    else
      player.body.velocity.x = 300;
    
    
  }