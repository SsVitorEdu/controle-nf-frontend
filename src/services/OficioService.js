import apiClient from './api';

export default {
  buscarTodos() {
    return apiClient.get('/oficio');
  },
  inserir(dadosOficio) {
    // CORREÇÃO: A URL É '/oficio/inserir'
    return apiClient.post('/oficio/inserir', dadosOficio);
  },
  deletar(id) {
    return apiClient.get(`/oficio/remover/${id}`);
  }
};