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
      highlight: null,
      collectionPromise: null
    }
  },

  computed: {
    collection() {
      console.log(this.$store.getters['media/getDisplayedMedia'])

      return this.$store.getters['media/getDisplayedMedia']
    }
  },

  async created() {
    if (! this.$store.getters['media/getDirectoryFromStore']) {
      await this.$router.push({name: 'Welcome'})
    }

    await this.$store.dispatch('media/loadMediaCollection')

    this.loaded = true
  },

  components: {CollectionBrowser}
}
</script>
