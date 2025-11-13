// src/services/OficioService.js
import apiClient from './api';

// Assumindo os endpoints REST padrão do seu OficioController.java
export default {
  buscarTodos() {
    return apiClient.get('/oficio');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/oficio/${id}`);
  },

  inserir(dadosOficio) {
    return apiClient.post('/oficio', dadosOficio);
  },

  alterar(id, dadosOficio) {
    return apiClient.put(`/oficio/${id}`, dadosOficio);
  },

  deletar(id) {
    return apiClient.delete(`/oficio/${id}`);
  }
};