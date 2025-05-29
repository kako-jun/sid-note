import Link from "next/link";
import React from "react";

export type TrackSectionItemProps = {
  section: { name: string };
};

const TrackSectionItem: React.FC<TrackSectionItemProps> = ({ section }) => (
  <li style={{ paddingTop: 8, paddingBottom: 8 }}>
    <Link className="link-hover-underline" href={`#${section.name}`}>
      {section.name}
    </Link>
  </li>
);

export default TrackSectionItem;
