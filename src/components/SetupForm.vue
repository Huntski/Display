<template>
  <div>
    <div class="flex align-middle">
      <h1 class="text-3xl font-bold">
        Set folder location
      </h1>

      <Help class="w-9 ml-10"/>
    </div>

    <div class="flex mt-5">
      <FolderSelect v-model:value="fields.directory"/>

      <button class="bg-purple-400 p-5 ml-3 rounded" :class="{'pointer-events-none opacity-60' : ! fields.directory}" @click="setDirectory">
        <Triangle/>
      </button>

      <Spinner class="w-10 ml-3" v-show="loading"/>
    </div>

    <Popup class="text-center" v-show="showComplete">
      <div class="flex justify-center items-center relative">
        <h1 class="font-bold text-2xl">Tip for the future!</h1>
        <Fire class="text-red-500 transform rotate-12 ml-2"/>
      </div>

      <p class="mt-3">
        You can always change the directory location<br> within the settings tab.
      </p>

      <button class="bg-gray-800 text-white rounded px-8 py-5 mt-10" @click="completeSetup">
        Understood!
      </button>
    </Popup>
  </div>
</template>

<script>
import Help from '@/components/icons/Help'
import Fire from '@/components/icons/Fire'
import Popup from '@/components/Popup'
import Spinner from '@/components/icons/Spinner'
import Triangle from '@/components/icons/Triangle'
import FolderSelect from "@/components/fields/FolderSelect"

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

      this.$store.dispatch('setDirectory', this.fields.directory)

      setInterval(() => {
        this.showComplete = true
        this.loading = false
      }, 1000)
    },

    completeSetup() {
      //
    }
  },

  components: {Help, Fire, Popup, Spinner, Triangle, FolderSelect},
}
</script>