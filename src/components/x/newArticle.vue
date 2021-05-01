<template>
  <div class="d-flex flex-column">
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
          <label class="form-control-label">Name: </label>
          <input 
            type="text"
            name="name" 
            class="form-control" 
            v-model="article.name"
          >
        </div>

        <div class="form-group">
          <label class="form-control-label">Content: </label>
          <textarea 
            class="form-control" 
            name="content" 
            rows="10" 
            v-model="article.content"
          >
          </textarea>
        </div>
    
        <div class="form-group">
          <label class="form-control-label">Photo: </label>
          <div class="input-group">

            <div class="input-group-prepend">
              <span class="input-group-text">http://</span>
            </div>
            
            <input 
              type="text" 
              name="photo" 
              class="form-control" 
              v-model="article.photo"
            >
          </div>
        </div>

        <div class="form-group">
          <label class="form-control-label">Category: </label> 
          <v-select 
            v-model="article.category_id" 
            :options="categories" 
            label="name"
          >
          </v-select>
        </div>

        <div class="form-group">
          <label class="form-control-label">Tags: </label>
          <input 
            type="text" 
            name="tags" 
            class="form-control" 
            v-model="article.tags"
          >
        </div>

        <div class="d-flex align-items-center">
          <button 
            type="submit" 
            class="btn btn-lg btn-outline-primary"
          >
            Upload
          </button>
        </div>
      </form>
             
    </div>
  </div>
</template>

<script>
  import server from '../../server';
  import vSelect from 'vue-select';
  import 'vue-select/dist/vue-select.css';
  export default {
    data() {
      return {
        article: {
          name: '',
          content: '',
          tags: '',
          category_id: '',
          photo: ''
        },
        categories: [],
        errors: {}
      }
    },
    components: {
      vSelect
    },
    mounted() {
      this.getCategories();
    },
    methods: {
      upload: function() {
        this.article.category_id = this.article.category_id.id;
        server.post('article', this.article)
        .then(() => {
          this.$router.push({name: 'dashboard'});
        })
        .catch(error => {
          this.errors = error.response.data;
          this.article.category_id = this.article.category_id.name;
        });
        
        
        console.log(this.article);
      },
      getCategories: function() {
        server.get('category')
        .then(response => {
          this.categories = response.data;
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