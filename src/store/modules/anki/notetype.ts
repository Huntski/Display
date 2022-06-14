import storage from "@/store/modules/storage"

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
        }
    }
}
