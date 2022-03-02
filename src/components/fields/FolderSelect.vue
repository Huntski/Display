<template>
  <input class="bg-gray-100 font-bold italic cursor-pointer text-sm font-raleway rounded px-5 py-4 border border-gray-300 w-80"
         type="text"
         :value="value"
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
      if (! result.canceled) {
        this.$emit('update:value', result.filePaths[0])
      }
    }
  }
}
</script>