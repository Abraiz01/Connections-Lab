<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 3

Conversion time: 1.4 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β33
* Wed Mar 02 2022 12:34:13 GMT-0800 (PST)
* Source doc: Earth to Mars with Curiosity
* Tables are currently converted to HTML tables.
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 3.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>


**From Earth to Mars with Curiosity**

Name: Abraiz

Date: 

Course: Connections Lab 

Type: Project 1

Link: [Earth to Mars with Curiosity](https://abraiz01.github.io/Connections-Lab/Week3/Project_1/index.html)

**Description:**

The project was designed to have a story-like experience for children interested to know more about Mars by providing a narrative and interactive experience to explore Mars with one of NASA’s rovers called ‘Curiosity’.

The website aims to maintain an element of ‘curiosity’ within the users themselves in order to keep their attention, it does this by allowing the user to explore the website through an interactive scrolling experience. The website was intended for children having an interest in space exploration but the user could be anyone who is interested to know more about Mars and Curiosity through a fun and informative experience. Upon scrolling, the website reveals different animations on each page (like a rocket launching from earth, traveling through space, and landing on mars eventually) along with pictures and narrations. At a certain stage in the rover’s journey, there is also an option to interact with a 3D model of the rover by zooming and rotating it.

When the rover finally lands on mars, scrolling further down to the final page reveals  interactive rocks on the surface of mars along with the rover, and upon clicking on those Martian rocks, an important discovery made by Curiosity is revealed.

The project makes use of HTML, CSS, and JavaScript along with a .json file for storing the discoveries made by Curiosity (information was collected from NASA’s website and was gathered manually into a JSON file to suit the website’s requirement). Libraries used include p5.js, gsap, and ScrollMagic. A “model-viewer” module was also used to display the rover’s interactive 3D model.

**Inspiration:**



* Personal interest in space exploration.
* Had a lot of difficulty in choosing the right dataset at first and I had to rethink and reevaluate many times, but I am glad it worked out in the end.
    * At first I planned on making a website which would show the data for all space missions carried out in the 21st century. I would show a spacecraft for each of the missions and they would move around the webpage. Upon clicking on these spaceships, details of the mission would be revealed. However, I could not find substantive APIs to support my website so I did not go ahead with this plan. (wireframe below)
    * Next, I planned on making use of one of NASA’s Mars APIs to create a website that would allow a user to view the actual images taken by the Curiosity rover on Mars and change the viewing camera. For this, I found a large API which had hundreds of thousands of raw images taken by the rover till now. However, the photos were a bit too raw and I was finding it a bit difficult to craft a website out of this data that would also be engaging for the user. (wireframe below)

		



* I want to especially thank the professor for believing in my work and encouraging me to go with the idea that interested me more.
* The idea was to make a website that would somewhat feed the space-exploring curiosity of my child-self and also the little space-enthusiasts around the world today.
* Started off the course with no knowledge of HTML, CSS, and  JavaScript, but I am fascinated with the seemingly limitless scope of what one can do when it comes to web development, and I am definitely excited to learn more.

**User Interactions / Features:**



* Animated Scrolling



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")




* Zooming and dragging to explore 3D model of Curiosity



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")




* Clicking Martian rocks to reveal discoveries made by Curiosity
* ‘Teleport’ buttons to travel back-and-forth between Earth and Mars
* Progress bar to show current stage of journey



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


**Key Challenges:**



* Progress Bar

    This was an important feature that I wanted to add to my website in order to give the user some sense as to how far they have progressed through the website. The main difficulty I encountered was in deriving a formula for the percentage of the website scrolled. This percentage was used to increase the bar’s length inside the progress bar. It was derived by first observing the values of scrollY in the console log, then subsequently dividing it by the total vertical length of the windows in the webpage (there were 6 windows in total). This gave an answer that rounded to about 50% of the progress bar at the start of the final page (where it was supposed to be 100%). So the entire expression was multiplied by 2 at the end and this gave me exactly what I wanted.


    ```
progressBar.value = String((scrollY/window.innerHeight*6)*2);
```


* Scrolling Animation

    The scrolling animations are a big part of my webpage, as they really allow the user to engage in the narrative experience. I made use of a combination of [Greensock](https://greensock.com/) and [ScrollMagic](https://scrollmagic.io/docs/index.html) libraries along with some help from a few youtube videos (mentioned in the reference section). The main challenge I faced here was to figure out how each attribute in the library functioned. Once I was able to do that, I reproduced the idea to create animations throughout the entire website. For instance, in the following code snippet,


    ```
tl2.from('#blockquote-1', .5, {x:200, opacity: 0});
```



    The ‘blockquote-1’ object will appear for a duration of 1 unit, 200 pixels from the right of the final position where the object is to be placed, and it’s opacity will increase from 0 to 1 as the user scrolls through the website.

* Teleport Buttons

    I wanted my webpage to give the user an option to avoid having to scroll all the way down to the bottom of the webpage each time they wished to interact with Curiosity’s discoveries. For this I found a useful function on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo) that allows one to scroll to any particular point of their webpage simply by specifying its location. To go to Mars, I set the ‘top’ attribute to a large value so that it would scroll all the way to the bottom. Similarly, to go back to the first page, I set the ‘top’ attribute to zero. In order to not make the scrolling process seem instantaneous, I decided to set the behavior of the scrollTo() function to ‘smooth’. This allows the user to have a more realistic scrolling experience which is not too slow either.


	


```
/* function to scroll down to the last page to Curiosity*/
function teleportToMars() {
 window.scrollTo({
   top: 70000,
   left: 100,
   behavior: 'smooth'
 });
}

/* function to scroll up to the first page to Earth*/
function teleportToEarth() {
 window.scrollTo({
   top: 0,
   left: 100,
   behavior: 'smooth'
 });
}
```




* Making Earth and Curiosity ‘bounce’

    To make Earth and Curiosity appear as if they are bouncing, I found a useful resource on [Geeks for Geeks](https://www.geeksforgeeks.org/how-to-make-smooth-bounce-animation-using-css/). It makes use of keyframes in CSS to translate the position of the image in an infinite loop which allows the image to have a bouncing attribute. I decided to include this feature so as to make the images more interactive and encourage the user to click on them, since they include clicking functionalities such as making more buttons appear or simply refreshing the page. The below code snippet shows the implementation on the earth image, a similar approach was used for Curiosity’s image.


    ```
#earth-1 {
   width: 22vw;
   right: 39vw;
   top: 30vh;
  
   animation: bounce 0.5s;
   animation-direction: alternate;
   animation-timing-function: cubic-bezier(.5, 0.05, 1, .5);
   animation-iteration-count: infinite;
}

@keyframes bounce {
   from {
       transform: translate3d(0, 0, 0);
   }
   to {
       transform: translate3d(0, 20px, 0);
   }
}

/* Reference : https://www.geeksforgeeks.org/how-to-make-smooth-bounce-animation-using-css/ */
```


* Resizing the p5 canvas

    At first, I tried to use the default positioning dimensions of p5 in order to place different objects inside the canvas and to specify the dimensions of the canvas itself. However, upon resizing the window, I found that the canvas was going out of the range of the section it was embedded in, so I decided to try a different approach mentioned [here](https://stackoverflow.com/questions/55879820/how-to-create-more-than-one-canvas-with-p5). I used the same methodology and stored the current size of the window in two separate variables containing the width and height and initialized the canvas variable with those parameters. After this, whatever I placed inside the p5 sketch was positioned using a percentage of the dynamic window width and height. I also decided to make the rover on the same page act as a refresh button so that if the rocks get misplaced, the user can have the option to make them reappear randomly but within the required dimensions of their screen.


    ```
// setting up p5.js canvas
function setup() {

   sketchWidth = document.getElementById("canvas-container").offsetWidth;
   sketchHeight = document.getElementById("canvas-container").offsetHeight;
   var canvas = createCanvas(sketchWidth, sketchHeight);
 
   // Move the canvas so it's inside our <section class="page" id="page-6">
   canvas.parent('canvas-container');
 }
```


* Animations

    Finding animations that would be more focused towards the intended audience (children). I found it a bit difficult to search for relevant animations for my website’s story. So I asked my sister, Nimrah Azhar (who was familiar with using Procreate), if she could design animations for Earth, Mars, Curiosity’s rocket, the cruise spacecraft, and the rover. She was kind enough to design animations that would work for smaller age groups and at the same time not diverge too much from real-life photographs (which I used in coordination with the animations).


    


**Next Steps:**



* Draw more animations on Procreate to make the website follow a single design scheme.
* Add sound effects on hovering over interactive objects like buttons, earth, and curiosity’s rover
* Make the website mobile friendly.
* Add background music through p5.js
* Add ‘Did You Know?’ fact boxes to make the website more informative.
* Add a back button which returns to the main website from the 3D rover page.

**References:**



* Youtube Videos:
    * [Creating Awesome UI's that Animate Only On Scroll](https://www.youtube.com/watch?v=S18Wh9IELo0&t=696s)
    * [GSAP 3.0 Crash Course - JavaScript Animation Library](https://www.youtube.com/watch?v=YqOhQWbouCE)
* Scrolling:
    * [Greensock](https://greensock.com/)
    * [ScrollMagic](https://scrollmagic.io/docs/index.html)
* MDN: [https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
* Bouncing Effect: [https://www.geeksforgeeks.org/how-to-make-smooth-bounce-animation-using-css/](https://www.geeksforgeeks.org/how-to-make-smooth-bounce-animation-using-css/)
* Dynamically Resizing the Canvas: [https://stackoverflow.com/questions/55879820/how-to-create-more-than-one-canvas-with-p5](https://stackoverflow.com/questions/55879820/how-to-create-more-than-one-canvas-with-p5)
