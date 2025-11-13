// src/services/FornecedorService.js
import apiClient from './api';

// Assumindo os endpoints REST padrão do seu FornecedorController.java
export default {
  buscarTodos() {
    return apiClient.get('/fornecedor');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/fornecedor/${id}`);
  },

  inserir(dadosFornecedor) {
    return apiClient.post('/fornecedor', dadosFornecedor);
  },

  alterar(id, dadosFornecedor) {
    return apiClient.put(`/fornecedor/${id}`, dadosFornecedor);
  },

  deletar(id) {
    return apiClient.delete(`/fornecedor/${id}`);
  }
};