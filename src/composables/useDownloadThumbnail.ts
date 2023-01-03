import {Path} from "@/types"
import * as FFmpeg from "@unaxiom/ffmpeg"

/**
 * Example taking screenshot with ffmpeg.
 * ffmpeg -ss 00:10:00 -i input -frames:v 1 -q:v 2 output.jpg
 */

export default function useDownloadThumbnail(input: Path, output: Path): void {
    try {
        const ffmpeg = new FFmpeg.FFmpeg()

        ffmpeg.addOptions([
            '-ss', '00:10:00',
            '-i', input,
            '-frames:v', '1',
            // '-vf', "'scale=320:320:force_original_aspect_ratio=decrease'"
        ])

        ffmpeg.setOutputFile(output)

        ffmpeg.run(false)
    } catch (e) {
        console.error(e)
    }
}
