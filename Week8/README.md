# Connections-Week8
Homework for Week#8 using Node, Express, and socket.io

Glitch link: https://better-iridescent-thunbergia.glitch.me

## Inspiration:

At first I started off by thinking about a game I could implement using Node, Express, and socket.io. I was thinking of creating a game called “Chase” where each user would control their own character and an enemy would chase after them. However, I came across a few difficulties which included:



* Not knowing how to restrict the number of players that could play at a time (although we have now discussed this in a future class).
* How I would detect collisions between two users in sockets.io (which was a crucial part of my game).
* How to implement the draw() function in p5 with socket.emit and socket.on.

Given the above constraints, I decided not to go ahead with this idea for now and instead thought about something more doable. I decided to create a fun dress-up game for Faiza the Falcon where users could make Faiza wear different accessories such as hats and collars, and change the background where Faiza was standing. Each change would be seen by every user present on the website. Moreover, each user has the option to input a text message which would appear as one of Faiza’s “thoughts”. Once a user enters a thought, it would appear on every other user’s screen as well.

## Workflow:

The following is the ordered workflow of the socket.io implementation:

_Hat / Collar / Background Buttons:_


1. User clicks one of the above buttons
2. Client emits a number from 0-2
3. Socket.on in server
4. Server emits back the number to all users: io.sockets.emit
5. Socket.on for all users, each user receives the number and displays the object (hat/collar/background) from their respective arrays.

_Sending “Thoughts”:_


1. User clicks on the submit button after entering a message
2. Client side emits the chat object containing the message
3. Socket.on in server
4. Server emits back the message to all clients: io.sockets.emit
5. Socket.on for all users, each user receives the message and it displays for them on their screen.

## Challenges and Next Steps:



* In order to get rid of Faiza’s previous “thoughts” every time some user enters a new thought, I cleared the chatMessageArea variable upon detecting a click on the submit button and populated the chatArea with the new thought after the previous message was cleared.
* I made each drawing on an online drawing app called [Piskel](https://www.piskelapp.com/). I found it very useful to create nice-looking pixelated drawings using a mouse.
* Since there weren’t a lot of accessories, I decided to loop over the items in each type of accessory every time the button for that accessory was clicked. For example, clicking the ‘Hat’ button multiple times would loop over the different hats stored in the ‘hats’ array.
* I made use of the modulo operator to loop over each of the items present inside the arrays each time the button for that accessory was clicked. For instance, the following snippet would cause `hatNum` to continuously iterate over the numbers 0, 1, and 2 as the `hatButton` is clicked: 
```js
let hatCounter = 0;
hatButton.addEventListener('click', () => {
    hatNum = hatCounter % 3; 
    socket.emit('hatImgNum', hatNum);
    hatCounter += 1;
})
```
* In order to display only one image at a time, I added the accessories and background to their respective arrays and set their default display to ‘none’. Once an accessory / background button is clicked, all images that belong to that accessory / background are hidden and only the image at the index currently stored in the ‘Num’ variable is shown.
* I believe that adding a button to clear a particular type of accessory / background would be useful and would definitely look into adding it to the website.
* Once the accessory list for each category grows large enough, an inventory list for each accessory type would be useful. The user could then select the accessory directly from the inventory list of the category instead of looping through the entire list one-by-one.
* In order to implement the previous point, I would like to make more images for the accessories on Piskel, or find more such images on websites such as [Scratch](https://scratch.mit.edu/).

## References:



* Piskel App - for drawing pixelated images:

    [https://www.piskelapp.com/](https://www.piskelapp.com/)

* StackOverflow: Removing all children of an Element in JavaScript:

    https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

* W3 - Generating a Random Number in JavaScript:

    [https://www.w3schools.com/js/js_random.asp](https://www.w3schools.com/js/js_random.asp)
