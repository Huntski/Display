import fs from "fs"
import storage, {StorageKey} from "@/store/modules/storage"
import directory from "../directory"
import {Commit, Dispatch} from "vuex"
import {MediaItem, AnlistMediaItem, MediaEpisode} from "@/types/Media"
import {Path} from "@/types"
import {StateMedia as State} from "./types/StateMedia"
import ScannedMediaResponse from "./types/ScannedMediaResponse"
import {downloadThumbnail, createThumbnailFileName, publicDirectory} from "@/composables/Thumbnails";

const key: StorageKey = 'media'

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
            setTimeout(() => {
                state.displayedMedia = payload
            }, 1000)
        },

        SET_DISPLAYED_MEDIA(state: State, payload: MediaItem[]): void {
            state.displayedMedia = payload
        }
    },

    actions: {
        async loadMediaCollection({commit, dispatch}: { commit: Commit, dispatch: Dispatch }): Promise<void> {
            if (!storage.has('media')) {
                await dispatch('updateMediaCollection')
            } else {
                await commit('SET_MEDIA', storage.get('media') as MediaItem[])
            }
        },

        async updateMediaCollection({commit, dispatch}: { commit: Commit, dispatch: Dispatch }): Promise<MediaItem[]> {
            await commit('SET_DISPLAYED_MEDIA', [])

            try {
                const response = await dispatch('scanMediaInMainDirectory')

                await new Promise(resolve => setTimeout(resolve, 1000))

                await commit('SET_MEDIA', response.result)

                return response
            } catch (e) {
                console.log(e)
            }

            return storage.get('media') as MediaItem[]
        },

        async scanMediaInMainDirectory({commit, dispatch}: { commit: Commit, dispatch: Dispatch }): Promise<ScannedMediaResponse> {

            const directory = storage.get('directory') as Path

            const directoryFiles = fs.readdirSync(directory, {withFileTypes: true})

            const directories = directoryFiles.filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)

            const result = Array<MediaItem>()
            const recordResults = {
                failedAmount: 0,
                thumbnailsDownloaded: 0,
                episodesFound: 0
            }

            for (const title of directories) {
                console.log('Media:', title)

                const searchResult = await dispatch('anilist/searchItem', title, {root: true})

                console.log('search Result:', searchResult, typeof searchResult)

                const media: AnlistMediaItem = await dispatch('anilist/searchItem', title, {root: true})

                const episodeFiles = fs.readdirSync(`${directory}/${title}`, {withFileTypes: true})

                if (media.id === undefined) {
                    media.id = Math.floor(Math.random() * 99999)
                }

                let order = 1

                episodeFiles.forEach(episodeFile => {
                    if (episodeFile.name.includes('mp4') || episodeFile.name.includes('mov')) {
                        const fullPath: Path = `${directory}/${title}/${episodeFile.name}`
                        const thumbnailFileName = createThumbnailFileName(media.id, order)
                        const thumbnailFullPath = publicDirectory + thumbnailFileName

                        console.log('Create thumbnail:', thumbnailFullPath)

                        downloadThumbnail(fullPath, thumbnailFullPath)
                        recordResults.thumbnailsDownloaded++

                        const episode: MediaEpisode = {
                            id: order,
                            media_id: media.id,
                            fullPath: fullPath,
                            directory: `${directory}/${title}/`,
                            fileName: `${episodeFile.name}`,
                            extension: `${episodeFile.name.split('.').pop()}`,
                            currentTime: 0,
                            thumbnail: thumbnailFileName
                        }

                        dispatch('episode/storeEpisode', episode, {root: true})
                        recordResults.episodesFound++
                        order++
                    }
                })

                if (!Object.keys(searchResult).length) {
                    recordResults.failedAmount++

                    result.push({
                        id: media.id,
                        name: title,
                        coverImage: '',
                        color: '',
                        title: {
                            romaji: title,
                            english: title,
                            native: title,
                        },
                        amount: order,
                        description: media.description ?? '',
                        currentEpisode: 1,
                    })
                } else {
                    result.push({
                        id: media.id,
                        name: title,
                        coverImage: media.coverImage.large ?? '',
                        color: media.coverImage.color ?? '',
                        title: media.title,
                        amount: media.episodes ?? order,
                        description: media.description ?? '',
                        currentEpisode: 1,
                    })
                }
            }

            storage.set('media', result)

            await commit('SET_MEDIA', result)

            console.log('FAILED AMOUNT:', recordResults.failedAmount)
            console.log('DOWNLOADED THUMBNAILS:', recordResults.thumbnailsDownloaded)
            console.log('EPISODES FOUND:', recordResults.episodesFound)

            return {
                result: result,
                recordResults: recordResults,
            }
        },

        async reloadMediaCollection({dispatch}: { dispatch: Dispatch }): Promise<void> {
            const response = await dispatch('updateMediaCollection')

            dispatch('alerts/notify', {
                id: 1,
                message: `Successfully updated media collection.`
            }, {root: true})

            if (response.failed) {
                dispatch('alerts/error', {
                    id: 2,
                    message: `${response.failed} items weren't recognised.`,
                    error: true
                }, {root: true})
            }
        },

        searchMediaTitle({commit, state}: { commit: Commit, state: State }, query: string): void {
            let result

            if (query === '') {
                result = state.media
            }

            result = state.media.filter((item: MediaItem) =>
                item.title.romaji.toLowerCase().includes(query.toLowerCase()) || item.id == parseInt(query)
            )

            commit('SET_DISPLAYED_MEDIA', result)
        },

        getMediaItemById({commit, state}: { commit: Commit, state: State }, id: number) {
            const media = storage.get(key) as Array<MediaItem>

            return media.filter(item => item.id == id)[0]
        }
    },

    modules: {
        directory,
    }
}
