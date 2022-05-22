<template>
  <div>
    <h2 class="mb-5">Recently watched</h2>
    <div class="flex items-center">
      <div v-bind:style="{ 'background-image': 'url(' + media.coverImage + ')' }"
           class="w-60 h-80 rounded-md bg-gray-100 bg-no-repeat bg-cover bg-center"
      />

      <div class="ml-10">
        <h1 class="text-6xl font-jap mb-5">{{media.title.native}}</h1>

        <p class="mb-3">Episode 1/3</p>
        <p>Learned words 73</p>

        <div class="flex items-center mt-10">
          <button class="bg-primary-gold hover:bg-primary-gold-bright text-black text-lg px-5 py-2 rounded-lg flex items-center justify-center">
            Play
            <Play class="w-3 text-black ml-4" />
          </button>

          <button class="cursor-pointer w-11 h-11 bg-black ml-3 rounded-lg flex flex-col items-center justify-center transform rotate-90">
            <div class="w-2 h-1 rounded-full bg-white transform rotate-45"/>
            <div class="w-2 h-1 rounded-full bg-white transform rotate-135"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Play} from "@/components/Icons"

export default {
  props: {
    media: {
      type: Object,
      required: true,
    }
  },

  mounted() {
    this.media.episodes.filter(item => item.id === this.media.currentEpisode)
  },

  components: {Play}
}
</script>