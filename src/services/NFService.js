// src/services/NFService.js
import apiClient from './api';

// CORRIGIDO para bater com o NFController.java
export default {
  buscarTodas() {
    return apiClient.get('/nf');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/nf/${id}`);
  },

  inserir(dadosNF) {
    // CORREÇÃO 1: A URL agora é '/nf/inserir'
    return apiClient.post('/nf/inserir', dadosNF);
  },

  alterar(id, dadosNF) {
    // (Ainda não vamos usar, mas corrigindo a URL)
    return apiClient.put(`/nf/alterar/${id}`, dadosNF); // (Assumindo que será /alterar/)
  },

  deletar(id) {
    // CORREÇÃO 2: O método é 'get' e a URL é '/nf/remover/'
    return apiClient.get(`/nf/remover/${id}`);
  }
};