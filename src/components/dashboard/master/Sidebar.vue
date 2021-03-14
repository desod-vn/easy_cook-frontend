<template>
  <b-list-group>
  <b-list-group-item class="flex-column align-items-start">
    <div class="d-flex justify-content-between">
      <h5 class="mb-1">
        <b-icon icon="folder-fill"></b-icon>
        Quản lý thư mục
      </h5>
      <b-badge variant="success" class="h5" pill>{{ categories.length }}</b-badge>
    </div>

    <b-list-group class="mt-3 mb-2">
      <b-list-group-item 
        v-for="category in categories" 
        :key="category.id"
        class="d-flex justify-content-between"
      >
        <span class="font-weight-bold">{{ category.name }}</span>
        <span>
        <router-link to="/register" class="mr-2">
          <b-icon icon="pencil" variant="info"></b-icon>
        </router-link>

        <span @click.prevent="deleteCategory(category.id)" class="ml-2">
          <b-icon icon="x-circle" variant="danger"></b-icon>
        </span>

        </span>
      </b-list-group-item>
    </b-list-group>

    <router-link to="/category" class="btn btn-success btn-lg btn-block">
      NEW CATEGORY
    </router-link>
  </b-list-group-item>

  <b-list-group-item href="#" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        <b-icon icon="file-post-fill"></b-icon>
        Quản lý bài viết
      </h5>
      <small>3 days ago</small>
    </div>
  </b-list-group-item>

  <b-list-group-item href="#" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        <b-icon icon="people-fill"></b-icon>
        Quản lý thành viên
      </h5>
      <small>3 days ago</small>
    </div>
  </b-list-group-item>
</b-list-group>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: ['categories'],
    methods: {
      deleteCategory: function(id) {
        this.$parent.deleteCategory(id);
      }
    }
  }
</script>

<style scoped>
  
</style>