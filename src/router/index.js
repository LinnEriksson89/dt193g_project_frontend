import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductTableView from '@/views/ProductTableView.vue'
import ProductView from '@/views/ProductView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AddProductView from '@/views/AddProductView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: HomeView,
    },
    {
      path: '/product',
      name: 'produkter',
      component: ProductView,
    },
    {
      path: '/about',
      name: 'om oss',
      component: AboutView,
    },
    {
      path: '/allproducts',
      name: 'alla produkter',
      component: ProductTableView,
    },
    {
      path: '/addproduct',
      name: 'lägg till produkter',
      component: AddProductView,
    },
    {
      path: '/register',
      name: 'registrera',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'logga in',
      component: LoginView,
    },
  ],
})

export default router
