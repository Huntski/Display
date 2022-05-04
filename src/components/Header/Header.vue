<template>
  <div class="flex w-full items-center px-20 pt-10 fixed top-0">
    <logo class="w-12" />

    <AnkiConnectCheck class="ml-10" />

    <HamburgerMenu class="ml-auto" />
  </div>
</template>

<script>
import {Logo} from '@/components/Icons'
import HamburgerMenu from './HamburgerMenu'
import AnkiConnectCheck from './AnkiConnectCheck'

export default {
  components: {Logo, HamburgerMenu, AnkiConnectCheck}
}
</script>