import {EpisodeId, MediaItem} from "@/types/Media";

export interface StateMedia {
    media: MediaItem[],
    displayedMedia: MediaItem[],
}
