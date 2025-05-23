"use client";

import { NoteType } from "@/schemas/trackSchema";
import { getLine } from "@/utils/noteUtil";
import React from "react";

const drawLines = (context: CanvasRenderingContext2D) => {
  context.strokeStyle = "#999999";

  const isWindows = navigator.userAgent.includes("Windows");
  context.lineWidth = isWindows ? 3 : 1;

  for (let i = 0; i < 3; i++) {
    const y = 40 + i * 20;
    context.beginPath();
    context.moveTo(20, y);
    context.lineTo(220, y);
    context.stroke();
  }

  context.beginPath();
  context.moveTo(130, 100);
  context.lineTo(190, 100);
  context.stroke();

  for (let i = 0; i < 5; i++) {
    const y = 120 + i * 20;
    context.beginPath();
    context.moveTo(20, y);
    context.lineTo(220, y);
    context.stroke();
  }

  context.beginPath();
  context.moveTo(130, 220);
  context.lineTo(190, 220);
  context.stroke();

  for (let i = 0; i < 3; i++) {
    const y = 240 + i * 20;
    context.beginPath();
    context.moveTo(20, y);
    context.lineTo(220, y);
    context.stroke();
  }

  // circle
  context.beginPath();
  context.arc(60, 50, 4, 0, Math.PI * 2);
  context.arc(60, 70, 4, 0, Math.PI * 2);
  context.arc(60, 130, 4, 0, Math.PI * 2);
  context.arc(60, 150, 4, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();
};

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  if (!note.pitch) {
    return;
  }

  let line = getLine(note.pitch);
  if (note.pitch.includes("＃")) {
    line -= 0.5;
  } else if (note.pitch.includes("♭")) {
    line += 0.5;
  }

  const y = 290 - line * 10; // 145→290, 5→10
  const x = 160; // 80→160

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

    // ＃、♭
    let text = "";
    if (note.pitch.includes("＃")) {
      text = "＃";
    } else if (note.pitch.includes("♭")) {
      text = "♭";
    }

    context.fillStyle = "rgba(0, 200, 255, 1)";
    context.font = "24px Arial"; // 12px→24px
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - 24 - textWidth / 2, y); // 12→24
  } else {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2); // 5→10

    context.fillStyle = "white";
    context.fill();

    // ＃、♭
    let text = "";
    if (note.pitch.includes("＃")) {
      text = "＃";
    } else if (note.pitch.includes("♭")) {
      text = "♭";
    }

    context.fillStyle = "#999999";
    context.font = "24px Arial"; // 12px→24px
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - 24 - textWidth / 2, y); // 12→24
  }
};

type StaffProps = {
  note: NoteType;
  nextNote?: NoteType | null;
};

const Staff: React.FC<StaffProps> = (props) => {
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
      <canvas ref={canvasRef} width={240} height={300} style={{ width: "100%" }} />
    </div>
  );
};

export default Staff;
