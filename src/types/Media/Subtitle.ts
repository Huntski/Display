import {Language, Path, FileName} from "@/types";

export interface Subtitle {
    id: number,
    episode_id: number,
    media_id: number,
    path: Path,
    fileName: FileName,
    lan?: Language
}
