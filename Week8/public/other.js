// opens and connect to socket
let socket = io();

//listen for confirmation
socket.on('connect', () => {
  console.log("client connected via sockets");
})

let hatButton = document.getElementById('hat-button');
let hat1 = document.getElementById('hat-1');
let hat2 = document.getElementById('hat-2');
let hat3 = document.getElementById('hat-3');
let hats = [hat1, hat2, hat3];
let hatCounter = 0;

socket.on('hatImgNum', (data) => {
    for (let i=0; i<hats.length; i++) {
        hats[i].style.display = "none";
    }
    hats[data].style.display = "inline";
})

let collarButton = document.getElementById('collar-button');
let collar1 = document.getElementById('collar-1');
let collar2 = document.getElementById('collar-2');
let collar3 = document.getElementById('collar-3');
let collars = [collar1, collar2, collar3];
let collarCounter = 0;

socket.on('collarImgNum', (data) => {
    for (let i=0; i<collars.length; i++) {
        collars[i].style.display = "none";
    }
    collars[data].style.display = "inline";
})

let bgButton = document.getElementById('bg-button');
let bg1 = document.getElementById('bg-1');
let bg2 = document.getElementById('bg-2');
let bg3 = document.getElementById('bg-3');
let bgs = [bg1, bg2, bg3];
let bgCounter = 0;

socket.on('bgImgNum', (data) => {
    for (let i=0; i<bgs.length; i++) {
        bgs[i].style.display = "none";
    }
    bgs[data].style.display = "inline";
})

let chatMessageArea = document.createElement('p');

socket.on('chatMessage', (data) => {
    console.log(data);
    let chatWindow = document.getElementById('chat-box-msgs');
    chatMessageArea.innerHTML = data.msg;
    chatWindow.appendChild(chatMessageArea);
})

window.addEventListener('load', () => {
    let submitButton = document.getElementById('send-button');
    
    submitButton.addEventListener('click', () => {
        chatMessageArea.innerHTML = '';
        let msg = document.getElementById('msg-input').value;
        console.log(msg);

        chatObject = {
            'msg': msg
        }
        socket.emit('chatMessage', chatObject);
        })

    hatButton.addEventListener('click', () => {
        hatNum = hatCounter % 3; 
        console.log(hatNum);
        socket.emit('hatImgNum', hatNum);
        hatCounter += 1;
    })

    collarButton.addEventListener('click', () => {
        collarNum = collarCounter % 3; 
        console.log(collarNum);
        socket.emit('collarImgNum', collarNum);
        collarCounter += 1;
    })

    bgButton.addEventListener('click', () => {
        bgNum = bgCounter % 3; 
        console.log(bgNum);
        socket.emit('bgImgNum', bgNum);
        bgCounter += 1;
    })

})