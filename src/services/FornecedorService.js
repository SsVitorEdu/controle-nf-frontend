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
    // CORRIGIDO: de '/fornecedor' para '/fornecedor/inserir' para bater com o Controller
    return apiClient.post('/fornecedor/inserir', dadosFornecedor);
  },

  alterar(id, dadosFornecedor) {
    // Este 'alterar' ainda não está sendo usado, mas se estivesse,
    // provavelmente estaria errado também, assim como o 'inserir' e 'deletar'.
    return apiClient.put(`/fornecedor/${id}`, dadosFornecedor);
  },

  deletar(id) {
    // CORRIGIDO: de 'apiClient.delete(...)' para 'apiClient.get(...)'
    // e a URL de '/fornecedor/{id}' para '/fornecedor/remover/{id}'
    return apiClient.get(`/fornecedor/remover/${id}`);
  }
};