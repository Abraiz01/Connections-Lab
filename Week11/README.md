# Connections-Week11
Homework for Week#11 using the three.js Javascript library.

##Inspiration:

For this weekly assignment, where we had to make use of a comlp[etely new library which we were not familiar with, I decided to go with three.js. The reason I went with this library was that I was just amazed by the seemingly limitless and diverse possibilities it has to offer. I was also very intrigued by the examples shown on the three.js website. Although I soon realized that three.js works on a very low-level in the sense that it is not very beginner-friendly, it only makes sense for such a diverse library to be structured this way.

Since it was my first time toying with three.js, I decided to work from the basics and really understand how everything was working instead of just copying examples and tweaking them. So, I decided to create my very own planet and tinker with its rotation using mouse movements. The idea was simple, but it allowed me to have a good grasp of the fundamentals of the library.

##Working Process:

The following is a breakdown of the steps I followed from scratch to the eventual development of the webpage:



* First, I went straight to the three.js website, went through a few examples, changed the x, y, and z positions, rotations, and all sorts of attributes that were available to change on the webpages.
* Next, I went through the three.js Documentation. This was very well laid out and reasonably easy to follow along. I made the initial setup and installations that were required to work with three.js.
* Next, I played around with different geometries such as Spheres, Boxes, Toruses, and Rings to get a good idea of what their attributes represented.
* Went through different materials that were available like MeshStandard and Particles and adjusted different properties such as metalness and roughness.
* Played around with PointLights and adjusted their position, intensity, and distance and saw how this affected the objects around it.
* Added different statements inside the animate() function and saw how this changed the behavior of objects, such as adding rotation to spheres etc. I also noticed that the animate() function worked in a similar way to the p5 draw() function since both of them essentially run on a fixed framerate.
* Finally I added event listeners and tweaked the values inside the animate() function in order to make the website more immersive.

##Challenges and Next Steps:



* I was having some trouble launching my website from the ‘Go Live’ feature of VS Code. I eventually found out that the problem was happening because the three.js json file I copied from the three.js website either had some bugs or it wasn’t copied correctly on my end, the issue was eventually solved when I added a three.js script tag to the index.js file.
* Since I wasn’t very used to working with 3D objects, I did not know that they require a thing called a ‘Normal Map’ in order to correctly add texture to them. So, in order to add the texture I wanted, I had to first convert it into a Normal Map PNG and then add it to the 3D object in three.js. This added the proper texture to the object and gave a sort of a depth perception to it as well.
* I was having trouble resizing the window and maintaining the three.js content at its place at first but then I found out this problem was faced by basically everyone until they added a ‘resize’ listener and updated the camera aspect and renderer size according to the current window size. (add code)
* My next step would be to dive deeper into the library and make use of more 3D objects in order to get familiar with as many as I can (especially the most basic ones), and then eventually implement three.js into my Final project for Connections Lab.

##References:



* Three.js Documentation:

    [https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

* Three.js Library Script Tag:

    [https://cdnjs.com/libraries/three.js/r128](https://cdnjs.com/libraries/three.js/r128)

* Space Font:

    [https://www.fontspace.com/space-quest-font-f31679](https://www.fontspace.com/space-quest-font-f31679)

* Normal Map Generator:

	[https://cpetry.github.io/NormalMap-Online/](https://cpetry.github.io/NormalMap-Online/)
