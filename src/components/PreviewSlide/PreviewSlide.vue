<template>
  <div ref="slide" class="flex gap-x-3 flex-wrap w-72 relative overflow-y-hidden">
    <div
        v-for="item in images"
        :key="item"
        class="slide-item absolute top-0 rounded-lg overflow-hidden shadow-lg w-72 bg-cover"
        :style="{ backgroundImage: 'url(' + item + ')' }"
    >
      <div class="absolute top-0 w-full h-full black-overlay"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewSlide',

  props: {
    images: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      perfectFrameTime: 1000 / 60,
      lastTimestamp: Date.now(),
      deltaTime: 0,
    }
  },

  mounted() {
    const slideItems = this.$refs.slide.querySelectorAll('.slide-item')

    let topItem = slideItems[0]

    const move = (timestamp) => {
      this.deltaTime = (this.timestamp - this.lastTimestamp) / this.perfectFrameTime
      this.lastTimestamp = this.timestamp

      slideItems.forEach(item => {
        item.style.top = parseInt(item.style.top) + 1 + 'px'

        if (parseInt(item.style.top) > (window.innerHeight + item.clientHeight)) {
          item.style.top = parseInt(topItem.style.top) - item.clientHeight - 40 + 'px'
          topItem = item
        }
      })

      setTimeout(_ => {requestAnimationFrame(move)}, 10)
    }

    setTimeout(() => {
      let locationX = 0
      slideItems.forEach(item => {
        item.style.top = locationX + 'px'
        locationX += item.clientHeight + 40
      })

      requestAnimationFrame(move)
    }, 1)
  },
}
</script>

<style>
.black-overlay {
  background: #00000050;
}

.slide-item {
  height: 420px;
}
</style>
