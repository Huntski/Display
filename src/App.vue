<template>
  <div class="bg-white min-h-screen font-raleway">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('checkDirectory')

    this.$router.push({ name: 'Browser' })
  },
}
</script>