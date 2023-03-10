const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = 3840;
canvas.height = 2160;


const originalFishWidth = canvas.width * 0.0572916666666667;
const originalFishHeight = canvas.height * 0.0467592592592593;
const fish = {
  image: new Image(),
  x: canvas.width/2,
  y: canvas.height/2,
  width: originalFishWidth,
  height: originalFishHeight,
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

function updateFishDimensions() {
  const widthRatio = canvas.width / 3840;
  const heightRatio = canvas.height / 2160;
  const ratio = Math.min(widthRatio, heightRatio);
  fish.width = originalFishWidth * ratio;
  fish.height = originalFishHeight * ratio;
  fish.x = canvas.width/2;
  fish.y = canvas.height/2;
}

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  updateFishDimensions(); // call function on resize
});

window.dispatchEvent(new Event('resize'));

/*fish.image.onload = function() {
  ctx.drawImage(fish.image, fish.x, fish.y, fish.width, fish.height);
};

//randomizing the fishes speed
/*const randomSpeedInterval = setInterval(() => {
  fish.speed = Math.floor(Math.random() * 15) + 1;
  console.log(fish.speed);
}, 10000);*/

// Define the number of frames in the spritesheet
const numFrames = 9;

// Define the size of each frame
const frameWidth = 167;
const frameHeight = 77;

// Define the x position of the first frame in the spritesheet
const spriteSheetX = 0;

// Define the y position of the frames in the spritesheet
const spriteSheetY = 0;

// Define the current frame index
let currentFrame = 0;

// Define the animation speed (in frames per second)
const animationSpeed = 15;

// Define the timestamp of the last frame
let lastFrameTime = 0;

function animateFish() {
  // Calculate the time since the last frame
  const currentTime = Date.now();
  const deltaTime = currentTime - lastFrameTime;

  // Only update the animation if enough time has elapsed
  if (deltaTime >= 1000 / animationSpeed) {
    // Calculate the source rectangle for the current frame
    const sourceX = spriteSheetX + currentFrame * frameWidth;
    const sourceY = spriteSheetY;
    const sourceWidth = frameWidth;
    const sourceHeight = frameHeight;

    // Draw the current frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fish.image, sourceX, sourceY, sourceWidth, sourceHeight, fish.x, fish.y, fish.width, fish.height);

    // Increment the frame index
    currentFrame = (currentFrame + 1) % numFrames;

    // Update the timestamp of the last frame
    lastFrameTime = currentTime;
  }
}

// Call the animateFish function in the moveFishInterval
const moveFishInterval = setInterval(() => {
  if (fish.isDown === false && fish.isMouseThere === false) {
    if (fish.x <= 0) {
      fish.checkH = false;
      //console.log('HIT LEFT SIDE!!!!!!!!!!!!');
    } else if (fish.y >= (canvas.height - 75)) {
      fish.checkV = false;
    } else if (fish.x + fish.width >= canvas.width) {
      fish.checkH = true;
      //console.log('HIT RIGHT SIDE!!!!!!!!!!!!');
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
      fish.image.src = 'fish_spritesheet.png';
      if (fish.checkV === false) {
        fish.y -= fish.speed;
      } else {
        fish.y += fish.speed;
      }
      animateFish();
      //console.log('moving left');
    } else if (fish.checkH === false) {
      fish.x += fish.speed;
      fish.image.src = 'fish_spritesheetR.png';
      if (fish.checkV === true) {
        fish.y += fish.speed;
      } else {
        fish.y -= fish.speed;
      }
      animateFish();
      //console.log('moving right');
    }


  } else {
    console.log('inInterval: ' + fish.isDown);
  }
}, 100);
