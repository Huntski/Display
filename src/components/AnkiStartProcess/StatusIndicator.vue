<template>
  <div class="p-5">
    <div v-for="(item, index) in items" :key="index" class="flex gap-4 mb-3 items-center">
      <div class="w-5">
        <RoundedCheck class="text-green-500" v-if="item"/>
        <Warning class="text-green-500" v-else-if="item === false"/>
        <div v-else class="w-5 h-5 bg-gray-200 rounded-full"></div>

      </div>

      {{index}}
    </div>
  </div>
</template>

<script>
import {Warning, RoundedCheck} from "@/components/Icons"

export default {
  props: {
    items: {
      type: Object
    }
  },

  watch: {
    items(newVal) {
      console.log('Update status', newVal)
    }
  },

  components: {RoundedCheck, Warning}
}
</script>
