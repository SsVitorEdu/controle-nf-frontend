
import apiClient from './api';

export default {
  buscarTodas() {
    return apiClient.get('/nf');
  },
  
  buscarPorId(id) {
    return apiClient.get(`/nf/${id}`);
  },

  inserir(dadosNF) {

    return apiClient.post('/nf/inserir', dadosNF);
  },

  alterar(id, dadosNF) {

    return apiClient.put(`/nf/alterar/${id}`, dadosNF); 
  },

  deletar(id) {
    return apiClient.get(`/nf/remover/${id}`);
  }
};