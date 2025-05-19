"use client";

import React from "react";
import { NoteType } from "@/models/model";
import { getLine } from "@/utils/util";

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

  const y = 145 - line * 5;
  const x = 80;

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

    // ＃、♭
    let text = "";
    if (note.pitch.includes("＃")) {
      text = "＃";
    } else if (note.pitch.includes("♭")) {
      text = "♭";
    }

    context.fillStyle = "rgba(0, 200, 255, 1)";
    context.font = "12px Arial";
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - 12 - textWidth / 2, y);
  } else {
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);

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
    context.font = "12px Arial";
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - 12 - textWidth / 2, y);
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

    context.strokeStyle = "#999999";
    context.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const y = 20 + i * 10;
      context.beginPath();
      context.moveTo(10, y);
      context.lineTo(110, y);
      context.stroke();
    }

    context.beginPath();
    context.moveTo(65, 50);
    context.lineTo(95, 50);
    context.stroke();

    for (let i = 0; i < 5; i++) {
      const y = 60 + i * 10;
      context.beginPath();
      context.moveTo(10, y);
      context.lineTo(110, y);
      context.stroke();
    }

    context.beginPath();
    context.moveTo(65, 110);
    context.lineTo(95, 110);
    context.stroke();

    for (let i = 0; i < 3; i++) {
      const y = 120 + i * 10;
      context.beginPath();
      context.moveTo(10, y);
      context.lineTo(110, y);
      context.stroke();
    }

    // circle
    context.beginPath();
    context.arc(30, 25, 2, 0, Math.PI * 2);
    context.arc(30, 35, 2, 0, Math.PI * 2);
    context.arc(30, 65, 2, 0, Math.PI * 2);
    context.arc(30, 75, 2, 0, Math.PI * 2);
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
      <canvas ref={canvasRef} width={120} height={150} style={{ width: "100%" }} />
    </div>
  );
};

export default Staff;
