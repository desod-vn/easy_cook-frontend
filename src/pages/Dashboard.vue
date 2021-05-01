<template>
  <section>
    <Header />
    <div class="container">
      <div class="row">
        <div class="container d-flex flex-column">
          <div
            class="row border border-info justify-content-center align-items-center p-5 mt-5 mb-5"
          >
            <form class="col-lg-6 mx-auto" @submit.prevent="handle()">
              <div class="form-group">
                <label class="form-control-label">Tạo mới: </label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  v-model="one.name"
                />
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="which"
                  id="which1"
                  value="category"
                  v-model="which"
                />
                <label class="form-check-label" for="which1">
                  Chuyên mục
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="which"
                  id="which2"
                  value="ingredient"
                  v-model="which"
                />
                <label class="form-check-label" for="which2">
                  Nguyên liệu
                </label>
              </div>

              <div class="d-flex align-items-center">
                <button type="submit" class="m-2 btn btn-info">Tạo mới</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="row">
        <Category :categories="categories" class="col-xl-8 col-sm-6" />
        <Categori :ingredients="ingredients" class="col-xl-4 col-sm-6" />
      </div>
    </div>
  </section>
</template>
<script>
import backer from "../utils/axios";
import Header from "../components/Header";

import Category from "../components/dashboard/Category";
import Categori from "../components/dashboard/Create";

export default {
  data() {
    return {
      admin: this.$store.state.user.role,
      one: {
        name: "",
      },
      which: "",
      errors: {},
      categories: {},
      ingredients: {},
      category: {},
    };
  },
  components: {
    Header,
    Category,
    Categori,
  },
  methods: {
    success: function (name, action, variant) {
      if (name == "Chuyên mục") this.loadCategory();
      else if (name == "Nguyên liệu") this.loadIngredient();
      this.$bvToast.toast(
        `${name} đã được ${action} thành công. Dữ liệu đã được cập nhật lại.`,
        {
          title: "Thông báo",
          variant: `${variant}`,
          solid: true,
        }
      );
    },
    failure: function (error) {
      this.$bvToast.toast(`${error.errors.name}`, {
        title: `${error.message}`,
        variant: "danger",
        solid: true,
      });
    },
    handle: function () {
      if (this.which == "category") {
        backer
          .post("category", this.one)
          .then((response) => {
            if (response.data.status) {
              this.success("Chuyên mục", "tạo mới", "success");
            }
          })
          .catch((error) => {
            this.failure(error.response.data);
          });
      }
      if (this.which == "ingredient") {
        backer
          .post("ingredient", this.one)
          .then((response) => {
            if (response.data.status) {
              this.success("Nguyên liệu", "tạo mới", "success");
            }
          })
          .catch((error) => {
            this.failure(error.response.data);
          });
      }
    },

    deleteCategory: function (id) {
      let choose = confirm("Bạn có thực sự muốn xóa chuyên mục này không ?");
      if (choose == true)
        backer.delete("category/" + id).then((response) => {
          if (response.data.status) {
            this.success("Chuyên mục", "xóa", "warning");
          }
        });
    },

    loadCategory: function () {
      backer.get("category").then((response) => {
        this.categories = response.data.data;
      });
    },

    loadIngredient: function (name = '') {
      backer.get(`ingredient?search=${ name }`).then((response) => {
        this.ingredients = response.data;
      });
    },


    // removeIngredient: function (id) {
    //   let choose = confirm("Bạn có thực sự muốn xóa nguyên liệu này không ?");
    //   if (choose == true)
    //     backer.delete("category/" + id).then((response) => {
    //       if (response.data.status) {
    //         this.success("Chuyên mục", "xóa", "warning");
    //       }
    //     });
    // },

    editCategory: function (id, name) {
      let category = prompt("Vui lòng nhập tên chuyên mục mới", name);
      this.category = {
        name: category,
      };
      if (category != null) {
        backer
          .put("category/" + id, this.category)
          .then((response) => {
            if (response.data.status) {
              this.success("Chuyên mục", "cập nhật", "info");
            }
          })
          .catch((error) => {
            this.failure(error.response.data);
          });
      }
    },
  },
  updated() {
    if (this.admin !== "admin") this.$router.push({ name: "home" });
  },
  mounted() {
    this.loadCategory();
    this.loadIngredient();
  },
};
</script>
<style scoped>
</style>
