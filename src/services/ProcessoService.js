import apiClient from './api';

export default {
  buscarTodos() {
    return apiClient.get('/processo');
  },
  inserir(dadosProcesso) {
    // CORREÇÃO: A URL É '/processo/inserir'
    return apiClient.post('/processo/inserir', dadosProcesso);
  },
  deletar(id) {
    return apiClient.get(`/processo/remover/${id}`);
  }
};