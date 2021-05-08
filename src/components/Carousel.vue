<template>
  <div>
    <b-carousel
      :interval="5000"
      controls
      indicators
      background="#ababab"
      max-img-width="1024"
      max-img-height="480"
      class="mt-5"
    >
      <b-carousel-slide
        v-for="(post, index) in posts.slice(0, 5)"
        :key="index"
        :img-src="post.image"
        class="img-fluid"
      >
        <h1 class="bg-text">
          <router-link class="text-light"
            :to="{ name: 'view', params: { id: post.id, slug: post.slug } }"
          >
            {{ post.name }}
          </router-link>
        </h1>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: 1,
    };
  },
  props: ["posts"],
  methods: {},
};
</script>

<style scoped>
.bg-text {
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
}
</style>