<template>
  <div id="app">
    <Header :user="user"/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar :categories="categories" :articles="articles" class="col-lg-3 col-md-6" />
        <div class="col-lg-9 col-md-6">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './master/Sidebar';
import Header from './master/Header';
import server from '../../server';
export default {
  data() {
    return {
      user: '',
      categories: '',
      articles: '',
    }
  },
  mounted() {
    this.getUser();
    this.getCategory();
    this.getArticle();
  },
  components: {
    Header,
    Sidebar
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
    },
    getCategory: function() {
      server.get('category')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    },
    getArticle: function() {
      server.get('article')
        .then(response => {
          this.articles = response.data;
        })
        .catch(error => {
          console.log(error)
        });
    },
    deleteCategory: function(id) {
      let choose = confirm("Bạn có thực sự muốn xóa thư mục này không ?");
      if (choose == true)
        server.delete('category/' + id)
        .then(() => {
          this.$router.push({name: 'login'});
        })
        .catch(error => {
          console.log(error.response.data)
        });
    }
  }
}
</script>

<style scoped>
  
</style>