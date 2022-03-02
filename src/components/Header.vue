<template>
  <div class="flex w-full items-center">
    <logo class="w-10" />

    <Settings class="ml-auto" />

    <div></div>
  </div>
</template>

<script>
import Logo from '@/components/icons/Logo'
import Settings from '@/components/icons/Settings'

export default {
  components: {Logo, Settings}
}
</script>