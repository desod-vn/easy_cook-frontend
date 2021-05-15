<template>
  <section class="login">
    <div class="container d-flex flex-column">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="login--main col-lg-6 col-md-8 mx-auto">
          <div class="login--title">Đăng nhập</div>

          <form @submit.prevent="handle()">
            <!--error warning-->
            <div v-if="errors.errors">
              <div
                class="alert alert-danger"
                v-for="error in errors.errors"
                :key="error.id"
              >
                {{ error[0] }}
              </div>
            </div>

            <!--message responsing-->
            <div class="alert alert-info" v-if="errors.message">
              {{ errors.message }}
            </div>

            <div class="form-group">
              <label class="form-control-label">Tên tài khoản: </label>
              <input
                type="text"
                name="name"
                class="form-control"
                v-model="user.name"
              />
            </div>

            <div class="form-group">
              <label class="form-control-label">Mật khẩu: </label>
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="user.password"
              />
            </div>

            <div class="d-flex align-items-center">
              <button type="submit" class="btn btn-lg btn-success">
                Đăng nhập
              </button>

              <div class="ml-auto">
                <router-link to="/register">
                  Tạo tài khoản mới <b-icon icon="arrow-right"></b-icon>
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import backer from "../../utils/axios";

export default {
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      errors: {},
    };
  },
  mounted() {
    if (localStorage.getItem("token")) this.$router.push({ name: "home" });
  },
  methods: {
    handle: function () {
      backer
        .post("login", this.user)
        .then((response) => {
          if (!response.data.status) {
            this.errors = response.data;
          } else {
            localStorage.setItem("token", response.data.user.token);
            this.$router.push({ name: "home" });
          }
        })
        .catch((error) => {
          this.errors = error.response.data;
        });
    },
  },
};
</script>

<style scoped>
.login {
  background: url("../../assets/css/login.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.login--main {
  background: #fff;
  padding: 5%;
  border-radius: 10px;
}
.login--title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 5% 0 10%;
}
</style>