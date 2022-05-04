import axios from 'axios'
import {Dispatch} from "vuex";

export type AnkiAction = string

export default {
    namespaced: true,

    actions: {
        async checkPermission({ dispatch }: { dispatch: Dispatch }) {
            const response = await dispatch('invoke', {action: 'requestPermission'})
            return response.data.result.permission
        },

        invoke(_: any, {action, params={}}: {action: AnkiAction, params: any}) {
            return axios.post('http://localhost:8765', JSON.stringify({action, version: 6, params}))
        }
    }
}