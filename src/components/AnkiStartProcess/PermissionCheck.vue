<template>
  <div class="mt-10">
    <h2>Get started with Anki</h2>

    <p>By settings up Anki, you will be able to make new flash cards from the words and sentences you want to learn,
      while watching any show, movie or anime with subtitles.</p>

    <div class="flex items-center my-10 py-10 border-t border-b border-gray-300">
      <div class="w-7 h-7">
        <Check class="text-green-500" v-if="status === 'granted'"/>
        <Warning v-else-if="status === 'failed'"/>
        <Spinner class="text-gray-300" v-else/>
      </div>

      <span class="italic mx-10">{{ message[this.status] }}</span>

      <button
          class="rounded-full group w-9 p-2 bg-gray-50 border border-gray-300"
          v-if="status === 'failed'"
          @click="check"
      >
        <Retry class="text-black"/>
      </button>
    </div>

    <div>
      <p>To connect Display with Anki, you will need the AnkiConnect add-on for Anki.</p>
      <p>Please download the add-on from here:</p>

      <button
          class="cursor-pointer rounded hover:border-gray-300 text-blue-600 italic p-4 bg-gray-50 border border-gray-200"
          @click="openExtensionLink"
      >{{ addonLink }}
      </button>
    </div>
  </div>
</template>

<script>
import {Spinner, Check, Warning, Retry} from "@/components/@icons"
import electron from 'electron'

export default {
  data() {
    return {
      status: 'loading',
      message: {
        'granted': 'Anki connected successfully.',
        'failed': 'Could not connect with Anki.',
        'loading': 'Attempting connection with Anki.',
      },
      addonLink: 'https://ankiweb.net/shared/info/2055492159'
    }
  },

  methods: {
    async check(){
      this.status = 'loading'
      let permissionCheck = null

      try {
        permissionCheck = await this.$store.dispatch('anki/checkPermission')
      } catch (e) {
        console.log(e)
        permissionCheck = 'failed'
      }

      setTimeout(() => {
        this.status = permissionCheck

        let response = null

        if (this.status === 'granted') {
          response = true
        }

        if (this.status === 'failed') {
          response = false
        }

        setTimeout(async () => this.$emit('update:status', response), 1000)
      }, 1000)
    },

    openExtensionLink() {
      electron.shell.openExternal(this.addonLink)
    }
  },

  created() {
    this.check()
  },

  components: {Spinner, Check, Warning, Retry}
}
</script>
