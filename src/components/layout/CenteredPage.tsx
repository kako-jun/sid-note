import Image from "next/image";
import React from "react";

const CenteredPage: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    style={{
      textAlign: "center",
      paddingTop: 16,
      fontFamily: "'Shippori Mincho', 'Yu Mincho', 'MS Mincho', 'Hiragino Mincho Pro', serif",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Image
      src="/grunge_2.webp"
      alt="grunge texture"
      width={200}
      height={140}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        objectFit: "cover",
        pointerEvents: "none",
        opacity: 0.7,
        zIndex: -1,
      }}
      priority
    />
    {children}
  </div>
);

export default CenteredPage;
