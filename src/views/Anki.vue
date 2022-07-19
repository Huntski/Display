<template>
  <div class="p-10 border border-gray-200 rounded-md w-full">
    <h2>Anki card setup</h2>

    <CheckList :options="usage" v-model:value="form.whichNoteType" />

    <div class="w-1/2" :class="{'opacity-50 pointer-events-none' : form.whichNoteType === 'defaultNoteType'}">
      <div class="flex gap-3">
        <Select
            :options="options.deckNames"
            v-model:value="form.deck"
            label="Deck"
        />

        <Select
            :options="options.noteTypes"
            v-model:value="form.note_type"
            label="Notetype"
        />

        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Select, CheckList} from "@/components/Fields"

export default {
  data() {
    return {
      options: {
        deckNames: [],
        noteTypes: [],
        fieldOptions: [
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
      },

      usage: {
        defaultNoteType: {
          checked: true,
          label: 'Display\'s Notetype'
        },
        customNoteType: {
          label: 'Custom Notetype'
        }
      },

      form: {
        whichNoteType: 'defaultNoteType',
        deck: '',
        note_type: ''
      }
    }
  },

  methods: {
    changeNoteTypeOption() {
      console.log(this.usage)
      if (this.usage.defaultNoteType === true) {
        this.usage.defaultNoteType = false
      } else {
        this.usage.customNoteType = false
      }
    },

    loadFields() {
      this.$store.dispatch('anki/notetype/getNoteTypeFields').then(noteTypeFields => {
        console.log('NoteTypes:', noteTypeFields)

        noteTypeFields.forEach(field => {
          this.fields[field] = ''
          console.log(this.fields)
        })
      })
    }
  },

  async mounted() {
    this.options.deckNames = await this.$store.dispatch('anki/deckNames')
    this.options.noteTypes = await this.$store.dispatch('anki/noteTypes')
    this.form.note_type = await this.$store.dispatch('anki/selectedNoteType')
  },

  components: {Select, CheckList}
}
</script>
