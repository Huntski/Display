<template>
  <Popup>
    <div class="popup series mt-10 rounded-2xl z-10">
      <div class="h-52 rounded-t-2xl relative text-white w-full bg-no-repeat bg-cover" v-bind:style="{ 'background-image': 'url(' + media.coverImage + ')' }">
        <div class="absolute rounded-t-2xl cover top-0 px-10 left-0 w-full h-full">
          <h1 class="pt-14 text-xl font-light">Series</h1>
          <h2 class="text-3xl">{{ media.title.native }}</h2>

<!--          <button class="text-white rounded px-8 py-3 mt-5">-->
<!--            Continue-->
<!--          </button>-->
        </div>

        <Exit class="absolute top-3 right-3 cursor-pointer" @click="$emit('close')" />
      </div>

      <div>
        <div v-for="(item, index) in episodes" :key="item.id">
          {{item.id}}
          {{index}}
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Popup'
import {Exit} from '@/components/Icons'

export default {
  props: ['media'],

  computed: {
    episodes() {
      return this.media.episodes
    }
  },

  components: {Popup, Exit}
}
</script>

<style scoped>
.series {
  width: 500px;
  height: 700px;
  background: #141414;
  box-shadow: 0 10px 20px #00000070;
}

.cover {
  background: #00000090;
}

button {
  background: #303030;
}
</style>