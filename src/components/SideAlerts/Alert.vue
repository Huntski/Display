<template>
  <div class="alert load-fade flex items-center shadow-lg rounded-lg bg-green-300 hover:bg-green-400 px-5 py-5">
    <div class="mr-10">
      <h2 class="text-lg">Success</h2>
      <span>{{ alert.message }}</span>
    </div>

    <div class="ml-auto cursor-pointer w-10 h-10 flex items-center justify-center" @click="closeAlert">
      <Cross class="w-4"/>
    </div>
  </div>
</template>

<script>
import {Cross} from "@/components/Icons"

export default {
  props: {
    alert: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      interval: null
    }
  },

  methods: {
    closeAlert() {
      clearTimeout(this.interval)

      this.$store.dispatch('alerts/removeAlert', this.alert.id)
    }
  },

  created() {
    const alertId = this.alert.id

    this.interval = setTimeout(_ => {
      this.$store.dispatch('alerts/removeAlert', alertId)
    }, 3000)
  },

  components: {Cross},
}
</script>

<style>
.alert {
  width: 500px;
}
</style>
