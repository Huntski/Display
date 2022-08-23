<template>
  <div class="absolute bg-tabs-blue w-96 text-white top-20 z-50 rounded-xl shadow-lg right-0 shadow-lg">
    <div class="rounded-t-xl bg-black flex items-center p-5">
      <Avatar class="w-16 h-16" />
      <div class="ml-5">
        <span class="block text-lg font-semibold">Dynacraze</span>
        <span>wilsonpm@yahoo.ca</span>
      </div>
    </div>

    <div @click="$emit('close')">
      <router-link :to="{name: 'Settings'}" tag="div" class="group flex items-center hover:bg-black p-5">
        <Settings class="w-5 mr-4 group-hover:rotate-90 transition transform" />
        <span class="text-lg cursor-pointer">Settings</span>
      </router-link>

      <div @click="reloadCollection" class="group flex items-center hover:bg-black rounded-b-xl p-5">
        <Reload class="w-5 mr-4 group-hover:-rotate-45 transition transform" />
        <span class="text-lg cursor-pointer">Reload collection</span>
      </div>
    </div>
  </div>
</template>

<script>
import {Settings, Reload} from "@/components/Icons"
import Avatar from "./Avatar"

export default {
  methods: {
    reloadCollection() {
      this.$store.dispatch('media/reloadMediaCollection')
    }
  },

  components: {Settings, Reload, Avatar}
}
</script>
