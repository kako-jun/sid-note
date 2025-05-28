import CenteredPage from "@/components/layout/CenteredPage";
import Footer from "@/components/layout/Footer";
import TitleHeader from "@/components/layout/TitleHeader";
import Setlist from "@/components/track/Setlist";
import { loadSetlistFromYamlUrl } from "@/utils/setlistLoader";
import Image from "next/image";

export default async function Home() {
  const setlist = await loadSetlistFromYamlUrl("/track/setlist.yaml");

  return (
    <CenteredPage>
      <TitleHeader />

      <p>ベースを練習するためのノートです。</p>

      <div style={{ margin: "32px 0" }}>
        <Setlist setlist={setlist} />
      </div>

      <section
        style={{
          marginTop: 100,
          marginBottom: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src="/how_to_use_it.png" alt="How to use it" width={140} height={20} />
      </section>
      <div>
        <p>。</p>
      </div>

      <Footer />
    </CenteredPage>
  );
}
