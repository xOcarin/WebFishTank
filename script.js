const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

// Load the image
const fish = new Image();
fish.src = 'fish.png';


// Set the initial position of the image
let posX = 1280;
let posY = 0;

// Set the size of the image
const width = 200;
const height = 121;

let speed = 10; // the speed at which the image moves
let checkH = 0;
let checkV = 0;

// Draw the image on the canvas
fish.onload = function() {
  ctx.drawImage(fish, posX, posY, width, height);
};

//mouse info vars
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let isDown = false;



// Update the position of the image every 10 milliseconds

  setInterval(function() {
    if(isDown == false){
      // check if fish is at left edge of canvas
      if (posX <= 0) {
        // set check to move fish right
        checkH = 0;
        console.log('HIT LEFT SIDE!!!!!!!!!!!!');
        fish.src = 'fishR.png';
      }
      else if(posY >= 720) {
        checkV = 0;
      }
      // check if fish is at right edge of canvas
      else if (posX + width >= 1280) {
        // set check to move fish left
        checkH = 1;
        console.log('HIT RIGHT SIDE!!!!!!!!!!!!');
        fish.src = 'fish.png';
      }
      else if(posY  + height < 0) {
        checkV = 1;
      }




      // update position based on check value
      if (checkH == 1) {
        posX -= speed;
        if(checkV == 0) {
          posY += speed;
        }
        else{
          posY -= speed;
        }
        console.log('moving left');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fish, posX, posY, width, height);
      } 
      else if (checkH == 0)  {
        posX += speed;
        if(checkV == 1){
          posY -= speed;
        }
        else{
          posY += speed;
        }
        console.log('moving right');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fish, posX, posY, width, height);
      }
    }
    else {
      console.log('inInterval: ' + isDown)
    }
  }, 10);




// Listen for mousedown event
canvas.addEventListener('mousedown', function(event) {
  // Get the coordinates of the click relative to the canvas
  const x = event.offsetX;
  const y = event.offsetY;
  // Check if the click occurred within the boundaries of the image
  if (x >= posX && x < posX + width && y >= posY && y < posY + height) {
    isDragging = true;
    isDown = true;
    dragOffsetX = x - posX;
    dragOffsetY = y - posY;
  }
  console.log('inevent: ' + isDown)
});

// Listen for mousemove event
canvas.addEventListener('mousemove', function(event) {
  if (isDragging) {
    // Get the coordinates of the mouse relative to the canvas
    const x = event.offsetX;
    const y = event.offsetY;

    // Update the position of the image
    posX = x - dragOffsetX;
    posY = y - dragOffsetY;

    // Redraw the canvas with the updated position of the image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fish, posX, posY, width, height);
  }
});

// Listen for mouseup event
canvas.addEventListener('mouseup', function(event) {
  isDragging = false;
  isDown = false;
  /*posX = 410;
  posY = 225;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, posX, posY, width, height);*/



});









window.addEventListener("load", function () {
    update();
});
