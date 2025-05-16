import yaml from "js-yaml";
import { TrackType } from "./model";

// export function loadTrackFromYaml(path: string): TrackType {
//   const fs = require("fs");
//   const file = fs.readFileSync(path, "utf8");
//   return yaml.load(file) as TrackType;
// }

export async function loadTrackFromYamlFile(file: File): Promise<TrackType> {
  const text = await file.text();
  return yaml.load(text) as TrackType;
}

export async function loadTrackFromYamlUrl(url: string): Promise<TrackType> {
  const res = await fetch(url);
  const text = await res.text();
  return yaml.load(text) as TrackType;
}
