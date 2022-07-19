<template>
  <div class="my-5">
    <input type="checkbox" ref="checkbox" :id="id" class="hidden"/>
    <label :for="id" class="cursor-pointer flex items-center">
      <div class="w-6 h-6 border border-gray-300 rounded-full"/>

      <span class="text-lg ml-5">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {}
  },

  data() {
    return {
      id: Math.floor(Math.random() * 99999) + '-' + Math.floor(Math.random() * 99999)
    }
  },

  methods: {
    handleInput(e) {
      this.$emit('update:value', e.target.checked)
    }
  },

  mounted() {
    this.$refs.checkbox.checked = this.value
  }
}
</script>

<style>
input:checked ~ label div {
  background: #141414;
}
</style>
