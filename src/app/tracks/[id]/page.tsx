"use client";

import React from "react";
import TitleHeader from "@/components/layout/TitleHeader";
import Footer from "@/components/layout/Footer";
import Track from "@/components/track/Track";
import CenteredPage from "@/components/layout/CenteredPage";

export default function TrackPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params);

  return (
    <CenteredPage>
      <TitleHeader />
      <Track trackId={id} />
      <Footer />
    </CenteredPage>
  );
}
