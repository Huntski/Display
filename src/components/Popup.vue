<template>
    <div class="fixed z-50 top-0 left-0 w-full flex justify-center">
      <slot class="popup"></slot>

      <div
           @click="close"
           class="absolute top-0 left-0 w-full min-h-screen z-10"
           :style="{ background: 'rgb(0, 0, 0, 20%)'}"
      />
    </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    },

    handleKeyDown(e) {
      if (e.key === 'Escape') {
        document.querySelector('body').removeEventListener('keydown', this.handleKeyDown)
        this.close()
      }
    }
  },

  mounted() {
    document.querySelector('body').addEventListener('keydown', this.handleKeyDown)
  }
}
</script>
