let express = require('express');
let http = require('http');
let io = require('socket.io');

let app = express();
let server = http.createServer(app);
io = new io.Server(server);

app.use('/', express.static('public'));

app.use('/', express.static('public'));

io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);

    socket.on('disconnect', () => {
        console.log('socket has been disconnected: ', socket.id);
    })

    socket.on('chatMessage', (data) => {
        io.sockets.emit('chatMessage', data);
    })

    socket.on('hatImgNum', (data) => {
        console.log(data);
        io.sockets.emit('hatImgNum', data);
    })

    socket.on('collarImgNum', (data) => {
        console.log(data);
        io.sockets.emit('collarImgNum', data);
    })

    socket.on('bgImgNum', (data) => {
        console.log(data);
        io.sockets.emit('bgImgNum', data);
    })

})

server.listen(8900, () => {
  console.log("server is up and running")
})