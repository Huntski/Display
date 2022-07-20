<template>
  <div class="min-h-screen flex font-primary">
    <SideNav v-if="showMenu" />
    <main class="flex-1 min-h-screen"
          :class="{'px-20' : showMenu}">
      <div class="h-full">
        <AppHeader v-if="showMenu" />

        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import {SideNav} from "@/components/SideNav"
import {AppHeader} from '@/components/AppHeader'

export default {
  computed: {
    showMenu() {
      if (this.$route.path == '/' || this.$route.path.includes('episode')) {
        return false
      }

      return true
    }
  },

  created() {
    if (! this.$route.params.length) {
      this.$router.push({ name: 'Welcome' })
    }


  },

  mounted() {
    console.log(this.$route.path.includes)
  },

  components: {SideNav, AppHeader}
}
</script>
