import {MediaTitle, EpisodeId} from "@/types/Media"

export interface MediaItem {
    id: number
    name: string
    coverImage?: string
    color?: string
    title: MediaTitle
    description?: string
    amount?: number,
    currentEpisode: EpisodeId,
}
