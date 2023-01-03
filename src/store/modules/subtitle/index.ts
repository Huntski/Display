import {Subtitle} from "@/types/Media"
import storage from "@/store/modules/storage"
import {StorageKey} from "@/store/modules/storage"
import SubtitleId from "./types/SubtitleId"
import {Path} from "@/types"
import {Commit} from "vuex"

const key: StorageKey = 'subtitles'

export default {
    namespaced: true,

    getters: {
      subtitles(): Subtitle[] {
          return storage.get(key) as Array<Subtitle>
      }
    },

    mutations: {
        SET_SUBTITLES(state: null, subtitles: Subtitle[]): void {
            storage.set(key, subtitles)
        }
    },

    actions: {
        storeSubtitles(_: any, payload: Subtitle): void {
            try {
                const subtitles = storage.get(key) as Array<Subtitle>

                subtitles.push(payload)

                storage.set(key, subtitles)
            } catch (e) {
                console.error('Storage:', e)
            }
        },

        getNewSubtitleId(_: any): SubtitleId {
            const subtitles = storage.get(key) as Array<Subtitle>

            return subtitles.length + 1
        },

        removeSubtitle({ commit }: { commit: Commit }, subtitle_id: SubtitleId): void {
            console.log('remove')
            const subtitles = storage.get(key) as Array<Subtitle>

            const updatedCollection = subtitles.filter(item => item.id !== subtitle_id)

            commit('SET_SUBTITLES', updatedCollection)
        },

        removeSubtitleByPath({ commit }: { commit: Commit }, path: Path): void {
            const subtitles = storage.get(key) as Array<Subtitle>

            const updatedCollection = subtitles.filter(item => item.path !== path)

            commit('SET_SUBTITLES', updatedCollection)
        },

        getEpisodeSubtitles(_: any, {media_id, episode_id}: {media_id: number, episode_id: number}): Subtitle[] {
            const subtitles = storage.get(key) as Array<Subtitle>
            console.log('Amount of subs:', storage.get('subtitles'))

            const result = subtitles.filter(item => item.media_id == media_id && item.episode_id == episode_id)

            console.log(result)

            return result
        }
    }
}
