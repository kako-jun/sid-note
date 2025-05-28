import React from "react";

type CornerBoxProps = React.PropsWithChildren<{
  style?: React.CSSProperties;
  className?: string;
}>;

const CornerBox: React.FC<CornerBoxProps> = ({ children, style, className }) => (
  <div
    style={{
      position: "relative",
      border: "1px solid #444444",
      display: "inline-block",
      background: "none",
      ...style,
    }}
    className={className}
  >
    {/* 四隅のcorner.webp */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 24,
        height: 24,
        backgroundImage: "url(/corner.webp)",
        backgroundSize: "cover",
        pointerEvents: "none",
        zIndex: 1,
        transform: "rotate(0deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        backgroundImage: "url(/corner.webp)",
        backgroundSize: "cover",
        pointerEvents: "none",
        zIndex: 1,
        transform: "rotate(90deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 24,
        height: 24,
        backgroundImage: "url(/corner.webp)",
        backgroundSize: "cover",
        pointerEvents: "none",
        zIndex: 1,
        transform: "rotate(270deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        backgroundImage: "url(/corner.webp)",
        backgroundSize: "cover",
        pointerEvents: "none",
        zIndex: 1,
        transform: "rotate(180deg)",
      }}
    />
    <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
  </div>
);

export default CornerBox;
