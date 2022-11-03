<template>
  <div class="relative flex items-center justify-center"
       @mouseleave="show = false"
  >
    <Confirmation
        v-show="requestedDeletion"
        title="Delete the following subtitle?"
        @handle="removeConfirmation"
        :text="requestedDeletion !== null ? requestedDeletion.fileName : ''"
    />

    <Captions class="w-7 box-content p-3 transform hover:scale-110 cursor-pointer" @mouseenter="show = true" />

    <div
        ref="options"
        class="absolute mb-28 -bottom-full -right-1 option rounded mx-auto bg-gray-800 z-40"
        v-show="show"
        @mouseleave="show = false"
    >
      <div class="w-80 h-80 overflow-auto">
        <div class="text-white text-sm overflow-hidden w-full flex items-center overflow-ellipsis hover:bg-gray-800 rounded cursor-pointer"
             v-for="subtitle in subtitles" :key="subtitle.src"
             :class="{'bg-gray-800' : current === subtitle.id}"
        >
          <span
              class="p-2"
              @click="loadInSubtitle(subtitle)"
          >
            {{subtitle.fileName}}
          </span>

          <div
              class="ml-auto p-3 font-bold hover:bg-gray-600 bg-gray-700 p-4 rounded-full m-2"
              @click="removeSubtitle(subtitle)"
          >
            <Trashcan class="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Captions, Trashcan} from "@/components/Icons"
import {Confirmation} from "@/components/Confirmation"

export default {
  props: {
    subtitles: {
      type: Object,
      required: false,
    },
    current: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      show: false,
      requestedDeletion: null,
    }
  },

  methods: {
    loadInSubtitle(subtitle) {
      this.$parent.displayCaptionSelect = false
      this.$parent.loadInSubtitle(subtitle)
    },

    removeSubtitle(subtitle) {
      this.requestedDeletion = subtitle

      this.$store.dispatch('subtitle/removeSubtitle', subtitle.id).then(() => {
        this.$parent.getSubtitles()
      })
    },

    removeConfirmation(confirm) {
      console.log(this.requestedDeletion)
      if (confirm) {
        this.$store.dispatch('subtitle/removeSubtitle', this.requestedDeletion.id)
      }

      this.requestedDeletion = false
    },
  },

  components: {Captions, Trashcan, Confirmation}
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
