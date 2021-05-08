<template>
  <div>
    <Header />
    <div class="container mt-5">
      <div class="row">
        <div class="col-xl-12">
          <div
            class="border p-3 m-1"
            v-for="(ingredient, index) in love"
            :key="index"
          >
            <span class="h3 font-weight-bolder text-info">{{
              ingredient.name
            }}</span>
            <hr />
            Số lần thích:
            {{ ingredient.total }} --
            <span
              class="btn btn-danger"
              >{{ ingredient.mark }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import backer from "../utils/axios";

export default {
  data() {
    return {
      user: this.$store.state.user.id,
      ingredients: {},
      love: {},
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