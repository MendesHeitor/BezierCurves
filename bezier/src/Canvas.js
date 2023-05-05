import React from "react";
import Sketch from "./Sketch";
import { Button } from "react-bootstrap";
import "./Canvas.css";

const Canvas = () => {
  return (
    <div className="canvas">
      <div className="buttons">
        <Button className="button" variant="light">
          Toggle
        </Button>
        <Button className="button" variant="light">
          Add
        </Button>
        <Button className="button" variant="light">
          Delete
        </Button>
        <Button className="button" variant="light">
          Clear All
        </Button>
      </div>
      <Sketch />
    </div>
  );
};

export default Canvas;
