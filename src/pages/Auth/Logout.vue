<template>
  <div class="app"></div>
</template>

<script>
import backer from "../../utils/axios";

export default {
  mounted() {
    backer
      .post("logout")
      .then(() => {
        localStorage.removeItem("token");
        this.$router.go();
      })
      .catch(() => {
        this.$router.push({ name: "home" });
      });
  },
};
</script>

<style>
</style>