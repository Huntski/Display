<template>
  <div class="video-player w-full bg-black flex w-screen" tabindex="0">
    <div class="relative flex flex-1 flex-col h-full min-h-screen">
      <router-link to="/" class="absolute z-50 top-5 left-5 cursor-pointer">
        <Return class="w-7"/>
      </router-link>

      <div class="w-full h-screen">
        <video @timeupdate="processBar" ref="video" class="object-contain w-full h-full" autoplay @click="togglePlay" :muted="muted" >
          <track kind="captions" ref="subs" src="" srclang="jp" label="Japanese" mode="true">
        </video>
      </div>

      <div class="absolute bottom-0 controls w-full h-64 flex flex-col text-white py-3 bg-controls flex flex-col items-center h-40 transition">
        <span class="text-white absolute text-3xl font-light mx-10" style="text-shadow: 0 1px 1px #000000, 0 1px 10px #000000">{{ activeTrack.text }}</span>

        <div class="w-full px-10 flex flex-col mt-auto items-center h-40">
          <span class="ml-auto text-gray-200">{{ timeLeft }}</span>

          <div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden cursor-pointer" @click="processBarClickEvent">
            <div ref="indicator" class="bg-red-400 w-0 h-full relative" />
          </div>

          <div class="w-full flex items-center justify-between mt-5 text-white">
            <div class="flex w-60">
              <div class="text-white w-6 box-content p-3 mr-2 cursor-pointer" @click="toggleMute">
                <Mute v-if="volume < 0.1 || muted "/>
                <Sound v-else/>
              </div>

              <input @input="changeVolume" v-model="volume" type="range" step=".1" min="0" max="1" class="cursor-pointer">
            </div>

            <div>
              <div class="bg-gray-900 rounded-full p-5 w-5 h-5 flex justify-center items-center box-content m-auto cursor-pointer" @click="togglePlay">
                <Pause class="w-4 ml-1" v-if="paused"/>
                <Play class="w-4" v-else/>
              </div>
            </div>

            <div class="w-60">
              <Fullscreen class="w-5 box-content p-3 transform hover:scale-125 transition ml-auto cursor-pointer" @click="openInFullscreen"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SideTracks :tracks=sideTracks :active-track="activeTrack" />
  </div>
</template>

<script>
import fs from 'fs'
import {Mute, Pause, Play, Return, Sound, Fullscreen} from '@/components/Icons'
import SideTracks from "./SideTracks"

export default {
  data() {
    return {
      media: null,
      episode: null,
      paused: false,
      muted: true,
      volume: .5,
      timeLeft: '',
      track: null,
      activeTrack: '',
      sideTracks: []
    }
  },

  methods: {
    togglePlay() {
      const video = document.querySelector('video')

      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }

      this.paused = video.paused
    },

    toggleMute() {
      if (this.$refs.video.muted && this.$refs.video.volume < 0.1) {
        this.$refs.video.muted = false
        this.muted = false
        this.volume = .5
        this.$refs.video.volume = .5
      } else if (this.$refs.video.muted) {
        this.$refs.video.muted = false
        this.muted = false
      } else {
        this.muted = true
        this.$refs.video.muted = true
      }
    },

    changeVolume(e) {
      const volume = e.target.value

      if (volume) {
        this.$refs.video.muted = false
        this.muted = false
      }

      this.volume = volume
      this.$refs.video.volume = volume
    },

    processBar() {
      const curr = (this.$refs.video.currentTime / this.$refs.video.duration) * 100
      this.$refs.indicator.style.width = `${curr}%`

      const sec = this.$refs.video.duration - this.$refs.video.currentTime
      let hours = Math.floor(sec / 3600)
      let minutes = Math.floor((sec - (hours * 3600)) / 60)
      let seconds = Math.floor(sec - (hours * 3600) - (minutes * 60))
      if (minutes < 10) {
        minutes = "0" + minutes
      }
      if (seconds < 10) {
        seconds = "0" + seconds
      }

      if (hours) {
        this.timeLeft = hours + ':' + minutes + ':' + seconds
      }

      return this.timeLeft = minutes + ':' + seconds
    },

    processBarClickEvent(e) {
      console.log(e.offsetX)
    },

    openInFullscreen() {
      try {
        const player = document.querySelector('.video-player')

        if (!document.fullscreenElement) {
          player.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      } catch (e) {
        console.log(e)
      }
    },

    goToSpecificTimeLine(timeline) {
      console.log('Specific timeline')
      this.$refs.video.currentTime = timeline
    },

    keydownEventHandler(event) {
      if (event.code === "Space") {
        this.togglePlay()
      }

      if (event.keyCode === 70) {
        this.openInFullscreen()
      }

      event.preventDefault()
    },

    async getEpisodeFromStore() {
      this.episode = await this.$store.getters['episode/episodes'].filter(item =>
          this.$route.params.media_id == item.media_id && this.$route.params.episode_id == item.id
      ).pop()

      try {
        console.log('Episode:', this.episode)
        const videoFile = fs.readFileSync(this.episode.fullPath)
        this.fileURL = URL.createObjectURL(new Blob([videoFile]))
        this.$refs.video.src = this.fileURL

        const subtitleFile = fs.readFileSync('/Users/wieb/Documents/Films/憑物語/Tsukimonogatari - 01 (BD 1280x720 AVC AACx2).vtt')
        this.$refs.subs.src = URL.createObjectURL(new Blob([subtitleFile]))
      } catch (e) {
        console.log(e)
      }
    }
  },

  created() {
    document.addEventListener('keyup', this.keydownEventHandler)
  },

  mounted() {
    this.getEpisodeFromStore()

    document.querySelector('track').track.mode = 'hidden'

    this.$refs.video.textTracks.addEventListener('addtrack', (e1) => {

      setTimeout(() => {
        this.sideTracks = this.$refs.video.textTracks[0].cues

        console.log('Sidetracks:', this.sideTracks)
      }, 100)

      e1.track.addEventListener('cuechange', (e2) => {
        const cues = e2.currentTarget.activeCues
        const activeTrack = e2.currentTarget.activeCues[0]

        if (! cues.length) {
          this.activeTrack = {
            id: '',
            text: ''
          }
        } else {
          this.activeTrack = activeTrack
        }

        console.log('Active Track:', this.activeTrack)
      })
    })
  },

  components: {SideTracks, Return, Play, Pause, Sound, Mute, Fullscreen}
}
</script>

<style scoped>
.controls {
  background: linear-gradient(to bottom, #14141400, #00000090)
}

video::cue {
  display: none
}
</style>
