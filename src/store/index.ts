import {createStore} from 'vuex'
import ElectronStore from 'electron-store'
import fs from 'fs'

const store = new ElectronStore()

export default createStore({
    state: {
        directory: '',
        collection: []
    },

    getters: {
        directory(state) {
            return state.directory
        },

        collection(state) {
            return state.collection
        }
    },

    mutations: {
        SET_DIRECTORY(state, payload: string) {
            console.log('MUTATE DIRECTORY')
            state.directory = payload
        },

        SET_COLLECTION(state, payload: any) {
            console.log('MUTATE COLLECTION')
            state.collection = payload
        }
    },

    actions: {
        async setDirectory({ commit }, directory: string) {
            console.log('ACTION SET DIRECTORY')
            store.set('directory', directory)
            return commit('SET_DIRECTORY', directory)
        },

        checkDirectory({commit}) {
            console.log('ACTION CHECK DIRECTORY')
            const directory = store.get('directory')
            const directoryIsSet = directory ? true : false

            if (directoryIsSet) {
                commit('SET_DIRECTORY', directory)
            }

            return directoryIsSet
        },

        readDirectory({ state, commit }) {
            const files = fs.readdirSync(state.directory, {withFileTypes: true})

            const readCollection: any[] = files.filter((dirent: any) => dirent.isDirectory())
                .map((dirent: any) => [dirent.name])

            commit('SET_COLLECTION', readCollection)
        }
    },

    modules: {}
})
