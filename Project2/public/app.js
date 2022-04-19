// opens and connect to socket
let socket = io();

// declaring variables for use throughout the app.js file

let newFeather, clientCount;

// scores for both players
let score1 = document.getElementById('player1-score');
let score2 = document.getElementById('player2-score');

// lives for both players
let lives1 = document.getElementById('player1-lives');
let lives2 = document.getElementById('player2-lives');

let restartButton = document.getElementById('restart-button');
let height = window.innerHeight;
let width = window.innerWidth;

// listen for confirmation
socket.on('connect', () => {
    console.log("client connected to the game");

    // now that client has connected to server, emit name and room name
    let playerData = {
        'name' : sessionStorage.getItem('name'),
        'room' : sessionStorage.getItem('room')
    }
    socket.emit('playerData', playerData);
})

// listening for information from the server through various socket.on calls

// listening for player2's name
socket.on('playerTwoName', (data) => {
    console.log(data);
})

// checking if player2 has left the game room
socket.on('playerLeft',() => {
    // clientCount--;
    game.playerLeft = true;
})

// checking number of players inside the game room
socket.on('clientCountGame',(data) => {
    clientCount = data;

    // when number of players reaches 2, the game is started
    if (clientCount == 2) {
        game.ready = true;
    }
})

// listening if player2 has clicked the 'Play Again' button
socket.on('restartServerData',() => {
    game.player2.restart = true;

    // restart the game if both players are ready
    if(game.player.restart && game.player2.restart) {
        game.player.restart = false;
        game.player2.restart = false;
        window.location = '/game.html';
    }
})

// checking if game room has 2 players (full) and alerting the new player if this is the case
socket.on('maxPlayersReached',() => {
    alert('This room is full.');
    window.location = '/index.html';
})


window.addEventListener('load', () => {
    
    // defining the 'Quit' button
    let lobbyButton = document.getElementById('back-to-lobby-button');
    lobbyButton.addEventListener('click', () => {
        let playerData = {
            'name' : sessionStorage.getItem('name'),
            'room' : sessionStorage.getItem('room')
        }
        // emitting to the server in case the user has hit the quit button
        socket.emit('returnData', playerData);
        window.location = '/index.html';
    })
    
    // displaying the number of feathers collected for each player
    score1.innerHTML = ": " + game.player.featherCount;
    score2.innerHTML = ": " + game.player2.featherCount;

    // displaying number of lives of each player
    lives1.innerHTML = ": " + game.player.lives;
    lives2.innerHTML = ": " + game.player2.lives;

})

// P5 code

// declaring image variables to be used inside the Creature class' display() function
let img, img2;

// preloading all images that are to be used in the p5 canvas
function preload() {
  playerImg = loadImage('/images/faiza.png');
  playerFlip = loadImage('/images/faiza-flip.png');
  player2Img = loadImage('/images/faiza2.png');
  player2Flip = loadImage('/images/faiza2-flip.png');
  over_bg = loadImage('/images/gameover_background.png');
  enemyImg = loadImage('/images/enemy.png');
  enemyImg2 = loadImage('/images/enemy-flip.png');
  bgImg = loadImage('/images/background1.png');
  featherImg = loadImage('/images/feather.png');
  feather2Img = loadImage('/images/feather2.png');

  minecraftFont = loadFont('/fonts/minecraft-regular.otf'); // preloading the minecraft font
}

