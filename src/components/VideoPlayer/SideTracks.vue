<template>
  <div class="bg-controls relative" :class="{'w-1' : close, 'w-96' : !close}">
    <div class="w-10 h-10 flex justify-center items-center rounded-full bg-gray-400 absolute top-20 cursor-pointer"
         :class="{'-left-9  rounded-r-none' : close, '-left-7' : !close}"
         @click="close = !close"
    >
      <PlainArrow
          class="w-3 transform"
          :class="{'rotate-180' : close}"
      />
    </div>

    <div v-if="tracks.length < 0" class="my-auto w-full h-full flex flex-col justify-center items-center mx-auto">
      <Spinner class="w-10 mb-5 text-blue-500" />
      <span class="text-white">Loading subtitles...</span>
    </div>

    <div class="scrollbar overflow-y-auto text-white h-screen" :class="{'hidden' : close}">
      <span class="track group p-3 flex items-center text-gray-300 border-b border-gray-800 hover:bg-gray-800"
           :class="{'active bg-gray-800' : track.id == this.activeTrack.id || (this.activeTrack.id == '' && this.previousTrackId == track.id)}"
           v-for="track in tracks" :key="track.id"
           @click="goToSpecificTimeLine(track.startTime)"
      >
        {{track.text}}
      </span>
    </div>
  </div>
</template>

<script>
import {PlainArrow, Spinner} from "@/components/Icons"

export default {
  props: {
    tracks: {
      type: [Array, Object]
    },

    activeTrack: {
      type: Object
    },

    loading: {
      type: Boolean,
    }
  },

  data() {
    return {
      close: false,
      loadingSubs: true,
      previousTrackId: null
    }
  },

  watch: {
    tracks(newVal) {
      if (newVal.length) {
        this.loadingSubs = false
      }
    },

    loading() {
      this.loadingSubs = this.loading
    },

    activeTrack(newTrack, oldTrack) {
      this.previousTrackId = oldTrack.id

      this.putActiveIntoView()
    }
  },

  computed: {
    isActiveTrack(track) {
      if (this.activeTrack.text) {
        if (track.id == this.activeTrack.id) {
          return true
        }
      }

      return false
    }
  },

  methods: {
    goToSpecificTimeLine(time) {
      this.$parent.$refs.video.currentTime = time + 0.01
    },

    async putActiveIntoView() {
      setTimeout(() => {
        const activeElement = document.querySelector('.active')

        if (! this.isInView(activeElement)) {
          activeElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        }
      }, 10)
    },

    isInView(element) {
      const rect = element.getBoundingClientRect()

      return rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    }
  },

  components: {PlainArrow, Spinner}
}
</script>
