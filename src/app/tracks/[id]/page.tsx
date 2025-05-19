"use client";

import React from "react";
import TitleHeader from "@/components/layout/TitleHeader";
import Footer from "@/components/layout/Footer";
import Track from "@/components/track/Track";

export default function TrackPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 16,
        fontFamily: "'游明朝', 'Yu Mincho', 'MS Mincho', 'Hiragino Mincho Pro', serif",
      }}
    >
      <TitleHeader />

      <Track trackId={id} />

      <Footer />
    </div>
  );
}
