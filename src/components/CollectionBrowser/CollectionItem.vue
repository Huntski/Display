<template>
    <div class="load-fade item w-60 h-80 rounded-md transform overflow-hidden bg-green transition cursor-pointer flex items-center justify-center">
      <img :src="media.coverImage" class="object-contain w-full transition" />
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
