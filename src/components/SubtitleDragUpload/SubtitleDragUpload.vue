<template>
  <div
    ref="upload"
    class="bg-dark-transparent px-20 py-10 absolute top-0 left-0 w-screen h-screen max-h-screen z-50 opacity-0 pointer-events-none"
    :class="{'pointer-events-auto opacity-100' : show}"
  >
    <div class="w-auto h-full border-white rounded-xl border-dashed border-5 flex flex-col justify-center items-center bg-light-transparent">
      <Document class="w-16" />
      <h2 class="text-white mt-10">Drop to add subtitles.</h2>
    </div>
  </div>
</template>

<script>
import {Document} from "@/components/@icons"
import fs from "fs"
import srt2vtt from "srt-to-vtt"
import ass2vtt from 'ass-to-vtt'

export default {
  props: {
    episode: {
      type: [Object],
      required: true,
    },

    global: {
      type: Boolean,
      required: false
    }
  },

  data: () => {
    return {
      show: false,
    }
  },

  methods: {
    /**
     *  Stores a new entry for each given subtitle.
     * @param files List of all uploaded subtitle files.
     * @returns {Promise<void>}
     */
    async uploadSubtitles(files) {
      try {
        const episode = this.episode

        files.forEach((file) => {

          if (file.name.includes('ass') || file.name.includes('srt')) {
            console.log('Checked file:', file.name)

            const newVttFileName = file.name.slice(0, -3) + 'vtt'
            const newVttFilePath = episode.directory + newVttFileName
            if (file.name.includes('srt')) {
              fs.createReadStream(file.path)
                  .pipe(srt2vtt())
                  .pipe(fs.createWriteStream(newVttFilePath))
            } else if (file.name.includes('ass')) {
              fs.createReadStream(file.path)
                  .pipe(ass2vtt())
                  .pipe(fs.createWriteStream(newVttFilePath))
            }

            const newSubtitle = {
              media_id: episode.media_id,
              episode_id: episode.id,
              src: newVttFilePath,
              fileName: newVttFileName
            }

            this.$store.dispatch('subtitle/storeSubtitles', newSubtitle)
                .then(() => this.$emit('handleUpload', newSubtitle))

            return this.$store.dispatch('alerts/notify', {
              message: 'Uploaded subtitle successfully!'
            })
          }

          this.$store.dispatch('alerts/error', {
            message: 'Only srt and ass file\'s allowed.'
          })
        })
      } catch (e) {
        this.$store.dispatch('alerts/error', {
          message: e.message
        })
      }
    }
  },

  mounted() {
    let target = window

    if (! this.global) { // I forgot why global is there in the first place.
      target = this.$refs.upload
    }

    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
      target.addEventListener(evt, function (e) {
        e.preventDefault()
        e.stopPropagation()
      }.bind(this), false)
    }.bind(this))

    this.$refs.upload.ondragleave = () => {
      this.show = false
    }

    target.ondragenter = () => {
      this.show = true
    }

    target.ondrop = e => {
      this.uploadSubtitles(e.dataTransfer.files)
      this.show = false
    }
  },

  components: {Document},
}
</script>
