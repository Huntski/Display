import Vuex from 'vuex'
import anilist from '@/store/modules/anilist'
import media from '@/store/modules/media/media'
import anki from '@/store/modules/anki'

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
        anki
    }
})
