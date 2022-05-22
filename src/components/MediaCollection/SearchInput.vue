<template>
  <div class="relative cursor-pointer bg-tabs-blue w-14 h-14 font-bold italic text-sm font-raleway rounded flex items-center justify-center">
<!--    <input :value="value"-->
<!--           class="bg-transparent px-5 py-4 w-80"-->
<!--           @input="handleInput">-->

    <Search />
  </div>
</template>

<script>
import {Search} from "@/components/Icons"

export default {
  name: "Input",

  components: {Search},

  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    handleInput(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>