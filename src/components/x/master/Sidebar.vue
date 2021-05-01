<template>
  <b-list-group>
  <b-list-group-item class="flex-column align-items-start">
    <div class="d-flex justify-content-between">
      <h5 class="mb-1 font-weight-bold">
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
        <span class="">{{ category.name }}</span>
        <span>
        <router-link :to="{ name: 'editCategory', params: { id: category.id } }" 
        :id="category.id" class="mr-2">
          <b-icon icon="pencil" variant="info"></b-icon>
        </router-link>

        <span @click.prevent="deleteCategory(category.id)" class="ml-2">
          <b-icon icon="x-circle" variant="danger"></b-icon>
        </span>

        </span>
      </b-list-group-item>
    </b-list-group>

    <router-link to="/category" class="btn btn-success btn btn-block">
      NEW CATEGORY
    </router-link>
  </b-list-group-item>

  <b-list-group-item class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 font-weight-bold">
        <b-icon icon="file-post-fill"></b-icon>
        Quản lý bài viết
      </h5>
    </div>

    <b-list-group class="mt-3 mb-2">
      <b-list-group-item variant="primary">
        <router-link to="/article">
          <b-icon icon="plus-circle" variant="primary"></b-icon>
          Thêm bài viết mới
        </router-link>
      </b-list-group-item>

      <b-list-group-item variant="secondary">
        <router-link to="/article">
          <b-icon icon="list-ul" variant="primary"></b-icon>
          Danh sách bài viết
        </router-link>
      </b-list-group-item>

      <b-list-group-item variant="secondary">
        <router-link to="/article">
          <b-icon icon="bookmark-star" variant="primary"></b-icon>
          Bài viết xem nhiều
        </router-link>
      </b-list-group-item>

    </b-list-group>
  </b-list-group-item>

  <b-list-group-item href="#" class="flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 font-weight-bold">
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
    props: ['categories', 'articles'],
    methods: {
      deleteCategory: function(id) {
        this.$parent.deleteCategory(id);
      }
    }
  }
</script>

<style scoped>
  
</style>