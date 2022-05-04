import {CoverImage, MediaTitle} from "@/types/Media"

export interface AnlistMediaItem {
    id: number
    coverImage: CoverImage
    title: MediaTitle
    episodes: number,
    description: string,
}