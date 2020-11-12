//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', function() {
    console.log("Connected");
});

let bubbles = [];
var blueButton;
var yellowButton;
var redButton;

function setup() {
  createCanvas(800, 800);

  //create Fizz button
  let yellow = color(255, 204, 0);
  yellowButton = createButton("Fizz");
  yellowButton.style('background-color', yellow);
  yellowButton.position(380, 730);
  yellowButton.mousePressed(createYellowBubble); // Creates yellow bubble

  //create Bloop button
  let blue = color(79, 125, 235);
  blueButton = createButton("Bloop");
  blueButton.style('background-color', blue);
  blueButton.position(135, 730);
  blueButton.mousePressed(createBlueBubble); // Creates blue bubble

  //create Pop button
  let red = color(245, 75, 233);
  redButton = createButton("Pop");
  redButton.style('background-color', red);
  redButton.position(620, 730);
  redButton.mousePressed(createRedBubble);

  socket.on('newBubbleCreated', function(obj){
      const {x, y, diameter, color} = obj;
      newBubble = new Bubble(x, y, diameter, color);
      bubbles.push(newBubble);
  });

  //When bubble is clicked, it tells server, which sends message to splice
  socket.on('clickedInside', function(obj){
      const {i} = obj;
      bubbles.splice(i, 1);
  });
}

function mousePressed(){
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].clickedInside(mouseX, mouseY, i);
  }
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

  //Third cup
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
  constructor(x, y, diameter, bubbleColor) {
    if (bubbleColor === 'yellow') {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.color = bubbleColor;
      
    } else if (bubbleColor === 'blue') {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.color = bubbleColor;
      
    } else if (bubbleColor === 'red') {
      this.x = 640 + random(-35, 35);
      this.y = 660 + random(-15, 15);
      this.diameter = random(20, 30);
      this.color = bubbleColor;
    }
  }

  clickedInside(clickX, clickY, i){
    let distance = dist(clickX, clickY, this.x, this.y);
    if (distance <= this.diameter/2){
    //   return true;
        let bubbleToDelete = { index : i };
        socket.emit('clickedInside', bubbleToDelete);
    } else {
      return false;
    }
  }
  
  move() {
    this.x = this.x + random(-2, 2);
    // this.y = this.y-1;
    this.y = this.y - random(0, 2);
  }

  show() {
    if(this.color === 'yellow'){
      stroke(120);
      strokeWeight(1);
      fill(random(50, 255), 255, random(0, 100));
      ellipse(this.x, this.y, this.diameter, this.diameter);
      
    } else if(this.color === 'blue'){
      stroke(120);
      strokeWeight(1);
      fill(100, random(150, 255), random(200, 255));
      ellipse(this.x, this.y, this.diameter,this.diameter);
      
    } else if(this.color === 'red'){
      stroke(120);
      strokeWeight(1);
      fill(random(200,255), random(150, 200), 235);
      ellipse(this.x, this.y, this.diameter,this.diameter);
    }
  }
}

function createYellowBubble() {
    console.log("Entering createYellowBubble");
    // let newYellow = new Bubble('yellow');
    let newBubble = { 
        x : 400 + random(-35, 35),
        y : 660 + random(-15, 15),
        diameter : random(20, 30),
        color : 'yellow' };
    // Sends new bubble data to server to share with others
    socket.emit('newBubbleCreated', newBubble);
}

function createBlueBubble() {
    console.log("Entering createBlueBubble");
    let newBubble = { 
        x : 160 + random(-35, 35),
        y : 660 + random(-15, 15),
        diameter : random(20, 30),
        color : 'blue' };
    socket.emit('newBubbleCreated', newBubble);
}

function createRedBubble() {
    console.log("Entering createRedBubble");
    let newBubble = { 
        x : 640 + random(-35, 35),
        y : 660 + random(-15, 15),
        diameter : random(20, 30),
        color : 'red' };
    socket.emit('newBubbleCreated', newBubble);
}