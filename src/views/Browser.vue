<template>
  <div v-if="loaded" class="flex flex-wrap gap-x-20 flex-grow">
    <CollectionBrowser class="w-full" :collection="collection"/>
  </div>
</template>

<script>
import {CollectionBrowser} from "@/components/CollectionBrowser"

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

    if (this.$store.getters['media/hasMediaCollection']) {
      this.collection = await this.$store.dispatch('media/updateMediaCollection')
    } else {
      this.collection = this.$store.getters['media/getMediaCollection']
    }

    this.highlight = this.collection[0]
    this.loaded = true


  },

  components: {CollectionBrowser}
}
</script>
