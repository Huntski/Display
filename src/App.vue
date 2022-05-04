<template>
  <div class="min-h-screen font-raleway" :style="{ backgroundColor: '#FCFCFC' }">
    <Header v-if="$route.name !== 'Home'" />
    <router-view/>
  </div>
</template>

<script>
import {Header} from "@/components/Header"

export default {
  created() {
    if (! this.$route.params.length) {
      this.$router.push({ name: 'Home' })
    }
  },

  components: {Header}
}
</script>