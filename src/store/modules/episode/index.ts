import {MediaEpisode} from "@/types/Media"
import storage, {StorageKey} from "@/store/modules/storage"

const key: StorageKey = 'episodes'

export default {
    namespaced: true,

    getters: {
        episodes() {
            return storage.get(key) as Array<MediaEpisode>
        }
    },

    actions: {
        storeEpisode(_: any, payload: MediaEpisode): void {
            const episodes = storage.get(key) as Array<MediaEpisode>

            const existingFile = episodes.filter(item =>
                item.media_id === payload.media_id && item.id === payload.id
            )

            let episodeExists = false

            for (let i = 0; i < episodes.length; i++) {
                if (episodes[i].media_id === payload.media_id && episodes[i].id === payload.id) {
                    episodes[i].directory = payload.directory
                    episodes[i].fileName = payload.fileName
                    episodes[i].extension = payload.extension
                    episodes[i].fullPath = payload.fullPath

                    episodeExists = true
                    break
                }
            }

            if (!episodeExists) {
                episodes.push(payload)
            }

            storage.set(key, episodes)
        },

        getMediaEpisodesById(_: any, id: number): MediaEpisode[] {
            const episodes = storage.get(key) as Array<MediaEpisode>

            const result = episodes.filter(item => item.media_id === id)

            return result
        },

        getEpisode(_: any, {media_id, episode_id}: {media_id: number, episode_id: number}): MediaEpisode|undefined {
            const episodes = storage.get(key) as Array<MediaEpisode>

            const episode = episodes.filter(item => item.media_id == media_id && item.id == episode_id).pop()

            console.log('Got episode:', episode)

            return episode
        },

        searchEpisodeById(_: any, id: number): MediaEpisode {
            const episodes = storage.get(key) as Array<MediaEpisode>

            console.log('episodes:', episodes)

            const result = episodes.filter(item => item.id === id)[0]

            console.log(result)

            return result
        },

        updateEpisode(_: any , {payload}: {payload: MediaEpisode}) {
            const episodes = storage.get(key) as Array<MediaEpisode>

            const updatedList = episodes.map(episode => {
                if (episode.id == payload.id && episode.media_id == payload.media_id) {
                    episode = payload
                }
            })

            storage.set(key, updatedList)
        },
    },
}
