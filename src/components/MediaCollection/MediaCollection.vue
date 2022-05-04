<template>
  <div class="mt-10 px-20">
    <div class="flex items-center">
      <h1 class="text-3xl">My watch list</h1>

      <div class="ml-auto">
        <SearchInput v-model:value="searchQuery" @keydown.enter="searchMedia" />
      </div>
    </div>

    <div class="grid grid-cols-4 lg:grid-cols-5 gap-4 mt-10" >
      <MediaItem
          v-for="(item, index) in collection" :key="index" :media="item"
          @click="selectedSeries = item"
      />
    </div>

    <div class="grid grid-cols-4 2xl:grid-cols-3 gap-4 mt-10" v-if="! Object.keys(collection).length">
      <div v-for="index in 7" :key="index" class="h-64 rounded-sm bg-gray-100"></div>
    </div>

    <SeriesOverlay v-if="selectedSeries" :media="selectedSeries" @close="selectedSeries = null" />
  </div>
</template>

<script>
import MediaItem from './MediaItem'
import SearchInput from "./SearchInput"
import SeriesOverlay from './SeriesOverlay'

export default {
  data() {
    return {
      collection: {},
      searchQuery: '',
      selectedSeries: null,
    }
  },

  methods: {
    async searchMedia() {
      this.collection = await this.$store.dispatch('media/searchMediaTitle', this.searchQuery)
    }
  },

  async created() {
    await this.$store.dispatch('media/updateMediaCollection')
    this.collection = this.$store.getters['media/getMediaFromStore']
  },

  components: {MediaItem, SearchInput, SeriesOverlay},
}
</script>