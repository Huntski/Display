<template>
  <div class="flex sticky top-0 pb-5 bg-white items-center pt-10">
    <div>
      <h1>Good morning! 👋</h1>
      <p class="mb-0">Another great day to ‘study’.</p>
    </div>

    <div class="ml-auto flex items-center gap-10">
      <button class="group" @click="showUpload = !showUpload">
        <Upload class="w-6" />
      </button>

      <SearchInput v-model:value="searchQuery" @keydown.enter="searchMedia" />
    </div>

    <UploadMedia v-show="showUpload" />
  </div>
</template>

<script>
import SearchInput from './SearchInput'
import {Upload} from '@/components/Icons'
import {UploadMedia} from '@/components/UploadMedia'

export default {
  data() {
    return {
      searchQuery: '',
      showUpload: false
    }
  },

  methods: {
    async searchMedia() {
      this.searchResult = await this.$store.dispatch('media/searchMediaTitle', this.searchQuery)
    }
  },

  components: {SearchInput, Upload, UploadMedia}
}
</script>
