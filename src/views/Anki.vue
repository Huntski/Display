<template>
  <div>
    <AnkiCardSetup v-if="connected" />
    <AnkiConnect v-else />
  </div>
</template>

<script>
import AnkiCardSetup from "@/components/AnkiCardSetup"
import AnkiConnect from "@/components/AnkiConnect"

export default {
  computed: {
    connected() {
      return this.$store.getters['anki/connected']
    }
  },

  created() {
    this.$store.dispatch('anki/checkPermission')
  },

  components: {AnkiConnect, AnkiCardSetup}
}
</script>
