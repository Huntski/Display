import axios from 'axios'
import {Commit, Dispatch} from "vuex"
import deck from './deck'
import notetype from './notetype'
import storage from "@/store/modules/storage"
import {Permission} from './types/Permission'

import {StateAnki as State} from "@/store/modules/anki/types/StateAnki"

export type AnkiAction = string

export default {
    namespaced: true,

    status: {
        connected: false,
    } as State,

    getters: {
        connected(state: State) {
            return state.connected
        }
    },

    mutations: {
        SET_CONNECTED(state: State, payload: boolean): void {
            state.connected = payload
        }
    },

    actions: {
        async checkPermission({commit, dispatch}: { commit: Commit, dispatch: Dispatch }) {
            try {
                const response = await dispatch('invoke', {action: 'requestPermission'})
                commit('SET_CONNECTED', true)
                return response.data.result.permission as Permission
            } catch (e) {
                commit('SET_CONNECTED', false)
                return 'failed'
            }
        },

        async deckNames({dispatch}: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'deckNames'})
            return response.data.result
        },

        async noteTypes({dispatch}: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'modelNames'})
            return response.data.result
        },

        async selectedNoteType() {
            return storage.get('note_type') as string
        },

        invoke(_: any, {action, params = {}}: { action: AnkiAction, params: any }) {
            try {
                return axios.post('http://localhost:8765', JSON.stringify({action, version: 6, params}))
            } catch (e) {
                console.log(e)
            }
        }
    },

    modules: {
        deck,
        notetype
    }
}
