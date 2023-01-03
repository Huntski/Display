<template>
  <div class="video-player relative w-full bg-black flex w-screen" tabindex="0" @mousemove="mouseShowTimeout">
    <SubtitleDragUpload @handleUpload="handleUpload" :global="true" :episode="episode"/>

    <div class="relative flex flex-1 flex-col h-full min-h-screen">

      <div class="absolute p-4 z-40 w-full flex justify-between" :class="{'opacity-0' : !showControls}">
        <router-link to="/">
          <Return class="w-7"/>
        </router-link>

        <div>
          <span
              class="text-white italic text-lg">Watching episode {{ episode ? episode.id : '' }} of {{ media ? media.name : '' }}.</span>
        </div>

        <div class="w-7"></div>
      </div>

      <div class="w-full h-screen">
        <video
            :class="{'cursor-hide' : !showControls}"
            @timeupdate="videoTimeChangedEvent" ref="video" class="object-contain w-full h-full" autoplay
            @click="togglePlay" :muted="muted"
        >
          <track src="" kind="captions" ref="subs" srclang="jp" label="Japanese">
        </video>
      </div>

      <div id="controls"
           class="absolute bottom-0 controls w-full h-64 flex flex-col text-white py-3 flex flex-col items-center h-40 transition">
        <span class="text-white text-center absolute text-3xl font-light mx-10"
              style="text-shadow: 0 1px 1px #000000, 0 1px 10px #000000">{{ activeTrack.text }}</span>

        <div class="w-full px-10 flex flex-col mt-auto items-center h-40" :class="{'opacity-0' : !this.showControls}">
          <span class="ml-auto text-gray-200">{{ timeLeft }}</span>

          <ProcessBar ref="processbar"/>

          <div class="w-full flex items-center justify-between mt-5 text-white">
            <div class="flex w-60">
              <div class="text-white w-6 box-content p-3 mr-2 cursor-pointer" @click="toggleMute">
                <Mute v-if="volume < 0.1 || muted"/>
                <Sound v-else/>
              </div>

              <input @input="changeVolume" v-model="volume" type="range" step=".1" min="0" max="1"
                     class="cursor-pointer">
            </div>

            <div>
              <div
                  class="bg-gray-900 rounded-full p-5 w-5 h-5 flex justify-center items-center box-content m-auto cursor-pointer"
                  @click="togglePlay"
              >
                <Pause class="w-4 ml-1" v-if="paused"/>
                <Play class="w-4" v-else/>
              </div>
            </div>

            <div class="w-60 flex justify-end items-center gap-5">
              <SpeedOptions/>

              <CaptionOptions :current="loadedSubtitleId" :subtitles="videoSubtitles"/>

              <Fullscreen class="w-5 box-content p-3 transform hover:scale-125 transition cursor-pointer"
                          @click="openInFullscreen"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SideTracks v-if="sideTracks.length > 0" :tracks=sideTracks :active-track="activeTrack"/>
  </div>
</template>

<script>
import fs from 'fs'
import {Mute, Pause, Play, Return, Sound, Fullscreen} from '@/components/@icons'
import SubtitleDragUpload from "@/components/SubtitleDragUpload"
import SideTracks from "./SideTracks"
import ProcessBar from './ProcessBar'
import CaptionOptions from "./CaptionOptions"
import SpeedOptions from "./SpeedOptions"
import useThumbnail from "@/composables/useThumbnail"

