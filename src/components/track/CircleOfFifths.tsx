"use client";

import React from "react";
import { getKeyPosition } from "@/utils/util";

const drawScale = (context: CanvasRenderingContext2D, scale: string) => {
  if (!scale) {
    return;
  }

  const position = getKeyPosition(scale);

  const centerX = 80;
  const centerY = 55;
  let radius = 40;
  if (position.circle === "inner") {
    radius = 20;
  }

  const angle = (Math.PI * 2 * (position.index - 3)) / 12;

  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  context.beginPath();
  context.arc(x, y, 5, 0, Math.PI * 2);
  context.fillStyle = "white";
  context.fill();
};

type CircleOfFifthsProps = {
  scale: string;
};

const CircleOfFifths: React.FC<CircleOfFifthsProps> = (props) => {
  const { scale } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      console.error("2D context not available");
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(80, 55, 50, 0, Math.PI * 2);
    context.strokeStyle = "#555555";
    context.lineWidth = 2;
    context.stroke();

    context.beginPath();
    context.arc(80, 55, 30, 0, Math.PI * 2);
    context.strokeStyle = "#555555";
    context.lineWidth = 1;
    context.stroke();

    const centerX = 80;
    const centerY = 55;
    const radius = 50;

    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * (i + 0.5)) / 12;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.lineTo(x, y);
      context.strokeStyle = "#555555";
      context.lineWidth = 1;
      context.stroke();
    }
  }, []);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      console.error("2D context not available");
      return;
    }

    drawScale(context, scale);
  }, [scale]);

  return (
    <div>
      <canvas ref={canvasRef} width={150} height={115} style={{ width: "100%" }} />
    </div>
  );
};

export default CircleOfFifths;
