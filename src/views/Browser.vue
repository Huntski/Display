<template>
  <div class="px-20 pt-10">
    <Header />

    <BrowserCollection />
  </div>
</template>

<script>
import Header from '@/components/Header'
import BrowserCollection from "@/components/BrowserCollection"

export default {
  created() {
    console.log(this.$store.getters['directory'])

    console.log(this.$store.dispatch('readDirectory'))
  },

  components: {Header, BrowserCollection}
}
</script>