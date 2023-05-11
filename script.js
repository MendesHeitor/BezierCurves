window.addEventListener("contextmenu", (e) => e.preventDefault());

let allCurves = [];
let currentCurveIndex = 0;

let currentCurveColor;

let showPointsCheckbox;
let showLinesCheckbox;
let showCurvesCheckbox;

let nEvaluationsValue = 80;

let onPoint = false;
let pointMoving = false;
let currPoint;
let currentPointIndex = null;
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDragging = false;
    this.dragStartX = x;
    this.dragStartY = y;
  }
}

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

class Curve {
  constructor(color) {
    this.color = color;
    this.points = [];
    this.curve = [];
  }
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
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;

  if(mouseButton === RIGHT){
    if(onPoint) allCurves[currentCurveIndex].points.splice(currentPointIndex, 1);
    return;
  }

  if (onPoint) {
    pointMoving = true;
    return;
  }
  allCurves[currentCurveIndex].points.push(new Point(mouseX, mouseY));
  pointMoving = true;
}
  

function mouseDragged() {
  //console.log(pointMoving, onPoint)
  if (pointMoving && onPoint) {
    allCurves[currentCurveIndex].points[currentPointIndex].x = mouseX;
    allCurves[currentCurveIndex].points[currentPointIndex].y = mouseY;
  }
}

function mouseReleased() {
  pointMoving = false;
  onPoint = false;
}

function toggleCurve() {
  currentCurveIndex = (currentCurveIndex + 1) % allCurves.length;
}

function interpolate(t, p0, p1) {
  return { x: (1 - t) * p0.x + t * p1.x, y: (1 - t) * p0.y + t * p1.y };
}

function deCasteljau(points, nEvaluations) {
  if (points === undefined || points.length < 1) return [];
  result = [];
  start = points[0];
  for (let t = 0; t <= 1; t += 1 / nEvaluations) {
    controls = points;

    while (controls.length > 1) {
      aux = [];

      for (i = 0; i < controls.length - 1; i++) {
        aux[i] = interpolate(t, controls[i], controls[i + 1]);
      }
      controls = aux;
    }
    result.push(controls[0]);
  }
  return result;
}

function setup() {
  createCanvas(windowWidth - 280, windowHeight - 20);
  addCurve();

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

  let slider = document.getElementById("slider");
  let sliderValue = document.getElementById("slider-value");
  sliderValue.textContent = nEvaluationsValue;

  slider.addEventListener("input", () => {
    nEvaluationsValue = slider.value;
    sliderValue.textContent = nEvaluationsValue;
  });

  showPointsCheckbox = document.getElementById("showPointsCheckbox");

  showLinesCheckbox = document.getElementById("showLinesCheckbox");

  showCurvesCheckbox = document.getElementById("showCurvesCheckbox");
}

function draw() {
  onPoint = false;
  clear();

  stroke(255, 255, 255);
  fill(0);

  currentCurveColor = allCurves[currentCurveIndex].color;
  toggleCurveButton.style.backgroundColor = `rgb(${currentCurveColor.r}, ${currentCurveColor.g}, ${currentCurveColor.b})`;

  for (let i = 0; i < allCurves.length; i++) {
    if (showPointsCheckbox.checked) {
      for (let j = 0; j < allCurves[i].points.length; j++) {
        currPoint = allCurves[i].points[j];
        
        stroke(allCurves[i].color.r, allCurves[i].color.g, allCurves[i].color.b);
        strokeWeight(10);
        if(i === currentCurveIndex && dist(currPoint.x, currPoint.y, mouseX, mouseY) <= 7){
          strokeWeight(16);
          stroke(255, 255, 255, 100);
          point(mouseX, mouseY);
          onPoint = true;
          currentPointIndex = j;
        }else{
          point(currPoint.x, currPoint.y);
        }
      }
    }

    if (showLinesCheckbox.checked) {
      stroke(
        allCurves[i].color.r,
        allCurves[i].color.g,
        allCurves[i].color.b,
        55
      );
      strokeWeight(4);
      for (let j = 0; j < allCurves[i].points.length - 1; j++) {
        line(
          allCurves[i].points[j].x,
          allCurves[i].points[j].y,
          allCurves[i].points[j + 1].x,
          allCurves[i].points[j + 1].y
        );
      }
    }

    if (showCurvesCheckbox.checked) {
      stroke(allCurves[i].color.r, allCurves[i].color.g, allCurves[i].color.b);
      strokeWeight(3);
      allCurves[i].curve = deCasteljau(allCurves[i].points, nEvaluationsValue);
      for (let j = 0; j < allCurves[i].curve.length - 1; j++) {
        line(
          allCurves[i].curve[j].x,
          allCurves[i].curve[j].y,
          allCurves[i].curve[j + 1].x,
          allCurves[i].curve[j + 1].y
        );
      }
    }
  }
}
