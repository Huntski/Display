import {Path} from '@/types'

export interface MediaEpisode {
    id: number,
    media_id: number,
    currentTime: number,
    fullPath: Path,
    fileName: Path,
    directory: Path,
}