<template>
  <div class="app">
  </div>
</template>

<script>
  import server from '../server';

  export default {
    mounted() {
      server.post('logout')
        .then(() => {
          localStorage.removeItem('token');
          this.$router.push({name: 'login'});
        })
        .catch(() => {
          this.$router.push({name: 'login'});
        });    
    }
  }
</script>

<style>
  
</style>