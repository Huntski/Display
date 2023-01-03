<template>
  <div class="rounded-lg pb-10">
    <Spinner class="w-10 m-auto mt-32 text-gray-300" v-if="! collection.length" />

    <TransitionGroup v-else name="fade" tag="div" class="media-collection grid gap-5 mt-10">
      <CollectionItem
          v-for="(item, index) in collection"
          :key="index"
          :media="item"
          @click="selectedSeries = item"
      />
    </TransitionGroup>

    <SeriesInspectPopup
        v-if="selectedSeries"
        :media="selectedSeries"
        @close="selectedSeries = null"
    />
  </div>
</template>

<script>
import CollectionItem from './CollectionItem'
import SeriesInspectPopup from './SeriesInspectPopup'
import {Spinner} from "@/components/@icons"

export default {
  name: "CollectionBrowser",

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
      searchResult: {},
      loading: true,
    }
  },

  watch: {
    collection(newVal) {
      console.log('New collection:', newVal)
    }
  },

  components: {CollectionItem, SeriesInspectPopup, Spinner},
}
</script>

<style>
.media-collection {
  grid-template-columns: repeat(3, 1fr);
}

@media screen and (min-width: 1000px) {
  .media-collection {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1250px) {
  .media-collection {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (min-width: 1500px) {
  .media-collection {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (min-width: 1750px) {
  .media-collection {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media screen and (min-width: 2300px) {
  .media-collection {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
