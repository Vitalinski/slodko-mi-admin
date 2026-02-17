import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPage from '../pages/NotFoundPage.vue'
import HomePage from '@/pages/HomePage.vue'
import OrdersPage from '@/pages/OrdersPage.vue'
import ProductsPage from '@/pages/ProductsPage.vue'
import FAQPage from '@/pages/FAQPage.vue'
import PagesPage from '@/pages/PagesPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from) {
    if (to.hash || to.path === from.path) return false
    return { top: 0 }
  },

  routes: [
     {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
       {
      path: '/orders',
      name: 'OrdersPage',
      component: OrdersPage,
    },
       {
      path: '/products',
      name: 'ProductsPage',
      component: ProductsPage,
    },
       {
      path: '/faq',
      name: 'FAQPage',
      component: FAQPage,
    },
      {
      path: '/pages',
      name: 'PagesPage',
      component: PagesPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
  ],
})

export default router
