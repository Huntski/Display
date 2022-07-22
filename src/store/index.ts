import Vuex from 'vuex'
import anilist from '@/store/modules/anilist'
import media from '@/store/modules/media'
import anki from '@/store/modules/anki'
import episode from '@/store/modules/episode'
import alerts from '@/store/modules/alerts'

export default new Vuex.Store({
    state: {
        directory: '',
        collection: []
    },

    getters: {
        getStateDirectory(state) {
            return state.directory
        },

        getStateCollection(state) {
            return state.collection
        },

        stateCollection(state) {
            return state.collection
        }
    },

    mutations: {
        SET_DIRECTORY(state, payload: string) {
            state.directory = payload
        },

        SET_COLLECTION(state, payload: any) {
            state.collection = payload
        }
    },

    modules: {
        anilist,
        media,
        anki,
        episode,
        alerts,
    }
})
