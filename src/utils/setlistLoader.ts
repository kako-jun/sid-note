import { SetlistSchema, SetlistType } from "@/schemas/setlistSchema";
import { toCamelCaseKeysDeep } from "@/utils/objectUtil";
import fs from "fs/promises";
import yaml from "js-yaml";
import path from "path";

export async function loadSetlistFromYamlUrl(url: string): Promise<SetlistType> {
  const filePath = path.join(process.cwd(), "public", url.replace(/^\/?/, ""));
  const text = await fs.readFile(filePath, "utf8");
  const raw = yaml.load(text);
  const camel = toCamelCaseKeysDeep(raw);
  const parsed = SetlistSchema.safeParse(camel);
  if (!parsed.success) {
    throw new Error("Invalid setlist yaml: " + JSON.stringify(parsed.error.issues, null, 2));
  }
  return parsed.data;
}
