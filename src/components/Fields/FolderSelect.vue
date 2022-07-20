<template>
  <input class="bg-gray-100 italic cursor-pointer font-raleway rounded px-5 py-4 w-96"
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
