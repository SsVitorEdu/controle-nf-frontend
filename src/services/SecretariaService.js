// src/services/SecretariaService.js
import apiClient from './api';

// Assumindo os endpoints REST padrão do seu SecretariaController.java
export default {
  buscarTodas() {
    return apiClient.get('/secretaria');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/secretaria/${id}`);
  },

  inserir(dadosSecretaria) {
    return apiClient.post('/secretaria', dadosSecretaria);
  },

  alterar(id, dadosSecretaria) {
    return apiClient.put(`/secretaria/${id}`, dadosSecretaria);
  },

  deletar(id) {
    return apiClient.delete(`/secretaria/${id}`);
  }
};