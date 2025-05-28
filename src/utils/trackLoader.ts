import { TrackSchema, TrackType } from "@/schemas/trackSchema";
import { toCamelCaseKeysDeep } from "@/utils/objectUtil";
import yaml from "js-yaml";
// Node.jsのfsとpathを追加
import fs from "fs/promises";
import path from "path";

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

export async function loadTrackFromYamlUrl(url: string): Promise<TrackType | null> {
  // サーバー側ならファイルシステムから直接読む
  // urlは"/track/track_11.yaml"のような形式を想定
  const filePath = path.join(process.cwd(), "public", url.replace(/^\/?/, ""));
  let text: string;
  try {
    text = await fs.readFile(filePath, "utf8");
  } catch (err) {
    if (err instanceof Error && (err as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw err;
  }

  const raw = yaml.load(text);
  const camel = toCamelCaseKeysDeep(raw);
  const parsed = TrackSchema.safeParse(camel);
  if (!parsed.success) {
    throw new Error("Invalid track yaml: " + JSON.stringify(parsed.error.issues, null, 2));
  }

  return parsed.data;
}
