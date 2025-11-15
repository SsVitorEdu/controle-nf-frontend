// src/services/protocoloService.js
import apiClient from './api';

// Assumindo os endpoints REST padrão do seu protocoloController.java
export default {
  buscarTodos() {
    return apiClient.get('/protocolo');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/protocolo/${id}`);
  },

  inserir(dadosprotocolo) {
    return apiClient.post('/protocolo/inserir', dadosprotocolo);
  },

  alterar(id, dadosprotocolo) {
    return apiClient.put(`/protocolo/${id}`, dadosprotocolo);
  },

  deletar(id) {
    return apiClient.get(`/protocolo/remover/${id}`);
  }
};