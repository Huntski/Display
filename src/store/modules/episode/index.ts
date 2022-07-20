import {MediaEpisode} from "@/types/Media"
import storage from "@/store/modules/storage"
import Media from "@/store/modules/media";

export default {
    namespaced: true,

    getters: {
        episodes() {
            return storage.get('episodes') as Array<MediaEpisode>
        }
    },

    actions: {
        storeEpisode(_: any, payload: MediaEpisode): void {
            const episodes = storage.get('episodes') as Array<MediaEpisode>

            const existingFile = episodes.filter(item =>
                item.media_id === payload.media_id && item.id === payload.id
            )

            let episodeExists = false

            for (let i = 0; i < episodes.length; i++) {
                if (episodes[i].media_id === payload.media_id && episodes[i].id === payload.id) {
                    episodes[i].directory = payload.directory
                    episodes[i].fileName = payload.fileName
                    episodes[i].fullPath = payload.fullPath

                    episodeExists = true
                    break
                }
            }

            if (!episodeExists) {
                episodes.push(payload)
            }

            storage.set('episodes', episodes)
        },

        episodeExists(_: any, {media_id, order}: { media_id: number, order: number }) {
            const episodes = storage.get('episodes') as Array<MediaEpisode>
        },

        getMediaEpisodesById(_: any, id: number): MediaEpisode[] {
            const episodes = storage.get('episodes') as Array<MediaEpisode>

            const result = episodes.filter(item => item.media_id === id)

            console.log(result)

            return result
        },

        searchEpisodeById(_: any, id: number): MediaEpisode {
            const episodes = storage.get('episodes') as Array<MediaEpisode>

            console.log('episodes:', episodes)

            const result = episodes.filter(item => item.id === id)[0]

            console.log(result)

            return result
        }
    },
}
