import apiClient from './api';
export default {
  buscarTodas() {
    return apiClient.get('/secretaria');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/secretaria/${id}`);
  },

  inserir(dadosSecretaria) {
    return apiClient.post('/secretaria/inserir', dadosSecretaria);
  },

  alterar(id, dadosSecretaria) {
    return apiClient.put(`/secretaria/${id}`, dadosSecretaria);
  },

  deletar(id) {
    return apiClient.get(`/secretaria/remover/${id}`);
  }
};