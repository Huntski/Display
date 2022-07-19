import storage from "@/store/modules/storage"
import {Dispatch} from "vuex";

export default {
    namespaced: true,

    getters: {
        noteTypeInUse() {
            return storage.get('noteTypeInUse')
        }
    },

    actions: {
        updateNoteTypeInUse(_: any, noteType: string) {
            storage.set('noteTypeInUse', noteType)
        },

        async getNoteTypeFields({ dispatch }: { dispatch: Dispatch }) {
            const payload = {
                action: 'modelFieldNames',
                params: {
                    modelName: storage.get('noteTypeInUse')
                }
            }

            const response = await dispatch('anki/invoke', payload, {root: true})

            return response.data.result
        }
    }
}
