<template>
  <div>
    <h1>Browser</h1>
    <div v-for="item in collection" :key="item">
      {{ item[0] }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    collection() {
      return this.$store.getters['collection']
    }
  },

  created() {
    console.log('COLLECTION LIST LOADED')
    console.log(this.collection)
  }
}
</script>