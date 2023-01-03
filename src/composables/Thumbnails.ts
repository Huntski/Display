import {Path} from "@/types"
import * as FFmpeg from "@unaxiom/ffmpeg"
import {EpisodeId, MediaEpisode} from "@/types/Media";
import {ipcRenderer} from "electron";

/**
 * Example taking screenshot with ffmpeg.
 * ffmpeg -ss 00:10:00 -i input -frames:v 1 -q:v 2 output.jpg
 */

const storageDirectoryName = 'storage'
export let publicDirectory: Path

export function downloadThumbnail(input: Path, output: Path): void {
    console.log('DownloadThumbnail:', input, output)

    try {
        const ffmpeg = new FFmpeg.FFmpeg()

        ffmpeg.addOptions([
            '-ss', '00:10:00',
            '-i', input,
            '-frames:v', '1',
            // '-vf', "'scale=320:320:force_original_aspect_ratio=decrease'"
        ])

        ffmpeg.setOutputFile(output)

        console.log('Running download.')

        ffmpeg.run(false)
    } catch (e) {
        console.log(e)
    }
}

export function createThumbnailFileName(media_id: number, episode_id: EpisodeId): Path {
    return `${storageDirectoryName}/media_${media_id}-episode_${episode_id}.jpg`
}

export function downloadThumbnailFromEpisode(episode: MediaEpisode): Path {
    const thumbnailFileName = createThumbnailFileName(episode.media_id, episode.id)
    const thumbnailFullPath = publicDirectory + thumbnailFileName

    downloadThumbnail(episode.fullPath, thumbnailFullPath)

    return thumbnailFileName
}


async function getPublicPath() {
    /**
     * TODO: Need to find a way to surpass the promise given with getting root directory.
     *  That way this function will also not be needed.
     */
    return await ipcRenderer.invoke('get-root-directory') + 'public/'
}

getPublicPath().then(publicPath => publicDirectory = publicPath)
