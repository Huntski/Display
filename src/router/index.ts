import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Browser from '../views/Browser.vue'
import Media from '../views/Media.vue'
import Anki from '../views/Episode.vue'
import Anilist from '../views/Anilist.vue'
import Settings from '../views/Episode.vue'
import Episode from '../views/Episode.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/browser',
    name: 'Browser',
    component: Browser
  },
  {
    path: '/browser',
    name: 'Browser',
    component: Browser
  },
  {
    path: '/anki',
    name: 'Anki',
    component: Anki
  },
  {
    path: '/anilist',
    name: 'Anilist',
    component: Anilist
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/media/:media_id',
    name: 'Media',
    component: Media
  },
  {
    path: '/media/:media_id/episode/:episode_id',
    name: 'Episode',
    component: Episode
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
