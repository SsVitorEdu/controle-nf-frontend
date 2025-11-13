// src/services/ProcessoService.js
import apiClient from './api';

// Assumindo os endpoints REST padrão do seu ProcessoController.java
export default {
  buscarTodos() {
    return apiClient.get('/processo');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/processo/${id}`);
  },

  inserir(dadosProcesso) {
    return apiClient.post('/processo', dadosProcesso);
  },

  alterar(id, dadosProcesso) {
    return apiClient.put(`/processo/${id}`, dadosProcesso);
  },

  deletar(id) {
    return apiClient.delete(`/processo/${id}`);
  }
};