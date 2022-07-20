import ElectronStore from "electron-store"

const storage = new ElectronStore

const lists = [
    'media',
    'episodes',
]

for (const item in lists) {
    if (!storage.has(item)) {
        storage.set(item, [])
    }
}

export default storage
