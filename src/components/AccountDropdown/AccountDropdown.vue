<template>
  <div class="relative z-20" v-click-outside="close">
    <Avatar class="border-4 border-transparent active:border-blue-500 w-14 h-14 cursor-pointer" @click="showDropdown = !showDropdown"/>

    <AccountDropdownList v-show="showDropdown" @close="close"/>
  </div>
</template>

<script>
import AccountDropdownList from "./AccountDropdownList"
import Avatar from "./Avatar"
import vClickOutside from 'click-outside-vue3'

export default {
  data() {
    return {
      showDropdown: false,
    }
  },

  methods: {
    close() {
      this.showDropdown = false
    },

    handleKeyDown(e) {
      if (e.key === 'Escape') {
        document.querySelector('body').removeEventListener('keydown', this.handleKeyDown)
        this.close()
      }
    }
  },

  mounted() {
    document.querySelector('body').addEventListener('keydown', this.handleKeyDown)
  },

  directives: {
    clickOutside: vClickOutside.directive
  },

  components: {AccountDropdownList, Avatar},
}
</script>
