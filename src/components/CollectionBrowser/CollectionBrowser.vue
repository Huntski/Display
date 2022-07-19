<template>
  <div class="rounded-lg">
    <div class="media-collection grid gap-5 mt-10">
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
      console.log(newVal)
    }
  },

  created() {
    console.log('Load media collection')
  },

  components: {CollectionItem, SeriesOverlay},
}
</script>

<style>
.media-collection {
  grid-template-columns: repeat(3, 1fr);
}

@media screen and (min-width: 1300px) {
  .media-collection {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 1500px) {
  .media-collection {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (min-width: 1750px) {
  .media-collection {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (min-width: 2050px) {
  .media-collection {
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
