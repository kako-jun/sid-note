"use client";

import React from "react";
import Image from "next/image";
import Track from "./Track";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: 16 }}>
      {/* <h1 style={{ marginBottom: 32 }}>Sid Note</h1> */}
      <h1
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src="/title.png" alt="Sid Note" width={100} height={100} />
      </h1>

      <Track />

      <p
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          margin: 0,
          padding: 8,
          background: "black",
          color: "#888888",
        }}
      >
        kako-jun@2025, whose bass playing could clear a crowded room.
      </p>
    </div>
  );
}
