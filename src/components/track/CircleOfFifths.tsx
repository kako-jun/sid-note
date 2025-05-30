"use client";

import { getKeyPosition } from "@/utils/noteUtil";
import React from "react";

const CANVAS_WIDTH = 220; // 2倍解像度
const CANVAS_HEIGHT = 220;

const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;

const drawLines = (context: CanvasRenderingContext2D) => {
  // 外円
  context.beginPath();
  context.arc(CENTER_X, CENTER_Y, 100, 0, Math.PI * 2); // 半径2倍
  context.strokeStyle = "#555555";
  context.lineWidth = 4; // 線も太く
  context.stroke();

  // 内円
  context.beginPath();
  context.arc(CENTER_X, CENTER_Y, 60, 0, Math.PI * 2); // 半径2倍
  context.strokeStyle = "#555555";
  context.lineWidth = 2;
  context.stroke();

  // 放射線
  const radius = 100;
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * (i + 0.5)) / 12;
    const x = CENTER_X + radius * Math.cos(angle);
    const y = CENTER_Y + radius * Math.sin(angle);
    context.beginPath();
    context.moveTo(CENTER_X, CENTER_Y);
    context.lineTo(x, y);
    context.strokeStyle = "#555555";
    context.lineWidth = 2;
    context.stroke();
  }
};

const drawScale = (context: CanvasRenderingContext2D, scale: string) => {
  if (!scale) {
    return;
  }

  const position = getKeyPosition(scale);

  let radius = 80; // 2倍
  if (position.circle === "inner") {
    radius = 40;
  }

  const angle = (Math.PI * 2 * (position.index - 3)) / 12;

  const x = CENTER_X + radius * Math.cos(angle);
  const y = CENTER_Y + radius * Math.sin(angle);

  context.beginPath();
  context.arc(x, y, 10, 0, Math.PI * 2); // 2倍
  context.fillStyle = "white";
  context.fill();
};

type CircleOfFifthsProps = {
  scale: string;
};

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({ scale }) => {
  const bgCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const fgCanvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // 背景は初回のみ描画
  React.useEffect(() => {
    if (!bgCanvasRef.current) return;
    const context = bgCanvasRef.current.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawLines(context);
  }, []);

  // 前面はscale変更時にクリア＆再描画
  React.useEffect(() => {
    if (!fgCanvasRef.current) return;
    const context = fgCanvasRef.current.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawScale(context, scale);
  }, [scale]);

  return (
    <div
      style={{
        position: "relative",
        width: 110,
        aspectRatio: "110 / 110",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={bgCanvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1, width: 110, height: 110 }}
      />
      <canvas
        ref={fgCanvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 2, pointerEvents: "none", width: 110, height: 110 }}
      />
    </div>
  );
};

// 画像化用: 背景＋前面を1枚のcanvasに合成してDataURLを返す
export function getCircleOfFifthsImage(scale: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  drawLines(ctx);
  drawScale(ctx, scale);
  return canvas.toDataURL("image/png");
}

export default CircleOfFifths;
