import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import Page404 from '../views/Page404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/search',
      name: 'search',
      // lazy-loadeding
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/preview',
      name: 'preview',
      component: () => import('../views/PreviewView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: Page404
    }
  ]
})

export default router
