<template>
  <div v-if="loaded" class="flex flex-wrap gap-x-20 flex-grow">
    <MediaCollection class="w-full" v-if="true" :collection="collection"/>
  </div>
</template>

<script>
import {MediaCollection} from "@/components/MediaCollection"

export default {
  data() {
    return {
      loaded: false,
      collection: [],
      highlight: null,
      collectionPromise: null
    }
  },

  async created() {
    if (! this.$store.getters['media/getDirectoryFromStore']) {
      await this.$router.push({name: 'Welcome'})
    }

    this.$store.dispatch('media/updateMediaCollection').then(async response => {
      this.collection = response
      this.highlight = this.collection[0]
      this.loaded = true
    })
  },

  components: {MediaCollection}
}
</script>