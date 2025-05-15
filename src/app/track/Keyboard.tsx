"use client";

import React from "react";
import { NoteType } from "./model";
import { getLine } from "./util";

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  const line = getLine(note.pitch);
  const x = 15 + line * 10;

  let y = 80;
  if (!Number.isInteger(line)) {
    y = 40;
  }

  if (next) {
    context.beginPath();
    context.shadowBlur = 5;
    context.shadowColor = "rgba(0, 200, 255, 1)";
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = "rgba(0, 200, 255, 0.2)";
    context.fill();

    // ぼかしをリセット
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
  } else {
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
  }
};

type KeyboardProps = {
  note: NoteType;
  nextNote?: NoteType | null;
};

const Keyboard: React.FC<KeyboardProps> = (props) => {
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
    for (let i = 0; i < 24; i++) {
      const x = 10 + i * 10;
      context.beginPath();
      context.moveTo(x, 20);
      context.lineTo(x, 100);
      context.stroke();
    }

    context.fillStyle = "#555555";
    context.fillRect(7, 20, 6, 40);

    for (let i = 0; i < 3; i++) {
      const x = 27 + i * 10;
      context.fillRect(x, 20, 6, 40);
    }

    for (let i = 0; i < 2; i++) {
      const x = 67 + i * 10;
      context.fillRect(x, 20, 6, 40);
    }

    for (let i = 0; i < 3; i++) {
      const x = 97 + i * 10;
      context.fillRect(x, 20, 6, 40);
    }

    for (let i = 0; i < 2; i++) {
      const x = 137 + i * 10;
      context.fillRect(x, 20, 6, 40);
    }

    for (let i = 0; i < 3; i++) {
      const x = 167 + i * 10;
      context.fillRect(x, 20, 6, 40);
    }

    for (let i = 0; i < 2; i++) {
      const x = 207 + i * 10;
      context.fillRect(x, 20, 6, 40);
    }

    context.fillRect(237, 20, 6, 40);

    // circle
    context.beginPath();
    context.arc(205, 90, 2, 0, Math.PI * 2);
    context.fillStyle = "#555555";
    context.fill();
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
      <canvas ref={canvasRef} width={250} height={115} style={{ width: "100%" }} />
    </div>
  );
};

export default Keyboard;
