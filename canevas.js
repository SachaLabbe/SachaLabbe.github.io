

//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;
Graphics = PIXI.Graphics,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

//Create a Pixi Application
let app = new Application({
        width: 1250,
        height: 750,
        antialiasing: true,
        transparent: false,
        resolution: 1
    }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add("Images/1.jpg")
    .add("Images/2.jpg")
    .add("Images/3.jpg")
    .add("Images/4.png")
    .add("Images/noir.png")
    .load(setup);

//Define any variables that are used in more than one function
var cat, cat1, cat2, cat3, state;


function setup() {
    //Create the `cat` sprite
    cat = new Sprite(resources["Images/1.jpg"].texture);
    cat.height=100;
    cat.width=100;
    cat.y = 96;
    cat.vx = 0;
    cat.vy = 0;
    app.stage.addChild(cat);

    cat1 = new Sprite(resources["Images/2.jpg"].texture);
    cat1.height=100;
    cat1.width=100;
    cat1.y = 460;
    cat1.x = 860;
    cat1.vx = 0;
    cat1.vy = 0;
    app.stage.addChild(cat1);

    cat2 = new Sprite(resources["Images/3.jpg"].texture);
    cat2.height=50;
    cat2.width=50;
    cat2.y = 660;
    cat2.x = 660;
    cat2.vx = 0;
    cat2.vy = 0;
    app.stage.addChild(cat2);

    cat3 = new Sprite(resources["Images/4.png"].texture);
    cat3.height=60;
    cat3.width=60;
    cat3.y = 460;
    cat3.x = 760;
    cat3.vx = 0;
    cat3.vy = 0;
    app.stage.addChild(cat3);



    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cat.vx = -8;
        cat.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Up
    up.press = () => {
        cat.vy = -8;
        cat.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };

    //Right
    right.press = () => {
        cat.vx = 8;
        cat.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Down
    down.press = () => {
        cat.vy = 8;
        cat.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };

    //Create the text sprite
    let style = new TextStyle({
        fontFamily: "sans-serif",
        fontSize: 28,
        fill: "white",
    });
    message = new Text("Survivez", style);
    message.position.set(8, 8);
    app.stage.addChild(message);

    //Set the game state
    state = play;

    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));



}

function gameLoop(delta){

    //Update the current game state:
    state(delta);

    if(cat.x>cat1.x){
        cat1.vx=1
    }
    else if(cat.x<cat1.x){
        cat1.vx=-1
    }
    else if(cat.x=cat1.x){
        cat1.vx=0
    }

    if(cat.y>cat1.y){
        cat1.vy=1
    }
    else if(cat.y<cat1.y){
        cat1.vy=-1
    }
    else if(cat.y=cat1.y){
        cat1.vy=0
    }



    if(cat.x>cat2.x){
        cat2.vx=2
    }
    else if(cat.x<cat2.x){
        cat2.vx=-2
    }
    else if(cat.x=cat2.x){
        cat2.vx=0
    }

    if(cat.y>cat2.y){
        cat2.vy=1
    }
    else if(cat.y<cat2.y){
        cat2.vy=-1
    }
    else if(cat.y=cat2.y){
        cat2.vy=0
    }



    if(cat.x>cat3.x){
        cat3.vx=1
    }
    else if(cat.x<cat3.x){
        cat3.vx=-1
    }
    else if(cat.x=cat3.x){
        cat3.vx=0
    }

    if(cat.y>cat3.y){
        cat3.vy=2
    }
    else if(cat.y<cat3.y){
        cat3.vy=-2
    }
    else if(cat.y=cat3.y){
        cat3.vy=0
    }
}

function play(delta) {

    //Use the cat's velocity to make it move


    //check for a collision between the cat and the box
    if (hitTestRectangle(cat, cat1)||hitTestRectangle(cat, cat2)||hitTestRectangle(cat, cat3)) {

        //if there's a collision, change the message text
        //and tint the box red
        message.text = "Tu es mort...";
    } else {
        cat.x += cat.vx;
        cat.y += cat.vy;
        cat1.x += cat1.vx;
        cat1.y += cat1.vy;
        cat2.x += cat2.vx;
        cat2.y += cat2.vy;
        cat3.x += cat3.vx;
        cat3.y += cat3.vy;
        //if there's no collision, reset the message
        //text and the box's color

        message.text = "Survivez!";
    }
}

//The `keyboard` helper function
function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}
function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};

