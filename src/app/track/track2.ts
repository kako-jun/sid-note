import { TrackType } from "./model";

export const track: TrackType = {
  title: "Battle 1",
  artist: "Nobuo Uematsu",
  album: "Final Fantasy 5",
  year: 1992,
  cover: "",
  scale: "Am",
  time_signature: "4/4",
  bpm: 161,
  remarks: ["hoge"],
  measures: [
    {
      code: "Am",
      on: "",
      functional_harmony: 1,
      remarks: ["hoge"],
      notes: [
        {
          pitch: "A3",
          value: "8th",
          remarks: ["hoge"],
          tags: ["easy"],
          lefts: [
            {
              finger: 2,
              string: 4,
              fret: 2,
              type: "mute",
            },
            {
              finger: 3,
              string: 3,
              fret: 3,
              type: "press",
              degree: "1",
            },
            {
              finger: 4,
              string: 2,
              fret: 4,
              type: "mute",
            },
          ],
          right: {
            string: 3,
            stroke: "down",
            mute_strings: [1, 2],
          },
        },
        {
          pitch: "E4♭",
          value: "8th",
          remarks: [""],
          tags: ["easy"],
          lefts: [
            {
              finger: 2,
              string: 4,
              fret: 1,
              type: "mute",
            },
            {
              finger: 2,
              string: 3,
              fret: 1,
              type: "mute",
            },
            {
              finger: 3,
              string: 2,
              fret: 2,
              type: "press",
            },
            {
              finger: 4,
              string: 1,
              fret: 3,
              type: "mute",
            },
          ],
          right: {
            string: 2,
            stroke: "up",
            mute_strings: [1, 2],
          },
        },
      ],
    },
  ],
};
