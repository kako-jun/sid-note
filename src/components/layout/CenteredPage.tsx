import React from "react";

const CenteredPage: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    style={{
      textAlign: "center",
      marginTop: 16,
      fontFamily: "'Shippori Mincho', 'Yu Mincho', 'MS Mincho', 'Hiragino Mincho Pro', serif",
    }}
  >
    {children}
  </div>
);

export default CenteredPage;
