import CenteredPage from "@/components/layout/CenteredPage";
import Footer from "@/components/layout/Footer";
import TitleHeader from "@/components/layout/TitleHeader";
import Track from "@/components/track/Track";
import { loadTrackFromYamlUrl } from "@/utils/trackLoader";
import { notFound } from "next/navigation";

// サーバーコンポーネントとしてasync化
export default async function TrackPage({ params }: { params: { id: string } }) {
  // idはstring型で受け取る
  const id = params.id;
  // public配下のyamlをサーバーで読み込む
  const track = await loadTrackFromYamlUrl(`/track/track_${id}.yaml`);
  if (!track) return notFound();

  return (
    <CenteredPage>
      <TitleHeader />
      <Track track={track} />
      <Footer />
    </CenteredPage>
  );
}
