import { z } from "zod";

export const LeftSchema = z.object({
  finger: z.number(),
  string: z.number(),
  fret: z.number(),
  type: z.enum(["press", "mute", "ghost_note", "chord"]),
  pitch: z.string().nullable().optional(),
  interval: z.string().nullable().optional(),
  instrument: z.string().nullable().optional(),
});
export type LeftType = z.infer<typeof LeftSchema>;

export const RightSchema = z.object({
  string: z.number(),
  stroke: z.enum(["down", "up", "thumb"]),
  muteStrings: z.array(z.number()),
});
export type RightType = z.infer<typeof RightSchema>;

export const NoteSchema = z.object({
  pitch: z.string(),
  value: z.enum([
    "whole",
    "dotted_whole",
    "half",
    "dotted_half",
    "quarter",
    "dotted_quarter",
    "8th",
    "dotted_8th",
    "16th",
    "dotted_16th",
    "triplet_quarter",
    "triplet_8th",
    "triplet_16th",
  ]),
  remarks: z.array(z.string()).nullable().optional(),
  tags: z
    .array(z.enum(["easy", "hard"]))
    .nullable()
    .optional(),
  lefts: z.array(LeftSchema),
  right: RightSchema.nullable().optional(),
});
export type NoteType = z.infer<typeof NoteSchema>;

export const ChordSegmentSchema = z.object({
  chord: z.string(),
  on: z.string().nullable().optional(),
  remarks: z.array(z.string()).nullable().optional(),
  key: z.string().nullable().optional(),
  notes: z.array(NoteSchema),
  instruments: z
    .array(
      z.object({
        pitch: z.string(),
        instrument: z.string(),
      })
    )
    .nullable()
    .optional(),
});
export type ChordSegmentType = z.infer<typeof ChordSegmentSchema>;

export const SectionSchema = z.object({
  name: z.string(),
  key: z.string().nullable().optional(),
  chordSegments: z.array(ChordSegmentSchema),
});
export type SectionType = z.infer<typeof SectionSchema>;

export const TrackSchema = z.object({
  title: z.string(),
  artist: z.string(),
  album: z.string(),
  year: z.number(),
  cover: z.string().nullable().optional(),
  key: z.string(),
  timeSignature: z.enum(["2/4", "3/4", "4/4"]),
  bpm: z.number(),
  remarks: z.array(z.string()).nullable().optional(),
  sections: z.array(SectionSchema),
});
export type TrackType = z.infer<typeof TrackSchema>;
