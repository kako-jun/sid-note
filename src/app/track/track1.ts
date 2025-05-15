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
  remarks: [
    "FF5はグラフィック、シナリオが明るく、FF4ほどじゃないけどバトル1も明るい。",
    "けど、短調なのね。Aマイナースケールは白鍵が多いので、ピアノでも弾けそう。",
  ],
  measures: [
    {
      code: "Am",
      on: "",
      functional_harmony: 1,
      remarks: ["スケールのⅠから始まるのが基本らしい。"],
      notes: [
        {
          pitch: "A3",
          value: "8th",
          remarks: [
            "FF戦闘曲のイントロで頻出するダダダダドド。",
            "ダダダダの音名はA。開放弦で弾ける。ゴブリンのように簡単。",
          ],
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
              fret: 0,
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
      ],
    },
    {
      code: "G",
      on: "",
      functional_harmony: 7,
      remarks: [
        "4/4拍子では1小節内に8分音符が8つ入るけど、1小節の途中でコードが変わる。",
        "五線だと1つ下なだけだけど、7度の変化となる。",
      ],
      notes: [
        {
          pitch: "G3",
          value: "8th",
          remarks: ["ドドの音名はG。"],
          tags: ["easy"],
          lefts: [
            {
              finger: 3,
              string: 4,
              fret: 3,
              type: "press",
              degree: "1",
            },
            {
              finger: 4,
              string: 3,
              fret: 4,
              type: "mute",
            },
          ],
          right: {
            string: 4,
            stroke: "down",
            mute_strings: [1, 2, 3],
          },
        },
      ],
    },
  ],
};
