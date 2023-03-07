const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
const fish = {
  image: new Image(),
  x: 535,
  y: 293,
  width: 167,
  height: 77,
  speed: 5,
  checkH: true,
  checkV: false,
  checkR1: false,
  checkR2: false,
  isDragging: false,
  dragOffsetX: 0,
  dragOffsetY: 0,
  isDown: false,
  isMouseThere: false,
};

fish.image.src = 'fish.png';

fish.image.onload = function() {
  ctx.drawImage(fish.image, fish.x, fish.y, fish.width, fish.height);
};

const randomSpeedInterval = setInterval(() => {
  fish.speed = Math.floor(Math.random() * 15) + 1;
  console.log(fish.speed);
}, 10000);

const moveFishInterval = setInterval(() => {
  if (fish.isDown === false && fish.isMouseThere === false) {
    if (fish.x <= 0) {
      fish.checkH = false;
      console.log('HIT LEFT SIDE!!!!!!!!!!!!');
    } else if (fish.y >= 645) {
      fish.checkV = false;
    } else if (fish.x + fish.width >= 1280) {
      fish.checkH = true;
      console.log('HIT RIGHT SIDE!!!!!!!!!!!!');
    } else if (fish.y + fish.height <= 75) {
      fish.checkV = true;
    }

    if (Math.floor(Math.random() * 20) + 1 === (1 || 2)) {
      fish.checkV = !fish.checkV;
    }
    if (Math.floor(Math.random() * 30) + 1 === (1 || 2)) {
      fish.checkH = !fish.checkH;
    }

    if (fish.checkH === true) {
      fish.x -= fish.speed;
      fish.image.src = 'fish.png';
      if (fish.checkV === false) {
        fish.y -= fish.speed;
      } else {
        fish.y += fish.speed;
      }
      console.log('moving left');
    } else if (fish.checkH === false) {
      fish.x += fish.speed;
      fish.image.src = 'fishR.png';
      if (fish.checkV === true) {
        fish.y += fish.speed;
      } else {
        fish.y -= fish.speed;
      }
      console.log('moving right');
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fish.image, fish.x, fish.y, fish.width, fish.height);
  } else {
    console.log('inInterval: ' + fish.isDown);
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
