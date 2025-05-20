import yaml from "js-yaml";

export type SetlistTrack = {
  id: number;
  title: string;
  artist: string;
};

export async function loadSetlistFromYamlUrl(url: string): Promise<SetlistTrack[]> {
  const res = await fetch(url);
  const text = await res.text();
  const raw = yaml.load(text);
  if (raw && typeof raw === "object" && "tracks" in raw) {
    return raw.tracks as SetlistTrack[];
  } else {
    throw new Error("Invalid setlist yaml format");
  }
}
