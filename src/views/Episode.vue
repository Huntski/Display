<template>
  <div>
    <h1>{{ media.title.native }}</h1>

    <video ref="video" width="320" height="240" class="bg-black" autoplay muted>
      <source type="video/mp4">
    </video>
  </div>
</template>

<script>
import fs from 'fs'

export default {
  data() {
    return {
      media: null,
      episode: null
    }
  },

  beforeMount() {
    this.media = this.$store.getters['media/getMediaFromStore'].filter(item => this.$route.params.media_id == item.id).pop()
    this.episode = this.media.episodes[0]
  },

  mounted() {
    const file = fs.readFileSync(this.media.episodes[0].fullPath)
    this.fileURL = URL.createObjectURL(new Blob([file]))
    this.$refs.video.src = this.fileURL
  }
}
</script>