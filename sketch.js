const stars = document.querySelector(".canvas");
const starsCtx = stars.getContext("2d");

let text = document.querySelector(".card:nth-child(2) .text");
text.innerHTML = getTwoYearsTime();

var screen, starArr;
var params = { speed: 2, count: 400, extinction: 10 };
var size = [window.innerWidth, window.innerHeight];
setup();
updateStars();

window.onresize = function () {
  setup();
};

function getMonthName(idx) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[idx];
}

function getTwoYearsTime() {
  let d1 = new Date();
  let d2 = new Date();

  d2.setFullYear(d1.getFullYear() + 2);

  d2 = new Date(d2 - 60 * 24 * 60 * 60000);

  return `${getMonthName(d1.getMonth()).substr(
    0,
    3
  )} ${d1.getFullYear()} - ${getMonthName(d2.getMonth()).substr(
    0,
    3
  )} ${d2.getFullYear()}`;
}

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
    h: document.documentElement.scrollHeight,
    c: [window.innerWidth * 0.5, document.documentElement.scrollHeight * 0.5],
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
