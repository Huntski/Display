<template>
  <div>
    <MediaHighlight />

    <MediaCollection />
  </div>
</template>

<script>
import {MediaCollection} from "@/components/MediaCollection"
import MediaHighlight from '@/components/MediaHighlight'

export default {
  beforeMount() {
    if (! this.$store.getters['media/getDirectoryFromStore']) {
      this.$router.push({name: 'Home'})
    }
  },

  components: {MediaCollection, MediaHighlight}
}
</script>