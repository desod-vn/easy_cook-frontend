<template>
  <section class="register">
    <div class="container d-flex flex-column">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="register--main col-lg-6 col-md-8 mx-auto">
          <div class="register--title">Đăng ký</div>

          <form @submit.prevent="handle()">
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

            <div class="form-group">
              <label class="form-control-label">Địa chỉ email: </label>
              <input
                type="email"
                name="email"
                class="form-control"
                v-model="user.email"
              />
            </div>

            <div class="form-group">
              <label class="form-control-label">Tên đăng nhập: </label>
              <input
                type="text"
                name="username"
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

            <div class="form-group">
              <label class="form-control-label">Xác nhận mật khẩu: </label>
              <span v-if="user.password != ''">
                <span
                  v-if="user.password_confirmation == user.password"
                  class="h5 text-white float-right"
                >
                  <b-icon icon="check" class="rounded-circle bg-primary">
                  </b-icon>
                </span>

                <span v-else class="h5 text-white float-right">
                  <b-icon icon="exclamation" class="rounded-circle bg-danger">
                  </b-icon>
                </span>
              </span>

              <input
                type="password"
                name="password_confirmation"
                class="form-control"
                v-model="user.password_confirmation"
              />
            </div>

            <div class="d-flex align-items-center">
              <div class="mr-auto">
                <router-link to="/login">
                  <b-icon icon="arrow-left"></b-icon> Đã có tài khoản
                </router-link>
              </div>

              <button type="submit" class="btn btn-lg btn-primary">
                Đăng ký
              </button>
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
        email: "",
        name: "",
        password: "",
        password_confirmation: "",
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
        .post("register", this.user)
        .then((response) => {
          if (!response.data.status) {
            this.errors = response.data;
            this.errors.message =
              "Không thể đăng ký tài khoản, vui lòng thử lại sau.";
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
.register {
  background: url("../../assets/css/register.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.register--main {
  background: #fff;
  padding: 5%;
  border-radius: 10px;
}
.register--title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 5% 0 10%;
}
</style>