import {MediaItem} from "@/types/Media"

export default interface ScannedMediaResponse {
    result: MediaItem[],
    failed: number
}
