import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/catalogue',
      alias: '/catalogue',
      name: 'catalogue',
      component: () => import('./views/Catalog.vue')
    },
    {
      path: '/favoris',
      name: 'favoris',
      component: () => import('./views/Favorites.vue')
    }
  ]
})

export default router
