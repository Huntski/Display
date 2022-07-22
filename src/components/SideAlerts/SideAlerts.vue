<template>
  <TransitionGroup name="fade" tag="div" class="absolute bottom-5 right-5">
    <Alert v-for="alert in alerts" :key="alert.id" :alert="alert" class="mt-5" />
  </TransitionGroup>
</template>

<script>
import Alert from "./Alert"

export default {
  computed: {
    alerts() {
      return this.$store.getters['alerts/getAlerts']
    }
  },

  components: {Alert}
}
</script>
