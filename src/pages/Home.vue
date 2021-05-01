<template>
  <div id="app">
    <Header />
  </div>
</template>
<script>
import backer from "../utils/axios";

import Header from "../components/Header";

export default {
  components: {
    Header,
  },
  mounted() {
    if (localStorage.getItem("token")) {
      backer.get("info").then((response) => {
        if (response.data.status) this.$store.state.user = response.data.user;
      });
    }
  },
};
</script>
<style scoped>
</style>
