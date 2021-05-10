<template>
  <header>
    <b-navbar toggleable="lg" type="light" variant="light">
      <div class="container">
        <b-navbar-brand>
          <router-link to="/">
            <img src="../assets/logo.png" height="40px" alt="" />
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mr-auto">
            <div class="input-group">
              <input type="text" class="form-control" v-model="namePost" />
              <div class="input-group-append">
                <span class="btn btn-success" @click="loadPost(namePost, 10)">
                  Tìm kiếm
                </span>
              </div>
            </div>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <div v-if="admin == 'admin'">
              <router-link
                class="btn btn-info rounded-pill m-2"
                to="/create"
              >
                <b-icon icon="arrow-up-right-square" />
                Công thức
              </router-link>
              <router-link
                class="btn btn-info rounded-pill m-2"
                to="/dashboard"
              >
                <b-icon icon="joystick" />
                Quản lý
              </router-link>
            </div>
            <div v-if="username">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <img
                    :src="avatar"
                    class="rounded-circle"
                    alt=""
                    height="40px"
                    width="40px"
                  />
                  {{ username }}
                </template>
                <b-dropdown-item v-if="admin == 'admin'"> </b-dropdown-item>
                <b-dropdown-item>
                  <b-icon icon="person-lines-fill" />
                  <span class="text-primary" @click.prevent="avatarNew">
                    Ảnh đại diện</span
                  >
                </b-dropdown-item>
                <b-dropdown-item>
                  <b-icon icon="heart-fill" />
                  <router-link to="/love"> Yêu thích </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <b-icon icon="box-arrow-in-right" />
                  <router-link class="text-danger" to="/logout">
                    Đăng xuất
                  </router-link>
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </div>
            <div v-else>
              <router-link class="btn btn-outline-primary m-2" to="/register">
                Đăng ký
              </router-link>
              <router-link class="btn btn-danger" to="/login">
                Đăng nhập
              </router-link>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <div v-if="changeAvatar" class="avatar">
      <form class="avatar-content animate" @submit.prevent="handle()">
        <div class="container-avatar">
          <label><b>Ảnh đại diện</b></label>

          <input
            type="file"
            name="image"
            class="form-control-file"
            @change="onFile"
          />
          <br />
          <button type="submit" class="btn btn-success">Thay đổi</button>
        </div>
        <em>Vui lòng chọn ảnh có dung lượng nhỏ hơn 1MB.</em>

        <div class="container-avatar" style="background-color: #f1f1f1">
          <button type="button" class="btn btn-danger" @click="avatarNew">
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  </header>
</template>

<script>
import backer from "../utils/axios";

export default {
  data() {
    return {
      latestPost: 0,
      oldAvatar: "",
      namePost: "",
      changeAvatar: false,
    };
  },
  methods: {
    loadPost: function () {
        this.$router.push({ name: "search", params: { search: this.namePost }});
    },

    avatarNew: function () {
      this.changeAvatar = !this.changeAvatar;
    },
    onFile: function (e) {
      this.oldAvatar = e.target.files[0];
    },
    handle: function () {
      let data = new FormData();
      let id = this.$store.state.user.id;
      data.append("image", this.oldAvatar);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      backer
        .post("avatar/" + id, data, config)
        .then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "login" });
          }
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
  },
  computed: {
    username() {
      return this.$store.state.user.name;
    },
    avatar() {
      return this.$store.state.user.image;
    },
    admin() {
      return this.$store.state.user.role;
    },
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      backer.get("info").then((response) => {
        if (response.data.status) this.$store.state.user = response.data.user;
      });
    }
  },
};
</script>

<style scoped>
.avatar {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}
.container-avatar {
  padding: 16px;
}
.avatar-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>