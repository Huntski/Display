import {Path} from "@/types";
import {Subtitle} from "@/types/Media";

export default interface UpdateEpisodePayload {
    currentTime?: number,
    fullPath?: Path,
    fileName?: Path,
    directory?: Path,
    thumbnail?: Path,
    subtitles?: Array<Subtitle>
}
