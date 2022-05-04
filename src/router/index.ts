import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Browser from '../views/Browser.vue'
import Media from '../views/Media.vue'
import Episode from '../views/Episode.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/browser',
    name: 'Browser',
    component: Browser
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
