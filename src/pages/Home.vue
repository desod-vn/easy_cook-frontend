<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <Carousel :posts="posts" />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-8">
          <div class="col-xl-12">
            <h2 class="font-weight-bolder mt-5 mb-3">Công thức mới nhất</h2>
          </div>
          <List
            :posts="posts"
            :storePost="storePost"
            :total="total"
            :perPage="perPage"
            :col="col"
          />
        </div>
        <div class="col-xl-4">
          <div class="row" v-if="userx">
            <div class="col-xl-12">
              <h2 class="font-weight-bolder mt-5 mb-4">Công thức đề xuất</h2>
            </div>
            <div
              class="col-xl-12 border p-1 d-flex justify-content-start align-items-center"
              v-for="(post, index) in loveList.slice(0, i)"
              :key="index"
            >
              <router-link
                :to="{
                  name: 'view',
                  params: { id: post.post_id, slug: post.slug },
                }"
              >
                <img
                  class="img-fluid"
                  :src="post.image"
                  alt=""
                  height="75px"
                  width="75px"
                />
              </router-link>
              <div class="m-1">
                <router-link
                  class="font-weight-bold"
                  :to="{
                    name: 'view',
                    params: { id: post.post_id, slug: post.slug },
                  }"
                >
                  {{ post.name }}
                </router-link>
                <p class="">
                  <b-badge variant="info" class="p-1">{{
                    post.category
                  }}</b-badge>
                </p>
              </div>
            </div>
            <div class="col-xl-12 border p-3 text-center">
              <h4 class="btn btn-dark" @click="more">Xem thêm</h4>
            </div>
          </div>

          <div class="row">
            <div class="col-xl-12">
              <h2 class="font-weight-bolder mt-5 mb-3">Chuyên mục</h2>
            </div>
            <div class="col-xl-12 border">
              <div
                v-for="(category, index) in categories"
                :key="index"
                class="pt-1"
              >
                <div class="border-bottom p-3">
                  <router-link
                    :to="{ name: 'category', params: { id: category.id } }"
                    :id="index"
                  >
                    {{ category.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
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
      categories: [],
      total: 0,
      perPage: 10,
      perLove: 5,
      totalLove: 0,
      love: 0,
      i: 5,
      userx: false,
      col: 6,
      loveList: [],
      storePost: "",
      returnedTarget: {},
    };
  },
  methods: {
    more: function () {
      this.i += 5;
    },
    loadPost: function (page = 1) {
      backer.get(`post?page=${page}`).then((response) => {
        this.posts = response.data.data;
        this.total = response.data.total;
        this.perPage = response.data.per_page;
      });
    },
    loadLove: function () {
      let arr = [];
      backer.get("info").then((response) => {
        backer
          .get("ingredient_user/" + response.data.user.id)
          .then((response) => {
            if (response.data.status) {
              let liked = response.data.listLiked;
              for (let index in response.data.high) {
                backer
                  .get(`love?id=${response.data.high[index]}`)
                  .then((response) => {
                    if (response.data.status) {
                      arr = arr.concat(response.data.love.data);
                      this.loveList = arr;

                      for (let x = 0; x < arr.length; x++) {
                        for (let z = 0; z < liked.length; z++) {
                          if (arr[x].post_id == liked[z].post_id) {
                            arr.splice(x, 1);
                          }
                        }
                        for (let y = x + 1; y < arr.length; y++) {
                          if (arr[x].post_id == arr[y].post_id) {
                            arr.splice(y, 1);
                            break;
                          }
                        }
                      }

                      this.userx = true;
                    }
                  });
              }
              console.log(arr);
            }
          });
      });
    },
    loadCategory: function (page) {
      backer.get(`category?page=${page}`).then((response) => {
        this.categories = response.data.data;
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
    this.loadCategory();
    this.loadLove();
  },
};
</script>
<style scoped>
</style>
