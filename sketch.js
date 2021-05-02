const stars = document.getElementById("stars");
const starsCtx = stars.getContext("2d");

var screen, starArr;
var params = { speed: 2, count: 400, extinction: 10 };
var size = [window.innerWidth, window.innerHeight];
setup();
updateStars();

window.onload = function () {
  let sX = (window.innerWidth / 1920) * 1;
  let sY = (window.innerHeight / 1080) * 1;
  sX === 1
    ? null
    : (document.querySelector("#MarsIMG").style.transform = `scale(${
        (sX + sY) / 2
      }) translate(-${sX * 100 + 5}%, -${sY * 100 + 1}%)`);
};

window.onresize = function () {
  setup();
  window.onload();
};

function Star() {
  this.x = Math.random() * stars.width;
  this.y = Math.random() * stars.height;
  this.z = Math.random() * stars.width;

  this.move = function () {
    this.z -= params.speed;
    if (this.z <= 0) {
      this.z = stars.width;
    }
  };

  this.show = function () {
    let x, y, radius, opacity;

    x = (this.x - screen.c[0]) * (stars.width / this.z);
    x = x + screen.c[0];
    y = (this.y - screen.c[1]) * (stars.width / this.z);
    y = y + screen.c[1];
    radius = stars.width / this.z;

    opacity =
      radius > params.extinction ? 1.5 * (2 - radius / params.extinction) : 1;

    starsCtx.beginPath();
    starsCtx.fillStyle = "rgba(255,255,255," + opacity + ")";
    starsCtx.arc(x, y, radius, 0, Math.PI * 2);
    starsCtx.fill();
  };
}

function setup() {
  screen = {
    w: window.innerWidth,
    h: window.innerHeight,
    c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
  };
  window.cancelAnimationFrame(updateStars);

  stars.width = screen.w;
  stars.height = screen.h;

  starArr = [];

  for (var i = 0; i < params.count; i++) {
    starArr[i] = new Star();
  }
}

function updateStars() {
  starsCtx.fillStyle = "black";
  starsCtx.fillRect(0, 0, stars.width, stars.height);
  starArr.forEach(function (s) {
    s.show();
    s.move();
  });
  window.requestAnimationFrame(updateStars);
}
