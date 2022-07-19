<template>
  <form ref="checklist">
    <div class="my-5" v-for="(option, index) in options" :key="index" >
      <input type="radio" :name="radioId" ref="checkbox" :id="index" class="hidden" :checked="option.checked" @change="handleInput"/>
      <label :for="index" class="cursor-pointer flex items-center">
        <div class="w-6 h-6 border border-gray-300 rounded-full"/>

        <span class="text-lg ml-5">{{ option.label }}</span>
      </label>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object],
      required: true
    }
  },

  data() {
    return {
      radioId: Math.floor(Math.random() * 99999) + '_' + Math.floor(Math.random() * 99999)
    }
  },

  methods: {
    handleInput(e) {
      const result = this.$refs.checklist.querySelector('input[type=radio]:checked').id

      this.$emit('update:value', result)
    }
  }
}
</script>

<style>
input:checked ~ label div {
  background: #141414;
}
</style>
