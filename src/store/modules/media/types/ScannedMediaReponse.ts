import {MediaItem} from "@/types/Media"

export default interface ScannedMediaReponse {
    result: MediaItem[],
    failed: number
}
