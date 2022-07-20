<template>
  <div
      @click="openEpisode()"
      class="cursor-pointer overflow-hidden media-item h-32 rounded-lg bg-white bg-center bg-cover relative"
      ref="seriesItem"
  >
    <img :src="thumbnail" class="transition absolute object-cover h-full w-full"/>

    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
         style="background: rgba(0,0,0,0.28)"
    >
      <span class="font-bold text-white font-bold text-2xl relative">{{ episode.id }}</span>
    </div>
  </div>
</template>

<script>
import fs from 'fs'

export default {
  props: ['episode'],

  data() {
    return {
      thumbnail: 'https://as01.epimg.net/meristation_en/imagenes/2022/05/20/news/1653073396_064646_1653073527_noticia_normal.jpg',
      files: []
    }
  },

  methods: {
    openEpisode() {
      this.$router.push({
        name: 'Episode', params: {
          media_id: this.episode.media_id,
          episode_id: this.episode.id
        }
      })
    },

    storeSubtitles() {

      console.log(this.files)
      // fs.readFile(files.image.path, function (err, data) {
      //
      //   var imageName = req.files.image.name
      //
      //   /// If there's an error
      //   if(!imageName){
      //
      //     console.log("There was an error")
      //     // res.redirect("/")
      //     // res.end()
      //
      //   } else {
      //
      //     var newPath = __dirname + "/uploads/fullsize/" + imageName
      //
      //     /// write file to uploads/fullsize folder
      //     fs.writeFile(newPath, data, function (err) {
      //
      //       /// let's see it
      //       res.redirect("/uploads/fullsize/" + imageName)
      //
      //     });
      //   }
      // })
    },

    async uploadSubtitles(files) {
      files.forEach(file => {
        console.log(file.path)

        fs.readFile(file.path, function (err, data) {
          const fileName = file.name

          try {
            console.log(__dirname)
          } catch (e) {
            console.log(e)
          }
        })
      })

      const media = await this.$store.getters['media/']
    }
  },

  mounted() {
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
      this.$refs.seriesItem.addEventListener(evt, function (e) {
        e.preventDefault()
        e.stopPropagation()
      }.bind(this), false)
    }.bind(this))

    this.$refs.seriesItem.addEventListener('drop', e => {
      this.uploadSubtitles(e.dataTransfer.files)
    })
  }
}
</script>
