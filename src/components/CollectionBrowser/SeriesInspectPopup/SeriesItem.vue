<template>
  <div
      class="series-item cursor-pointer media-item h-32 rounded-lg bg-white bg-center bg-cover relative flex group"
      ref="seriesItem"
  >
    <img v-if="episode.thumbnail" :src="episode.thumbnail" class="absolute transition object-cover h-full w-full rounded-lg"/>

    <OptionsMenu class="relative ml-auto m-2 opacity-0 group-hover:opacity-100" :options="optionsForOptionsMenu" />

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
import {downloadThumbnailFromEpisode} from "@/composables/Thumbnails"

export default {
  props: {
    episode: Object
  },

  data() {
    return {
      // thumbnail: 'https://as01.epimg.net/meristation_en/imagenes/2022/05/20/news/1653073396_064646_1653073527_noticia_normal.jpg',
      files: [],
      optionsForOptionsMenu: {
        "Download thumbnail": this.downloadEpisodeThumbnail,
        "Delete": this.deleteEpisode,
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

    downloadEpisodeThumbnail() {
      const thumbnailFilePath = downloadThumbnailFromEpisode(this.episode)

      console.log(thumbnailFilePath)

      const episode = this.episode
      episode.thumbnail = thumbnailFilePath

      this.$store.dispatch('episode/updateEpisode', episode)
    },

    deleteEpisode() {
      // TODO: Make delete episode feature.

      console.log('Delete episode.')
    }
  },

  components: {OptionsMenu}
}
</script>
