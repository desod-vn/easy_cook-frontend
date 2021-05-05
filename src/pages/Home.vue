<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <Carousel />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-8">
          <List :posts="posts" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import backer from "../utils/axios";
import Footer from "../components/Footer";

import Header from "../components/Header";
import Carousel from "../components/Carousel";
import List from "../components/List";

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    loadPost: function (name = "", page = 20) {
      backer.get(`post?search=${name}&per_page=${page}`).then((response) => {
        this.posts = response.data.data;
        console.log(this.posts);
      });
    },
  },
  components: {
    Header,
    Carousel,
    List,
    Footer,
  },
  mounted() {
    this.loadPost();
  },
};
</script>
<style scoped>
</style>
