// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' // 👈 IMPORTA A STORE
import LoginView from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// O guarda de rotas usa a store importada
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Agora 'store.state.user' vai funcionar
    if (!store.state.user) { 
      next({ name: 'login' })
    } else {
      next() 
    }
  } else {
    next() 
  }
})

export default router