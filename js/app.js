game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    game.player.handleInput(allowedKeys[e.keyCode]);
});

var scoreScreen = {                  //Draw the lives remaining, score and level on canvas
    render : function() {
        ctx.font = "20px Verdana";
        ctx.fillText("Score: " + game.player.score,0,30);
        ctx.fillText("Lives: " + game.player.lives,300,30);
        ctx.fillText("Level: " + (game.level),150,30);
    }
};
