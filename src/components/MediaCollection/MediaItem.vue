<template>
  <div class="w-60 item">
    <div class="w-full h-80 rounded-md transform overflow-hidden transition cursor-pointer flex items-center justify-center">
      <img :src="media.coverImage" class="w-full transition" />
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