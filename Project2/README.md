# Connections-Project2
Project-2 using Node, Express, and socket.io

Glitch link: https://quaint-delirious-mockingbird.glitch.me

## Description:

“Chase”, an online multiplayer game, is really the first project in which I implemented both front-end (HTML CSS and JavaScript), and back-end web development using Node, Express, and socket io. The idea of the game is simple: collect ten “feathers” as soon as possible without running out of lives. The game ends when either a player runs out of lives, or a player collects ten feathers and wins. The character “Faiza the Falcon”, NYUAD’s very own mascot, is controlled by the player using the arrow keys, while an enemy (that resembles a scary bat) follows Faiza at all times. Each player has their own enemy bat that always follows them and in case the bat manages to collide with the player, they lose one life. Each player has a total of three lives to play with. 

## Inspiration:

When I was thinking about what to make for my project, at first I only had the rules of the game in my mind. I originally wanted to implement a simpler version of this game in a smaller, weekly homework assignment but when I started to go about making it, I realized it was a bit more complicated than I thought it would be, so I decided to work on it for my midterm project instead. 

Since we had to implement rooms / namespaces in socket.io for our project, I thought about making an open world game in which each player would have their own bird which they would control. First, the players would enter a lobby which would look like a treehouse. There, they would meet other members of their party, each with their own unique bird with the username displayed at the bottom. Players would be able to chat with their lobby members. The lobby would support a maximum of 5 people at a time. From the lobby, the players could enter a ‘game room’ where they would play the “Chase” game. Only 2 people would be able to play at a time, so the rest could join in as spectators and switch once a game finished. Or I even thought about implementing a tournament of 5 people who would play Chase against each other and the leaderboard would be displayed in the treehouse lobby. Moreover, players could play / change the lobby’s music, they could have their own little “pet” character which would follow them wherever they went (using the same ‘following’ attribute of the enemy character in Chase). They could customize their bird character, pet, or even the treehouse. 

All of these ideas seemed very good, but given the time constraints that I had for my project and given that it was my first time using socket.io on an extensive level, I decided to implement only the game Chase for now, where players would join a ‘game room’ and play against each other. However, I plan on implementing the above features and making the application into an open-world experience, where players could do much more than only play the game “Chase”.

## Workflow:

The following is the ordered workflow of the socket.io implementation for the players:

_Player1 (player the user is controlling):_

1. Player moves their character (purple bird) using arrow keys, the x and y positions change accordingly
2. Player emits their position info to the server.
3. Socket.on in server
4. Server emits back to just the other player in their room (not back to the player themselves)
5. Socket.on for the other player, the position information is used to update the position of the player2 object (brown bird) accordingly.

Feather count, lives and other information is sent and received in a similar fashion and the above is a general idea on how the workflow goes about. Other attributs like `clientCount` were emitted to all users in the room from the server. `clientCount` was used to identify if two players had joined the game room in order to start the game:

_Client count to Start the Game:_

1. Player connects to the game room
2. Client side emits a message to server 
3. Socket.on in server 
4. Server emits the number of players in the room to all players in the game room using io.in(roomName).emit.
5. Socket.on for all users, if there is one player, they wait, if there are two, the game begins.

## Features:

