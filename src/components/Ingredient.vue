<template>
  <div class="border">
    <h5 class="mt-3 font-weight-bold">
      <b-icon icon="compass-fill"></b-icon>
      Quản lý nguyên liệu
    </h5>
    <div class="input-group mt-3 mb-2">
      <div class="input-group-prepend">
        <span class="input-group-text"><b-icon icon="search" /></span>
      </div>
      <input
        type="text"
        class="form-control"
        v-model="ingredient"
        @change="searchIngredient(ingredient)"
      />
    </div>
    <div class="pt-3 pb-3">
      <span
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="btn btn-outline-dark rounded-pill m-1"
      >
        <span @click.prevent="editIngredient(ingredient.id, ingredient.name, ingredient.unit)">
          {{ ingredient.name }}
          <b-icon icon="file-earmark-font" variant="info"></b-icon>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ingredient: "",
    };
  },
  props: ["ingredients"],
  methods: {
    searchIngredient: function (name) {
      this.$parent.loadIngredient(name);
    },
    editIngredient: function (id, name, unit) {
      this.$parent.editIngredient(id, name, unit);
    },
  },
};
</script>

<style scoped>
</style>