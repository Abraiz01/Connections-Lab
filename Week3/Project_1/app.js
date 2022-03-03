// declaring variable to store path of json file
let jsonFile = "./results.json";

// declaring variable to store data inside json file
let resultsData;

// methodology adopted from an example we did in class to detect if the json data is loaded
let isDataReady = false;

// array to store objects from the 'Result' class
let results = [];

window.addEventListener("load", () => {
    fetch(jsonFile)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      resultsData = data;
      isDataReady = true;
  
      // creating objects for the discoveries made by Curiosity
      for(let i=0;i<resultsData.results.length;i++) {
        results.push(new Result(resultsData.results[i].img_text, resultsData.results[i].img, resultsData.results[i].date, resultsData.results[i].text))
        
      }
  
    })
})



/* --- code for GSAP and ScrollMagic starts here --- */

// storing window height and width in their respective variables
let height = window.innerHeight;
let width = window.innerWidth;

/* --- PAGE 2 --- */
/* working of GSAP and Scrollmagic animation libraries */ 
// initializing timeline variable for the current page
// the timeline acts as a container for every object inside the page and allows us to
// adjust their sequence and time delays using specific parameters
// the argument contains the function updatePercentage, which keeps track of the scroll progress
var tl2 = new TimelineMax({onUpdate:updatePercentage2});

// creating a controller object that would control the scenes for each timeline
// the scenes for each page define the scrolling activity of that page
const controller = new ScrollMagic.Controller();

