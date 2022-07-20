<template>
    <div class="load-fade item w-48 h-64 rounded-xl transform overflow-hidden bg-green transition cursor-pointer flex items-center justify-center">
      <img :src="media.coverImage" class="object-cover h-full w-full transition" />
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

<style scoped>
.item:hover img {
  transform: scale(105%);
}

.item-cover {
  background-color: #00000066;
}

.item-details {
  background-color: #00000066;
}
</style>
