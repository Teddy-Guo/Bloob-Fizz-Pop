//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on("connect", function() {
  console.log("Connected");
});

let bubbles = [];
// let localTotalBubblesAtEntry = 0;
var blueButton;
var yellowButton;
var redButton;
var bloopSounds = [];
var fizzSounds = [];
var popSounds = [];
var deathPop;
var backgroundMusic;
var canvas;
var bubblesCreated = 0;
var bubblesPopped = 0;
var instructions1;
var instructions2;

function preload() {
  deathPop = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fdeath-pop.mp3?v=1607537487921");

  var bloop1 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-1.m4a?v=1607537481985");
  var bloop2 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-2.m4a?v=1607537482305");
  var bloop3 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-3.m4a?v=1607537482644");
  var bloop4 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-4.m4a?v=1607537483292");
  var bloop5 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-5.m4a?v=1607537483960");
  var bloop6 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-6.m4a?v=1607537487422");
  var bloop7 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fbloop-7.m4a?v=1607537485010");

  bloopSounds.push(bloop1);
  bloopSounds.push(bloop2);
  bloopSounds.push(bloop3);
  bloopSounds.push(bloop4);
  bloopSounds.push(bloop5);
  bloopSounds.push(bloop6);
  bloopSounds.push(bloop7);

  var fizz1 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Ffizz-1.m4a?v=1607537488525");
  var fizz2 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Ffizz-2.m4a?v=1607537489294");
  var fizz3 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Ffizz-3.m4a?v=1607537490000");
  var fizz4 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Ffizz-4.m4a?v=1607537490711");
  var fizz5 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Ffizz-5.m4a?v=1607537491398");

  fizzSounds.push(fizz1);
  fizzSounds.push(fizz2);
  fizzSounds.push(fizz3);
  fizzSounds.push(fizz4);
  fizzSounds.push(fizz5);

  var pop1 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fpop-1.m4a?v=1607537492954");
  var pop2 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fpop-2.m4a?v=1607537493873");
  var pop3 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fpop-3.m4a?v=1607537494714");
  var pop4 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fpop-4.m4a?v=1607537495555");
  var pop5 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fpop-5.m4a?v=1607537496445");
  var pop6 = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fpop-6.m4a?v=1607537497245");

  popSounds.push(pop1);
  popSounds.push(pop2);
  popSounds.push(pop3);
  popSounds.push(pop4);
  popSounds.push(pop5);
  popSounds.push(pop6);

  for (let i = 0; i < bloopSounds.length; i++) {
    bloopSounds[i].setVolume(0.4);
  }

  for (let i = 0; i < fizzSounds.length; i++) {
    fizzSounds[i].setVolume(0.4);
  }

  for (let i = 0; i < popSounds.length; i++) {
    popSounds[i].setVolume(0.4);
  }
}

function setup() {
  backgroundMusic = loadSound("https://cdn.glitch.com/0ce3f806-aff8-4efe-8a5c-09375fa913c6%2Fadventures.mp3?v=1607537487378", musicLoaded);
  canvas = createCanvas(800, 800);
  scoreBoard = createElement("h1", "Group Score");
  scoreBoard.position(canvas.width + 50, 0);
  bubblesCreatedLabel = createElement("p1", "Bubbles created: " + bubblesCreated);
  bubblesCreatedLabel.position(canvas.width + 50, 75);
  bubblesPoppedLabel = createElement("p1", "Bubbles popped: " + bubblesPopped);
  bubblesPoppedLabel.position(canvas.width + 50, 100);
  // instructions1.position(canvas.width/2, canvas.height/5);
  // instructions2.position(canvas.width/2, canvas.height/5 + 40);
  
  //create Fizz button
  let yellow = color(255, 204, 0);
  yellowButton = createButton("Fizz");
  yellowButton.style("background-color", yellow);
  yellowButton.position(385, 730);
  yellowButton.mousePressed(createYellowBubble); // Creates yellow bubble

  //create Bloop button
  let blue = color(79, 125, 235);
  blueButton = createButton("Bloop");
  blueButton.style("background-color", blue);
  blueButton.position(140, 730);
  blueButton.mousePressed(createBlueBubble); // Creates blue bubble

  //create Pop button
  let red = color(245, 75, 233);
  redButton = createButton("Pop");
  redButton.style("background-color", red);
  redButton.position(625, 730);
  redButton.mousePressed(createRedBubble);

  socket.on("newBubbleCreated", function(obj) {
    const { x, y, diameter, color, bubbleNumber, totalBubblesCreated } = obj;

    //Chooses the right sound based on the color of the bubble
    if (color === "blue") {
      var randomSound = floor(random(0, bloopSounds.length));
      bloopSounds[randomSound].play();
    } else if (color === "yellow") {
      var randomSound = floor(random(0, fizzSounds.length));
      fizzSounds[randomSound].play();
    } else if (color === "red") {
      var randomSound = floor(random(0, popSounds.length));
      popSounds[randomSound].play();
    }

    //Creates new bubble and adds to local bubbles array
    newBubble = new Bubble(x, y, diameter, color, bubbleNumber);
    bubbles.push(newBubble);
    updateBubblesCreatedScore(totalBubblesCreated);
    console.log("New Bubble: " + newBubble.bubbleNumber);
  });

  //When bubble is clicked, it tells server, which sends message to splice (remove bubble from array)
  socket.on("clickedInside", function(obj) {
    deathPop.play();
    let indexToDelete = obj.bubbleNumber;
    let bubblesPopped = obj.totalBubblesPopped;
    bubbles.splice(indexToDelete, 1);

    for (let i = indexToDelete; i < bubbles.length; i++) {
      bubbles[i].bubbleNumber--;
    }
    
    updateBobblesPoppedScore(bubblesPopped);
  });
}

