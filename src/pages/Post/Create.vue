<template>
  <div>
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-xl-12 border border-info p-5 mt-5 mb-5">
          <div class="form-group">
            <label class="form-control-label">Tên công thức: </label>
            <input
              type="text"
              name="name"
              class="form-control"
              v-model="post.name"
            />
          </div>

          <div v-if="image">
            Hình ảnh mẫu:
            <br />
            <img :src="image" class="img-responsive" />
          </div>
          <label class="form-control-label">Hình ảnh: </label>
          <input
            type="file"
            name="image"
            class="form-control-file"
            @change="onFile"
          />

          <br />

          <div class="form-group">
            <label class="form-control-label">Các nguyên liệu: </label>
            <div
              class="form-row m-1"
              v-for="(ingredient, index) in checkedIngredients"
              :key="'A' + index"
            >
              <div class="col-4">
                {{ ingredient.name }}
              </div>
              <div class="col-2">
                <input
                  type="text"
                  v-model="ingredient.unit"
                  class="form-control"
                  placeholder="Đơn vị tính"
                  readonly
                />
              </div>
              <div class="col-2">
                <input
                  type="number"
                  step="0.1"
                  v-model="quantity[index]"
                  class="form-control"
                  placeholder="Số lượng"
                />
              </div>
              <div class="col-4 p-2">
                <input
                  type="radio"
                  :id="'yes' + index"
                  value="1"
                  v-model="main[index]"
                  class="mr-2"
                />
                <label :for="'yes' + index">Nguyên liệu chính</label>
                <input
                  type="radio"
                  :id="'no' + index"
                  value="0"
                  v-model="main[index]"
                />
                <label :for="'no' + index">Không</label>
              </div>
            </div>
            <div class="input-group mt-3 mb-2">
              <div class="input-group-prepend">
                <span class="input-group-text"><b-icon icon="search" /></span>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="ingredient"
                @change="loadIngredient(ingredient)"
              />
            </div>
            <span
              v-for="(ingredient, index) in ingredients.slice(0, 12)"
              :key="index"
              class="border p-1 m-1"
            >
              <input
                :id="ingredient.id"
                :value="{
                  id: ingredient.id,
                  name: ingredient.name,
                  unit: ingredient.unit,
                }"
                name="product"
                type="checkbox"
                v-model="checkedIngredients"
              />
              <label :for="ingredient.id"
                ><span>{{ ingredient.name }}</span></label
              > </span
            >......
          </div>

          <div class="form-group">
            <label class="form-control-label">Nội dung: </label>
            <ckeditor
              :editor="editor"
              class="form-control"
              name="content"
              height="500px"
              v-model="post.content"
            ></ckeditor>
          </div>

          <div class="form-group">
            <label class="form-control-label">Chuyên mục: </label>
            <v-select
              v-model="post.category_id"
              :options="categories"
              label="name"
            >
            </v-select>
          </div>
          <div v-if="errors.errors">
            <div
              class="alert alert-danger"
              v-for="error in errors.errors"
              :key="error.id"
            >
              {{ error[0] }}
            </div>
          </div>

          <div class="alert alert-info" v-if="errors.message">
            {{ errors.message }}
          </div>
          <div class="d-flex align-items-center">
            <button
              type="submit"
              @click="handle()"
              class="btn btn-outline-primary"
            >
              Tạo công thức
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import backer from "../../utils/axios";
import Header from "../../components/Header";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Footer from "../../components/Footer";

import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data() {
    return {
      admin: this.$store.state.user.role,
      post: {
        name: "",
        content: "",
        category_id: "",
        image: "",
      },
      ingredient: "",
      ingredients: [],
      checkedIngredients: [],
      quantity: [],
      unit: [],
      image: "",
      main: [],
      categories: [],
      errors: {},
      editor: ClassicEditor,
    };
  },
  components: {
    Header,
    vSelect,
    Footer,
    ckeditor: CKEditor.component,
  },
  methods: {
    failure: function () {
      this.$bvToast.toast(
        `Xuất hiện lỗi, vui lòng kiểm tra và tiến hành tạo lại.`,
        {
          title: `Có lỗi`,
          variant: "danger",
          solid: true,
        }
      );
    },
    loadCategory: function (page = 1) {
      backer.get(`category?page=${page}&per_page=1000`).then((response) => {
        this.categories = response.data.data;
      });
    },
    loadIngredient: function (name = "") {
      backer.get(`ingredient?search=${name}`).then((response) => {
        this.ingredients = response.data;
      });
    },
    onFile: function (e) {
      this.post.image = e.target.files[0];
      this.createImage(this.post.image);
    },
    createImage: function (file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    handle: function () {
      let numberIngredients = this.checkedIngredients.length;
      let data = new FormData();
      data.append("image", this.post.image);
      data.append("name", this.post.name);
      data.append("content", this.post.content);
      data.append("category_id", this.post.category_id.id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      backer
        .post("post", data, config)
        .then((response) => {
          if (response.data.status) {
            let id = response.data.post.id;
            for (let i = 0; i < numberIngredients; i++) {
              let ingredientOne = {
                ingredient: this.checkedIngredients[i].id,
                quantity: this.quantity[i] || 1,
                main: this.main[i] || false,
              };
              backer.post("ingredient_post/" + id, ingredientOne);
            }
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          this.errors = error.response.data;
          this.failure();
        });
    },
  },
  mounted() {
    this.loadCategory();
    this.loadIngredient();
  },
};
</script>
<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>