// Creating a Creature class which stores all the basic attributes, including the creature's position, radius, initial x and y velocities, and image attributes. 
// Each 'creature' will inherit certain attributes from this class and its display function where necessary.
class Creature {
    constructor(x, y, r, img_w, img_h, num_frames) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.dir = 1;
        this.img_w = img_w;
        this.img_h = img_h;
        this.num_frames = num_frames;
        this.frame = 0;
    }

    // This function displays the image of each creature and inverts it according to the creature's direction of motion. It calls the update function of that specific creature.
    display() {
        this.update();

        if (this.dir == 1) {
            image(img, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
        }    
        else if (this.dir == 0) {
            image(img2, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
        }
    }
  }

// Creating a class for both players (Faiza the Falcon) which inherits most of its attributes from the Creature class
class Player extends Creature {
    constructor(x, y, r, img_w, img_h, num_frames, tx, ty, isPlayer2) {
        super(x, y, r, img_w, img_h, num_frames);
        // An object called self.keyhandler will monitor the player's movement using arrow keys
        this.key_handler = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        // Object that contains the player's x and y position, velocities, and key_handler which will be emitted to
        // the server which will in-turn send it to the other player which will use it to display the player2 object
        this.playerPosition = {
            x: this.x,
            y: this.y,
            vx: this.vx,
            vy: this.vy,
            key_handler: this.key_handler
        }
        // checking if the object is player2 (to be used in the display() function of the Player class)
        this.isPlayer2 = isPlayer2;
        this.username;
        this.lives = 3;
        this.featherCount = 0;
        this.winner;
        this.restart = false;
    }

    update() {

        // Animating faiza by continuously iterating over each frame in it's sprite.
        if ((frameCount % 5) == 0 && (this.vx != 0 || this.vy != 0)) {
            if (this.dir == 1) {
                this.frame = (this.frame + 1) % (this.num_frames - 1);
            }
            else if (this.dir == 0) {
                this.frame = ((this.frame) % (this.num_frames - 1)) + 1;
            }
        }
            
        else if (this.vx == 0 && this.vy == 0) {
            if (this.dir == 1) {
                this.frame = 8;
            }
            else if (this.dir == 0) {
                this.frame = 0;
            }
        }
            
        // The following conditions restrict the player's movement out of the canvas dimensions

        // The condition below is for when Faiza moves left
        if (this.key_handler.left == true) {
            this.vx = -2;
            this.dir = 0;
            if (this.x - this.r + this.vx < 6) {
                this.vx = 0
            } 
            this.x += this.vx;
            this.playerPosition.x += this.vx;
        }
        // The condition below is for when Faiza moves right
        else if (this.key_handler.right == true) {
            this.vx = 2;
            this.dir = 1;
            if (this.x + this.r + this.vx > 1018) {
                this.vx = 0
            } 
            this.x += this.vx;
            this.playerPosition.x += this.vx;
        }
        // If none of the left and right keys are being pressed, Faiza stops moving horizontally
        else {
            this.vx = 0;
        }
        // The condition below is for when Faiza moves upwards
        if (this.key_handler.up == true) {
            this.vy = -2;
            if (this.y - this.r + this.vy <= 5) {
                this.vy = 0
            }
            this.y += this.vy;
            this.playerPosition.y += this.vy;
        }
        // The condition below is for when Faiza moves downwards
        else if (this.key_handler.down == true) {
            this.vy = 2;
            if (this.y + this.r + this.vy >= 694) {
                this.vy = 0 
            }
            this.y += this.vy;
            this.playerPosition.y += this.vy;
        }
        // If none of the up and down keys are being pressed, Faiza stops moving vertically
        else {
            this.vy = 0;
        }

    }

    // The following method checks for the distance between faiza and any other object
    // This is used multiple times above to check for a collision
    distance(target) {
        return Math.pow(Math.pow(this.x - target.x, 2) + Math.pow(this.y - target.y, 2), 0.5);
    }

    // defining a display() method that would be called inside the draw function in order to display Faiza
    display() {
        this.update();

        // purple bird is displayed if its player1
        if (this.isPlayer2 == false) {
            if (this.dir == 1) {
                image(playerImg, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
            } 
            // flipping direction when faiza moves left   
            else if (this.dir == 0) {
                image(playerFlip, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
            }
        }
        // brown bird is displayed if its player2
        else if (this.isPlayer2) {
            if (this.dir == 1) {
                image(player2Img, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
            }    
            // flipping direction when faiza moves left
            else if (this.dir == 0) {
                image(player2Flip, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
            }
        }
    }

}

// Creating the enemy class, which continuously follows Faiza wherever she goes. 
class Enemy extends Creature {
    constructor(x, y, r, img_w, img_h, num_frames, tx, ty, tr) {
        super(x, y, r, img_w, img_h, num_frames);

        // Here we make a 'dummy' object which is precisely mapped to Faiza's circle. It has it's separate keystroke functions which perfectly imitate 
        // Faiza's movements. This makes our task easier since everything is now handled within the Enemy class. The 'dummy' object has of course, been
        // made invisible so that it seems the enemy is always following Faiza. tx, ty, and tr represent the position and radius of the 'dummy' object respectively.
        this.tx = tx;
        this.ty = ty;
        this.tr = tr;

        // We now make separate arrtibutes of vx, vy, dir, dummyPosition and key_handler for the 'dummy'. All of them exactly imitate Faiza.
        // There is also a self.v function for setting the velocity of the enemy.
        this.vx = 0;
        this.vy = 0;
        this.v = 1.7;
        this.dir = 1;
        this.key_handler = {
            left: false,
            right: false,
            up: false,
            down: false
        };
        this.dummyPosition = {
            tx: this.tx,
            ty: this.ty,
            vx: this.vx,
            vy: this.vy,
            key_handler: this.key_handler
        }; 

    }

    update() {
        // Animating the enemy by continuously iterating over each frame in it's sprite.
        if (frameCount % 6 == 0) {
            if (this.dir == 1) {
                this.frame = (this.frame + 1) % (this.num_frames - 1);
            }
            else if (this.dir == 0) {
                this.frame = ((this.frame) % (this.num_frames - 1)) + 1;
            }
        }
            
        // All of the upcoming key handling conditions have been copied from the Player's class in order to match the dummy's movements with the player.
        if (this.key_handler.left == true) {
            this.vx = -2;
            this.dir = 0;
            if (this.tx - this.tr + this.vx < 6) {
                this.vx = 0
            } 
            this.tx += this.vx;
            this.dummyPosition.tx += this.vx;
        }
        else if (this.key_handler.right == true) {
            this.vx = 2;
            this.dir = 1;
            if (this.tx + this.tr + this.vx > 1018) {
                this.vx = 0
            } 
            this.tx += this.vx;
            this.dummyPosition.tx += this.vx;
        }
        else {
            this.vx = 0;
        }
        if (this.key_handler.up == true) {
            this.vy = -2;
            if (this.ty - this.tr + this.vy <= 5) {
                this.vy = 0
            }
            this.ty += this.vy;
            this.dummyPosition.ty += this.vy;
        }
        else if (this.key_handler.down == true) {
            this.vy = 2;
            if (this.ty + this.tr + this.vy >= 762) {
                this.vy = 0 
            }
            this.ty += this.vy;
            this.dummyPosition.ty += this.vy;
        }
        else {
            this.vy = 0;
        }


        // We now calculate dx and dy for the difference in x and y positions between Enemy and the 'dummy' respectively,
        // then we calculate angle between them, and increment x and y by v*cos(angle) and v*sin(angle) respectively,
        // the angle changes continuously as Faiza (and the dummy) move, hence, the enemy continously follows Faiza.

        this.dy = this.ty - this.y
        this.dx = this.tx - this.x

        // to avoid zero division error in self.angle:
        if (this.dx == 0 && this.dy > 0) {
        this.angle = radians(90);
        }
        
        else if (this.dx == 0 && this.dy < 0) {
        this.angle = radians(270);
        }
        
        else {
        this.angle = Math.atan((this.dy)/(this.dx));
        }

        
        // using the fact that cos(-x) = cos(x) and sin(-x) = -sin(x):
        if (this.dx == 0 && this.dy > 0) {
        this.dir = 1;
        this.x += this.v * Math.cos(this.angle)
        this.y += this.v * Math.sin(this.angle)
        }

        if (this.dx == 0 && this.dy < 0){
        this.dir = 1;
        this.x += this.v * Math.cos(this.angle)
        this.y += this.v * Math.sin(this.angle)
        }

        if (this.dx > 0 && this.dy == 0) {
        this.dir = 1;
        this.x += this.v * Math.cos(this.angle)
        this.y += this.v * Math.sin(this.angle)
        }

        if (this.dx < 0 && this.dy == 0) {
        this.dir = 0;
        this.x -= this.v * Math.cos(this.angle)
        this.y += this.v * Math.sin(this.angle)
        }

        if (this.dx > 0 && this.dy > 0) {
        this.dir = 1;
        this.x += this.v * Math.cos(this.angle)
        this.y += this.v * Math.sin(this.angle)
        }

        if (this.dx < 0 && this.dy < 0) {
        this.dir = 0;
        this.x -= this.v * Math.cos(this.angle)
        this.y -= this.v * Math.sin(this.angle)
        }

        if (this.dx < 0 && this.dy > 0) {
        this.dir = 0;
        this.x -= this.v * Math.cos(this.angle)
        this.y -= this.v * Math.sin(this.angle)
        }

        if (this.dx > 0 &&  this.dy < 0) {
        this.dir = 1;
        this.x += this.v * Math.cos(this.angle)
        this.y += this.v * Math.sin(this.angle)
        }
    }

    // defining the distance method for calculating the distance between Anxiety and the dummy 
    distance() {
        return Math.pow(Math.pow(this.x - this.tx, 2) + Math.pow(this.y - this.ty, 2), 0.5);
    }
    
    // display function for the enemy which displays it's sprite
    display() {
        this.update();

        if (this.dir == 1) {
            image(enemyImg, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
        } 
        // flipping the image when the enemy moves leftwards   
        else if (this.dir == 0) {
            image(enemyImg2, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2), this.img_w, this.img_h, this.frame * this.img_w, 0, this.img_w, this.img_h);
        }
    }
}

// defining the Feather class which displays the feather objects randomly in the playing area
class Feather extends Creature {
    constructor(x, y, r, img_w, img_h, num_frames, isfeather2) {
        super(x, y, r, img_w, img_h, num_frames);
        this.featherPosition = {
            x: this.x,
            y:this.y
        }
        // checking if the feather object is for player2 (brown feather)
        this.isfeather2 = isfeather2;
    }

    // display function for the feather's image
    display() {

        // purple feather
        if (this.isfeather2 == false) {
            image(featherImg, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2));
        }
        // brown feather
        else if (this.isfeather2) {
            image(feather2Img, this.x - floor(this.img_w/2), this.y - floor(this.img_h/2));
        }
    }
}

// defining the Game class, which will be used to control the game's overall working
class Game {
    constructor() {
        // set to true when player connects to the game room
        this.ready = false;
        // set to true when the player leaves the game room
        this.playerLeft = false;
        // set to true when either a player runs out of lives or collects 10 feathers
        this.gameOver = false;
        this.winFeathers = 10;
        this.player = new Player(300, 300, 20, 66, 66, 9, 300, 300, false);
        this.player.username = sessionStorage.getItem('name');
        this.player2 = new Player(300, 300, 20, 66, 66, 9, 300, 300, true); 
        this.enemy = new Enemy(700, 700, 20, 66, 66, 6, 300, 300, this.player.r)      
        this.enemy2 = new Enemy(700, 700, 20, 66, 66, 6, 300, 300, this.player2.r) 

        // arrays for storing feather objects, one for purple feathers for player1, and one for brown feathers for player2
        this.featherList = [];
        this.featherList2 = [];
    }

    update() {

        // checking collision of enemy with the invisible dummy object which imitates faiza
        if (this.enemy.distance() <= this.enemy.r + this.enemy.tr) {

            // repositioning faiza and its enemy
            this.player.x = 300;
            this.player.y = 300;

            this.enemy.x = 700;
            this.enemy.y = 700;
            this.enemy.tx = 300;
            this.enemy.ty = 300;

            // decrementing lives of the player
            this.player.lives --;
            lives1.innerHTML = ": " + this.player.lives;
            console.log('player',this.player.lives);
            console.log('player2',this.player2.lives);
        }

        // doing the same as above for enemy2 and player2
        if (this.enemy2.distance() <= this.enemy2.r + this.enemy2.tr) {

            this.player2.x = 300;
            this.player2.y = 300;

            this.enemy2.x = 700;
            this.enemy2.y = 700;
            this.enemy2.tx = 300;
            this.enemy2.ty = 300;

            this.player2.lives --;
            lives2.innerHTML = ": " + this.player2.lives;
            console.log('player lives',this.player.lives);
            console.log('player2 lives',this.player2.lives);
        }

        // removing and creating new feathers in random places at regular intervals
        if (frameCount % 300 == 0) {
            for (let i=0; i<this.featherList.length; i++) {
                this.featherList = this.arrayRemove(this.featherList, this.featherList[i]);
            }
            newFeather = new Feather(this.randomInt(20, 780), this.randomInt(20,780), 20, 40, 40, 1, false);
            this.featherList.push(newFeather);
            // emitting the new feather's position to the server 
            socket.emit('featherPosition', newFeather.featherPosition);
        }

        // checking collision of player1 with the purple feather
        for (let i=0; i<this.featherList.length; i++) {
            if (this.player.distance(this.featherList[i]) <= this.player.r + this.featherList[i].r) {
                this.player.featherCount ++;
                score1.innerHTML = ": " + this.player.featherCount;
                console.log('player feathers',this.player.featherCount);
                for (let j=0; j<this.featherList.length; j++) {
                    this.featherList = this.arrayRemove(this.featherList, this.featherList[j]);
                }
            }
        }

        // checking collision of player2 with the brown feather
        for (let j=0; j<this.featherList2.length; j++) {
            if (this.player2.distance(this.featherList2[j]) <= this.player2.r + this.featherList2[j].r) {
                this.player2.featherCount ++;
                score2.innerHTML = ": " + this.player2.featherCount;
                console.log('player2 feathers',this.player2.featherCount);
                for (let i=0; i<this.featherList2.length; i++) {
                    this.featherList2 = this.arrayRemove(this.featherList2, this.featherList2[i]);
                }
            }
        }

        // checking if either player has collected the required amount of feathers to win
        if (this.player.featherCount == this.winFeathers || this.player2.featherCount == this.winFeathers) {
            this.gameOver = true;
            if (this.player.featherCount == this.winFeathers) {
                this.player.winner = "You won!";
                this.player2.winner = "You lost";
            }
            else {
                this.player.winner = "You lost";
                this.player2.winner = "You won!";
            }
        }
        // checking if either player has run out of lives and displaying messages accordingly
        if (this.player.lives == 0 || this.player2.lives == 0) {
            this.gameOver = true;
            if (this.player.lives == 0) {
                this.player.winner = "You lost";
                this.player2.winner = "You won!";
            }
            if (this.player2.lives == 0) {
                this.player.winner = "You won!";
                this.player2.winner = "You lost";
            }
        }

    }

    display() {
        this.update();

        // displaying players, enemies, and feathers if both players are ready and the game is not over
        if (this.ready == true && this.gameOver == false) {
            this.player.display();
            this.player2.display();
            this.enemy.display();
            this.enemy2.display();
            for (let i=0; i<this.featherList.length; i++) {
                this.featherList[i].display();
            }
            for (let j=0; j<this.featherList2.length; j++) {
                this.featherList2[j].display();
            }
        }

        // checking if the game is over and displaying the 'game over' screen on the canvas
        if (this.gameOver) {
            image(over_bg, 0, 0)
            textSize(150);
            textFont(minecraftFont);
            fill(255, 0, 0);
            text("GAME", 300, 220);
            text("OVER", 300,350);
            textSize(75);
            text(this.player.winner, 330, 550);
            // displaying the 'Play Again' button
            restartButton.style.display = "inline";

            // displaying message to the current player if he is ready to play again but the other player isn't
            if (this.player.restart == true && this.player2.restart == false) {
                textSize(15);
                textFont(minecraftFont);
                fill(0, 255, 0);
                text("Waiting for other player to restart...", 360, 600);
            }

            // displaying message to the current player if the other player is ready to play again
            if (this.player.restart == false && this.player2.restart == true) {
                textSize(15);
                textFont(minecraftFont);
                fill(0, 255, 0);
                text("Player 2 is ready, click Play Again for another game!", 315, 600);
            }
        }

        // informing the current player if the other player has left the game
        if (this.playerLeft) {
            textSize(15);
            textFont(minecraftFont);
            fill(162, 67, 206);
            text("Player 2 has left the game", 400, 650);
        }

        // letting the player know that they are waiting for another player to join before the game starts
        // when there is only one player inside the room
        if (clientCount == 1 && this.gameOver == false) {
            textSize(30);
            textFont(minecraftFont);
            fill(199, 202, 9);
            text("Waiting for Player2 to join...", 50, 100);
        }
    }

    // function to remove a particular value from an array. Adopted from GeeksForGeeks
    // used to remove all feathers from the feathers array 
    arrayRemove(arr, value) {
        return arr.filter(function(geeks){
            return geeks != value;
        });
    }

    // funtion to generate a random integer between two numbers
    randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

// creating a game object
game = new Game();


function setup() {

    // creating a canvas variable to store the p5 canvas and positioning its top left corner on the screen
    let canvas = createCanvas(1024, 700);
    canvas.position(50, 30, 'fixed');

    // player2 and enemy2 position data received from the server is used here to make the 
    // brown bird (player2) and enemy2 move
    socket.on('playerTwoServer', (data) => {
        game.player2.key_handler.left = data.key_handler.left;
        game.player2.key_handler.right = data.key_handler.right;
        game.player2.key_handler.up = data.key_handler.up;
        game.player2.key_handler.down = data.key_handler.down;

        game.enemy2.key_handler.left = data.key_handler.left;
        game.enemy2.key_handler.right = data.key_handler.right;
        game.enemy2.key_handler.up = data.key_handler.up;
        game.enemy2.key_handler.down = data.key_handler.down;

    })

    // listening to data from the server indicating that a new feather for player2 has been generated and 
    // the brown feather is displayed on the screen accordingly
    socket.on('featherServer', (data) => {
        // emptying the feathers array so that the brown feather(s) are cleared from the screen
        for (let j=0; j<game.featherList2.length; j++) {
            game.featherList2 = game.arrayRemove(game.featherList2, game.featherList2[j]);
        }
        // generating a new feather object at a random position and pushing it to the array
        feather2 = new Feather(data.x, data.y, 20, 40, 40, 1, true);
        game.featherList2.push(feather2);
    })

}
  
function draw() {
    clear();
    game.display();

    // emitting player1's position only when keys are pressed in order to avoid lag
    if (keyIsDown) {
        socket.emit('playerOnePosition', game.player.playerPosition);
    }

}

// Defining keyPressed and keyReleased for the Player class and the 'dummies' in the Enemy class:
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        game.player.key_handler.left = true;  
        game.enemy.key_handler.left = true;
  } else if (keyCode === RIGHT_ARROW) {
        game.player.key_handler.right = true; 
        game.enemy.key_handler.right = true; 
  }
    else if (keyCode === UP_ARROW) {
        game.player.key_handler.up = true;
        game.enemy.key_handler.up = true; 
  }
    else if (keyCode === DOWN_ARROW) {
        game.player.key_handler.down = true;
        game.enemy.key_handler.down = true; 
  }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        game.player.key_handler.left = false;
        game.enemy.key_handler.left = false;
  } else if (keyCode === RIGHT_ARROW) {
        game.player.key_handler.right = false;
        game.enemy.key_handler.right = false;
  }
    else if (keyCode === UP_ARROW) {
        game.player.key_handler.up = false;
        game.enemy.key_handler.up = false;
  }
    else if (keyCode === DOWN_ARROW) {
        game.player.key_handler.down = false;
        game.enemy.key_handler.down = false;
  }
}

// event listener for the restart button
restartButton.addEventListener('click', () => {
    game.gameOver = false;
    game.player.restart = true;
    // telling the server that the player has clicked 'Play Again'
    socket.emit('restartClicked');
    // restarting in case the other player has already pressed the 'Play Again' button
    if(game.player.restart && game.player2.restart) {
        game.player.restart = false;
        game.player2.restart = false;
        window.location = '/game.html';
    }
})


