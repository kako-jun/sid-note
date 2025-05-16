export type LeftType = {
  finger: number;
  string: number;
  fret: number;
  type: "press" | "mute" | "ghost_note" | "code";
  pitch?: string;
  degree?: string;
};

export type RightType = {
  // finger: number;
  string: number;
  stroke: "down" | "up" | "thumb";
  mute_strings: number[];
};

export type NoteType = {
  pitch: string;
  value: "whole" | "d_whole" | "half" | "d_half" | "quarter" | "d_quarter" | "8th" | "d_8th" | "16th" | "d_16th";
  remarks: string[];
  tags: ("easy" | "hard")[];
  lefts: LeftType[];
  right?: RightType;
};

export type MeasureType = {
  code: string;
  on?: string;
  functional_harmony: number;
  remarks: string[];
  notes: NoteType[];
};

export type SectionType = {
  name: string;
  measures: MeasureType[];
};

export type TrackType = {
  title: string;
  artist: string;
  album: string;
  year: number;
  cover: string;
  scale: string;
  time_signature: "2/4" | "3/4" | "4/4";
  bpm: number;
  remarks: string[];
  sections: SectionType[];
};
