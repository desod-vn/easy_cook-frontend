<template>
  <div class="app"></div>
</template>

<script>
export default {
  mounted() {
    this.$router.push({ name: "dashboard" });
  },
};
</script>

<style>
</style>