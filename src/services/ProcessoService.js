import apiClient from './api';

export default {
  buscarTodos() {
    return apiClient.get('/processo');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/processo/${id}`);
  },

  inserir(dadosProcesso) {
    return apiClient.post('/processo/inserir', dadosProcesso);
  },

  alterar(id, dadosProcesso) {
    return apiClient.post(`/processo/alterar`, dadosProcesso);
  },

  deletar(id) {
    return apiClient.get(`/processo/remover/${id}`);
  }
};