<template>
  <div class="flex container max-w-6xl m-auto h-screen">
    <div class="pt-20 px-10">
      <h2 class="text-3xl font-extralight">Lets get started with</h2>

      <div class="flex items-center mt-5">
        <Logo class="w-16"/>
        <span class="ml-5 text-5xl font-semibold">Display!</span>
      </div>

      <p class="mt-10 text-sm">
        A simple manager for your downloaded<br>
        Movies, Anime, Series and more.
      </p>

      <SetupForm class="mt-20"/>
    </div>

    <PreviewSlide :images="slideLeftImages" class="first-slide mr-10 mt-20"/>
    <PreviewSlide :images="slideRightImages" class="pt-10"/>
  </div>
</template>
<script>
import {Logo} from "@/components/Icons"
import SetupForm from "@/components/SetupForm"
import {PreviewSlide} from '@/components/PreviewSlide'

export default {
  data() {
    return {
      slideLeftImages: [
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx98444-zzhSw9o3LJSy.jpg',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx269-KxkqTIuQgJ6v.png',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx849-uXOftsjBDz2T.png',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx107717-bixaW1NTGBra.jpg',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20918-2InvV6EsOScm.png'
      ],
      slideRightImages: [
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx131565-3W2YEX6V3K3i.jpg',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Yl5M3AiLZAMq.png',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20602-inmI8K7eSw6j.jpg',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6802-MmsfM8KAgZuR.jpg',
        'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21262-jfbv9hvjymMW.jpg'
      ],
    }
  },

  created() {
    // if (this.$store.getters['media/getDirectoryFromStore']) {
    //   this.$router.push({name: 'Browser'})
    // }
  },

  components: {Logo, SetupForm, PreviewSlide}
}
</script>

<style scoped>
.first-slide {
  margin-top: -200px;
}
</style>