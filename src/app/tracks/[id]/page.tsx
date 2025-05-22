"use client";

import CenteredPage from "@/components/layout/CenteredPage";
import Footer from "@/components/layout/Footer";
import TitleHeader from "@/components/layout/TitleHeader";
import Track from "@/components/track/Track";
import React from "react";

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
