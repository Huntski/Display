import {EpisodeId, MediaEpisode} from "@/types/Media"
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
            const storedEpisodes = storage.get(key) as Array<MediaEpisode>

            // Remove all episodes that don't have correct values.
            const episodes = storedEpisodes.filter(item => item != null)

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

            return episodes.filter(item => item.media_id === id)
        },

        getEpisode(_: any, {media_id, episode_id}: {media_id: number, episode_id: number}): MediaEpisode|undefined {
            const episodes = storage.get(key) as Array<MediaEpisode>

            const episode = episodes.filter(item => item.media_id == media_id && item.id == episode_id).pop()

            console.log('Got episode:', episode)

            return episode
        },

        searchEpisodeById(_: any, id: EpisodeId): MediaEpisode {
            const episodes = storage.get(key) as Array<MediaEpisode>

            return episodes.filter(item => item.id === id)[0]
        },

        updateEpisode(_: any, payload: MediaEpisode): void {
            try {
                const episodes = storage.get(key) as Array<MediaEpisode>

                const updatedList = episodes.map(episode => {
                    if (episode.id == payload.id && episode.media_id == payload.media_id) {
                        return payload
                    }

                    return episode
                })

                storage.set(key, updatedList)
            } catch (e) {
                console.log(e)
            }
        },
    },
}
