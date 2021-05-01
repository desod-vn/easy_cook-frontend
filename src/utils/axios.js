const axios = require('axios');
const apiUrl = 'http://localhost:8000/api/';

export default {
  getHeaders(){      
  
    const token = localStorage.getItem('token');
    
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

  delete(url){
    return axios.delete(
      apiUrl+url,
      { headers: this.getHeaders() }
    );
  },

  put(url, data) {
    return axios.put(
      apiUrl+url,
      data,
      { headers: this.getHeaders() }
    );
  },

  checkLog (){
    if(localStorage.getItem('token'))
      this.$router.push({name: 'home'});
  }

  
}