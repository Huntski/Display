<template>
  <div
      class="cursor-pointer media-item h-32 rounded-lg bg-white bg-center bg-cover relative flex group"
      ref="seriesItem"
  >
    <img :src="thumbnail" class="absolute transition object-cover h-full w-full rounded-lg"/>

    <OptionsMenu class="relative ml-auto z-30 m-2 opacity-0 group-hover:opacity-100" :options="options" />

    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
         style="background: rgba(0,0,0,0.28)"
         @click="openEpisode()"
    >
      <span class="font-bold text-white font-bold text-2xl relative pointer-events-none">{{ episode.id }}</span>
    </div>
  </div>
</template>

<script>
import OptionsMenu from "@/components/OptionsMenu"

export default {
  props: {
    episode: Object
  },

  data() {
    return {
      thumbnail: 'https://as01.epimg.net/meristation_en/imagenes/2022/05/20/news/1653073396_064646_1653073527_noticia_normal.jpg',
      files: [],
      options: {

      }
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

  components: {OptionsMenu}
}
</script>
