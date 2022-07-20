<template>
  <div class="w-full min-h-screen bg-black relative">
    <router-link to="/" class="absolute z-50 top-5 left-5 cursor-pointer">
      <Return class="w-7"/>
    </router-link>

    <video @timeupdate="processBar" ref="video" class="w-full" autoplay @click="togglePlay" muted>
      <track ref="subs" src="" kind="subtitles" srclang="en" label="English">
    </video>

    <div class="w-full text-white absolute bottom-0 flex flex-col items-center h-40">
      <div class="w-3/4 flex flex-col items-center h-40">
        <span class="ml-auto italic">{{ timeLeft }}</span>

        <div class="w-full h-2 bg-white rounded-full overflow-hidden">
          <div ref="indicator" class="bg-red-500 w-0 h-full relative"/>
        </div>

        <div class="w-full flex items-center justify-between mt-5 text-white">
          <div class="flex w-60">
            <div class="text-white w-6" @click="toggleMute">
              <Mute v-if="volume < 0.1 || muted "/>
              <Sound v-else/>
            </div>

            <input @input="changeVolume" v-model="volume" type="range" step=".1" min="0" max="1">
          </div>

          <div class="w-60">
            <div class="w-8 m-auto cursor-pointer" @click="togglePlay">
              <Play class="w-7" v-if="!paused"/>
              <Pause class="w-6" v-if="paused"/>
            </div>
          </div>

          <div class="w-60"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fs from 'fs'
import {Mute, Pause, Play, Return, Sound} from '@/components/Icons'

export default {
  data() {
    return {
      media: null,
      episode: null,
      paused: false,
      muted: false,
      volume: .5,
      timeLeft: ''
    }
  },

  methods: {
    togglePlay() {
      if (this.$refs.video.paused) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }

      this.paused = this.$refs.video.paused
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
      const date = new Date(this.$refs.video.duration - this.$refs.video.currentTime)
      this.timeLeft = date.toTimeString().split(' ')[0]
    },
  },

  beforeMount() {
    this.episode = this.$store.getters['episode/episodes'].filter(item =>
        this.$route.params.media_id == item.media_id &&
        this.$route.params.episode_id == item.id
    ).pop()

    console.log(this.episode)
  },

  mounted() {
    try {
      const videoFile = fs.readFileSync(this.episode.fullPath)
      this.fileURL = URL.createObjectURL(new Blob([videoFile]))
      this.$refs.video.src = this.fileURL

      const subtitleFile = fs.readFileSync('/Users/wieb/Documents/Films/憑物語/Tsukimonogatari - 01 (BD 1280x720 AVC AACx2).srt')
      this.$refs.subs.src = URL.createObjectURL(new Blob([subtitleFile]))
    } catch (e) {
      console.log(e)
    }
  },

  components: {Return, Play, Pause, Sound, Mute}
}
</script>

<style scoped>
input[type="range"]::-moz-range-progress {
  background: #3071A9;
}

input[type="range"]::-moz-range-track {
  background: #3071A9;
}
</style>
