import {MediaItem} from "@/types/Media"

interface RecordResults {
    failedAmount: number,
    thumbnailsDownloaded: number,
    episodesFound: number
}

export default interface ScannedMediaResponse {
    result: MediaItem[],
    recordResults: RecordResults
}
