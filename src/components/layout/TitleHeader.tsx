"use client";

import Image from "next/image";
import React from "react";

const TitleHeader: React.FC = () => (
  <h1
    style={{
      marginBottom: 32,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      src="/title.png"
      alt="Sid Note"
      width={100}
      height={25}
      style={{ cursor: "pointer" }}
      onClick={() => (window.location.href = "/")}
    />
  </h1>
);

export default TitleHeader;
