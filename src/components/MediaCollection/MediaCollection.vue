<template>
  <div class="bg-tabs-blue p-10 rounded-lg h-full">
    <div class="grid grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
      <MediaItem
          v-for="(item, index) in collection" :key="index" :media="item"
          @click="selectedSeries = item"
      />
    </div>

    <div class="grid grid-cols-4 2xl:grid-cols-3 gap-4 mt-10" v-if="! Object.keys(collection).length">
      <div v-for="index in 7" :key="index" class="h-64 rounded-sm bg-gray-100" />
    </div>

    <SeriesOverlay v-if="selectedSeries" :media="selectedSeries" @close="selectedSeries = null" />
  </div>
</template>

<script>
import MediaItem from './MediaItem'
import SearchInput from "./SearchInput"
import SeriesOverlay from './SeriesOverlay'

export default {
  props: {
    collection: {
      type: Array,
      required: false
    }
  },

  data() {
    return {
      searchQuery: '',
      selectedSeries: null,
      searchResult: {}
    }
  },

  methods: {
    async searchMedia() {
      this.searchResult = await this.$store.dispatch('media/searchMediaTitle', this.searchQuery)
    }
  },

  components: {MediaItem, SearchInput, SeriesOverlay},
}
</script>