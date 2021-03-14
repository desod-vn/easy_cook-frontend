<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-secondary">
    <div class="mr-auto">
      <router-link to="/">
        <img src="../../../assets/logo.png" />
      </router-link>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="ml-auto"></div>
        <form class="form-inline mr-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="..." aria-label="Search">
            <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
        </form>

        <div class="navbar-nav">
          <router-link to="/dashboard" class="ml-5 text-white">
            <b-icon icon="house-door-fill"></b-icon>
          </router-link>

          <router-link to="/user" class="ml-5 text-white">
            <b-icon icon="person-fill"></b-icon>
          </router-link>
      
          <router-link to="/setting" class="ml-5 text-white">
            <b-icon icon="gear-wide-connected"></b-icon>
          </router-link>
      
          <router-link to="/notification" class="ml-5 text-white">
            <b-icon icon="bell-fill"></b-icon>
          </router-link>
        </div>
        
      </div>

      <router-link to="/logout" class="ml-5 p-2 rounded text-white bg-danger">
        Logout <b-icon icon="arrow-bar-right"></b-icon>
      </router-link>
    </nav>
</template>

<script>
  export default {
    name: 'Header',
    props: ['user']
  }
</script>

<style scoped>
  
</style>