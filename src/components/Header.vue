<template>
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
            <input type="text" class="form-control" />
            <div class="input-group-append">
              <router-link class="btn btn-success" to="/search">
                Tìm kiếm
              </router-link>
            </div>
          </div>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
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
              <b-dropdown-item v-if="admin == 'admin'">
                <b-icon icon="joystick" />
                <router-link to="/dashboard"> Quản lý </router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-icon icon="person-lines-fill" />
                <router-link to="/profile"> Trang cá nhân </router-link>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-icon icon="heart-fill" />
                <router-link to="/love"> Nguyên liệu </router-link>
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
</template>

<script>
export default {
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
};
</script>

<style scoped>
</style>