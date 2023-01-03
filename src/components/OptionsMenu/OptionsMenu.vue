<template>
  <div class="relative">
    <button class="bg-gray-800 hover:bg-gray-700 rounded-full box-content">
      <Options class="w-8 h-8 p-2" />
    </button>

    <div class="absolute options-dropdown right-0 bg-gray-800 text-white p-4 rounded">
      <span class="hover:bg-gray-600 block p-3 rounded">Rename episode</span>
      <span class="hover:bg-gray-600 block p-3 rounded">Download thumbnail</span>
      <span class="hover:bg-gray-600 block p-3 rounded">Delete</span>
<!--      <span v-for="(value, key) in options" :key="key">-->
<!--        {{key}}-->
<!--      </span>-->
    </div>
  </div>
</template>

<script>
import {Options} from "@/components/@icons"

export default {
  props: {
    // Every option includes a function to be called.
    options: Object,
  },

  components: {Options}
}
</script>

<style scoped>
.options-dropdown {
  min-width: 300px;
}
</style>