// creating tween instances and defining parameters for the initial state of the animated object,
// its speed, timing, opacity, and direction of motion
tl2.from('#blockquote-1', .5, {x:200, opacity: 0});
tl2.from('#blockquote-2', .5, {x:200, opacity: 0});
tl2.from('#launch-1', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-1");
tl2.from('#launch-2', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-.7");
tl2.from('#rocket-1', 1, {y:0.45*height, ease: Power4.easeInOut}, "=-.7");

// creating a scene object for page-2 that allows the animations to play
// once the user has scrolled enough to display the page entirely
const scene2 = new ScrollMagic.Scene({
  triggerElement: "#page-2",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin("#page-2")
  .setTween(tl2)
		.addTo(controller);

// function to keep track of the scrolling progress made by the user
function updatePercentage2() {
  tl2.progress();
  console.log(tl2.progress());
}

/* the same approach is followed for pages 3-5, 
 to avoid redundancy, comments for page 2 are not repeated, but pages are labelled
 when their code begins */

/* --- PAGE 3 --- */

var tl3 = new TimelineMax({onUpdate:updatePercentage3});

tl3.from('#blockquote-3', .5, {x:200, opacity: 0});
tl3.from('#blockquote-4', .5, {x:200, opacity: 0});
tl3.from('#curiosity-1', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-1");
tl3.from('#button4', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-.7");
tl3.from('#blockquote-3d', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-.7");
tl3.from('#rocket-2', 1, {y:-700, opacity: 0, ease: Power4.easeInOut}, "=-0.7");

const scene3 = new ScrollMagic.Scene({
  triggerElement: "#page-3",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin("#page-3")
  .setTween(tl3)
		.addTo(controller);


function updatePercentage3() {
  tl3.progress();
  console.log(tl3.progress());
}

/* --- PAGE 4 --- */

var tl4 = new TimelineMax({onUpdate:updatePercentage4});

tl4.from('#blockquote-5', .5, {x:200, opacity: 0});
tl4.from('#blockquote-6', .5, {x:200, opacity: 0});
tl4.from('#cruise-pic1', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-1");
tl4.from('#cruise-pic2', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-.7");
tl4.from('#cruise-1', 1, {y:-700, opacity: 0, ease: Power4.easeInOut}, "=-0.7");

const scene4 = new ScrollMagic.Scene({
  triggerElement: "#page-4",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin("#page-4")
  .setTween(tl4)
		.addTo(controller);


function updatePercentage4() {
  tl4.progress();
  console.log(tl4.progress());
}

/* --- PAGE 5 --- */

var tl5 = new TimelineMax({onUpdate:updatePercentage5});

tl5.from('#blockquote-7', .5, {x:200, opacity: 0});
tl5.from('#blockquote-8', .5, {x:200, opacity: 0});
tl5.from('#land-1', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-1");
tl5.from('#land-2', 1, {x:-200, opacity: 0, ease: Power4.easeInOut}, "=-.7");
tl5.from('#cruise-2', 1, {y:-500, opacity: 0, ease: Power4.easeInOut}, "=-.7");

const scene5 = new ScrollMagic.Scene({
  triggerElement: "#page-5",
            triggerHook: "onLeave",
            duration: "100%"
})
  .setPin("#page-5")
  .setTween(tl5)
		.addTo(controller);


function updatePercentage5() {
  tl5.progress();
  console.log(tl5.progress());
}

/* --- code for GSAP and ScrollMagic ends here --- */



// initializing an earth variable for the earth button on the first page
let earth;
earth = document.getElementById('earth-1');

// initializing 'teleport to mars' and 'game' buttons
let button1;
button1 = document.getElementById('button1');
let button2;
button2 = document.getElementById('button2');

// adding mouseover event to make earth image opaque when the cursor
// hovers over it
earth.addEventListener("mouseover", function() {
  earth.style.opacity = "0.5";
});

// returning earth opacity back to original state when cursor is no 
// longer over earth
earth.addEventListener("mouseout", function() {
  earth.style.opacity = "1";
});

// making the 'teleport to mars' and 'game' buttons visible when earth is clicked
earth.addEventListener("click", function() {
  button1.style.display = "inline";
  button2.style.display = "inline";
});

// function to scroll down to the last page where Curiosity is shown on Mars
function teleportToMars() {
  window.scrollTo({
    top: 70000,
    left: 100,
    behavior: 'smooth'
  });
}

// function to scroll up towards Earth to return to the first page
function teleportToEarth() {
  window.scrollTo({
    top: 0,
    left: 100,
    behavior: 'smooth'
  });
}

// initializing a curiosity variable for the curiosity rover button on the final page
let curiosity;
curiosity = document.getElementById('curiosity');

// initializing 'teleport to earth' button
let button3;
button3 = document.getElementById('button3');

// adding mouseover event to make Curiosity's image opaque when the cursor
// hovers over it
curiosity.addEventListener("mouseover", function() {
  curiosity.style.opacity = "0.8";
});

// returning earth opacity back to original state when cursor is no 
// longer over Curiosity
curiosity.addEventListener("mouseout", function() {
  curiosity.style.opacity = "1";
});

// making the 'teleport to earth' button visible when earth is clicked
curiosity.addEventListener("click", function() {
  button3.style.display = "inline";
});


// initializing a variable for the progress bar displayed in the top-right corner 
let progressBar;
progressBar = document.getElementById('prog-bar');

// adding an event listener for a scroll event in order to make position calculations in the next steps
window.addEventListener("scroll", () => {
 
  // console.log(scrollY);
  // console.log( (scrollY/window.innerHeight*6))

  // formula was derived from trial and error by observing the values of scrollY in the 
  // console log. There are 6 windows in total, so the value of the current scroll position is divided 
  // by the total height of all windows, this rounded to about 50% (halfway through the progress bar)  
  // at the start of the last page, so the final result was multiplied by 2
  progressBar.value = String((scrollY/window.innerHeight*6)*2);
})

var sketchWidth;
var sketchHeight;

// setting up p5.js canvas
function setup() {

    sketchWidth = document.getElementById("canvas-container").offsetWidth;
    sketchHeight = document.getElementById("canvas-container").offsetHeight;
    var canvas = createCanvas(sketchWidth, sketchHeight);
   
    // Move the canvas so it’s inside our <section class="page" id="page-6">
    canvas.parent('canvas-container');
  
}

function draw() {
    clear();
    // background(0,0,0);
  
    if(isDataReady) {
      for(let i=0;i<results.length;i++) {
  
        // draw the circle for each result object in the array
        results[i].drawStar();
      }
    }
    for(let i=0;i<results.length;i++) {
      results[i].showResult(mouseX, mouseY);
    }
}

// update values of width and height dynamically as window is resized
function windowResized() {
  sketchWidth = document.getElementById("canvas-container").offsetWidth;
  sketchHeight = document.getElementById("canvas-container").offsetHeight;
  resizeCanvas(sketchWidth, sketchHeight);
}

// creating a class that will instantiate json file objects which contain Curiosity's result info
class Result {
    constructor(title,img,date,text) {
      this.img = loadImage(img);
      this.title = title;
      this.date = date;
      this.text = text;
      this.x = random(0.35*sketchWidth,0.9*sketchWidth);
      this.y = random(0.55*sketchHeight,0.95*sketchHeight);
      this.r = 0.007*sketchWidth;
      this.clicked = false;
    }
    drawStar() {
      ellipse(this.x, this.y, 2*this.r);
    }
    
    // function to display contents of circles when they are clicked
    showResult(mx, my) {
      if(dist(mx, my, this.x, this.y) < this.r) {
        
        image(this.img, 0.04*sketchWidth, 0.03*sketchHeight, 0.25*sketchWidth, 0.35*sketchHeight);

        textSize(0.022*sketchWidth);
        fill(255,255,255)
        text(this.title, 0.32*sketchWidth, 0.12*sketchHeight, 0.5*sketchWidth, 0.3*sketchHeight);

        textSize(0.03*sketchWidth);
        text(this.date, 0.32*sketchWidth, 0.08*sketchHeight);

        textSize(0.015*sketchWidth);
        text(this.text, 0.32*sketchWidth, 0.2*sketchHeight, 0.45*sketchWidth, 0.4*sketchWidth);
      } 
    }
  
  }

