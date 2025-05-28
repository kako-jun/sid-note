"use client";
import React from "react";

export type TrackSectionItemProps = {
  section: { name: string };
};

const TrackSectionItem: React.FC<TrackSectionItemProps> = ({ section }) => (
  <li style={{ paddingTop: 8, paddingBottom: 8 }}>
    <a
      href={`#${section.name}`}
      style={{}}
      onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
      onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
    >
      {section.name}
    </a>
  </li>
);

export default TrackSectionItem;
