const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 1280;
canvas.height = 720;

// Set grid dimensions based on canvas size and desired number of rows and columns
const numRows = 36;
const numCols = 64;

// Set cell size based on grid dimensions and canvas size
const cellSize = Math.floor(canvas.width / numCols);

// Define the map as a 2D array
const map = new Array(numRows).fill(null).map((_, row) => {
  return new Array(numCols).fill(0).map((_, col) => {
    // Check if current cell is on the border
    if (row === 0 || row === numRows - 1 || col === 0 || col === numCols - 1) {
      return 1; // set border cells to blue
    } else {
      return 0; // set all other cells to black
    }
  });
});

const tileColors = {
  0: "black",
  1: "blue"
};

function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tileX = col * cellSize;
      const tileY = row * cellSize;
      const tile = map[row][col];
      ctx.fillStyle = tileColors[tile];
      ctx.fillRect(tileX, tileY, cellSize, cellSize);
    }
  }
}

drawMap();

// Pac-Man variables
let pacX = canvas.width / 2;  // starting x position
let pacY = canvas.height / 2; // starting y position
let pacWidth = 20;
let pacHeight = 20;
let pacAngle = 0;             // current angle of Pac-Man's mouth
let pacSpeed = 5;             // movement speed

const pacImage = new Image();
pacImage.src = "../SodaRatAssets/rat.png";


// Listen for arrow key input
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      pacX -= pacSpeed;
      break;
    case 38: // up arrow
      pacY -= pacSpeed;
      break;
    case 39: // right arrow
      pacX += pacSpeed;
      break;
    case 40: // down arrow
      pacY += pacSpeed;
      break;
  }
});
// Define variables to keep track of the player's previous position
let prevPacX = pacX;
let prevPacY = pacY;

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();

  // Check if Pac-Man collides with any blue tiles
  let collisionDetected = false; // flag to indicate if collision has been detected
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 1) { // check if tile is blue
        const tileX = col * cellSize;
        const tileY = row * cellSize;
        // calculate distance between Pac-Man and center of tile
        const distance = Math.sqrt((pacX - tileX - cellSize / 2) ** 2 + (pacY - tileY - cellSize / 2) ** 2);
        if (distance < pacWidth + cellSize / 2) { // check if distance is less than sum of radii
          console.log("Collision detected!");
          // set flag to true and exit loops
          collisionDetected = true;
          break;
        }
      }
    }
    if (collisionDetected) { // exit outer loop if collision detected
      break;
    }
  }

  // Move player back to previous position if collision detected
  if (collisionDetected) {
    pacX = prevPacX;
    pacY = prevPacY;
  } else { // otherwise, update previous position
    prevPacX = pacX;
    prevPacY = pacY;
  }

  // Draw Pac-Man image
  ctx.drawImage(pacImage, pacX, pacY, pacWidth, pacHeight);

  // Request next frame
  requestAnimationFrame(gameLoop);
}


pacImage.addEventListener("load", function() {
  gameLoop();
  drawMap();
});
