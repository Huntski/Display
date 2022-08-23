<template>
  <div class="bg-controls relative" :class="{'w-1' : close, 'w-96' : !close}">
    <div class="w-10 h-10 flex justify-center items-center rounded-full bg-gray-400 absolute top-20 cursor-pointer"
         :class="{'-left-9  rounded-r-none' : close, '-left-7' : !close}"
         @click="close = !close"
    >
      <PlainArrow
          class="w-3 transform"
          :class="{'rotate-180' : close}"
      />
    </div>

    <div class="tracks overflow-y-auto text-white h-screen">
      <div class="group p-3 flex items-center text-gray-300 border-b border-gray-800 hover:bg-gray-800"
           :class="{'bg-gray-800' : track.id == activeTrack.id}"
           v-for="track in tracks" :key="track.id"
           @click="$parent.goToSpecificTimeLine(track.startTime)"
      >
        <span>{{track.text}}</span>
      </div>
    </div>
  </div>

</template>

<script>
import {PlainArrow} from "@/components/Icons"

export default {
  props: ['tracks', 'activeTrack'],

  data() {
    return {
      close: false
    }
  },

  components: {PlainArrow}
}
</script>

<style scoped>
.tracks::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.tracks::-webkit-scrollbar-track {
  background: #141414;
}

/* Handle */
.tracks::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.tracks::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
