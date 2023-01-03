<template>
  <div class="relative flex items-center justify-center"
       @mouseleave="show = false"
  >
    <Speed class="w-7 box-content p-3 cursor-pointer hover:scale-110 transform"
       @mouseenter="show = true"
    />

    <div
        class="absolute mb-28 -bottom-full -right-1 captions rounded mx-auto option bg-gray-800 z-40"
        v-show="show"
        @mouseleave="show = false"
    >
      <div class="w-40 overflow-auto">
        <div class="text-white text-sm overflow-hidden w-full flex items-center overflow-ellipsis hover:bg-gray-900 rounded cursor-pointer"
             v-for="(value, key) in options" :key="key"
             @click="changeVideoSpeed(value)"
             :class="{'bg-gray-900' : currentSpeed == value}"
        >
          <span
              class="p-4"
          >
            {{key}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Speed} from "@/components/@icons"

export default {
  data() {
    return {
      show: false,
      currentSpeed: '1.0',
      options: {
        '0.25': '0.25',
        '0.5': '0.50',
        'Normal': '1.0',
        '1.25': '1.25',
        '1.5': '1.5',
        '2.0': '2',
      }
    }
  },

  methods: {
    changeVideoSpeed(newSpeed) {
      this.$parent.$refs.video.playbackRate = newSpeed
      this.currentSpeed = newSpeed
    }
  },

  components: {Speed}
}
</script>

<style>
.option:before {
  content: '';
  position: absolute;
  bottom: -15px;
  margin: auto;
  right: 1rem;
  z-index: 300;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #202937;
}
</style>
