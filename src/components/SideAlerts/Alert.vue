<template>
  <div class="alert load-fade flex items-center shadow-lg rounded-lg px-5 py-5" :class="{'bg-green-300 hover:bg-green-400': !alert.error, 'bg-red-300 hover:bg-red-400': alert.error}">
    <div class="mr-10">
      <h2 class="text-lg">{{ alertTitle }}</h2>
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

  computed: {
    alertTitle() {
      if (this.alert.error) {
        return 'Failed'
      }

      return 'Success'
    }
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
    }, 5000)
  },

  components: {Cross},
}
</script>

<style>
.alert {
  min-width: 500px;
}
</style>
