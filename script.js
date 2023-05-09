window.addEventListener("contextmenu", (e) => e.preventDefault());

let allCurves = [];
let currentCurveIndex = 0;

let showPointsCheckbox;
let showLinesCheckbox;
let showCurvesCheckbox;

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

function Curve(color) {
  this.color = color;
  this.points = [];
  this.curve = [];
}

function init() {
  addCurve();
}

function addCurve() {
  allCurves.push(
    new Curve(
      new Color(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      )
    )
  );
}

function mousePressed() {
  if (mouseButton === LEFT) {
    allCurves[currentCurveIndex].points.push(new Point(mouseX, mouseY));
  }
}

function toggleCurve() {
  currentCurveIndex = (currentCurveIndex + 1) % allCurves.length;
}

function setup() {
  createCanvas(windowWidth - 220, windowHeight - 20);
  init();

  // delete all curves
  let clearAllCurvesButton = document.getElementById("clearAllCurvesButton");
  clearAllCurvesButton.addEventListener("click", () => {
    allCurves = [];
    addCurve();
    currentCurveIndex = 0;
  });

  // add curve
  let addCurveButton = document.getElementById("addCurveButton");
  addCurveButton.addEventListener("click", () => {
    addCurve();
    currentCurveIndex = allCurves.length - 1;
  });

  // toggle curve
  let toggleCurveButton = document.getElementById("toggleCurveButton");
  toggleCurveButton.addEventListener("click", () => {
    toggleCurve();
  });

  // delete curve
  let deleteCurveButton = document.getElementById("deleteCurveButton");
  deleteCurveButton.addEventListener("click", () => {
    allCurves.splice(currentCurveIndex, 1);
    currentCurveIndex = 0;
    if (allCurves.length === 0) {
      addCurve();
    }
  });

  showPointsCheckbox = document.getElementById("showPointsCheckbox");

  showLinesCheckbox = document.getElementById("showLinesCheckbox");
  
  showCurvesCheckbox = document.getElementById("showCurvesCheckbox");
}
function draw() {
  stroke(255, 255, 255);
  fill(0);

  allCurves.forEach((curve) => {
    if (showPointsCheckbox.checked) {
      stroke(curve.color.r, curve.color.g, curve.color.b);
      strokeWeight(10);
      curve.points.forEach((p) => {
        point(p.x, p.y); // Use `point()` function from p5.js to draw the points
      });
    }
  });
}
