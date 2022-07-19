import {Path} from "@/types"
import storage from "@/store/modules/storage"

export default {
    getters: {
        getDirectoryFromStore(): Path {
            return storage.get('directory') as Path
        },
    },

    actions: {
        storeDirectoryInStore(_: any, directory: Path): void {
            storage.set('directory', directory)
        },
    }
}
