<template>
  <div>
    <Header />
    <div class="container">
      <div class="row">
        <div class="col-xl-12 border border-info p-5 mt-5 mb-5">
          <form enctype="multipart/form-data" @submit.prevent="handle()">
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
              <button type="submit" class="btn btn-outline-primary">
                Cập nhật công thức
              </button>
            </div>
          </form>
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
      image: "",
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
        `Xuất hiện lỗi, vui lòng kiểm tra và tiến hành cập nhật lại.`,
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
      let id = this.$route.params.id;
      let data = new FormData();
      if (this.post.image) data.append("image", this.post.image);
      data.append("name", this.post.name);
      data.append("content", this.post.content);
      data.append("category_id", this.post.category_id.id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      backer
        .post("post/" + id, data, config)
        .then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          this.errors = error.response.data;
          this.failure();
        });
    },
    loadPost: function () {
      let id = this.$route.params.id;
      backer.get(`post/${id}`).then((response) => {
        if (response.data.status) {
          this.post.name = response.data.post.name;
          this.post.content = response.data.post.content;
          this.post.category_id = response.data.post.category_id;
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id == this.post.category_id) {
              this.post.category_id = this.categories[i];
            }
          }
        }
      });
    },
  },
  mounted() {
    this.loadCategory();
    this.loadIngredient();
    this.loadPost();
  },
};
</script>
<style>
.ck-editor__editable {
  min-height: 500px;
}
</style>