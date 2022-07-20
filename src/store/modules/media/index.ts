import fs from "fs"
import storage from "@/store/modules/storage"
import directory from "../directory"
import {Commit, Dispatch} from "vuex"
import {MediaItem, AnlistMediaItem, MediaEpisode} from "@/types/Media"
import {Path} from "@/types"
import {StateMedia as State} from "./types/StateMedia"

export default {
    namespaced: true,

    state: {
        media: Array<MediaItem>(),
        displayedMedia: Array<MediaItem>()
    } as State,

    getters: {
        getDisplayedMedia(state: State): MediaItem[] {
            return state.displayedMedia
        },

        getCurrentMedia(): MediaItem {
            return storage.get('currentMedia') as MediaItem
        },

        getMediaCollection(): MediaItem[] {
            return storage.get('media') as MediaItem[]
        }
    },

    mutations: {
        SET_MEDIA(state: State, payload: MediaItem[]): void {
            state.media = payload
            setTimeout(_ => {
                state.displayedMedia = payload
            }, 1000)
        },

        SET_DISPLAYED_MEDIA(state: State, payload: MediaItem[]): void {
            state.displayedMedia = payload
        }


    },

    actions: {
        async loadMediaCollection({ commit, dispatch }: { commit: Commit, dispatch: Dispatch })  {
            if (!storage.has('media')) {
                await dispatch('updateMediaCollection')
            } else {
                console.log('other stuf')
                await commit('SET_MEDIA', storage.get('media') as MediaItem[])
            }
        },

        async updateMediaCollection({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }): Promise<MediaItem[]> {
            await commit('SET_DISPLAYED_MEDIA', [])

            try {
                const mediaCollection = await dispatch('scanMediaInMainDirectory')

                await new Promise(resolve => setTimeout(resolve, 1000))

                console.log(mediaCollection)

                storage.set('media', mediaCollection)

                await commit('SET_MEDIA', mediaCollection)

                return mediaCollection
            } catch (e) {
                console.log(e)
            }

            return storage.get('media') as MediaItem[]
        },

        async scanMediaInMainDirectory({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }): Promise<MediaItem[]> {

            const directory = storage.get('directory') as Path

            const directoryFiles = fs.readdirSync(directory, {withFileTypes: true})

            const directories = directoryFiles.filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)

            const result = Array<MediaItem>()

            for (const title of directories) {
                console.log('Media:', title)

                const searchResult = await dispatch('anilist/searchItem', title, {root:true})

                dispatch('anilist/searchItem', title, {root:true}).then((media: AnlistMediaItem) => {
                    const episodeFiles = fs.readdirSync(`${directory}/${title}`, {withFileTypes: true})

                    if (media.id === undefined) {
                        media.id = Math.floor(Math.random() * 99999)
                    }

                    let order = 1;

                    episodeFiles.forEach(episodeFile => {
                        if (episodeFile.name.includes('mp4') || episodeFile.name.includes('mov')) {
                            dispatch('episode/storeEpisode', {
                                id: order,
                                media_id: media.id,
                                fullPath: `${directory}/${title}/${episodeFile.name}`,
                                directory: `${directory}/${title}/`,
                                fileName: `${episodeFile.name}`,
                                currentTime: 0,
                            } as MediaEpisode, {root: true})
                            order++
                        }
                    })

                    result.push({
                        id: media.id,
                        name: title,
                        coverImage: media.coverImage.large || '',
                        color: media.coverImage.color|| '',
                        title: media.title || title,
                        amount: media.episodes || order,
                        description: media.description || '',
                        currentEpisode: 1,
                    })
                })
            }

            storage.set('media', result)

            await commit('SET_MEDIA', result)

            return result
        },


        searchMediaTitle({ commit, state }: { commit: Commit, state: State }, query: string): void {
            let result;

            if (query === '') {
                result = state.media
            }

            result = state.media.filter((item: MediaItem) =>
                item.title.romaji.toLowerCase().includes(query.toLowerCase()) || item.id == parseInt(query)
            )

            console.log(result)

            commit('SET_DISPLAYED_MEDIA', result)
        },

        // getMediaItem({ state }: { state: any }, id: number): MediaItem {
        //     return state.media.filter((item: MediaItem) => id == item.id).pop()
        // }
    },

    modules: {
        directory,
    }
}
