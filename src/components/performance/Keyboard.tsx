"use client";

import { NoteType } from "@/schemas/trackSchema";
import { getLine } from "@/utils/noteUtil";
import React from "react";

const drawLines = (context: CanvasRenderingContext2D) => {
  context.strokeStyle = "#999999";

  const isWindows = navigator.userAgent.includes("Windows");
  context.lineWidth = isWindows ? 2 : 1;

  for (let i = 0; i < 24; i++) {
    const x = 20 + i * 20;
    context.beginPath();
    context.moveTo(x, 40);
    context.lineTo(x, 200);
    context.stroke();
  }

  context.fillStyle = "#555555";
  context.fillRect(14, 40, 12, 80);

  for (let i = 0; i < 3; i++) {
    const x = 54 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 2; i++) {
    const x = 134 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 3; i++) {
    const x = 194 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 2; i++) {
    const x = 274 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 3; i++) {
    const x = 334 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  for (let i = 0; i < 2; i++) {
    const x = 414 + i * 20;
    context.fillRect(x, 40, 12, 80);
  }
  context.fillRect(474, 40, 12, 80);

  // circle
  context.beginPath();
  context.arc(410, 180, 4, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();
};

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  if (!note.pitch) {
    return;
  }

  const line = getLine(note.pitch);
  const x = 30 + line * 20; // 15→30, 10→20

  let y = 160; // 80→160
  if (!Number.isInteger(line)) {
    y = 80; // 40→80
  }

  if (next) {
    context.beginPath();
    context.shadowBlur = 10; // 5→10
    context.shadowColor = "rgba(0, 200, 255, 1)";
    context.arc(x, y, 10, 0, Math.PI * 2); // 5→10
    context.fillStyle = "rgba(0, 200, 255, 0.2)";
    context.fill();

    // ぼかしをリセット
    context.shadowBlur = 0;
    context.shadowColor = "transparent";
  } else {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2); // 5→10
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

    drawLines(context);
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
      <canvas ref={canvasRef} width={500} height={230} style={{ width: "100%" }} />
    </div>
  );
};

export default Keyboard;
