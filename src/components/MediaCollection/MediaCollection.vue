<template>
  <div class="rounded-lg">
    <div class="grid grid-cols-4 lg:grid-cols-5 gap-4 mt-10">
      <MediaItem
          v-for="(item, index) in collection" :key="index" :media="item"
          @click="selectedSeries = item"
      />
    </div>

    <div v-if="collection.length == 0">
      <Spinner class="w-10" />
    </div>

    <SeriesOverlay v-if="selectedSeries" :media="selectedSeries" @close="selectedSeries = null" />
  </div>
</template>

<script>
import MediaItem from './MediaItem'
import SeriesOverlay from './SeriesOverlay'
import {Spinner} from "@/components/Icons"

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

  components: {Spinner, MediaItem, SeriesOverlay},
}
</script>