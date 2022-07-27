<template>
  <div>
<!--    <AnkiCardSetup v-if="ankiIsConnected" />-->
    <AnkiConnect />
  </div>
</template>

<script>
import AnkiCardSetup from "@/components/AnkiCardSetup"
import AnkiConnect from "@/components/AnkiConnect"

export default {
  components: {AnkiConnect}
}
</script>
