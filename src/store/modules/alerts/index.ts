import {StateAlerts as State} from './StateAlerts'
import {Alert} from "./types/Alert"
import {Commit} from "vuex"

export default {
    namespaced: true,

    state: {
        alerts: Array<Alert>()
    } as State,

    getters: {
        getAlerts(state: State) {
            return state.alerts
        }
    },

    mutations: {
        ADD_ALERT(state: State, alert: Alert) {
            state.alerts.push(alert)
        },

        REMOVE_ALERT(state: State, alertId: number) {
            state.alerts = state.alerts.filter(alert => {
                return alert.id !== alertId
            })
        }
    },

    actions: {
        notify({commit}: { commit: Commit }, alert: Alert) {
            commit('ADD_ALERT', alert)
        },

        error({commit}: { commit: Commit }, alert: Alert) {
            if (! alert.id) {
                alert.id = Math.floor(Math.random() * 9999) + 1
            }
            alert.error = true
            commit('ADD_ALERT', alert)
        },

        removeAlert({commit}: { commit: Commit }, alertId: number) {
            commit('REMOVE_ALERT', alertId)
        },
    }
}
