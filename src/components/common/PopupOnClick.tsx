import React, { useEffect, useRef, useState } from "react";

type PopupOnClickProps = {
  trigger: React.ReactNode;
  popup: React.ReactNode;
  popupStyle?: React.CSSProperties;
  popupClassName?: string;
};

const defaultPopupStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#222",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: 6,
  fontSize: "0.85rem",
  zIndex: 10,
  whiteSpace: "nowrap",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  marginTop: 4,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const PopupOnClick: React.FC<PopupOnClickProps> = ({ trigger, popup, popupStyle, popupClassName }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        ref={triggerRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        {trigger}
      </span>
      {open && (
        <div
          ref={popupRef}
          style={{ ...defaultPopupStyle, ...popupStyle }}
          className={popupClassName}
          onClick={(e) => e.stopPropagation()}
        >
          {popup}
        </div>
      )}
    </span>
  );
};

export default PopupOnClick;
