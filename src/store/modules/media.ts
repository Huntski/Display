import fs from "fs"
import ElectronStore from "electron-store"
import {Commit, Dispatch} from "vuex"
import {MediaItem, AnlistMediaItem, MediaEpisode} from "@/types/Media"
import { Path } from "@/types"

const store = new ElectronStore

export default {
    namespaced: true,

    state: {
        media: Array<MediaItem>()
    },

    getters: {
        getDirectoryFromStore(): Path {
            return store.get('directory') as Path
        },

        getMediaFromStore(state: any): MediaItem[] {
            return state.media
        }
    },

    mutations: {
        SET_MEDIA(state: any, payload: MediaItem[]) {
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

        scanMediaInMainDirectory({ dispatch }: { dispatch: Dispatch }): MediaItem[] {
            const directory = store.get('directory') as Path

            const directoryFiles = fs.readdirSync(directory, {withFileTypes: true})

            const directories = directoryFiles.filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)

            const result: MediaItem[] = []

            directories.forEach((title) => {
                dispatch('anilist/searchItem', title, {root:true}).then((media: AnlistMediaItem) => {
                    const episodes = Array<MediaEpisode>()

                    const episodeFiles = fs.readdirSync(`${directory}/${title}`, {withFileTypes: true})

                    let order = 1;
                    episodeFiles.forEach((episode, index) => {
                        if (episode.name.includes('mp4') || episode.name.includes('mov')) {
                            order++
                            episodes.push({
                                id: order,
                                media_id: media.id,
                                fullPath: `${directory}/${title}/${episode.name}`,
                                directory: `${directory}/${title}/`,
                                fileName: `${episode.name}`,
                                currentTime: 0
                            } as MediaEpisode)
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
                        episodes: episodes
                    })
                })
            })

            return result
        },

        storeDirectoryInStore(_: any, directory: Path): void {
            store.set('directory', directory)
        },

        searchMediaTitle({ state }: { state: any }, query: string): MediaItem[] {
            if (query === '') {
                return state.media
            }

            return state.media.filter((item: MediaItem) => item.title.romaji.toLowerCase().includes(query.toLowerCase()))
        },

        getMediaItem({ state }: { state: any }, id: number): MediaItem {
            return state.media.filter((item: MediaItem) => id == item.id).pop()
        }
    }
}