function musicLoaded() {
  backgroundMusic.setVolume(0.2);
  backgroundMusic.loop();
}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].clickedInside(mouseX, mouseY, i);
  }
}

function updateBobblesPoppedScore(totalPopped){
  bubblesPopped = totalPopped;
  bubblesPoppedLabel.html("Bubbles popped: " + bubblesPopped);
}

function updateBubblesCreatedScore(totalScore){
  bubblesCreated = totalScore;
  bubblesCreatedLabel.html("Bubbles created: " + bubblesCreated);
  console.log("BubblesCreated Score: " + totalScore);
}

function draw() {
  stroke(100);
  background(220);

  //first cup
  rectMode(RADIUS);
  fill(180, 180, 180);
  rect(160, 700, 80, 100, 0, 0, 20, 20);
  fill(51, 92, 232);
  rect(160, 730, 74, 67, 0, 0, 26, 26);
  fill(79, 125, 235);
  ellipse(160, 660, 148, 38);
  fill(180, 180, 180);
  ellipse(160, 600, 160, 40);
  ellipse(160, 600, 144, 36);

  //middle cup
  rectMode(RADIUS);
  fill(180, 180, 180);
  rect(400, 700, 80, 100, 0, 0, 20, 20);
  fill(255, 170, 0);
  rect(400, 730, 74, 67, 0, 0, 26, 26);
  fill(255, 204, 0);
  ellipse(400, 660, 148, 38);
  fill(180, 180, 180);
  ellipse(400, 600, 160, 40);
  ellipse(400, 600, 144, 36);

  //third cup
  rectMode(RADIUS);
  fill(180, 180, 180);
  rect(640, 700, 80, 100, 0, 0, 20, 20);
  fill(226, 15, 245);
  rect(640, 730, 74, 67, 0, 0, 26, 26);
  fill(245, 75, 233);
  ellipse(640, 660, 148, 38);
  fill(180, 180, 180);
  ellipse(640, 600, 160, 40);
  ellipse(640, 600, 144, 36);

  // draw bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

// define Bubble class
class Bubble {
  // initialize Bubble
  constructor(x, y, diameter, bubbleColor, bubbleNumber) {
    if (bubbleColor === "yellow") {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.color = bubbleColor;
      this.bubbleNumber = bubbleNumber;
    } else if (bubbleColor === "blue") {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.color = bubbleColor;
      this.bubbleNumber = bubbleNumber;
    } else if (bubbleColor === "red") {
      this.x = 640 + random(-35, 35);
      this.y = 660 + random(-15, 15);
      this.diameter = random(20, 30);
      this.color = bubbleColor;
      this.bubbleNumber = bubbleNumber;
    }
  }

  clickedInside(clickX, clickY, i) {
    let distance = dist(clickX, clickY, this.x, this.y);
    if (distance <= this.diameter / 2) {
      let bubbleToDelete = { bubbleNumber: bubbles[i].bubbleNumber, totalBubblesPopped: 0 };
      socket.emit("clickedInside", bubbleToDelete);
      console.log("Bubble clicked");
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y - random(0, 2);
  }

  show() {
    if (this.color === "yellow") {
      stroke(120);
      strokeWeight(1);
      fill(random(50, 255), 255, random(0, 100));
      ellipse(this.x, this.y, this.diameter, this.diameter);
    } else if (this.color === "blue") {
      stroke(120);
      strokeWeight(1);
      fill(100, random(150, 255), random(200, 255));
      ellipse(this.x, this.y, this.diameter, this.diameter);
    } else if (this.color === "red") {
      stroke(120);
      strokeWeight(1);
      fill(random(200, 255), random(150, 200), 235);
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }
}

function createYellowBubble() {
  console.log("Entering createYellowBubble");
  let newBubble = {
    x: 400 + random(-35, 35),
    y: 660 + random(-15, 15),
    diameter: random(25, 35),
    color: "yellow",
    bubbleNumber: 0,
    totalBubblesCreated: 0
  };
  // Sends new bubble data to server to share with others
  socket.emit("newBubbleCreated", newBubble);
}

function createBlueBubble() {
  console.log("Entering createBlueBubble");
  let newBubble = {
    x: 160 + random(-35, 35),
    y: 660 + random(-15, 15),
    diameter: random(25, 35),
    color: "blue",
    bubbleNumber: 0,
    totalBubblesCreated: 0
  };
  // Sends new bubble data to server to share with others
  socket.emit("newBubbleCreated", newBubble);
}

function createRedBubble() {
  console.log("Entering createRedBubble");
  let newBubble = {
    x: 640 + random(-35, 35),
    y: 660 + random(-15, 15),
    diameter: random(25, 35),
    color: "red",
    bubbleNumber: 0,
    totalBubblesCreated: 0
  };
  // Sends new bubble data to server to share with others
  socket.emit("newBubbleCreated", newBubble);
}
