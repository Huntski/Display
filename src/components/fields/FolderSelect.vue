<template>
  <input class="bg-gray-100 italic text-sm font-raleway rounded px-5 py-4 border border-gray-300 w-80"
         type="text"
         :value="value"
         readonly
         @click="openFolderSelect"
         placeholder="C:/Documents/StoredMovies"
  />
</template>

<script>
import {ipcRenderer} from "electron";

export default {
  name: "FolderSelect",

  props: ['value'],

  methods: {
    async openFolderSelect() {
      const result = await ipcRenderer.invoke('open-document-folder')

      this.handleInput(result.filePaths[0])
    },

    handleInput(e) {
      this.$emit('update:value', e.target.value)
    },
  }
}
</script>