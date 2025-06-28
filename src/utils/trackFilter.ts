import { SetlistTrackType } from "@/schemas/setlistSchema";

export function shouldShowTrack(track: SetlistTrackType): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true; // 開発時はすべて表示
  }
  
  return !track.draft; // 本番ビルド時はdraft=trueを除外
}