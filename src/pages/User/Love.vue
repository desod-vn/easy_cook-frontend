<template>
  <div>
    <Header />
    <div class="container mt-5">
      <div class="row">
        <div class="col-xl-8">
            <h2 class="font-weight-bolder mt-5 mb-4">Bài viết đã lưu</h2>
          <div
            class="border p-2 m-1 d-flex justify-content-start align-items-center"
            v-for="(post, index) in store"
            :key="index"
          >
            <router-link
              :to="{
                name: 'view',
                params: { id: post.id, slug: post.slug },
              }"
            >
              <img
                class="img-fluid"
                :src="post.image"
                alt=""
                height="100px"
                width="100px"
              />
            </router-link>
            <div class="m-1">
              <router-link
                class="font-weight-bold"
                :to="{
                  name: 'view',
                  params: { id: post.id, slug: post.slug },
                }"
              >
                {{ post.name }}
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-xl-4">
            <h2 class="font-weight-bolder mt-5 mb-4">Nguyên liệu yêu thích</h2>

          <div
            class="border p-3 m-1"
            v-for="(ingredient, index) in love"
            :key="index"
          >
            <span class="h4 font-weight-bolder text-info">{{
              ingredient.name
            }}</span>
            <hr />
            Số lần thích:
            {{ ingredient.total }} --
            <span class="btn btn-danger">{{ ingredient.mark }}</span>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import backer from "../../utils/axios";

export default {
  data() {
    return {
      user: this.$store.state.user.id,
      ingredients: {},
      love: {},
      store: "",
    };
  },
  components: {
    Header,
    Footer,
  },
  methods: {
    loadLove: function () {
      backer.get(`ingredient_user/${this.user}`).then((response) => {
        if (response.data.status) {
          this.love = response.data.ingredients;
          this.store = response.data.listStore;
        }
      });
    },
  },
  mounted() {
    this.loadLove();
  },
};
</script>

<style>
</style>