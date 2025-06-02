"use client";

import { NoteType } from "@/schemas/trackSchema";
import React from "react";

const drawArrow = (context: CanvasRenderingContext2D, x: number, y: number, direction: "down" | "up") => {
  context.beginPath();
  if (direction === "down") {
    context.moveTo(x - 4, y + 5);
    context.lineTo(x - 4, y - 5);
    context.lineTo(x + 4, y - 5);
    context.lineTo(x + 4, y + 5);
    context.moveTo(x - 4, y - 4);
    context.lineTo(x + 4, y - 4);
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

const drawLines = (context: CanvasRenderingContext2D) => {
  context.strokeStyle = "#999999";
  context.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const y = 20 + i * 20;
    context.beginPath();
    context.moveTo(10, y);
    context.lineTo(210, y);
    context.stroke();
  }
};

const drawLine = (context: CanvasRenderingContext2D, note: NoteType) => {
  // string
  context.strokeStyle = "#999999";
  context.lineWidth = 3;
  const y = 20 + (note.right!.string - 1) * 20;
  context.beginPath();
  context.moveTo(10, y);
  context.lineTo(210, y);
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
    note.right.muteStrings.forEach((muteString) => {
      const y = 20 + (muteString - 1) * 20;
      context.beginPath();
      context.arc(140, y, 10, 0, Math.PI * 2);

      context.fillStyle = "black";
      context.fill();

      context.fillStyle = "#555555";
      context.font = "20px Verdana";
      const text = "×";
      const textWidth = context.measureText(text).width;
      context.fillText(text, 148 - textWidth, y + 6);
    });
  }
};

type RightProps = {
  note: NoteType;
  nextNote?: NoteType | null;
};

const Right: React.FC<RightProps> = (props) => {
  const { note, nextNote = null } = props;
  const bgCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = React.useRef<HTMLCanvasElement>(null);

  // 背景（弦の線など）は初回のみ描画
  React.useEffect(() => {
    if (!bgCanvasRef.current) {
      return;
    }
    const canvas = bgCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("2D context not available");
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines(context);
  }, []);

  // 前景（ノートや矢印など）はnote/nextNote変更時に描画
  React.useEffect(() => {
    if (!fgCanvasRef.current) {
      return;
    }
    const canvas = fgCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      console.error("2D context not available");
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(context, note);
    if (nextNote) {
      drawNote(context, nextNote, true);
    }
    drawNote(context, note);
  }, [note, nextNote]);

  return (
    <div
      style={{
        position: "relative",
        width: 220,
        aspectRatio: "220 / 115",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={bgCanvasRef}
        width={220}
        height={115}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1, width: "100%", height: "100%" }}
      />
      <canvas
        ref={fgCanvasRef}
        width={220}
        height={115}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 2,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Right;
