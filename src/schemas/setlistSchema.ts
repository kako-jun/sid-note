import { z } from "zod";

export const SetlistTrackSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist: z.string(),
  draft: z.boolean().nullable().optional(),
});
export type SetlistTrackType = z.infer<typeof SetlistTrackSchema>;

export const SetlistSchema = z.object({
  tracks: z.array(SetlistTrackSchema),
});
export type SetlistType = z.infer<typeof SetlistSchema>;
