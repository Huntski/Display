<template>
  <div class="flex items-center">
    <div>
      <h1 class="text-4xl font-extrabold">Good morning! 👋</h1>
      <p>Another great day to ‘study’.</p>
    </div>

    <div class="ml-auto flex items-center gap-10">
      <button class="group">
        <Upload class="w-6" />
      </button>

      <SearchInput v-model:value="searchQuery" @keydown.enter="searchMedia" />
    </div>

  </div>
</template>

<script>
import SearchInput from './SearchInput'
import {Upload} from '@/components/Icons'

export default {
  data() {
    return {
      searchQuery: ''
    }
  },

  methods: {
    async searchMedia() {
      this.searchResult = await this.$store.dispatch('media/searchMediaTitle', this.searchQuery)
    }
  },

  components: {SearchInput, Upload}
}
</script>
