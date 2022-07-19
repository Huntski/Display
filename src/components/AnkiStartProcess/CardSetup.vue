<template>
  <div>
    <h2 class="mb-10">Card Fields</h2>

    <div v-for="(value, key) in fields" :key="key">
      <Select
          :options="options"
          v-model:value="fields[key]"
          :label="key"
      />
    </div>

    <div class="mt-10">
      <ButtonSecondary @click="previous" class="mr-5">&lt;</ButtonSecondary>
      <ButtonPrimary>Next</ButtonPrimary>
    </div>
  </div>
</template>

<script>
import {ButtonPrimary, ButtonSecondary} from "@/components/Buttons"
import {Select} from "@/components/Fields"

export default {
  data() {
    return {
      fields: {},
      options: [
        'Nothing',
        'Expression',
        'Sentence',
        'Meaning',
        'Screenshot',
        'Image',
        'Word',
        'Sentence Audio',
        'Word Audio',
      ]
    }
  },

  methods: {
    previous() {
      this.$emit('previous')
    }
  },

  mounted() {
    this.$store.dispatch('anki/notetype/getNoteTypeFields').then(noteTypeFields => {
      console.log('NoteTypes:', noteTypeFields)

      noteTypeFields.forEach(field => {
        this.fields[field] = ''
        console.log(this.fields)
      })
    })
  },

  components: {Select, ButtonPrimary, ButtonSecondary}
}
</script>
