import { TrackSchema, TrackType } from "@/schemas/trackSchema";
import { toCamelCaseKeysDeep } from "@/utils/objectUtil";
import yaml from "js-yaml";

// export function loadTrackFromYaml(path: string): TrackType {
//   const fs = require("fs");
//   const file = fs.readFileSync(path, "utf8");
//   return yaml.load(file) as TrackType;
// }

export async function loadTrackFromYamlFile(file: File): Promise<TrackType> {
  const text = await file.text();
  const raw = yaml.load(text);
  const camel = toCamelCaseKeysDeep(raw);
  const parsed = TrackSchema.safeParse(camel);
  if (!parsed.success) {
    throw new Error("Invalid track yaml: " + JSON.stringify(parsed.error.issues, null, 2));
  }
  return parsed.data;
}

export async function loadTrackFromYamlUrl(url: string): Promise<TrackType> {
  const res = await fetch(url);
  const text = await res.text();
  const raw = yaml.load(text);
  const camel = toCamelCaseKeysDeep(raw);
  const parsed = TrackSchema.safeParse(camel);
  if (!parsed.success) {
    throw new Error("Invalid track yaml: " + JSON.stringify(parsed.error.issues, null, 2));
  }
  return parsed.data;
}
