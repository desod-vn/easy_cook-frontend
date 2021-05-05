<template>
  <div id="app">
    <Header />
    <div class="mt-5 container">
      <div class="row">
        <div class="col-xl-12">
          <div class="alert alert-success">Chia sẻ:</div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <img class="img-fluid" :src="this.post.image" alt="" />
        </div>
        <div class="col-xl-12">
          <div class="border bg-secondary p-2 text-light">
            <p><b-icon icon="pencil-square" /> Người đăng: Admin</p>
            <p>
              <b-icon icon="calendar" class="mr-1" />Ngày đăng:
              {{ moment(post.created_at).format("DD-MM-YYYY") }}
            </p>
            <p>
              <b-icon icon="clock" class="mr-1" />Giờ đăng:
              {{ moment(post.created_at).format("h:mm a") }}
            </p>
            <span class="btn btn-danger btn-lg">Yêu thích</span>
          </div>
        </div>
        <div class="col-xl-12">
          <div class="border p-5">
            <h2><b>Nguyên liệu</b></h2>
            <b-list-group>
              <b-list-group-item
                v-for="(ingredient, index) in ingredients"
                :key="index"
              >
                <b>{{ ingredient.name }}:</b> {{ ingredient.quantity }}
                {{ ingredient.unit }}
              </b-list-group-item>
            </b-list-group>
            <div v-html="post.content" class="p-2"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import backer from "../utils/axios";

import Header from "../components/Header";
import Footer from "../components/Footer";


import moment from "moment";

export default {
  data() {
    return {
      moment: moment,
      category: {},
      post: {},
      ingredients: {},
      id: this.$route.params.id,
    };
  },
  
  methods: {
    loadPost: function () {
      backer.get(`post/${this.id}`).then((response) => {
        this.post = response.data.post;
        this.ingredients = response.data.ingredients;
      });
    },
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.loadPost();
  },
};
</script>
<style scoped>
</style>
