var Actor = function(sprite) {      //Parent of all actors: Enemy, Player, Collectable.
    this.position = [];             //position, existence, image, scale properties
    this.sprite = sprite;
    this.exist = true;
    this.scale = 1;
}

Actor.prototype.render = function() {   //render method for actors if they are exists
        if (this.exist === true){       //calls the draw function which places the actor
            draw(this)}                 //on the canvas, positioned in the middle of
}                                       //tile and deals width scaled actors.

Enemy.prototype = Object.create(Actor.prototype);

function Enemy(sprite) {                		//Enemy constructor function. Inherit basic
    Actor.call(this, sprite);           		//properties from Actor and create a random speed
    this.speed = (                      		//property on call so all enemies has different speed.
    Math.floor(Math.random() * 30) + 5) / 10;
}

Enemy.prototype.update = function update(dt) {  	//moves enemy across the map and re-spawns it
        this.position[0] += this.speed *dt;     	//when it reaches the end of the map
        if (this.position[0] > 6){
            this.position[0] = -1;};
}

Collectable.prototype = Object.create(Actor.prototype);

function Collectable(sprite) {          //Collectable constructor. Inherit basic
    Actor.call(this, sprite);           //properties from Actor and overwrites scale property.
    this.scale = 0.35;
}

Player.prototype = Object.create(Actor.prototype);

function Player(sprite) {               //Collectable constructor. Inherit basic
    Actor.call(this, sprite);           //properties and adds lives, score and step
    this.lives = 3;
    this.score = 0;
    this.step = [0, 0];
}

Player.prototype.update = function() {
    newPos = [this.position[0] + this.step[0], this.position[1] + this.step[1]];    //update player position after checking the boundaries
    if (game.map.layout[newPos[1] * game.map.numCols + newPos[0]] !== "w") {        //checking for not allowed tiles on map, water in this case
        if (newPos[0] >= 0 && newPos[0] < game.map.numCols){                        //checking for map boundaries (left-right)
            this.position[0] = newPos[0];
        }
        if (newPos[1] >= 0 && newPos[1] < game.map.numRows){                        //checking for map boundaries (top-bottom)
            this.position[1] = newPos[1];
        }
    }
    this.step = [0, 0];
}

Player.prototype.handleInput = function(key) {      //player handle input for moving the player around.
    if(key === 'left')
        this.step[0] = -1;
    if(key === 'up')
        this.step[1] = -1;
    if(key === 'right')
        this.step[0] = 1;
    if(key === 'down')
        this.step[1] = 1;
}

Player.prototype.reset = function(map) {        //reset player start position.
    this.position = [2, map.numRows - 1];
}

var images = [                                  //image Array to sort images
        //mapBlocks:[0]
        {'s' : 'images/stone-block.png',
         'w' : 'images/water-block.png',
         'g' : 'images/grass-block.png'},
        //gems:[1]
        ['images/Gem_Blue.png',
         'images/Gem_Green.png',
         'images/Gem_Orange.png'],
        //enemie:[2]
        ['images/enemy-bug.png'],
        //player:[3]
        ['images/char-boy.png',
         'images/char-pink-girl.png'],
        //key:[4]
        ['images/Key.png'],
        //selector:[5]
        ['images/Selector.png'],
]

var mapLayouts = [                              //holds the maps in an Array
    ['w', 'w', 'g', 'w', 'w',                   //'s' stone
     's', 's', 's', 's', 's',                   //'w' water
     's', 's', 's', 's', 's',                   //'g' grass
     's', 's', 's', 's', 's',
     'g', 'g', 'g', 'g', 'g',                   //this Array is expandable or reducible.
     'g', 'g', 'g', 'g', 'g'],                  //This program written in a way that it can handle changes in this Array
                                                //Simply add or delete a SubArray from mapLayouts Array to change the
     ['w', 'w', 'g', 'w', 'w',                  //number of levels or change the letters which represent the tiles.
      's', 's', 's', 's', 's',
      's', 's', 'w', 'w', 'w',
      's', 's', 's', 's', 's',
      's', 'w', 'w', 's', 's',
      's', 's', 's', 's', 's',
      'g', 'g', 'g', 'g', 'g'],

     ['g', 'w', 'g', 'w', 'g',
      's', 's', 's', 'w', 'w',
      's', 's', 's', 's', 's',
      's', 's', 'w', 'w', 'w',
      's', 's', 's', 's', 's',
      's', 's', 's', 's', 's',
      'w', 'w', 'w', 'g', 'g',
      'g', 'g', 'g', 'g', 'g'],

     ['g', 'w', 'g', 'w', 'g',
      's', 's', 's', 's', 's',
      'w', 'w', 's', 's', 's',
      's', 's', 's', 's', 's',
      's', 's', 's', 's', 's',
      's', 's', 'w', 'w', 'w',
      's', 's', 's', 's', 's',
      's', 's', 's', 's', 's',
      'g', 'g', 'g', 'g', 'g'],

     ['w', 'w', 'w', 'w', 'w',
      'w', 'g', 'g', 'g', 'w',
      'w', 'g', 's', 'g', 'w',
      'w', 'g', 'g', 'g', 'w',
      'w', 'w', 'g', 'w', 'w',
      'w', 'w', 'g', 'w', 'w']

];

var Maps = function(layout, col, gem) {         	//Constructor function of map.
    this.layout = layout;				//Need 3 arguments: layout(Array that hold the representation of the map)
    this.numCols = col;                         	//col: number of column on the map
    this.numRows = this.layout.length / col;    	//gem: number of gems(collectables) on the map
    this.startPosition = [2, this.numRows - 1];
    this.gems = gem;
};

var allMaps  = [];
for (var mapID = allMaps.length; mapID < mapLayouts.length; mapID++) {  //Generates the allMaps object which contains all the maps
        map = new Maps(mapLayouts[mapID], 5, mapID + 1);
        this.allMaps.push(map);
};

Maps.prototype.freeLane = function(map) {       //Checking for rows on the map which built up only from stones
    freeLanes = [];                             //this function determine where the enemy can spawn.
    var flag = 0;
    for (row = 0; row < map.numRows; row++) {
        if (map.layout[row * map.numCols] == 's') {
            for (col = 0; col < map.numCols; col++) {
                if (map.layout[row * map.numCols] != map.layout[row * map.numCols + col]) {
                    flag = 1
                }
            }
            if (flag == 0) {
                freeLanes.push(row)
            }
            flag = 0
        }
    }
    return freeLanes
}

Maps.prototype.freePlace = function(map) {      	//Checking for position of the stone tiles
    var tiles = [];                             	//where the collectables can spawn.
    for (row = 0; row < map.numRows; row++) {
        for (col = 0; col < map.numCols; col++) {
            if (map.layout[row * map.numCols + col] == 's') {
                 tiles.push([col, row]);
            }
        }
    }
    return tiles;
}