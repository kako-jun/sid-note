"use client";

import { NoteType } from "@/schemas/trackSchema";
import React from "react";

// const setupCanvas = (canvas: HTMLCanvasElement) => {
//   const context = canvas.getContext("2d");
//   if (!context) return;

//   // デバイスのピクセル密度を取得
//   const devicePixelRatio = window.devicePixelRatio || 1;

//   // CanvasのCSSサイズを取得
//   const width = canvas.clientWidth;
//   const height = canvas.clientHeight;

//   // Canvasの解像度をデバイスピクセル密度に合わせて設定
//   canvas.width = width * devicePixelRatio;
//   canvas.height = height * devicePixelRatio;

//   // スケールを調整
//   context.scale(devicePixelRatio, devicePixelRatio);
// };

const drawLines = (context: CanvasRenderingContext2D) => {
  // string
  context.strokeStyle = "#999999";
  context.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const y = 20 + i * 20;
    context.beginPath();
    context.moveTo(10, y);
    context.lineTo(2410, y);
    context.stroke();
  }

  // fret
  const verticalLineCount = 24;
  const spacing = 2400 / verticalLineCount;
  context.fillStyle = "#999999";
  context.font = "12px Arial";
  for (let i = 0; i <= verticalLineCount; i++) {
    const x = 10 + i * spacing;
    context.beginPath();
    context.moveTo(x, 10);
    context.lineTo(x, 90);
    context.stroke();

    const text = `${i}`;
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - textWidth / 2, 105);
  }

  // circle
  context.beginPath();
  context.arc(260, 50, 5, 0, Math.PI * 2);
  context.arc(460, 50, 5, 0, Math.PI * 2);
  context.arc(660, 50, 5, 0, Math.PI * 2);
  context.arc(860, 50, 5, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();

  context.beginPath();
  context.arc(1160, 30, 5, 0, Math.PI * 2);
  context.arc(1160, 70, 5, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();

  context.beginPath();
  context.arc(1460, 50, 5, 0, Math.PI * 2);
  context.arc(1660, 50, 5, 0, Math.PI * 2);
  context.arc(1860, 50, 5, 0, Math.PI * 2);
  context.arc(2060, 50, 5, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();

  context.beginPath();
  context.arc(2360, 30, 5, 0, Math.PI * 2);
  context.arc(2360, 70, 5, 0, Math.PI * 2);
  context.fillStyle = "#555555";
  context.fill();
};

const drawNote = (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
  if (next) {
    const found = note.lefts.find((left) => {
      return left.type === "press";
    });
    if (found) {
      const nextY = 20 + (found.string - 1) * 20;
      const nextX = 10 + found.fret * (2400 / 24);

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
    note.lefts.forEach((left) => {
      const y = 20 + (left.string - 1) * 20;
      const x = 10 + left.fret * (2400 / 24);

      // finger
      if (left.type !== "chord" && left.fret > 0) {
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI);
        context.fillStyle = "rgba(50, 0, 255, 0.2)";
        context.fill();
        context.fillRect(x - 20, 0, 40, 20 + 20 * (left.string - 1));

        // 指アイコン描画
        const fingerIcons: Record<string, string> = {
          "1": "👆", // 人差し指
          "2": "✌️", // 中指
          "3": "💍", // 薬指→お姉さん
          "4": "🟣", // 小指
        };
        const icon = fingerIcons[String(left.finger)] || `${left.finger}`;
        context.font = "20px serif";
        context.textAlign = "center";
        context.textBaseline = "top";
        context.fillText(icon, x, 2); // y軸小さい位置に表示
      }

      // string
      if (left.type === "press") {
        context.strokeStyle = "#999999";
        context.lineWidth = 3;
        const y = 20 + (left.string - 1) * 20;
        context.beginPath();
        context.moveTo(10, y);
        context.lineTo(2410, y);
        context.stroke();
      }

      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI * 2);

      switch (left.type) {
        case "press":
          if (left.interval === "1") {
            context.fillStyle = "khaki";
          } else {
            context.fillStyle = "#cccccc";
          }
          break;
        case "mute":
          context.fillStyle = "black";
          break;
        case "ghost_note":
          context.fillStyle = "black";
          break;
        case "chord":
          context.ellipse(x, y, 32, 10, 0, 0, Math.PI * 2);
          if (left.interval === "1") {
            context.fillStyle = "khaki";
          } else {
            context.fillStyle = "#cccccc";
          }
          break;
        default:
          context.fillStyle = "white";
      }
      context.fill();

      switch (left.type) {
        case "press":
          context.fillStyle = "black";
          break;
        case "mute":
          context.fillStyle = "white";
          break;
        case "ghost_note":
          context.fillStyle = "white";
          break;
        case "chord":
          context.fillStyle = "black";
          break;
        default:
          context.fillStyle = "black";
      }

      // context.font = "bold 12px Arial";
      context.font = "12px Verdana";
      let text = left.fret > 0 ? `${left.finger}` : "";
      if (left.type === "chord") {
        text = `${left.pitch}`;
      }

      const textWidth = context.measureText(text).width;
      context.fillText(text, x - textWidth / 2, y + 4);

      if (left.interval) {
        context.fillStyle = "white";
        context.font = "12px Arial";
        const text = left.interval;
        const textWidth = context.measureText(text).width;
        if (left.type === "chord") {
          context.fillText(text, x + 40 - textWidth / 2, y - 4);
        } else {
          context.fillText(text, x + 20 - textWidth / 2, y - 4);
        }
      }
    });
  }
};

type LeftProps = {
  note: NoteType;
  nextNote?: NoteType | null;
  scrollLeft?: number;
  onScroll?: (left: number) => void;
};

const Left: React.FC<LeftProps> = (props) => {
  const { note, nextNote = null, scrollLeft, onScroll } = props;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const lastX = React.useRef(0);

  React.useEffect(() => {
    if (parentRef.current && typeof scrollLeft === "number") {
      if (parentRef.current.scrollLeft !== scrollLeft) {
        parentRef.current.scrollLeft = scrollLeft;
      }
    }
  }, [scrollLeft]);

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    // setupCanvas(canvas);

    const context = canvas.getContext("2d");
    if (!context) return;

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

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      canvas.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      // scrollLeftの現在値にdxの符号を反転して加算
      // 移動量を増幅（例: 2倍）
      const amplify = 3;
      if (onScroll && typeof scrollLeft === "number") {
        onScroll(Math.max(0, scrollLeft - dx * amplify));
      }
      lastX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "default";
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scrollLeft, onScroll]);

  return (
    <div ref={parentRef} style={{ width: "100%" }}>
      <canvas ref={canvasRef} width={2420} height={115} style={{ width: "100%" }} />
    </div>
  );
};

export default Left;
