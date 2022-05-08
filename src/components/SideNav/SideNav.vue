<template>
  <div class="side-nav"
       :style="{transition: '500ms'}"
       :class="{'open' : open}"
  >
    <router-link :to="{name: 'Home'}" class="logo">
      <logo/>
    </router-link>

    <router-link :to="{name: 'Home'}">
      <Home/>
      <span>Home</span>
    </router-link>

    <router-link :to="{name: 'Browser'}">
      <Collection/>
      <span>Browser</span>
    </router-link>

    <router-link :to="{name: 'Anki'}">
      <Anki/>
      <span>Anki</span>
    </router-link>

    <router-link :to="{name: 'Anilist'}">
      <Anilist/>
      <span>Anilist</span>
    </router-link>

    <router-link :to="{name: 'Settings'}">
      <Settings/>
      <span>Settings</span>
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
</template>

<script>
import {Logo} from "@/components/Icons";
import {Home, Settings, Anilist, Anki, Collection, Notification} from '@/components/SideNav/Icons'

export default {
  data() {
    return {
      open: false
    }
  },

  components: {Logo, Home, Settings, Anilist, Anki, Collection, Notification}
}
</script>

<style lang="scss" scoped>
.side-nav {
  min-width: 95px;
  @apply relative flex flex-col items-center bg-tabs-blue rounded-2xl shadow-3xl m-5 pt-5 sticky left-0 z-30;

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
  @apply opacity-50 flex items-center py-4;

  &:hover {
    @apply opacity-100 rounded-2xl;
    background: #1E202B;
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
    @apply opacity-100 rounded-2xl;
    background: #1E202B;
  }

  svg {
    @apply w-5;
  }

  span {
    @apply hidden
  }
}

.expand-button {
  @apply absolute top-20 cursor-pointer w-6 h-6 bg-primary-gold hover:bg-primary-gold-bright rounded-full flex flex-col items-center justify-center transform;
  right: -15px;
}

</style>