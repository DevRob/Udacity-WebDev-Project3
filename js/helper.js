function build_map(map) {
    /* Loop through the number of rows and columns we've defined above
    * and, using the rowImages array, draw the correct image for that
    * portion of the "grid"
    */
    for (row = 0; row < map.numRows; row++) {
        for (col = 0; col < map.numCols; col++) {
            /* The drawImage function of the canvas' context element
            * requires 3 parameters: the image to draw, the x coordinate
            * to start drawing and the y coordinate to start drawing.
            * We're using our Resources helpers to refer to our images
            * so that we get the benefits of caching these images, since
            * we're using them over and over.
            */
            ctx.drawImage(Resources.get(images[0][map.layout[row * map.numCols + col]]), col * pixOfGrid[0], row * pixOfGrid[1]);
        }
    }
}

function draw(actor){                              	 //Draw the actors on canvas placing them of the middle of tiles
    var x = pixOfGrid[0];                          	 //also calculate the offset if the actor is scaled.
        y = pixOfGrid[1];                          	 //pixOfGrid = [101, 83]
        p = [actor.position[0],actor.position[1]];
        s = actor.scale;
    offset = function(a, s) {
        if (s !== 1) {
            return (a - a * s) / 2 / s;
        }
        else {
            return 0;
        }
    };
    ctx.scale(actor.scale, actor.scale);
    ctx.drawImage(Resources.get(actor.sprite), p[0] * x / s + offset(x, s) , p[1] * y / s - y / 3  + 2 * offset(y, s));
    ctx.scale(1/actor.scale, 1/actor.scale);
}
