import {MediaEpisode} from "@/types/Media"
import storage from "@/store/modules/storage"

export default {
    namespaced: true,

    getters: {
        episodes() {
            return storage.get('episodes') as Array<MediaEpisode>
        }
    },

    actions: {
        storeEpisode(_: any, payload: MediaEpisode): void {
            let episodes: Array<MediaEpisode> = []

            if (storage.has('episodes')) {
                episodes = storage.get('episodes') as Array<MediaEpisode>
            }

            episodes.push(payload)

            storage.set('episodes', episodes)
        },

        searchEpisodeById(_: any, id: number): MediaEpisode {
            const episodes = storage.get('episodes') as Array<MediaEpisode>

            const result = episodes.filter(item => item.id === id)[0]

            return result
        }
    },
}
