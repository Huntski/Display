<template>
  <div v-bind:style="{ 'background-image': 'url(' + media.coverImage + ')' }"
       class="w-72 h-96 rounded-md bg-gray-100 bg-no-repeat bg-cover bg-center border border-gray-100 transform transition hover:scale-105"
  >
    <div class="opacity-0 hover:opacity-100 item-cover rounded-md flex items-center justify-center max-h-full h-full">
      <Play class="w-10"/>
      <div class="text-center p-4 text-white item-details absolute bottom-0 w-full">
        <h2 class="font-bold">Episode 5</h2>
        <h3 class="text-xs font-light">{{ media.title.native }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import {Play} from "@/components/Icons"

export default {
  components: {Play},

  props: {
    media: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.item-cover {
  background-color: #00000066;
}

.item-details {
  background-color: #00000066;
}
</style>