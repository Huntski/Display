<template>
  <div class="rounded-lg pb-10">
    <Spinner class="w-10 m-auto mt-32" v-if="! collection.length" />

    <div class="media-collection grid gap-5 mt-10" v-else>
      <TransitionGroup name="fade">
        <CollectionItem
            v-for="(item, index) in collection" :key="index" :media="item"
            @click="selectedSeries = item"
        />
      </TransitionGroup>
    </div>

    <SeriesOverlay v-if="selectedSeries" :media="selectedSeries" @close="selectedSeries = null"/>
  </div>
</template>

<script>
import CollectionItem from './CollectionItem'
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
      searchResult: {},
      loading: true,
    }
  },

  watch: {
    collection(newVal) {
      console.log('New collection:', newVal)
    }
  },

  components: {CollectionItem, SeriesOverlay, Spinner},
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
</style>
