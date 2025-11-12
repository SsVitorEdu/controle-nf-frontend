// src/store/index.js
import { createStore } from 'vuex'

// 👇 EXPORTA A STORE
export default createStore({
  state: {
    user: null, // O usuário começa deslogado
  },
  mutations: {
    // A mutação que faltava
    setUser(state, userData) {
      state.user = userData;
    },
    // Você pode adicionar uma mutação para logout também
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    // ...
  },
  modules: {
    // ...
  }
})