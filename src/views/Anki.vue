<template>
  <div class="p-10 border border-gray-200 rounded-md w-full">
    <h2 class="mb-8">Anki card setup</h2>

    <CheckList class="mb-8" :options="usage" v-model:value="whichNoteType" />

    <div class="w-full lg:w-2/3" :class="{'opacity-50 pointer-events-none' : whichNoteType === 'defaultNoteType'}">
      <div class="grid gap-3 grid-cols-2">
        <div>
          <h3 class="text-lg font-semibold">Deck</h3>
          <Select
              :options="options.deckNames"
              v-model:value="deck"
          />
        </div>

        <div>
          <h3 class="text-lg font-semibold">Notetype</h3>
          <Select
              :options="options.noteTypes"
              v-model:value="note_type"
              @change="loadFields"
          />
        </div>

        <div class="col-start-1 col-end-3 mt-5">
          <h3 class="text-lg font-semibold">Fields</h3>

          <div v-for="(value, key) in fields" :key="key" class="flex items-center">
            <span class="mr-auto">{{key}}</span>
            <Select
                class="w-2/3"
                :options="options.fieldOptions"
                v-model:value="fields[key]"
            />
          </div>
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
          '',
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

      fields: [],

      whichNoteType: 'defaultNoteType',
      deck: '',
      note_type: ''
    }
  },

  methods: {
    changeNoteTypeOption() {
      if (this.usage.defaultNoteType === true) {
        this.usage.defaultNoteType = false
      } else {
        this.usage.customNoteType = false
      }
    },

    loadFields() {
      this.fields = {}

      this.$store.dispatch('anki/notetype/updateNoteTypeInUse', this.note_type)

      this.$store.dispatch('anki/notetype/getNoteTypeFields').then(noteTypeFields => {
        console.log('NoteTypes:', noteTypeFields)

        const fields = {}

        for (const field in noteTypeFields) {
          fields[noteTypeFields[field]] = ''
        }

        this.fields = fields
      })
    }
  },

  async mounted() {
    this.options.deckNames = await this.$store.dispatch('anki/deckNames')
    this.options.noteTypes = await this.$store.dispatch('anki/noteTypes')
    this.note_type = await this.$store.dispatch('anki/selectedNoteType')
  },

  components: {Select, CheckList}
}
</script>
