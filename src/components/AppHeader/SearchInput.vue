<template>
  <div class="relative group cursor-pointer font-bold italic text-lg font-raleway rounded flex items-center justify-center">
    <input :value="value"
           class="bg-transparent pl-5 pr-14 w-75 py-3 border-2 border-gray-200"
           ref="input"
           @keydown.enter="handleInput">

    <button @click="handleInput" class="absolute right-0 w-12 h-12 flex items-center justify-center">
      <Search class="w-6" />
    </button>
  </div>
</template>

<script>
import {Search} from "@/components/@icons"

export default {
  components: {Search},

  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    handleInput(f) {
      this.$emit('update:value', this.$refs.input.value)
    }
  }
}
</script>
