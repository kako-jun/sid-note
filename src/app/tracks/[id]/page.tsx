import CenteredPage from "@/components/layout/CenteredPage";
import Footer from "@/components/layout/Footer";
import TitleHeader from "@/components/layout/TitleHeader";
import Track from "@/components/track/Track";
import { LeftType } from "@/schemas/trackSchema";
import { getInterval } from "@/utils/chordUtil";
import { loadTrackFromYamlUrl } from "@/utils/trackLoader";
import fs from "fs/promises";
import { notFound } from "next/navigation";
import path from "path";

// 静的生成: ビルド時に全トラックページを生成
export async function generateStaticParams() {
  const trackDir = path.join(process.cwd(), "public", "track");
  const files = await fs.readdir(trackDir);
  const trackFiles = files.filter(
    (f) => f.startsWith("track_") && f.endsWith(".yaml")
  );

  return trackFiles.map((file) => {
    // track_11.yaml -> 11
    const id = file.replace("track_", "").replace(".yaml", "");
    return { id };
  });
}

// サーバーコンポーネントとしてasync化
export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  // idはstring型で受け取る
  const id = (await params).id;
  // public配下のyamlをサーバーで読み込む
  const track = await loadTrackFromYamlUrl(`/track/track_${id}.yaml`);
  if (!track) return notFound();

  const leftsWithInterval = (lefts: LeftType[], chord: string, pitch: string): LeftType[] => {
    return lefts.map((left) => {
      if (left.type === "press") {
        const interval = getInterval(chord, pitch);
        return { ...left, pitch, interval };
      }
      return left;
    });
  };

  // 各Sectionの各ChordSegmentの各NoteのleftsをleftsWithIntervalで上書き
  const updatedSections =
    track.sections?.map((section) => ({
      ...section,
      chordSegments:
        section.chordSegments?.map((chordSegment) => ({
          ...chordSegment,
          notes:
            chordSegment.notes?.map((note) => {
              const chord = chordSegment.on && chordSegment.on !== "" ? chordSegment.on : chordSegment.chord;
              return {
                ...note,
                lefts: leftsWithInterval(note.lefts, chord, note.pitch),
              };
            }) || [],
        })) || [],
    })) || [];

  const tempTrack = { ...track, sections: updatedSections };

  return (
    <CenteredPage>
      <TitleHeader />
      <Track track={tempTrack} />
      <Footer />
    </CenteredPage>
  );
}
