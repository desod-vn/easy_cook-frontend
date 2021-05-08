<template>
  <div id="app">
    <Header />
    <div class="mt-5 container">
      <div class="row">
        <div class="col-xl-6">
          <img class="img-fluid" :src="post.image" alt="" />
        </div>
        <div class="col-xl-6 text-dark">
          <p>
            <b-icon icon="pencil-square" class="mr-1" /> Công thức:
            <b class="h5 font-weight-bolder">{{ post.name }}</b>
          </p>
          <p>
            <b-icon icon="folder" class="mr-1" /> Chuyên mục:
            {{ category.name }}
          </p>
          <p>
            <b-icon icon="calendar" class="mr-1" />Ngày đăng:
            {{ moment(post.updated_at).format("DD-MM-YYYY") }}
          </p>
          <p>
            <b-icon icon="clock" class="mr-1" />Giờ đăng:
            {{ moment(post.updated_at).format("h:mm a") }}
          </p>
          <div v-if="admin == 'admin'">
            <span @click="editPost(post.id)" class="btn btn-success btn-lg mr-2"
              >Chỉnh sửa</span
            >
            <span @click="deletePost(post.id)" class="btn btn-danger btn-lg"
              >Xóa</span
            >
          </div>
          <div v-if="admin == 'user'">
            <div v-if="!like && ingredients.length > 0">
              <span class="btn btn-danger btn-lg" @click="likePost"
                ><b-icon icon="heart-fill" />Yêu thích</span
              >
            </div>
            <div v-else>
              <span class="btn btn-outline-warning btn-lg" @click="dislikePost"
                >Hủy yêu thích</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="border p-5">
            <div class="p-2">
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
            </div>
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
      posts: {},
      ingredients: {},
      like: {},
      id: this.$route.params.id,
      user: this.$store.state.user.id,
    };
  },
  computed: {
    admin() {
      return this.$store.state.user.role;
    },
  },
  methods: {
    likePost: function () {
      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i].main) {
          let data = {
            ingredient: this.ingredients[i].ingredient_id,
            post: this.id,
          };
          backer.post(`ingredient_user/${this.user}`, data);
        }
        this.loadPost();
      }
    },

    dislikePost: function () {
      for (let i = 0; i < this.ingredients.length; i++) {
        if (this.ingredients[i].main) {
          let ingredientId = this.ingredients[i].ingredient_id;
          backer.delete(
            `ingredient_user/${this.user}?ingredient=${ingredientId}&post=${this.id}`
          );
        }
      }
      this.loadPost();
    },

    loadPost: function () {
      backer.get(`post/${this.id}?user=${this.user}`).then((response) => {
        if (response.data.status) {
          this.post = response.data.post;
          this.ingredients = response.data.ingredients;
          this.like = response.data.like;
          backer.get(`category/${this.post.category_id}`).then((response) => {
            this.category = response.data.category;
            this.posts = response.data.posts;
          });
        }
      });
    },
    deletePost: function (id) {
      let choose = confirm("Bạn có thực sự muốn xóa công thức này không ?");
      if (choose == true)
        backer.delete("post/" + id).then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "home" });
          }
        });
    },
    editPost: function (id) {
      this.$router.push({
        name: "post",
        params: { id },
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
