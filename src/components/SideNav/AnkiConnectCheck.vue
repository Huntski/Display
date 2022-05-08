<template>
  <div class="flex popup w-20 py-2 px-3 bg-green-400 rounded-full group" :style="{ backgroundColor: '#1E2630' }">
    <Anki class="w-5 mr-auto" />

    <Spinner class="w-4" v-show="! status" />

    <Check class="w-4 text-green fill-current text-green-50" v-show="status === 'granted'" />
    <Warning class="w-5 text-green fill-current text-green-50" v-show="status === 'failed'" />

    <HoverMessage located="bottom-right">{{ message }}</HoverMessage>
  </div>
</template>

<script>
import {Check, Anki, Spinner, Warning} from '@/components/Icons'
import HoverMessage from '@/components/HoverMessage'

export default {
  data() {
    return {
      status: ''
    }
  },

  computed: {
    message() {
      if (this.status === 'granted') {
        return 'Connected to Anki.'
      }

      return 'Failed connecting to Anki.'
    }
  },

  created() {
    setTimeout(async () => {
      this.status = await this.$store.dispatch('anki/checkPermission')

      console.log('ANKI STATUS', this.status)
    }, 1000)
  },

  components: {Check, Anki, Spinner, Warning, HoverMessage}
}
</script>