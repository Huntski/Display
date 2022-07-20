<template>
  <div class="flex sticky z-20 top-0 pb-5 bg-white items-center pt-10">
    <div>
      <h1>{{greeting}}</h1>
      <p class="mb-0">{{openingMessage}}</p>
    </div>

    <div class="ml-auto flex items-center gap-10">
      <button class="group" @click="showUpload = !showUpload">
        <Upload class="w-6" />
      </button>

      <SearchInput v-model:value="searchQuery" @keydown.enter="searchMedia"/>
    </div>

    <UploadMedia v-show="showUpload" />

    <AccountDropdown class="ml-10" />
  </div>
</template>

<script>
import SearchInput from './SearchInput'
import {Upload} from '@/components/Icons'
import {UploadMedia} from '@/components/UploadMedia'
import {AccountDropdown} from "@/components/AccountDropdown"

export default {
  data() {
    return {
      searchQuery: '',
      showUpload: false,
    }
  },

  computed: {
    greeting() {
      const curHour = new Date().getHours()

      if (curHour < 4) {
        return "Good night! 💤"
      } else if (curHour < 12) {
        return "Good morning! 👋"
      } else if (curHour < 18) {
        return "Good afternoon! ☕️"
      } else {
        return "Good evening! 🌙"
      }
    },

    openingMessage() {
      const curHour = new Date().getHours()

      if (curHour < 4) {
        return "\"Man is a genius when he is dreaming.\" 💤"
      } else if (curHour < 12) {
        return "Another great day to ‘study’.️"
      } else if (curHour < 18) {
        return "Another great day to ‘study’.️"
      } else {
        return "Another great day to ‘study’.️"
      }
    }
  },

  methods: {
    async searchMedia() {
      await this.$store.dispatch('media/searchMediaTitle', this.searchQuery)
    }
  },

  components: {SearchInput, Upload, AccountDropdown, UploadMedia}
}
</script>
