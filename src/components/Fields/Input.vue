<template>
  <div class="relative bg-gray-100 font-bold italic text-sm font-raleway rounded border border-gray-300">
    <input :value="value"
           class="bg-transparent px-5 py-4 w-80"
           @input="handleInput">

    <slot class="absolute top-0 right-20"></slot>
  </div>
</template>

<script>
export default {
  name: "Input",

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