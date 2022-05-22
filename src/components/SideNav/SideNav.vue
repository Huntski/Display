<template>
  <div class="wrapper">
    <div class="side-nav"
         :style="{transition: '500ms'}"
         :class="{'open' : open}"
    >
      <router-link :to="{name: 'Browser'}" class="logo">
        <logo/>
      </router-link>

      <router-link :to="{name: 'Browser'}">
        <Collection/>
      </router-link>

      <router-link :to="{name: 'Anki'}">
        <Anki/>
      </router-link>

      <router-link :to="{name: 'Anilist'}">
        <Anilist/>
      </router-link>

      <router-link :to="{name: 'Settings'}">
        <Settings/>
      </router-link>

      <div class="notification">
        <Notification/>
      </div>

      <div
          class="expand-button"
          :class="{'rotate-180' : open}"
          @click="open = !open"
      >
        <div class="w-2 h-1 rounded-full bg-white transform rotate-45"/>
        <div class="w-2 h-1 rounded-full bg-white transform rotate-135"/>
      </div>
    </div>
  </div>
</template>

<script>
import {Logo, Settings, Anilist, Anki, Collection, Notification} from '@/components/SideNav/Icons'

export default {
  data() {
    return {
      open: false
    }
  },

  components: {Logo, Settings, Anilist, Anki, Collection, Notification}
}
</script>

<style lang="scss" scoped>
.wrapper {
  @apply max-h-screen sticky left-0 top-0 box-border py-5
}

.side-nav {
  min-width: 95px;
  @apply relative flex flex-col items-center rounded-lg py-5 z-30 h-full border-2 border-gray-100;

  &.open {
    align-items: flex-start;
    width: 230px;

    .logo {
      @apply ml-6;
    }

    a:not(.logo) {
      @apply px-1 mx-4 mx-auto;
      width: 90%;

      span {
        @apply block ml-4;
      }
    }

    .notification {
      @apply ml-4 cursor-pointer;
    }

    .expand-button {
      @apply rotate-180;
    }
  }
}

.logo {
  @apply w-12 mb-7;
}

a:not(.logo) {
  @apply opacity-40 flex items-center py-4;

  &:hover {
    @apply opacity-100 rounded-2xl bg-gray-100;
  }

  svg {
    @apply w-16 h-8 px-5;
  }

  span {
    @apply hidden
  }
}

.notification {
  @apply w-16 h-16 cursor-pointer opacity-50 flex items-center justify-center py-4 mb-3 mt-auto;

  &:hover {
    @apply opacity-100 rounded-2xl bg-gray-100;
  }

  svg {
    @apply w-5;
  }

  span {
    @apply hidden
  }
}
</style>