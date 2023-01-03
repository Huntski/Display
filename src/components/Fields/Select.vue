<template>
  <div class="mb-3">
    <label class="text-lg">{{ label }}</label>
    <div class="relative select-container">
      <select
          class="bg-transparent w-full px-5 py-4 relative bg-gray-100 italic text-sm font-raleway rounded border border-gray-300"
          @input="handleUpdate"
      >
        <option v-for="(item, index) in options" :key="index">{{ item }}</option>
      </select>

      <SelectArrow class="absolute right-6 top-0 bottom-0 my-auto" />
    </div>
  </div>
</template>

<script>
import {SelectArrow} from "@/components/@icons"

export default {
  props: {
    options: {
      type: [Array, Object]
    },
    label: {
      type: String,
      required: false
    },
  },

  watch: {
    options(newArray) {
      this.$emit('update:value', newArray[0])
    }
  },

  methods: {
    handleUpdate(e) {
      this.$emit('update:value', e.target.value)
    }
  },

  components: {SelectArrow}
}
</script>

<style>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
