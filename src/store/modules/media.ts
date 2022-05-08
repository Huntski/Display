import fs from "fs"
import ElectronStore from "electron-store"
import {Commit, Dispatch} from "vuex"
import {MediaItem, AnlistMediaItem, MediaEpisode} from "@/types/Media"
import {Path} from "@/types"
import {StateMedia as State} from "./types/StateMedia"

const store = new ElectronStore

export default {
    namespaced: true,

    state: {
        media: Array<MediaItem>()
    } as State,

    getters: {
        getDirectoryFromStore(): Path {
            return store.get('directory') as Path
        },

        getMediaFromStore(state: State): MediaItem[] {
            return state.media
        },

        getCurrentMedia(state: State) {
            return store.get('currentMedia') as MediaItem | undefined
        },
    },

    mutations: {
        SET_MEDIA(state: State, payload: MediaItem[]) {
            state.media = payload
        }
    },

    actions: {
        async updateMediaCollection({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) {
            let mediaCollection = store.get('media') as MediaItem[]

            // if (!mediaCollection || mediaCollection.length < 1) {
                mediaCollection = await dispatch('scanMediaInMainDirectory')

                await new Promise(resolve => setTimeout(resolve, 1000))

                store.set('media', mediaCollection)
            // }

            await commit('SET_MEDIA', mediaCollection)

            return mediaCollection
        },

        async scanMediaInMainDirectory({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) {

            const directory = store.get('directory') as Path

            const directoryFiles = fs.readdirSync(directory, {withFileTypes: true})

            const directories = directoryFiles.filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)

            const result = Array<MediaItem>()

            await directories.forEach((title) => {
                dispatch('anilist/searchItem', title, {root:true}).then((media: AnlistMediaItem) => {
                    const episodes = Array<MediaEpisode>()

                    const episodeFiles = fs.readdirSync(`${directory}/${title}`, {withFileTypes: true})

                    let order = 1;
                    episodeFiles.forEach((episode, index) => {
                        if (episode.name.includes('mp4') || episode.name.includes('mov')) {
                            episodes.push({
                                id: order,
                                media_id: media.id,
                                fullPath: `${directory}/${title}/${episode.name}`,
                                directory: `${directory}/${title}/`,
                                fileName: `${episode.name}`,
                                currentTime: 0
                            } as MediaEpisode)
                            order++
                        }
                    })

                    result.push({
                        id: media.id,
                        name: title,
                        coverImage: media.coverImage.large,
                        color: media.coverImage.color,
                        title: media.title,
                        amount: media.episodes,
                        description: media.description,
                        episodes: episodes,
                        currentEpisode: 1,
                    })
                })
            })

            store.set('media', result)

            console.log('Finnish collection load')

            await commit('SET_MEDIA', result)

            return result
        },

        storeDirectoryInStore(_: any, directory: Path): void {
            store.set('directory', directory)
        },

        searchMediaTitle({ state }: { state: any }, query: string): MediaItem[] {
            if (query === '') {
                return state.media
            }

            return state.media.filter((item: MediaItem) => {
                if (item.title.romaji.toLowerCase().includes(query.toLowerCase())) {
                    return true
                }

                if (item.id == parseInt(query)) {
                    return true
                }

                return false
            })
        },

        getMediaItem({ state }: { state: any }, id: number): MediaItem {
            return state.media.filter((item: MediaItem) => id == item.id).pop()
        }
    }
}