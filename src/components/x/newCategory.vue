<template>
  <div class="container d-flex flex-column">
    <div class="row justify-content-center align-items-center min-vh-100">

      <form 
        class="col-lg-6 col-md-8 mx-auto" 
        @submit.prevent="upload()"
      >
          <div v-if="errors.errors">
            <div 
              class="alert alert-danger"
              v-for="error in errors.errors" 
              :key="error.id"
            >
              {{ error[0] }}
            </div>
          </div>

        <div 
          class="alert alert-info" 
          v-if="errors.message"
        >
          {{ errors.message }}
        </div>

        <div class="form-group">
          <label class="form-control-label">Category Name: </label>
          <input 
            type="text" 
            name="name" 
            class="form-control" 
            v-model="category.name"
          >
        </div>

        <div class="d-flex align-items-center">
          <button 
            type="submit"
            class="btn btn-lg btn-success"
          >
            Create New
          </button>
        </div>
      </form>
             
    </div>
  </div>
</template>

<script>
import server from '../../server';

  export default {
    data() {
      return {
        category: {
          name: ''
        },
        errors: {}
      }
    },
    methods: {
      upload: function() {
        server.post('category', this.category)
        .then(() => {
          this.$router.push({name: 'dashboard'});
        })
        .catch(error => {
          this.errors = error.response.data;
        });
      },
    }
  }
</script>

<style scoped>
  
</style>