let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require("socket.io").listen(server);

var globalTotalBubbles = 0;
var totalBubblesCreated = 0;
var totalBubblesPopped = 0;

io.sockets.on("connection", function(socket) {
  console.log("New player has joined the game");

  //Listen for new bubble to be created
  socket.on("newBubbleCreated", function(data) {
    globalTotalBubbles++;
    totalBubblesCreated++;
    data.bubbleNumber = globalTotalBubbles;
    data.totalBubblesCreated = totalBubblesCreated;
    console.log("Received new bubble: " + data);
    io.sockets.emit("newBubbleCreated", data);
  });

  //Listen for click inside bubble
  socket.on("clickedInside", function(data) {
    globalTotalBubbles--;
    totalBubblesPopped++;
    data.totalBubblesPopped = totalBubblesPopped;
    console.log("Bubble clicked");
    io.sockets.emit("clickedInside", data);
  });

  //listen for client to disconnect
  socket.on("disconnect", function() {
    console.log("A player has left the game: " + socket.id);
  });
});
