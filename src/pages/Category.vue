<template>
  <div id="app">
    <Header />
    <div class="container">
      <h3 class="border border-primary bg-primary text-light p-2 mt-5">
        {{ category.name }}
      </h3>
      <div v-for="(post, index) in posts" :key="index">
        <div class="border p-2 mb-1">
          <router-link to="">{{ post.name }} </router-link>
        </div>
      </div>
      <div class="d-flex bg-dark justify-content-center">
        <pagination
          v-model="page"
          :records="total"
          :per-page="perPage"
          @paginate="loadCategory"
          :options="{ texts: { count: '' } }"
        />
      </div>
    </div>
  </div>
</template>
<script>
import backer from "../utils/axios";

import Header from "../components/Header";
import Pagination from "vue-pagination-2";

export default {
  data() {
    return {
      category: "",
      posts: [],
      total: 0,
      perPage: 10,
      page: 1,
    };
  },
  methods: {
    loadCategory: function (page = 1) {
      let id = this.$route.params.id;
      backer.get(`category/${id}?page=${page}`).then((response) => {
        this.category = response.data.category;
        this.posts = response.data.posts;
        this.total = response.data.posts.length;
        console.log(response.data)
      });
    },
  },
  components: {
    Header,
    Pagination,
  },
  mounted() {
    this.loadCategory();
  },
};
</script>
<style scoped>
</style>
