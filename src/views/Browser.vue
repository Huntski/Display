<template>
  <div v-if="loaded">
    Test
    <MediaHighlight v-if="highlight" :media="highlight"/>

    <MediaCollection v-if="false" :collection="collection"/>
  </div>
</template>

<script>
import {MediaCollection} from "@/components/MediaCollection"
import {MediaHighlight} from '@/components/MediaHighlight'

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
      await this.$router.push({name: 'Home'})
    }

    this.$store.dispatch('media/updateMediaCollection').then(async response => {
      this.collection = response
    })
  },

  mounted() {
    this.highlight = this.collection.pop()
    setTimeout(_ => {
      this.loaded = true
    }, 1)
  },

  components: {MediaCollection, MediaHighlight}
}
</script>