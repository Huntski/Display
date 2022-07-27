import axios from 'axios'
import {Dispatch} from "vuex"
import deck from './deck'
import notetype from './notetype'
import storage from "@/store/modules/storage"

export type AnkiAction = string

export default {
    namespaced: true,

    actions: {
        async checkPermission({dispatch}: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'requestPermission'})
            return response.data.result.permission
        },

        async connected({dispatch}: { dispatch: Dispatch }) {
            try {
                const response = await dispatch('invoke', {action: 'requestPermission'})

                if (response.data.result.permission === 'granted') {
                    return true
                }
            } catch (e) {
                console.log(e)
            }

            return false
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
