<template>
  <div class="min-h-screen flex font-raleway text-white">
    <SideNav v-if="$route.name !== 'Home'" />
    <main class="m-auto">
      <router-view/>
    </main>
  </div>
</template>

<script>
import {SideNav} from "@/components/SideNav"

export default {
  created() {
    if (! this.$route.params.length) {
      this.$router.push({ name: 'Home' })
    }
  },

  components: {SideNav}
}
</script>