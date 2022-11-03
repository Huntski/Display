<template>
    <div class="load-fade group item w-40 h-44 lg:w-48 lg:h-64 rounded-xl transform bg-gray-100 overflow-hidden bg-green transition cursor-pointer flex hover:border-gray-800 border-2 border-white">
      <img v-if="media.coverImage" :src="media.coverImage" class="object-cover h-full w-full transition transform group-hover:scale-105" />

      <div class="px-4 text-2xl font-jap mt-auto mb-5" v-else>
        <h3>
          {{ media.title.native }}
        </h3>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      required: true
    }
  }
}
</script>
