<template>
  <div class="min-h-screen flex font-primary px-5">
    <SideNav v-if="$route.name !== 'Welcome'" />
    <main class="flex-1 ml-10 min-h-screen">
      <AppHeader />

      <div class="py-5 h-full">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import {SideNav} from "@/components/SideNav"
import AppHeader from '@/components/AppHeader'

export default {
  created() {
    if (! this.$route.params.length) {
      this.$router.push({ name: 'Welcome' })
    }
  },

  components: {SideNav, AppHeader}
}
</script>