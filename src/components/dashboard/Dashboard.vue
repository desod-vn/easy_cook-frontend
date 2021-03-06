<template>
  <div>
    <Header :user="user"/>
  </div>
</template>

<script>

import Header from './master/Header';
import server from '../../server';
export default {
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    this.getUser();
  },
  components: {
    Header
  },
  methods: {
    getUser: function() {
      server.get('user')
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
}
</script>

<style scoped>
  
</style>