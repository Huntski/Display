<template>
  <Popup>
    <div class="popup bg-white rounded-lg shadow-xl p-10 mt-20 z-20 text-center">
      <div class="flex justify-center items-center relative mb-3">
        <h1 class="font-bold text-xl text-black px-10 py-10">{{ title }}</h1>
      </div>

      <p class="text-lg">{{text}}</p>

      <div class="mx-10 text-mds">
        <button class="bg-gray-800 text-white rounded px-14 py-4 mt-10 mr-5" @click="handle(true)">
          No
        </button>

        <button class="bg-gray-300 text-black rounded px-14 py-4 mt-10" @click="handle(false)">
          Yes
        </button>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "@/components/Popup"

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: false,
    }
  },

  methods: {
    handle(confirmation) {
      return this.$emit('handle', confirmation)
    }
  },

  components: {Popup}
}
</script>
