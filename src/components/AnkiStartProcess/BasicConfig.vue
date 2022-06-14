<template>
  <div>
    <p class="mt-5">To which deck should the new cards be uploaded to.</p>
    <Select class="mb-10" :options="deckNames" v-model:value="form.deck" />

    <p>Which Note Type should be used.</p>
    <Select :options="noteTypes" v-model:value="form.note_type" class="mb-10" />

    <ButtonPrimary @click="completeForm">Next</ButtonPrimary>
  </div>
</template>

<script>
import {Select} from "@/components/Fields"
import {ButtonPrimary} from "@/components/Buttons"

export default {
  props: ['status'],

  data() {
    return {
      deckNames: [],
      noteTypes: [],
      form: {
        deck: '',
        note_type: ''
      }
    }
  },

  methods: {
    async completeForm() {
      try {
        await this.$store.dispatch('anki/deck/updateDeckInUse', this.form.deck)
        await this.$store.dispatch('anki/notetype/updateNoteTypeInUse', this.form.note_type)

        const noteTypeInUse = await this.$store.getters['anki/notetype/noteTypeInUse']
        const deckInUse = await this.$store.getters['anki/deck/deckInUse']

        if (noteTypeInUse === this.form.deck && deckInUse === this.form.note_type) {
          this.$emit('update:status', true)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted() {
    this.deckNames = await this.$store.dispatch('anki/deckNames')
    this.noteTypes = await this.$store.dispatch('anki/noteTypes')
  },

  components: {ButtonPrimary, Select}
}
</script>
