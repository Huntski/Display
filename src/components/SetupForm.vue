<template>
  <div>
    <Popup v-show="showComplete">
      <div class="popup text-white bg-tabs-blue rounded-md py-10 px-3 shadow-lg mt-20 px-20 z-20 text-center">
        <div class="flex justify-center items-center relative mb-10">
          <h1 class="font-bold text-2xl">Tip for the future!</h1>
          <Fire class="text-red-500 transform rotate-12 ml-2"/>
        </div>

        <p class="text-gray-300 text-lg">You can always change the directory location<br> within the settings tab.</p>

        <button class="bg-gray-800 text-white rounded px-8 py-5 mt-10" @click="completeSetup">
          Continue
        </button>
      </div>
    </Popup>

    <div class="flex align-middle">
      <h1 class="text-3xl font-bold">Set folder location</h1>

      <Help color="#000" class="w-9 ml-10"/>
    </div>

    <div class="flex mt-5">
      <FolderSelect v-model:value="fields.directory" />

      <button class="bg-black p-5 ml-3 rounded" :class="{'pointer-events-none opacity-60' : ! fields.directory}" @click="setDirectory">
        <Triangle/>
      </button>

      <Spinner v-if="loading" class="w-10 ml-3"/>

      <div v-else class="w-10 ml-3"></div>
    </div>
  </div>
</template>

<script>
import {Help, Fire, Spinner, Triangle} from '@/components/Icons'
import Popup from '@/components/Popup'
import {FolderSelect} from "@/components/Fields"

export default {
  data() {
    return {
      fields: {
        directory: ''
      },
      loading: false,
      showComplete: false,
    }
  },

  methods: {
    setDirectory() {
      this.loading = true

      this.$store.dispatch('media/storeDirectoryInStore', this.fields.directory)

      setInterval(() => {
        this.showComplete = true
        this.loading = false
      }, 1000)
    },

    completeSetup() {
      this.$router.push({name: 'Browser'})
    }
  },

  components: {Help, Fire, Popup, Spinner, Triangle, FolderSelect},
}
</script>
