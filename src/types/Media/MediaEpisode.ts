import {Path} from '@/types'
import {Subtitle} from "@/types/Media/Subtitle"

export interface MediaEpisode {
    id: number,
    media_id: number,
    currentTime: number,
    fullPath: Path,
    fileName: Path,
    directory: Path,
    thumbnail?: Path,
    subtitles?: Array<Subtitle>
}
