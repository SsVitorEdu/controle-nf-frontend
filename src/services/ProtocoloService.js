import apiClient from './api';
export default {
  buscarTodos() {
    return apiClient.get('/protocolo');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/protocolo/${id}`);
  },

  inserir(dadosProtocolo) {
    return apiClient.post('/protocolo/inserir', dadosProtocolo);
  },

  alterar(id, dadosProtocolo) {
    return apiClient.post(`/protocolo/alterar`, dadosProtocolo);
  },

  deletar(id) {
    return apiClient.get(`/protocolo/remover/${id}`);
  }
};