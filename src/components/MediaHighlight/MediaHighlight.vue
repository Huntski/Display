<template>
  <div>
    <WavyThumbnail src="https://i.imgur.com/fjqe2Os.png" class="absolute top-0" />

    <div class="pt-60"></div>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      required: true,
    }
  },

  mounted() {
    console.log('loaded:', this.media)


    // this.media.episodes.filter(item => item.id === this.media.currentEpisode)
  }
}
</script>