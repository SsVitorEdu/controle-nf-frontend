import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import OficioView from '../views/Oficio.vue'
import ProcessoView from '../views/Processo.vue'
import NotaFiscalView from '../views/NotaFiscal.vue'
import FornecedorView from '../views/Fornecedor.vue'
import SecretariaView from '../views/Secretaria.vue'
import ProtocoloView from '@/views/Protocolo.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/oficio',
    name: 'oficio',
    component: OficioView
  },
  {
    path: '/processo',
    name: 'processo',
    component: ProcessoView
  },
  {
    path: '/nota-fiscal',
    name: 'nota-fiscal',
    component: NotaFiscalView
  },
  {
    path: '/fornecedor',
    name: 'fornecedor',
    component: FornecedorView
  },
  {
    path: '/secretaria',
    name: 'secretaria',
    component: SecretariaView
  },
  {
    path: '/protocolo',
    name: 'protocolo',
    component: ProtocoloView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router