<template>
  <div class="container d-flex flex-column">
    <div class="row justify-content-center align-items-center min-vh-100">

      <form 
        class="col-lg-6 col-md-8 mx-auto" 
        @submit.prevent="update()"
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
          <span class="h3 font-weight-bold">Edit Category:</span>
          <hr />
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
            class="btn btn-lg btn-outline-success"
          >
            Update
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
        currentId: this.id,
        category: {},
        errors: {}
      }
    },
    props: ['id'],
    mounted() {
      this.getData();
    },
    methods: {
      getData: function() {
        server.get('category/'+this.currentId)
        .then(response => {
          this.category = response.data;
        })
        .catch(error => {
          console.log(error)
        });
      },

      update: function() {
        server.put('category/'+this.currentId, this.category)
        .then(() => {
          this.$router.push({name: 'dashboard'});
        })
        .catch(error => {
          this.errors = error.response.data;
        });
      }

    }
  }
</script>

<style scoped>
  
</style>