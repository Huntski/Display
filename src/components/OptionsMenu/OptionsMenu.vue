<template>
  <div class="options-menu relative z-10">
    <button class="options-button relative z-10 bg-gray-800 hover:bg-gray-700 rounded-full box-content"
    >
      <Options class="w-8 h-8 p-2" />
    </button>

    <div class="absolute options-dropdown right-0 bg-gray-800 text-white p-4 rounded z-2 hidden">
          <span v-for="(value, key) in options" :key="key"
                class="hover:bg-gray-600 block p-3 rounded" tabindex="0"
                @click="value"
          >
            {{key}}
          </span>
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
.options-menu:focus-within {
  opacity: 1 !important;
}

.options-menu:focus-within > .options-dropdown {
  display: block;
}

.options-dropdown {
  min-width: 300px;
}
</style>
