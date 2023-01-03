import {Path} from "@/types"
import * as FFmpeg from "@unaxiom/ffmpeg"
/**
 * Example screenshot
 * ffmpeg -ss 00:10:00 -i input -frames:v 1 -q:v 2 output.jpg
 */

export default function useThumbnail() {

    function downloadThumbnailFromVideo(input: Path, output: Path): void {
        // Create thumbnail from video

        const ffmpeg = new FFmpeg.FFmpeg()

        ffmpeg.addOptions([
            '-ss', '00:10:00',
            '-i', input,
            '-frames:v', '1',
            '-vf', "'scale=320:320:force_original_aspect_ratio=decrease'"
        ])

        ffmpeg.setOutputFile(output)

        ffmpeg.setOnCloseCallback(function (code: number, signal: string) {
            console.log("Process quit from setOnCloseCallback with code -> " + code + " and signal -> " + signal)
        })

        ffmpeg.run()
    }
}
