import storage from "@/store/modules/storage"
import {Subtitle} from "@/types/Media"

export interface storeSubtitleResponse {
    message: string,
    error: boolean,
    subtitle: Subtitle,
}

function useSubtitle() {
    function getCollection() {
        return storage.get('storage') as Array<Subtitle>
    }

    /**
     * Store given subtitle into storage.
     * @param subtitle
     * @return storeSubtitleResponse
     */
    function storeSubtitles(subtitle: Subtitle): storeSubtitleResponse {
        try {
            const subtitles = getCollection()

            subtitles.push(subtitle)

            storage.set('storage', subtitles)

            return {
                message: 'Successfully uploaded subtitle.',
                error: false,
                subtitle: subtitle
            }
        } catch(e) {
            return {
                message: e.message,
                error: true,
                subtitle: subtitle
            }
        }
    }
}
