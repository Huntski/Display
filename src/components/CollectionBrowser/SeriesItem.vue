<template>
  <div
      @click="openEpisode()"
      class="cursor-pointer overflow-hidden media-item h-32 rounded-lg bg-white bg-center bg-cover relative"
      ref="seriesItem"
  >
    <img :src="thumbnail" class="transition absolute object-cover h-full w-full"/>

    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
         style="background: rgba(0,0,0,0.28)"
    >
      <span class="font-bold text-white font-bold text-2xl relative">{{ episode.id }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['episode'],

  data() {
    return {
      thumbnail: 'https://as01.epimg.net/meristation_en/imagenes/2022/05/20/news/1653073396_064646_1653073527_noticia_normal.jpg',
      files: []
    }
  },

  methods: {
    openEpisode() {
      this.$router.push({
        name: 'Episode', params: {
          media_id: this.episode.media_id,
          episode_id: this.episode.id
        }
      })
    },
  },
}
</script>
