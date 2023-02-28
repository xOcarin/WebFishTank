const canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

// Load the image
const fish = new Image();
fish.src = 'fish.png';









// Set the initial position of the image
let posX = 535;
let posY = 293;

// Set the size of the image
const width = 167;
const height = 77;

let speed = 5; // the speed at which the image moves
let checkH = true;
let checkV = false;

let checkR1 = false;
let checkR2 = false;

// Draw the image on the canvas
fish.onload = function() {
  ctx.drawImage(fish, posX, posY, width, height);
};

//mouse info vars
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let isDown = false;
let isMouseThere = false;


//random adjust speed every ten seconds:
setInterval(function() {
    speed = Math.floor(Math.random() * 15) + 1;
    console.log(speed);
  }, 10000); // 10000 milliseconds = 10 seconds



  setInterval(function() {
    console.log(speed);
    if(isDown == false && isMouseThere == false){
      // check if fish is at left edge of canvas
      if (posX <= 0) {
        // set check to move fish right
        checkH = false;
        console.log('HIT LEFT SIDE!!!!!!!!!!!!');

      }
      else if(posY >= 645) {
        checkV = false;
      }
      // check if fish is at right edge of canvas
      else if (posX + width >= 1280) {
        // set check to move fish left
        checkH = true;
        console.log('HIT RIGHT SIDE!!!!!!!!!!!!');
      }
      else if(posY + height <= 75) {
        checkV = true;
      }

      if(Math.floor(Math.random() * 20) + 1 == (1 || 2)){
        checkV = !checkV;
      }
      if(Math.floor(Math.random() * 30) + 1 == (1 || 2)){
        checkH = !checkH
      }




      // update position based on check value
      if (checkH == true) {
        posX -= speed;
        fish.src = 'fish.png';
        if(checkV == false) {
          posY -= speed;
        }
        else{
          posY += speed;
        }
        console.log('moving left');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fish, posX, posY, width, height);
      }
      else if (checkH == false)  {
        posX += speed;
        fish.src = 'fishR.png';
        if(checkV == true){
          posY += speed;
        }
        else{
          posY -= speed;
        }
        console.log('moving right');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(fish, posX, posY, width, height);
      }
    }
    else {
      console.log('inInterval: ' + isDown)
    }
  }, 50);




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

canvas.addEventListener("mouseover", function(event) {
  console.log("Mouse entered the canvas!");
  isMouseThere = true;
});

canvas.addEventListener("mouseout", function(event) {
  console.log("Mouse left the canvas!");
  isMouseThere = false;
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
