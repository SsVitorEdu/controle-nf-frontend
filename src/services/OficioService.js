import apiClient from './api';

export default {
  buscarTodos() {
    return apiClient.get('/oficio');
  },
  inserir(dadosOficio) {

    return apiClient.post('/oficio/inserir', dadosOficio);
  },
  deletar(id) {
    return apiClient.get(`/oficio/remover/${id}`);
  }
};