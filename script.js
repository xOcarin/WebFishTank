
let users = [];
let fishAmt = 0;

function getUsernames() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "getusernames.php",
      dataType: "json",
      success: function(data) {
        let i = 0;
        usernames = data;
        usernames.forEach(function(username) {
          users[i] = usernames[i];
          i++;
        });
        fishAmt = usernames.map(username => username.trim()).length;
        resolve();
      },
      error: function(error) {
        reject(error);
      }
    });
  });
}

getUsernames()
  .then(() => {
    // Code that needs the data from the AJAX call can be executed here
    class Fish {
      constructor(x, y, width, height, speed, ctx, name) {
        this.image = new Image();
        this.image.src = 'fish_spritesheet.png';
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.checkH = true;
        this.checkV = false;
        this.originalWidth = canvas.width * 0.0572916666666667;
        this.originalHeight = canvas.height * 0.0467592592592593;
        this.numFrames = 9;
        this.frameWidth = 167;
        this.frameHeight = 77;
        this.spriteSheetX = 0;
        this.spriteSheetY = 0;
        this.currentFrame = 0;
        this.animationSpeed = 15;
        this.lastFrameTime = 0;
        this.name = name;
        this.ctx;
      }

      updateDimensions() {
        const widthRatio = canvas.width / 3840;
        const heightRatio = canvas.height / 2160;
        const ratio = Math.min(widthRatio, heightRatio);
        this.width = this.originalWidth * ratio;
        this.height = this.originalHeight * ratio;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
      }

      animate() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime >= 1000 / this.animationSpeed) {
          const sourceX = this.spriteSheetX + this.currentFrame * this.frameWidth;
          const sourceY = this.spriteSheetY;
          const sourceWidth = this.frameWidth;
          const sourceHeight = this.frameHeight;

          //ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(this.image, sourceX, sourceY, sourceWidth, sourceHeight, this.x, this.y, this.width, this.height);

          // get the width of the text
          const textWidth = ctx.measureText(this.name).width;

          // adjust the x-coordinate so the text is centered on the fish
          const textX = this.x + (this.width / 2) - (textWidth / 2);

          // draw the text
          ctx.font = "15px 'Comic Sans'";
          ctx.fillStyle = "black";
          ctx.fillText(this.name, textX, this.y + this.height - 65);


          this.currentFrame = (this.currentFrame + 1) % this.numFrames;
          this.lastFrameTime = currentTime;
        }
      }

      move() {
        if (this.x <= 0) {
          this.checkH = false;
        } else if (this.y >= (canvas.height - 75)) {
          this.checkV = false;
        } else if (this.x + this.width >= canvas.width) {
          this.checkH = true;
        } else if (this.y + this.height <= 75) {
          this.checkV = true;
        }

        if (Math.floor(Math.random() * 20) + 1 === (1 || 2)) {
          this.checkV = !this.checkV;
        }
        if (Math.floor(Math.random() * 30) + 1 === (1 || 2)) {
          this.checkH = !this.checkH;
        }

        if (this.checkH === true) {
          this.x -= this.speed;
          this.image.src = 'fish_spritesheet.png';
          if (this.checkV === false) {
            this.y -= this.speed;
          } else {
            this.y += this.speed;
          }
          //this.animate();
        } else if (this.checkH === false) {
          this.x += this.speed;
          this.image.src = 'fish_spritesheetR.png';
          if (this.checkV === true) {
            this.y += this.speed;
          } else {
            this.y -= this.speed;
          }
          //this.animate()
        }
      }} //fish object



    console.log(users);
    console.log(fishAmt);

    // Rest of the program that requires the `users` array and `fishAmt` variable
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = 3840;
    canvas.height = 2160;
    const numFish = fishAmt;
    const allFish = [];

    for (let i = 0; i < numFish; i++) {

      allFish.push(new Fish(canvas.width/2, canvas.height/2, canvas.width * 0.0572916666666667, canvas.height * 0.0467592592592593, 5, ctx, users[i]));
      console.log("test: " + allFish[i].name);
    }

    function updateFishDimensions() {
      const widthRatio = canvas.width / 3840;
      const heightRatio = canvas.height / 2160;
      const ratio = Math.min(widthRatio, heightRatio);


      allFish.forEach((fish) => {
        fish.width = fish.originalWidth * ratio;
        fish.height = fish.originalHeight * ratio;

        let minx = 100;
        let maxx = canvas.width;
        let miny = 100;
        let maxy = canvas.height;
        let sx = Math.floor(Math.random() * (maxx - minx + 1) + minx);
        let sy = Math.floor(Math.random() * (maxy - miny + 1) + miny);

        fish.x = sx;
        fish.y = sy;
      });
    }

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      updateFishDimensions(); // call function on resize
    });

    window.dispatchEvent(new Event('resize'));

    function animateAllFish() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      allFish.forEach((fish) => {
        fish.animate();
      });
    }

    const moveFishInterval = setInterval(() => {
      allFish.forEach((fish) => {
        fish.move(canvas.width, canvas.height);
      });
    }, 100);

    setInterval(() => {
      animateAllFish();
    }, 100);

  })
  .catch(error => {
    console.log(error);
  });
