const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionMap = [];
for (let i = 0; i < collision.length; i += 70) {
  collisionMap.push(collision.slice(i, i + 70));
}

class Boundarywall {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];
const offset = {
  x: -740,
  y: -580,
};

collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundarywall({
          position: {
            x: j * Boundarywall.width + offset.x,
            y: i * Boundarywall.height + offset.y,
          },
        })
      );
  });
});

console.log(boundaries);

const image = new Image();
image.src = "./img/maya-nagri2.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

class Sprint {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprint({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const testBoundary = new Boundarywall({
  position: {
    x: 400,
    y: 400,
  },
});

const movables = [background, testBoundary];
function animation() {
  window.requestAnimationFrame(animation);
  background.draw();
  //   boundaries.forEach((boundary) => {
  //     boundary.draw();
  //   });
  testBoundary.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );

  if (keys.w.pressed && lastkey === "w") {
    movables.forEach((movable) => {
      movable.position.y += 3;
    });
  } else if (keys.a.pressed && lastkey === "a") {
    movables.forEach((movable) => {
      movable.position.x += 3;
    });
  } else if (keys.s.pressed && lastkey === "s") {
    movables.forEach((movable) => {
      movable.position.y -= 3;
    });
  } else if (keys.d.pressed && lastkey === "d") {
    movables.forEach((movable) => {
      movable.position.x -= 3;
    });
  }
}
animation();

let lastkey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastkey = "w";
      break;

    case "a":
      keys.a.pressed = true;
      lastkey = "a";
      break;

    case "s":
      keys.s.pressed = true;
      lastkey = "s";
      break;

    case "d":
      keys.d.pressed = true;
      lastkey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;

    case "s":
      keys.s.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;
  }
  console.log(keys);
});
