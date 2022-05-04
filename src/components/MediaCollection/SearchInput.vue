<template>
  <div class="relative bg-gray-100 font-bold italic text-sm font-raleway rounded border border-gray-300">
    <input :value="value"
           class="bg-transparent px-5 py-4 w-80"
           @input="handleInput">

    <Search class="absolute right-0 top-0 bottom-0 mt-auto mb-auto mr-5" />
  </div>
</template>

<script>
import {Search} from "@/components/Icons"

export default {
  name: "Input",

  components: {Search},

  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    handleInput(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>