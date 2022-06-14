import storage from "@/store/modules/storage"

export default {
    namespaced: true,

    getters: {
        decks() {
            return storage.get('decks')
        },

        deckInUse() {
            return storage.get('deckInUse')
        }
    },

    actions: {
        updateDeckInUse(_: any, deckName: string) {
            storage.set('deckInUse', deckName)
        }
    }
}
