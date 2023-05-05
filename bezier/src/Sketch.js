import p5 from 'p5';
import React from 'react';

const Sketch = () => {
  let points = [];

  const addPoint = (p) => {
    // Add a new point to the points array
    const newPoint = { x: p.mouseX, y: p.mouseY };
    points.push(newPoint);
  };

  const draw = (p) => {
    p.stroke(255, 0, 0); // set the stroke color to red
    p.strokeWeight(5);
  
    // Draw the Bezier curve using the points in the array
    if (points.length >= 4) {
      p.noFill();
      p.beginShape();
      p.vertex(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 2; i++) {
        const x1 = points[i].x;
        const y1 = points[i].y;
        const x2 = points[i + 1].x;
        const y2 = points[i + 1].y;
        const x3 = points[i + 2].x;
        const y3 = points[i + 2].y;
        p.bezierVertex(x1, y1, x2, y2, x3, y3);
      }
      p.endShape();
    }
  
    // Draw the points on the canvas
    p.fill(255, 255, 0); // set the fill color to yellow
    for (let i = 0; i < points.length; i++) {
      p.point(points[i].x, points[i].y);
    }
  };
  

  return <SketchWrapper addPoint={addPoint} draw={draw} />;
};

const SketchWrapper = ({ addPoint, draw }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        paddingRight: '50px',
        paddingLeft: '50px',
      }}
    >
      <div
        ref={(ref) =>
          new p5((p) => {
            p.setup = () => {
              p.createCanvas(1500, 850);
              p.background(16, 26, 19); // set the background color to light blue

              // Attach a mousePressed event listener to the canvas
              p.mousePressed = () => {
                addPoint(p);
              };
            };

            p.draw = () => {
              draw(p);
            };
          }, ref)
        }
      />
    </div>
  );
};

export default Sketch;