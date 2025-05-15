"use client";

import React from "react";
import { NoteType } from "./model";

const drawArrow = (context: CanvasRenderingContext2D, x: number, y: number, direction: "down" | "up") => {
  context.beginPath();
  if (direction === "down") {
    context.moveTo(x - 4, y + 5);
    context.lineTo(x - 4, y - 5);
    context.lineTo(x + 4, y - 5);
    context.moveTo(x - 4, y - 4);
    context.lineTo(x + 4, y - 4);
    context.moveTo(x + 4, y - 5);
    context.lineTo(x + 4, y + 5);
  } else {
    context.moveTo(x, y + 7);
    context.lineTo(x - 4, y - 5);
    context.moveTo(x, y + 7);
    context.lineTo(x + 4, y - 5);
  }

  context.strokeStyle = "#333333";
  context.lineWidth = 2;
  context.stroke();
};

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  if (!note.right) {
    return;
  }

  if (next) {
    const found = note.lefts.find((left) => {
      return left.type === "press";
    });
    if (found) {
      const nextY = 20 + (found.string - 1) * 20;
      const nextX = 80;

      context.beginPath();
      context.shadowBlur = 10;
      context.shadowColor = "rgba(0, 200, 255, 1)";
      context.arc(nextX, nextY, 10, 0, Math.PI * 2);
      context.fillStyle = "rgba(0, 200, 255, 0.2)";
      context.fill();

      // ぼかしをリセット
      context.shadowBlur = 0;
      context.shadowColor = "transparent";
    }
  } else {
    const y = 20 + (note.right.string - 1) * 20;
    const x = 80;

    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);

    context.fillStyle = "white";
    context.fill();

    context.fillStyle = "black";
    context.font = "bold 12px Verdana";
    // const text = `${note.right.finger} ${note.right.stroke === "down" ? "↓" : "↑"}`;
    // const text = `${note.right.stroke === "down" ? "↑" : "↓"}`;
    drawArrow(context, x, y, note.right.stroke === "down" ? "down" : "up");
    // const textWidth = context.measureText(text).width;
    // context.fillText(text, x - textWidth / 2, y + 4);

    // mute
    note.right.mute_strings.forEach((muteString) => {
      const y = 20 + (muteString - 1) * 20;
      context.beginPath();
      context.arc(140, y, 10, 0, Math.PI * 2);

      context.fillStyle = "black";
      context.fill();
    });
  }
};

type RightScoreProps = {
  note: NoteType;
  nextNote?: NoteType | null;
};

const RightScore: React.FC<RightScoreProps> = (props) => {
  const { note, nextNote = null } = props;
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

    context.strokeStyle = "#999999";
    context.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const y = 20 + i * 20;
      context.beginPath();
      context.moveTo(10, y);
      context.lineTo(210, y);
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

    // next
    if (nextNote) {
      drawNote(context, nextNote, true);
    }

    drawNote(context, note);
  }, [note, nextNote]);

  return (
    <div>
      <canvas ref={canvasRef} width={220} height={115} style={{ width: "100%" }} />
    </div>
  );
};

export default RightScore;
