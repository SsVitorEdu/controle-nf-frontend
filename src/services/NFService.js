// src/services/NFService.js
import apiClient from './api';

// Assumindo os endpoints REST padrão do seu NFController.java
export default {
  buscarTodas() {
    return apiClient.get('/nf');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/nf/${id}`);
  },

  inserir(dadosNF) {
    return apiClient.post('/nf', dadosNF);
  },

  alterar(id, dadosNF) {
    return apiClient.put(`/nf/${id}`, dadosNF);
  },

  deletar(id) {
    return apiClient.delete(`/nf/${id}`);
  }
};