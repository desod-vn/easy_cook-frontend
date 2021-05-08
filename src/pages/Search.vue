<template>
  <div id="app">
    <Header />
    <div class="container mt-5">
      <div class="row">
        <div class="col-xl-12">
          <h2>Kết quả tìm kiếm</h2>
        </div>
        <List :posts="posts" :total="total" :perPage="perPage" :col="col" />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import backer from "../utils/axios";
import Footer from "../components/Footer";

import Header from "../components/Header";
import List from "../components/List";

export default {
  data() {
    return {
        posts: '',
        col: 4,
        perPage: 0,
        page: 1,
        total: 0,
    };
  },
  methods: {
    loadPost: function (page = 1) {
      backer.get(`post?page=${page}&search=${this.$route.params.search}`).then((response) => {
        this.posts = response.data.data;
        this.total = response.data.total;
        this.perPage = response.data.per_page;
      });
    },
  },
  mounted() {
      this.loadPost();
  },
  components: {
    Header,
    Footer,
    List,
  },
};
</script>
<style scoped>
</style>
