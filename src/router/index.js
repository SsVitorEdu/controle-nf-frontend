// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' 
import LoginView from '../views/Login.vue'
import HomeView from '../views/Home.vue' // Importar o Home

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView, // Usar o componente importado
    meta: { requiresAuth: true } 
  },
  
  // --- Adicionando as novas rotas do Figma ---
  {
    path: '/oficio',
    name: 'oficio',
    // Vamos criar o componente Oficio.vue logo abaixo
    component: () => import('../views/Oficio.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/processo',
    name: 'processo',
    component: () => import('../views/Processo.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/nota-fiscal',
    name: 'nota-fiscal',
    component: () => import('../views/NotaFiscal.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/secretaria',
    name: 'secretaria',
    component: () => import('../views/Secretaria.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fornecedor',
    name: 'fornecedor',
    component: () => import('../views/Fornecedor.vue'),
    meta: { requiresAuth: true }
  }
  // --- Fim das novas rotas ---
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// A "Guarda de Rota"
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
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