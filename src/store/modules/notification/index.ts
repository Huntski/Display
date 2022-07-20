import {StateNotification as State} from './StateNotification'
import {NotifyMessage} from "./types/NotifyMessage";
import {Commit} from "vuex";

export default {
    namespaced: true,

    state: {
        notifications: Array<NotifyMessage>()
    } as State,

    getters: {
        getMessages(state: State) {
            return state.notifications
        }
    },

    mutations: {
        ADD_NOTIFICATION(state: State, message: NotifyMessage) {
            state.notifications.push(message)
        }
    },

    actions: {
      notify({commit}: {commit: Commit}, message: NotifyMessage) {
        commit('ADD_NOTIFICATION', message)
      }
    }
}