export default {
  name: 'VideoPlayer',

  data: () => {
    return {
      videoSubtitles: [],
      loadedSubtitleId: null,

      media: null,
      episode: null,
      paused: false,
      muted: true,
      currentTime: 0,
      volume: .5,
      timeLeft: '',
      track: null,
      activeTrack: '',
      sideTracks: [],
      trackMouse: false,
      storagePayload: {},
      displayCaptionSelect: false,
      displaySpeedSelect: false,
      cursorHideTimeout: null,
      showControls: true,
    }
  },

  methods: {
    /**
     * Toggles the pause value of the video element.
     * @return void
     */
    togglePlay() {
      const video = document.querySelector('video')

      if (this.displayCaptionSelect) {
        this.displayCaptionSelect = false
      } else if (video.paused) {
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

    /**
     * Change the volume of the video element. This will also unmute if muted.
     */
    changeVolume(e) {
      const volume = e.target.value

      if (volume) {
        this.$refs.video.muted = false
        this.muted = false
      }

      this.volume = volume
      this.$refs.video.volumes = volume
    },

    /**
     * Updates the current time on the processbar.
     * @returns {Promise<void>}
     */
    async videoTimeChangedEvent() {
      const video = document.querySelector('video')
      if (video) {
        this.currentTime = video.currentTime
        if (this.$refs.processbar) {
          this.$refs.processbar.processBar()
        }
      }
    },

    async syncVideoTimeWithCurrentTime() { // Is used by child element
      this.$refs.video.currentTime = this.currentTime
    },

    /**
     * Toggles opening the current video in fullscreen.
     * @return void
     */
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

    keydownEventHandler(event) {
      if (event.code === "Space") {
        this.togglePlay()
      }

      // Toggle full screen when F key is pressed.
      if (event.keyCode === 70) {
        this.openInFullscreen()
      }

      if (event.key === 'Escape') {
        this.displayCaptionSelect = false
      }

      if (event.keyCode === 37) {
        this.$refs.video.currentTime = this.$refs.video.currentTime - 10
      }

      if (event.keyCode === 39) {
        this.$refs.video.currentTime = this.$refs.video.currentTime + 10
      }

      event.preventDefault()
    },

    loadInVideo(path) {
      const videoFile = fs.readFileSync(path)
      this.fileURL = URL.createObjectURL(new Blob([videoFile]))
      this.$refs.video.src = this.fileURL
    },

    loadInSubtitle(subtitle) {
      // /Users/wieb/Documents/Films/憑物語/Tsukimonogatari - 01 (BD 1280x720 AVC AACx2).vtt
      console.log('Load in subtitles', subtitle)

      const subtitleFile = fs.readFileSync(subtitle.src, 'utf8')
      this.$refs.subs.src = URL.createObjectURL(new Blob([subtitleFile]))
      this.loadedSubtitleId = subtitle.id
    },

    async handleUpload(newSubtitle) {
      console.log('got new subtitle')
      await this.getSubtitles()
      this.loadInSubtitle(newSubtitle)
    },

    async getSubtitles() {
      this.videoSubtitles = await this.$store.dispatch('subtitle/getEpisodeSubtitles', this.storagePayload)
      console.log('Get subtitles:', this.videoSubtitles)
    },

    async getEpisodeFromStore() {
      this.storagePayload = {
        media_id: this.$route.params.media_id,
        episode_id: this.$route.params.episode_id
      }

      this.episode = await this.$store.dispatch('episode/getEpisode', this.storagePayload)
      this.media = await this.$store.dispatch('media/getMediaItemById', this.episode.media_id)
      console.log(this.media)
      await this.getSubtitles()

      try {
        this.loadInVideo(this.episode.fullPath)

        if (this.videoSubtitles.length) {
          this.loadInSubtitle(this.videoSubtitles[0])
        }
      } catch (e) {
        console.log(e)
      }
    },

    addTrackEventHandler() {
      document.querySelector('track').track.mode = 'hidden'

      this.$refs.video.textTracks.onaddtrack = e1 => {
        console.log('Add track event')
        setTimeout(() => {
          this.sideTracks = this.$refs.video.textTracks[0].cues
        }, 100)

        e1.track.oncuechange = e2 => {
          const cues = e2.currentTarget.activeCues
          const activeTrack = e2.currentTarget.activeCues[0]

          if (!cues.length) {
            this.activeTrack = {
              id: '',
              text: ''
            }
          } else {
            this.activeTrack = activeTrack
          }
        }
      }
    },

    controlsDisplayEventListener() {
      const controls = document.querySelector('#controls')
    },

    mouseShowTimeout(e) {
      console.log('mouse show timeout')
      clearTimeout(this.cursorHideTimeout)
      this.showControls = true
      const controlsRect = document.querySelector('#controls').getBoundingClientRect()

      if (e.clientY < controlsRect.y && !this.displayCaptionSelect && !this.displaySpeedSelect) {
        this.cursorHideTimeout = setTimeout(() => {
          this.showControls = false
        }, 1000)
      }
    },
  },

  created() {
    document.onkeyup = this.keydownEventHandler
  },

  mounted() {
    this.getEpisodeFromStore()
    this.addTrackEventHandler()
    this.controlsDisplayEventListener()
  },

  components: {
    CaptionOptions,
    SideTracks,
    ProcessBar,
    Return,
    Play,
    Pause,
    Sound,
    Mute,
    Fullscreen,
    SubtitleDragUpload,
    SpeedOptions
  }
}
</script>

<style>
.controls {
  background: linear-gradient(to bottom, #14141400, #00000090)
}

video::cue {
  display: none
}
</style>
