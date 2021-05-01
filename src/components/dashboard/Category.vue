<template>
  <b-list-group>
    <b-list-group-item class="flex-column align-items-start">
      <div class="d-flex justify-content-between">
        <h5 class="mb-1 font-weight-bold">
          <b-icon icon="folder-fill"></b-icon>
          Quản lý chuyên mục
        </h5>
        <b-badge variant="success" class="h5" pill>{{
          categories.length
        }}</b-badge>
      </div>

      <b-list-group class="mt-3 mb-2">
        <b-list-group-item
          v-for="(category, index) in categories"
          :key="index"
          class="d-flex justify-content-between"
        >
          <router-link
            :to="{ name: 'categoryDetail', params: { id: category.id } }"
            :id="index"
          >
            {{ category.name }}
          </router-link>
          <span>
            <span
              @click.prevent="editCategory(category.id, category.name)"
              class="mr-2"
            >
              <b-icon icon="pencil" variant="info"></b-icon>
            </span>
            <span @click.prevent="deleteCategory(category.id)" class="ml-2">
              <b-icon icon="x-circle" variant="danger"></b-icon>
            </span>
          </span>
        </b-list-group-item>
      </b-list-group>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
// import backer from "../../utils/axios";

export default {
  props: ["categories"],
  methods: {
    deleteCategory: function (id) {
      this.$parent.deleteCategory(id);
    },
    editCategory: function (id, name) {
      this.$parent.editCategory(id, name);
    },
  },
};
</script>
<style>
</style>