import apiClient from './api';

export default {
  buscarTodos() {
    return apiClient.get('/fornecedor');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/fornecedor/${id}`);
  },

  inserir(dadosFornecedor) {

    return apiClient.post('/fornecedor/inserir', dadosFornecedor);
  },

  alterar(id, dadosFornecedor) {

    return apiClient.put(`/fornecedor/${id}`, dadosFornecedor);
  },

  deletar(id) {
    return apiClient.get(`/fornecedor/remover/${id}`);
  }
};