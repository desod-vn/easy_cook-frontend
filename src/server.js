const axios = require('axios');
const apiUrl = 'http://localhost:8000/api/';
const token = localStorage.getItem('token');
export default {
  getHeaders(){      
    if(token == null)
      return {}

    return { Authorization: 'Bearer ' + token }
  },

  get(url){
    return axios.get(
      apiUrl+url,
      { headers: this.getHeaders() }
    );
  },

  post(url, data){
    return axios.post(
      apiUrl+url,
      data,
      { headers: this.getHeaders() }
    );
  },

}