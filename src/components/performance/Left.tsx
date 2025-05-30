"use client";

import { NoteType } from "@/schemas/trackSchema";
import { playNoteSound } from "@/utils/noteSoundPlayer";
import React from "react";

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

const drawLine = (context: CanvasRenderingContext2D, note: NoteType) => {
  // string
  note.lefts.forEach((left) => {
    if (left.type === "press") {
      context.strokeStyle = "#999999";
      context.lineWidth = 3;
      const y = 20 + (left.string - 1) * 20;
      context.beginPath();
      context.moveTo(10, y);
      context.lineTo(2410, y);
      context.stroke();
    }
  });
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

        // const img = new window.Image();
        // img.src = `/finger/${left.finger}.drawio.svg`;
        // img.onload = () => {
        //   context.drawImage(img, x - 12, 2, 24, 24);
        // };
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

      // instrument
      if (left.type === "chord" && left.instrument) {
        context.fillStyle = "pink";
        context.font = "12px Verdana";
        const text = left.instrument;
        const textWidth = context.measureText(text).width;
        context.fillText(text, x - 46 - textWidth / 2, y - 4);
      }
    });
  }
};

const useNoteHitAreas = () => {
  const ref = React.useRef<{ x: number; y: number; r: number; pitch: string }[]>([]);
  return ref;
};

type LeftProps = {
  note: NoteType;
  nextNote?: NoteType | null;
  scrollLeft?: number;
  onScroll?: (left: number) => void;
};

const Left: React.FC<LeftProps> = (props) => {
  const { note, nextNote = null, scrollLeft, onScroll } = props;
  const bgCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const fgCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const lastX = React.useRef(0);
  // 丸のヒットエリア
  const noteHitAreas = useNoteHitAreas();

  // 丸のヒットエリアをリセット
  const resetNoteHitAreas = React.useCallback(() => {
    noteHitAreas.current = [];
  }, [noteHitAreas]);

  // 丸のヒットエリアを追加
  const addNoteHitArea = React.useCallback(
    (x: number, y: number, r: number, pitch: string) => {
      noteHitAreas.current.push({ x, y, r, pitch });
    },
    [noteHitAreas]
  );

  // drawNoteをラップしてヒットエリアも記録
  const drawNoteWithHitArea = React.useCallback(
    (context: CanvasRenderingContext2D, note: NoteType, next: boolean = false) => {
      if (next) {
        // nextNoteのヒットエリアは不要
      } else {
        note.lefts.forEach((left) => {
          // pressまたはchordのみヒットエリアを追加
          if (left.type === "press") {
            const y = 20 + (left.string - 1) * 20;
            const x = 10 + left.fret * (2400 / 24);
            addNoteHitArea(x, y, 10, left.pitch ?? "");
          } else if (left.type === "chord") {
            const y = 20 + (left.string - 1) * 20;
            const x = 10 + left.fret * (2400 / 24);
            addNoteHitArea(x, y, 32, left.pitch ?? "");
          }
        });
      }
      drawNote(context, note, next);
    },
    [addNoteHitArea]
  );

  // 背景（弦やフレット）は初回のみ描画
  React.useEffect(() => {
    if (!bgCanvasRef.current) return;
    const canvas = bgCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines(context);
  }, []);

  // 前景（ノートやライン）はnote/nextNote変更時のみ描画
  React.useEffect(() => {
    if (!fgCanvasRef.current) return;
    const canvas = fgCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    resetNoteHitAreas();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(context, note);
    if (nextNote) {
      drawNoteWithHitArea(context, nextNote, true);
    }
    drawNoteWithHitArea(context, note);
  }, [note, nextNote, drawNoteWithHitArea, resetNoteHitAreas]);

  // canvasクリック時の処理
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = fgCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // devicePixelRatio考慮
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    // ヒットエリア判定
    for (const area of noteHitAreas.current) {
      // 楕円は横半径32, 丸は半径10
      if (area.r === 32) {
        // 楕円（横32, 縦10）
        const dx = (x - area.x) / 32;
        const dy = (y - area.y) / 10;
        if (dx * dx + dy * dy <= 1) {
          if (area.pitch) playNoteSound(area.pitch, 1);
          return;
        }
      } else {
        // 丸
        const dx = x - area.x;
        const dy = y - area.y;
        if (dx * dx + dy * dy <= area.r * area.r) {
          if (area.pitch) playNoteSound(area.pitch, 1);
          return;
        }
      }
    }
  };

  React.useEffect(() => {
    const canvas = fgCanvasRef.current;
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

  // canvas上でヒットエリアにマウスが乗ったらカーソルをpointerに
  React.useEffect(() => {
    const canvas = fgCanvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      let hit = false;
      for (const area of noteHitAreas.current) {
        if (area.r === 32) {
          const dx = (x - area.x) / 32;
          const dy = (y - area.y) / 10;
          if (dx * dx + dy * dy <= 1) {
            hit = true;
            break;
          }
        } else {
          const dx = x - area.x;
          const dy = y - area.y;
          if (dx * dx + dy * dy <= area.r * area.r) {
            hit = true;
            break;
          }
        }
      }
      canvas.style.cursor = hit ? "pointer" : "default";
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [noteHitAreas]);

  return (
    <div
      ref={parentRef}
      style={{
        position: "relative",
        width: 2420,
        aspectRatio: "2420 / 115",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={bgCanvasRef}
        width={2420}
        height={115}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 1, width: "100%", height: "100%" }}
        tabIndex={-1}
        aria-hidden="true"
      />
      <canvas
        ref={fgCanvasRef}
        width={2420}
        height={115}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 2, width: "100%", height: "100%" }}
        onClick={handleCanvasClick}
        // onTouchEnd={handleCanvasClick}
      />
    </div>
  );
};

export default Left;
