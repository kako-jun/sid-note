import React from "react";

// 音価に応じた音符SVGを返すコンポーネント
const NoteSymbol: React.FC<{ value: string; size?: number; color?: string }> = ({
  value,
  size = 24,
  color = "currentColor",
}) => {
  switch (value) {
    case "whole":
      // 全音符
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="全音符">
          <ellipse cx="12" cy="12" rx="8" ry="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case "dotted_whole":
      // 付点全音符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="付点全音符">
          <ellipse cx="12" cy="12" rx="8" ry="5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
          <circle cx="26" cy="18" r="1.5" fill={color} />
        </svg>
      );
    case "half":
      // 2分音符
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="2分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill="white" stroke={color} strokeWidth="1.5" />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
        </svg>
      );
    case "dotted_half":
      // 付点2分音符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="付点2分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill="white" stroke={color} strokeWidth="1.5" />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <circle cx="22" cy="18" r="1.5" fill={color} />
        </svg>
      );
    case "quarter":
      // 4分音符
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="4分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
        </svg>
      );
    case "dotted_quarter":
      // 付点4分音符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="付点4分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <circle cx="22" cy="18" r="1.5" fill={color} />
        </svg>
      );
    case "8th":
      // 8分音符
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="8分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <path d="M16 6 Q20 8 16 12" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "dotted_8th":
      // 付点8分音符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="付点8分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <path d="M16 6 Q20 8 16 12" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="22" cy="18" r="1.5" fill={color} />
        </svg>
      );
    case "16th":
      // 16分音符
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="16分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <path d="M16 6 Q20 8 16 12" stroke={color} strokeWidth="1.5" fill="none" />
          <path d="M16 9 Q21 11 16 15" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "dotted_16th":
      // 付点16分音符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="付点16分音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <path d="M16 6 Q20 8 16 12" stroke={color} strokeWidth="1.5" fill="none" />
          <path d="M16 9 Q21 11 16 15" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="22" cy="18" r="1.5" fill={color} />
        </svg>
      );
    case "triplet_quarter":
      // 4分音符3連符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="4分音符3連符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <text x="24" y="20" fontSize="8" fill={color}>
            3
          </text>
        </svg>
      );
    case "triplet_8th":
      // 8分音符3連符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="8分音符3連符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <path d="M16 6 Q20 8 16 12" stroke={color} strokeWidth="1.5" fill="none" />
          <text x="24" y="20" fontSize="8" fill={color}>
            3
          </text>
        </svg>
      );
    case "triplet_16th":
      // 16分音符3連符
      return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-label="16分音符3連符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
          <path d="M16 6 Q20 8 16 12" stroke={color} strokeWidth="1.5" fill="none" />
          <path d="M16 9 Q21 11 16 15" stroke={color} strokeWidth="1.5" fill="none" />
          <text x="24" y="20" fontSize="8" fill={color}>
            3
          </text>
        </svg>
      );
    default:
      // デフォルトは4分音符
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-label="音符">
          <ellipse cx="10" cy="16" rx="6" ry="4" fill={color} />
          <rect x="15" y="6" width="1.5" height="12" fill={color} />
        </svg>
      );
  }
};

export default NoteSymbol;