Below are the features that my game currently has. For more features that I plan to implement, refer to the [Next Steps / Ideas](#next-steps--more-ideas) section.



* Entering a username and a room name to join a unique room. 
* Limiting the number of players to 2 for each game room.
* Starting the game only when **<span style="text-decoration:underline;">both</span>** players have joined the room.
* Displaying the player's own movement as well as real-time movements for the other player’s character, their enemy, and their feathers.
* Displaying real-time score for both players showing both the number of feathers collected and the number of lives remaining.
* Separating the character colors so that purple is always reserved for the user’s own bird, while brown is used to display the other player. Each player would have a purple bird on the screen which they would control, but the other person would see a brown bird in place of the other player’s character. The same idea is implemented for the feathers.
* Displaying “You won” or “You lost” on each player’s screen after the game has ended depending on the game’s result.
* Implementing a ‘Quit’ button which would return the player to the game’s home screen. A message saying “Player 2 has left the game” is displayed on the other player’s screen in real-time as soon as the other player leaves.
* Implementing a “Play Again” button to restart the game once **<span style="text-decoration:underline;">both players</span>** have clicked on their respective “Play Again” buttons. When one player presses the button, a message is displayed to the other player saying that their partner is ready to play again and waiting for you to press the Play Again button. The game is restarted once both players have pressed their respective buttons.

## Peer Feedback:

User testing can never be underestimated! I got a lot of valuable feedback from my peers that I incorporated into my application:



* At first, the game was more of a collaboration between two players than being a competitive experience. Originally, the rules were that the two players would have to make their enemies collide with each in order to win / advance to the next level, without colliding with their enemy or themselves. 
    * The feedback that I received was that the game would be more fun if it was made competitive instead. Hence, I introduced the idea of “collecting 10 feathers first” to win.
* Another peer suggested that I have a set of instructions displayed at the beginning in order to make the user more familiar with the rules of the game since they were not obvious. So I decided to add simple instructions to the homepage of my website before the user joined the game room.
* One peer suggested that the speed of the player’s character was slow compared to the enemies, so this made the game more difficult than it had to be. So, I decided to increase the speed and test the game further until I was satisfied with the movement of the character in relation to the enemy so that it was neither too hard nor too difficult to avoid the enemies. I could also later add a “difficulty” setting where the user could select the game difficulty and the speeds of the characters would be adjusted accordingly.

## Key Challenges / Things I Learnt:

The following are some of the challenges that I faced while making the game. Bugs were very frequent, and it seemed that a new one always appeared right after one was fixed. Nevertheless, however frustrating this phase was, I learnt quite a lot and I am glad it all worked out to a great extent at the end.



* I learnt that in order to only emit to a specific room I had to use `socket.to(room)` instead of `socket.broadcast.emit`, since the latter would emit to all other players another game rooms as well.
* Would learn and make use of the Bootstrap library next time in order to ease the process of designing  the webpage and to save time.
* Repositioning the p5 canvas on the webpage was not very simple. At first I tried to embed the canvas inside a container and then reposition it, but that did not work. So I had to revert to using p5’s own positioning system where I have to specify the `x` and `y` values in pixels which would position the top-left corner of the canvas accordingly.
* Emitting / receiving requests inside the draw function made the game lag quite a bit after a very short time. This would make the game unplayable after about a minute or so. To avoid this, I had to make use of `display()` functions for each of the classes and define conditions whenever I wanted to emit to the server or receive something from it, so that data is only emitted / received to and from the server when it has to be, instead of calling emit and on directly inside the draw function. For example, the following was used inside the draw function to emit the feather position of a new feather everytime it was created:
```js
   if (frameCount % 300 == 0) {
       for (let i=0; i<this.featherList.length; i++) {
           this.featherList = this.arrayRemove(this.featherList, this.featherList[i]);
       }
       newFeather = new Feather(this.randomInt(20, 780), this.randomInt(20,780), 20, 40, 40, 1, false);
       this.featherList.push(newFeather);
       socket.emit('featherPosition', newFeather.featherPosition);
   }
```
* When a user tried to join a full room, he wasn’t added to the room count but his name was added to the users list. - I solved this by deleting the user from the list when max players were reached.
* Used the Piskel app to make a bunch of illustrations (all are contained inside the images subfolder in the public folder). It did take a bit of time but I got exactly what I wanted in the right dimensions as well.
* The refresh and back buttons caused some bugs in the game, so I decided to implement my own buttons “Quit” and “Play Again” in order to avoid those bugs. The application could later be developed into a non-browser one so that back and refresh aren’t used.
* I had to work in pixels for designing the game room. Since p5 works in pixels, I could not resize the canvas when the window width or height is changed otherwise the p5 dimensions would get all mixed up. So I decided to make the p5 game window a fixed dimension of `(1024, 700)` and fixed the canvas along with all other elements in the game room so that they would not move in case the window was resized. The game was meant to be a desktop application anyway with a fixed game screen window.
```js
  let canvas = createCanvas(1024, 700);
  canvas.position(50, 30, 'fixed');
```
* P5 makes it a bit difficult to load images inside classes, so I had to `preload()` images into variables outside the classes and feed them into the attributes of the respective objects in order to load them. 
```js
   function preload() {
     playerImg = loadImage('/images/faiza.png');
}
```
* Implementing two players was probably the trickiest part for me, since I decided to make one Player class and implement both players from it. I made two separate objects for both players from the `Player` class: `player` and `player2`. `player` was always used to represent the current player controlling their own character on their screen while `player2` was used to replicate the movements of the other player. The way this worked was that whenever `player` emitted something to the other player in the room, like their position, lives, feathers collected etc, the other player on their end mapped that information to the `player2` object. However, using a single `Player` class in this way to implement both players made everything much simpler and smoother at the end since I did not have to worry about making a separate `Player2` class and updating its object separately everytime.

## Next Steps / More Ideas:

I had a lot of fun ideas while I was in the development stage of my game, and I decided to document them as I progressed through making the game so that I wouldn’t lose them. I have listed them below:



* Add music to the main page and the game to make the experience more engaging. I would also definitely add sounds on hovering over buttons.
* Since my game consisted of “pixelated” characters, I thought what better font would I find than Minecraft’s very own pixelated font for my game.
* Could also go on to make the game a bit more challenging by adding the rule that each player would have to avoid **<span style="text-decoration:underline;">both</span>** enemies instead of just their own. The rest of the rules would remain the same.
* I wish to add a chatting feature on the side of the game room so that players can communicate with each other as they play through games. 
* Would maybe look into adding usernames to the bottom of each player’s character. This Would become more relevant when I decide to implement the ‘Lobby’ idea as mentioned in the [Inspiration](#Inspiration) section.
* Could also implement different levels, or make a separate game in which players would have to collaborate in order to progress through the levels (as mentioned in the first point in the “Peer Feedback” section). The game would become more difficult as the players progressed.
* Could also add a parallax background to the game, so that whenever the player’s character moved, the background would move along with them as well. This would only happen for the player’s own character on their respective screens, instead of both characters on the same screen.
* I believe it would be helpful if I added a small time break when both players join the game and then start the game so that they have some time to get ready as the game starts.
* Add the ability to “spectate” a particular game in a room.
* For more ideas on how I plan to make the game into more of an open world experience, and the new features that application would have in that case, please refer to the [Inspiration](#Inspiration) section of the documentation.

## References:

* Minecraft font: [https://www.fontspace.com/category/minecraft](https://www.fontspace.com/category/minecraft)
* Piskel App - for drawing pixelated images: [https://www.piskelapp.com/](https://www.piskelapp.com/)
* P5 Reference: [https://p5js.org/reference/](https://p5js.org/reference/)
* Random Number JavaScript: [https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript](https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript)
* Remove Elements from Array GeeksForGeeks: [https://www.geeksforgeeks.org/remove-elements-from-a-javascript-array/](https://www.geeksforgeeks.org/remove-elements-from-a-javascript-array/)
* MDN Flexbox: [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container)
* W3 Schools for CSS: [https://www.w3schools.com/css/](https://www.w3schools.com/css/css_align.asp)
