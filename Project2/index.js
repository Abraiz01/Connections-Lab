// defining max players that can be inside a game room at one time
const MAX_PLAYERS = 2;
let restartCount = 0;

//Initialize the express 'app' object
let express = require('express');
const { del } = require('express/lib/application');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let {instrument}  = require("@socket.io/admin-ui");

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
      }
});

instrument(io, {
    auth: false
});

// object to store the pairs of {gameRoomName : number of players}
let gameRooms = {};

// object to store the pairs of {playerName : id}
let players = {};

app.use('/', express.static('public'));

io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);

    //on disconnection
    socket.on('disconnect', () => {
        console.log('connection ended, ', socket.id);
        gameRooms[socket.gameRoomName]--; // decreasing player count in the gameRooms array when a person leaves
        delete players[socket.playerName]; // deleting the playerName from the players array
        socket.to(socket.gameRoomName).emit('playerLeft'); // emitting to the other player in the room to inform them that the player has left
        console.log(players);
        console.log(gameRooms);
    })

    //get user data containing name and room name of the player
    socket.on('playerData', (data) => {
        //save player name in an array
        socket.playerName = data.name;

        // adding the playerName : id pair to the players array
        players[socket.playerName] = socket.id;

        console.log(players);

        // limiting number of players in a game room to 2
        if(gameRooms[data.room]) { //is the room already there?
            if(gameRooms[data.room] < MAX_PLAYERS) {
                //let the socket join room of choice
                socket.gameRoomName = data.room; // we will add this data to the socket only after we can verify that there is space
                socket.join(socket.gameRoomName); // joining the game room
                gameRooms[socket.gameRoomName]++; // incrementing the number of players in the game room
                io.in(socket.gameRoomName).emit('clientCountGame', gameRooms[socket.gameRoomName]); // emitting client count to all players in the game room

            } else { // the room is full
                delete players[socket.playerName]; // do not add the playerName to the players array
                console.log(players);
                console.log(gameRooms);
                io.to(socket.id).emit('maxPlayersReached'); // tell the player they cant join since the room is full by emitting to just them
            }
        } else {
            socket.gameRoomName = data.room; // create a new room if it is not present already
            socket.join(socket.gameRoomName);  
            gameRooms[socket.gameRoomName] = 1;
            io.in(socket.gameRoomName).emit('clientCountGame', gameRooms[socket.gameRoomName]); // emitting clientCount = 1 to the player in the gameRoom
        }

        // emitting the name of player2 to the other player
        socket.to(socket.gameRoomName).emit("playerTwoName", data.name);

        console.log(gameRooms);
        
    })

    // emitting to the player in the game room when the other player has pressed the 'Quit' button
    socket.on('returnData', (data) => {
        io.in(socket.gameRoomName).emit('clientCountGame', gameRooms[socket.gameRoomName]);
        console.log(players);
        console.log(gameRooms);
    })

    // emitting to the other player that the first player is ready
    socket.on('restartClicked', () => {      
        socket.to(socket.gameRoomName).emit('restartServerData');
    })

    // emitting player1's position to the other player in the room so that they can move their player2 object accordingly
    socket.on('playerOnePosition', (data) => {
        socket.to(socket.gameRoomName).emit('playerTwoServer', data);
    })

    // emitting player1's enemy position to the other player in the room so that they can move their enemy2 object accordingly
    socket.on('enemyPosition', (data) => {
        socket.to(socket.gameRoomName).emit('enemyTwoServer', data);
    })

    // emitting player1's feather position to the other player in the room so that they can move their feather2 object accordingly
    socket.on('featherPosition', (data) => {
        socket.to(socket.gameRoomName).emit('featherServer', data);
    })

})
