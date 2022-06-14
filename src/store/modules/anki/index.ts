import axios from 'axios'
import {Dispatch} from "vuex"
import deck from './deck'
import notetype from './notetype'

export type AnkiAction = string

export default {
    namespaced: true,

    actions: {
        async checkPermission({dispatch}: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'requestPermission'})
            return response.data.result.permission
        },

        async deckNames({dispatch}: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'deckNames'})
            console.log(response)
            return response.data.result
        },

        async noteTypes({dispatch}: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'modelNames'})
            console.log(response)
            return response.data.result
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
