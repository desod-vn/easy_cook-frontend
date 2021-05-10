<template>
  <div>
    <div class="row">
      <div :class="`col-xl-${col}`" v-for="(post, index) in posts" :key="index">
        <div class="item__wrap">
          <div class="img__wrap">
            <router-link
              :to="{ name: 'view', params: { id: post.id, slug: post.slug } }"
            >
              <img class="img-fluid" :src="post.image" alt="" />
            </router-link>
          </div>
          <div class="img__title">
            <router-link
              :to="{ name: 'view', params: { id: post.id, slug: post.slug } }"
            >
              {{ post.name }}
            </router-link>

            <div class="d-flex p-2 justify-content-between align-items-center">
              <div>
                <b-icon icon="calendar" class="mr-1" />Ngày đăng:
                {{ moment(post.updated_at).format("DD-MM-YYYY") }}
                <br />
                <b-icon icon="clock" class="mr-1" />Giờ đăng:
                {{ moment(post.updated_at).format("h:mm a") }}
              </div>
              <span v-if="show">
                <b-icon
                  :icon="post.store ? 'bookmark-check-fill' : 'bookmark'"
                  class="h3"
                  @click="store(post.id, index)"
                  v-b-tooltip.hover
                  :title="post.store ? 'Hủy lưu công thức' : 'Lưu công thức'"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="d-flex bg-dark p-2 justify-content-center">
          <pagination
            v-model="page"
            :records="total"
            :per-page="perPage"
            @paginate="loadPost"
            :options="{ texts: { count: '' } }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Pagination from "vue-pagination-2";
import backer from "../utils/axios";

export default {
  data() {
    return {
      page: 1,
      moment: moment,
      storePost: "",
      show: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.id;
    },
  },
  components: {
    Pagination,
  },
  methods: {
    store: function (post, id) {
      this.show = false;
      backer.post("post_user/" + this.user, { post: post }).then((response) => {
        if (response.data.status) {
          this.posts[id].store = !this.posts[id].store;
          this.storePostLoad();
        }
      });
    },
    loadPost: function (page) {
      this.$parent.loadPost(page);
    },
    storePostLoad: function () {
      backer.get("info").then((response) => {
        backer.get("post_user/" + response.data.user.id).then((response) => {
          this.storePost = response.data.post;
          for (let i = 0; i < this.posts.length; i++) {
            for (let j = 0; j < this.storePost.length; j++) {
              if (this.posts[i].id == this.storePost[j].post_id) {
                this.posts[i].store = 1;
              }
            }
          }
          this.show = true;
        });
      });
    },
  },

  props: ["posts", "total", "perPage", "col"],
  mounted() {
    this.storePostLoad();
  },
};
</script>

<style scoped>
.item__wrap {
  box-shadow: 3px 3px 10px #000;
  margin: 15px 0;
}
.item__wrap:hover {
  box-shadow: 3px 3px 15px #000;
}
.img__wrap {
  margin: 0;
  padding: 0;
  position: relative;
}
.img__title {
  background-color: #fff;
  padding: 5px 10px;
}
.img__title a {
  text-decoration: none;
  font-weight: bolder;
  font-size: 25px;
}
</style>