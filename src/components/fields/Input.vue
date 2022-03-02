<template>
  <div>
    <input :value="value"
           class="border border-green-50"
           @input="handleInput">
  </div>
</template>

<script>
export default {
  name: "Input",

  props: ['value'],

  methods: {
    handleInput(e) {
      console.log(e.target.value)
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>