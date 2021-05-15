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

              <div class="form-group" v-if="unitShow">
                <label class="form-control-label">Đơn vị tính: </label>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  v-model="one.unit"
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
                  @click="unitShow = false"
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
                  @click="unitShow = true"
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
        <Category
          :categories="categories"
          :total="total"
          :perPage="perPage"
          class="col-xl-8 col-sm-6"
        />
        <Ingredient :ingredients="ingredients" class="col-xl-4 col-sm-6" />
      </div>
    </div>
    <Footer />
  </section>
</template>
<script>
import backer from "../../utils/axios";
import Header from "../../components/Header";
import Category from "../../components/Category";
import Ingredient from "../../components/Ingredient";
import Footer from "../../components/Footer";

export default {
  data() {
    return {
      one: {
        name: "",
        unit: "",
      },
      which: "",
      errors: {},
      categories: {},
      total: 0,
      unitShow: false,
      ingredients: {},
      perPage: 0,
    };
  },
  components: {
    Header,
    Category,
    Ingredient,
    Footer,
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
      let err;
      if (error.errors.name) err = error.errors.name;
      else if (error.errors.unit) err = error.errors.unit;

      this.$bvToast.toast(`${err}`, {
        title: `Có lỗi vui lòng thử lại`,
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
      this.one = {};
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

    loadCategory: function (page = 1) {
      backer.get(`category?page=${page}`).then((response) => {
        this.categories = response.data.data;
        this.total = response.data.total;
        this.perPage = response.data.per_page;
      });
    },

    loadIngredient: function (name = "") {
      backer.get(`ingredient?search=${name}`).then((response) => {
        this.ingredients = response.data;
      });
    },

    editIngredient: function (id, name, unit) {
      let ingredient = prompt("Vui lòng nhập tên nguyên liệu muốn sửa", name);
      let unitIngredient = prompt("Vui lòng nhập tên nguyên liệu muốn sửa", unit);
      this.ingredient = {
        name: ingredient,
        unit: unitIngredient,
      };
      if (ingredient != null) {
        backer
          .put("ingredient/" + id, this.ingredient)
          .then((response) => {
            if (response.data.status) {
              this.success("Nguyên liệu", "cập nhật", "info");
            }
          })
          .catch((error) => {
            this.failure(error.response.data);
          });
      }
    },

    editCategory: function (id, name) {
      let category = prompt("Vui lòng nhập tên chuyên mục muốn sửa", name);
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
  updated() {},
  mounted() {
    this.loadCategory();
    this.loadIngredient();
  },
};
</script>
<style scoped>
</style>
