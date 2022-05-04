<template>
  <div class="relative">
    <div class="absolute whitespace-nowrap rounded-full px-7 py-4 popup opacity-0 group-hover:opacity-100 group-hover:popup group-hover:popup pointer-events-none" :style="{...position, backgroundColor: '#FFDB49'}">
      <div class="connection absolute bottom-2/4 left-0"></div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    located: {
      type: String,
      required: false
    },
  },

  computed: {
    position() {
      let result;

      switch (this.located) {
        case 'up-left':
          result = {bottom: '100%', right: '100%'}
          break
        case 'up-right':
          result = {bottom: '100%', left: '100%'}
          break
        case 'bottom-left':
          result = {bottom: '110%', right: '100%'}
          break
        case 'bottom-right':
          result = {top: '160%', left: '150%'}
          break
        default:
          result = {bottom: '100%', left: '100%'}
      }

      return result
    }
  }
}
</script>

<style>
.connection {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;

  border-left: 40px solid #FFDB49;
}
</style>