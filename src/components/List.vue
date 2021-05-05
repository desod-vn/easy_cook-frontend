<template>
  <div>
    <div class="row">
      <div class="col-xl-12">
        <h2 class="font-weight-bolder mt-5 mb-3">Công thức mới nhất</h2>
      </div>
      <div class="col-xl-6" v-for="(post, index) in posts" :key="index">
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

            <p class="p-2">
              <b-icon icon="calendar" class="mr-1" />Ngày đăng:
              {{ moment(post.created_at).format("DD-MM-YYYY") }}
              <br />
              <b-icon icon="clock" class="mr-1" />Giờ đăng:
              {{ moment(post.created_at).format("h:mm a") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      moment: moment,
    };
  },
  props: ["posts"],
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