import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// const apiClient = axios.create({
//   baseURL: 'http://172.17.79.96:8080', 
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

export default apiClient;