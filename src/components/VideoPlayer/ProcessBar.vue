<template>
  <div id="processbar" ref="processbar" class="w-full h-2 bg-gray-800 rounded-full cursor-pointer"
       @mousedown="processBarMouseDownEvent"
  >
    <div ref="indicator" class="bg-red-400 w-0 h-full relative pointer-events-none rounded-full relative flex justify-end items-center">
      <div class="absolute -right-2 w-5 h-5 rounded-full bg-red-600"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trackMouse: false,
      previousVideoPauseStatus: null,
      currentTime: 0
    }
  },

  methods: {
    processBar() {
      const curr = (this.$parent.currentTime / this.$parent.$refs.video.duration) * 100
      this.$refs.indicator.style.width = `${curr}%`

      const sec = this.$parent.$refs.video.duration - this.$parent.currentTime
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

    async processBarMouseDownEvent(mouseEvent) {
      this.$parent.currentTime = this.processBarTrackMouse(mouseEvent)

      const video = document.querySelector('video')
      this.previousVideoPauseStatus = video.paused

      if (! video.paused) {
        video.pause()
      }

      this.$parent.currentTime = this.processBarTrackMouse(mouseEvent)

      this.trackMouse = true
    },

    processBarTrackMouse(e) {
      const processbar = document.querySelector('#processbar').getBoundingClientRect()
      let relativeMousePosition = e.clientX - processbar.left

      if (relativeMousePosition < 0) { // Check if position is left outside of element
        relativeMousePosition = 0
      } else if (relativeMousePosition > processbar.width) { // Check if position is right outside of element
        relativeMousePosition = processbar.width
      }

      const calculatedCurrentTime = this.$parent.$refs.video.duration / 100 * (100 / processbar.width * relativeMousePosition)

      this.$parent.currentTime = calculatedCurrentTime
      this.currentTime = calculatedCurrentTime

      console.log('Changed parent time to:', this.$parent.currentTime)

      this.processBar()

      return calculatedCurrentTime
    },

    trackMousePosition(e) {
      if (this.trackMouse) {
        this.processBarTrackMouse(e)
      }
    },

    async mouseUpEvent() {
      if (this.trackMouse) {
        this.trackMouse = false
        console.log('Mouse Up Event', this.$parent.currentTime, this.currentTime)

        this.$parent.$refs.video.currentTime = this.currentTime
        this.$parent.currentTime = this.currentTime

        if (! this.previousVideoPauseStatus) {
          this.$parent.$refs.video.play()
        }

        this.previousVideoPauseStatus = null
      }
    }
  },

  created() {
    document.addEventListener('mousemove', this.trackMousePosition)
    document.addEventListener('mouseup', this.mouseUpEvent)
  }
}
</script>
